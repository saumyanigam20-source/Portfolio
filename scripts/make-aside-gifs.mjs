import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import gifenc from "gifenc";

const { GIFEncoder, quantize, applyPalette } = gifenc;

const W = 220;
const H = 150;
const FRAMES = 10;

const ink = [42, 36, 32, 255];
const paper = [246, 241, 231, 255];
const blob = [255, 248, 238, 255];
const blush = [232, 164, 138, 255];
const sage = [125, 154, 114, 255];
const pupil = [28, 24, 22, 255];

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../public/gifs/aside");

function create() {
  return new Uint8Array(W * H * 4);
}

function put(data, x, y, color) {
  const px = Math.round(x);
  const py = Math.round(y);
  if (px < 0 || py < 0 || px >= W || py >= H) return;
  const i = (py * W + px) * 4;
  const a = color[3] / 255;
  if (a >= 1 || data[i + 3] === 0) {
    data[i] = color[0];
    data[i + 1] = color[1];
    data[i + 2] = color[2];
    data[i + 3] = color[3];
    return;
  }
  const inv = 1 - a;
  data[i] = color[0] * a + data[i] * inv;
  data[i + 1] = color[1] * a + data[i + 1] * inv;
  data[i + 2] = color[2] * a + data[i + 2] * inv;
  data[i + 3] = 255;
}

function fillCircle(data, cx, cy, r, color) {
  const r2 = r * r;
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= r2) put(data, x, y, color);
    }
  }
}

function fillRoundRect(data, x, y, w, h, radius, color) {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      let inside = true;
      if (px < x + radius && py < y + radius) {
        const dx = px - (x + radius);
        const dy = py - (y + radius);
        inside = dx * dx + dy * dy <= radius * radius;
      } else if (px > x + w - radius && py < y + radius) {
        const dx = px - (x + w - radius);
        const dy = py - (y + radius);
        inside = dx * dx + dy * dy <= radius * radius;
      } else if (px < x + radius && py > y + h - radius) {
        const dx = px - (x + radius);
        const dy = py - (y + h - radius);
        inside = dx * dx + dy * dy <= radius * radius;
      } else if (px > x + w - radius && py > y + h - radius) {
        const dx = px - (x + w - radius);
        const dy = py - (y + h - radius);
        inside = dx * dx + dy * dy <= radius * radius;
      }
      if (inside) put(data, px, py, color);
    }
  }
}

function capsule(data, x1, y1, x2, y2, radius, color) {
  const steps = Math.ceil(Math.hypot(x2 - x1, y2 - y1));
  for (let i = 0; i <= steps; i++) {
    const t = steps === 0 ? 0 : i / steps;
    fillCircle(data, x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, radius, color);
  }
}

function arc(data, cx, cy, r, a0, a1, thickness, color) {
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    fillCircle(data, cx + Math.cos(a) * r, cy + Math.sin(a) * r, thickness, color);
  }
}

function star(data, cx, cy, r, color) {
  for (let i = 0; i < 4; i++) {
    const a = (Math.PI / 4) * i;
    capsule(
      data,
      cx - Math.cos(a) * r,
      cy - Math.sin(a) * r,
      cx + Math.cos(a) * r,
      cy + Math.sin(a) * r,
      1.6,
      color,
    );
  }
}

function character(data, pose) {
  const { x, y, blink, lookX, lookY, mouth, arm, extra } = pose;
  fillCircle(data, x, y + 18, 28, blob);
  fillCircle(data, x, y + 18, 28, ink);
  fillCircle(data, x, y + 18, 25, blob);
  fillCircle(data, x, y - 8, 22, ink);
  fillCircle(data, x, y - 8, 19, blob);

  if (arm) {
    const [ax, ay] = arm;
    capsule(data, x + 16, y + 8, ax, ay, 5.5, ink);
    capsule(data, x + 16, y + 8, ax, ay, 3.6, blob);
    fillCircle(data, ax, ay, 4.2, ink);
    fillCircle(data, ax, ay, 2.6, blob);
  }

  const eyeY = y - 12;
  if (blink) {
    capsule(data, x - 8, eyeY, x - 2, eyeY, 1.3, pupil);
    capsule(data, x + 2, eyeY, x + 8, eyeY, 1.3, pupil);
  } else {
    fillCircle(data, x - 6, eyeY, 3.3, pupil);
    fillCircle(data, x + 6, eyeY, 3.3, pupil);
    fillCircle(data, x - 6 + lookX, eyeY + lookY, 1.3, paper);
    fillCircle(data, x + 6 + lookX, eyeY + lookY, 1.3, paper);
  }

  fillCircle(data, x - 12, y - 4, 3.1, blush);
  fillCircle(data, x + 12, y - 4, 3.1, blush);

  if (mouth === "smile") arc(data, x, y - 2, 7, 0.25, Math.PI - 0.25, 1.35, pupil);
  if (mouth === "flat") capsule(data, x - 5, y + 2, x + 5, y + 2, 1.2, pupil);
  if (mouth === "o") fillCircle(data, x, y + 2, 3.2, pupil);
  if (mouth === "smirk") arc(data, x + 1, y - 1, 6, 0.4, 2.2, 1.35, pupil);
  if (mouth === "tongue") {
    fillCircle(data, x, y + 2, 3.4, pupil);
    fillCircle(data, x, y + 6, 2.2, blush);
  }

  extra?.(data, x, y);
}

function card(data) {
  fillRoundRect(data, 18, 14, W - 36, H - 28, 28, paper);
}

function frame(pose) {
  const data = create();
  for (let i = 0; i < data.length; i += 4) {
    data[i] = paper[0];
    data[i + 1] = paper[1];
    data[i + 2] = paper[2];
    data[i + 3] = 255;
  }
  fillCircle(data, 110, 82, 58, [232, 224, 208, 255]);
  character(data, pose);
  return data;
}

function writeGif(frames) {
  const gif = GIFEncoder();
  const sample = frames[0];
  const palette = quantize(sample, 32, { format: "rgb444" });
  for (const rgba of frames) {
    const index = applyPalette(rgba, palette, "rgb444");
    gif.writeFrame(index, W, H, { palette, delay: 90 });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

function waveFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const swing = Math.sin(t * Math.PI * 2);
    const angle = -0.4 + swing * 1.15;
    const len = 34;
    return frame({
      x: 108,
      y: 78,
      blink: i === 7,
      lookX: 0.4,
      lookY: -0.2,
      mouth: "smile",
      arm: [108 + 16 + Math.cos(angle) * len, 78 + 8 + Math.sin(angle) * len],
    });
  });
}

function thinkFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const bob = Math.sin(t * Math.PI * 2) * 2;
    return frame({
      x: 100,
      y: 82 + bob,
      blink: i === 4,
      lookX: 0,
      lookY: -1.1,
      mouth: "flat",
      arm: [112, 70],
      extra(data, x, y) {
        const dots = [0, 1, 2].map((n) => {
          const phase = (t * Math.PI * 2 + n * 0.7) % (Math.PI * 2);
          return Math.sin(phase) * 3;
        });
        dots.forEach((lift, n) => {
          fillCircle(data, x + 28 + n * 12, y - 28 - lift, 2.4, sage);
        });
      },
    });
  });
}

function cheerFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const hop = Math.abs(Math.sin(t * Math.PI * 2)) * 8;
    return frame({
      x: 108,
      y: 84 - hop,
      blink: i === 2 || i === 6,
      lookX: 0,
      lookY: 0,
      mouth: "smile",
      arm: [150, 48 - hop * 0.3],
      extra(data, x, y) {
        star(data, x - 42, y - 24, 7 + Math.sin(t * Math.PI * 2) * 1.5, sage);
        star(data, x + 46, y - 8, 5, blush);
      },
    });
  });
}

function shrugFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const lift = (Math.sin(t * Math.PI * 2) * 0.5 + 0.5) * 6;
    return frame({
      x: 110,
      y: 80 - lift * 0.3,
      blink: false,
      lookX: 1.2,
      lookY: 0.4,
      mouth: "flat",
      arm: [156, 86 - lift],
      extra(data, x, y) {
        const qy = y - 36 - lift;
        arc(data, x - 40, qy, 8, Math.PI * 0.15, Math.PI * 1.7, 1.5, sage);
        fillCircle(data, x - 40, qy + 12, 1.6, sage);
      },
    });
  });
}

function sillyFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const sway = Math.sin(t * Math.PI * 2) * 6;
    return frame({
      x: 112 + sway,
      y: 80,
      blink: i === 5,
      lookX: sway > 0 ? 1.3 : -1.3,
      lookY: 0.6,
      mouth: i % 4 < 2 ? "tongue" : "smirk",
      arm: [150 + sway, 96],
      extra(data, x, y) {
        for (let col = 0; col < 3; col++) {
          for (let row = 0; row < 3; row++) {
            const color = (col + row) % 2 === 0 ? sage : blush;
            fillRoundRect(data, x - 52 + col * 8, y - 34 + row * 8, 7, 7, 1, color);
          }
        }
      },
    });
  });
}

function bookFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const open = 10 + Math.abs(Math.sin((i / FRAMES) * Math.PI * 2)) * 14;
    return frame({
      x: 96,
      y: 78,
      blink: i === 8,
      lookX: 0.8,
      lookY: 1,
      mouth: "smile",
      arm: [132, 96],
      extra(data, x, y) {
        fillRoundRect(data, x + 18, y + 8, 16, 22, 2, ink);
        fillRoundRect(data, x + 20, y + 10, 12, 18, 1, paper);
        fillRoundRect(data, x + 20 + open * 0.15, y + 6, 14, 20, 2, sage);
      },
    });
  });
}

function pinFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const drop = Math.abs(Math.sin(t * Math.PI * 2)) * 7;
    return frame({
      x: 100,
      y: 88,
      blink: i === 3,
      lookX: 0,
      lookY: -1,
      mouth: "o",
      arm: [138, 70],
      extra(data, x, y) {
        const py = y - 42 + drop;
        fillCircle(data, x + 34, py, 8, sage);
        fillCircle(data, x + 34, py, 3, paper);
        capsule(data, x + 34, py + 6, x + 34, py + 16, 2.2, sage);
      },
    });
  });
}

function nodFrames() {
  return Array.from({ length: FRAMES }, (_, i) => {
    const t = i / FRAMES;
    const nod = Math.sin(t * Math.PI * 2) * 4;
    return frame({
      x: 108,
      y: 80 + Math.max(0, nod),
      blink: nod > 2,
      lookX: 0,
      lookY: 0,
      mouth: "smile",
      arm: [146, 88],
      extra(data, x, y) {
        fillCircle(data, x + 40, y - 20, 9, sage);
        capsule(data, x + 36, y - 20, x + 40, y - 14, 1.4, paper);
        capsule(data, x + 40, y - 16, x + 46, y - 24, 1.4, paper);
      },
    });
  });
}

const sets = {
  wave: waveFrames,
  think: thinkFrames,
  cheer: cheerFrames,
  shrug: shrugFrames,
  silly: sillyFrames,
  book: bookFrames,
  pin: pinFrames,
  nod: nodFrames,
};

await mkdir(outDir, { recursive: true });
for (const [name, make] of Object.entries(sets)) {
  const bytes = writeGif(make());
  const file = join(outDir, `${name}.gif`);
  await writeFile(file, bytes);
  console.log(name, bytes.length);
}
