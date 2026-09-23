import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input =
  "C:/Users/Saumya Nigam/.cursor/projects/c-Users-Saumya-Nigam-Portfolio/assets/c__Users_Saumya_Nigam_AppData_Roaming_Cursor_User_workspaceStorage_f3a89b80925fef8d4e98fec3d1dcf6bd_images_image-b7693590-f2c5-4f0f-ae59-f215f626ded4.jpg";
const output = join(root, "public/images/aside/portrait-clear.png");

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const pixels = Buffer.from(data);

function at(x, y) {
  return (y * w + x) * 4;
}

let br = 0;
let bg = 0;
let bb = 0;
let n = 0;
for (let y = 0; y < 8; y++) {
  for (let x = 0; x < 8; x++) {
    for (const [sx, sy] of [
      [x, y],
      [w - 1 - x, y],
      [x, h - 1 - y],
      [w - 1 - x, h - 1 - y],
    ]) {
      const i = at(sx, sy);
      br += pixels[i];
      bg += pixels[i + 1];
      bb += pixels[i + 2];
      n++;
    }
  }
}
br /= n;
bg /= n;
bb /= n;

function near(i, limit) {
  const dr = pixels[i] - br;
  const dg = pixels[i + 1] - bg;
  const db = pixels[i + 2] - bb;
  return dr * dr + dg * dg + db * db < limit;
}

const cut = 42 * 42;
const bgMask = new Uint8Array(w * h);
const queue = [];
function consider(x, y) {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const p = y * w + x;
  if (bgMask[p]) return;
  if (!near(p * 4, cut)) return;
  bgMask[p] = 1;
  queue.push(p);
}
for (let x = 0; x < w; x++) {
  consider(x, 0);
  consider(x, h - 1);
}
for (let y = 0; y < h; y++) {
  consider(0, y);
  consider(w - 1, y);
}
while (queue.length) {
  const p = queue.pop();
  const x = p % w;
  const y = (p - x) / w;
  consider(x + 1, y);
  consider(x - 1, y);
  consider(x, y + 1);
  consider(x, y - 1);
}

for (let pass = 0; pass < 2; pass++) {
  const extra = [];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      if (bgMask[p]) continue;
      const edge = bgMask[p - 1] || bgMask[p + 1] || bgMask[p - w] || bgMask[p + w];
      if (edge && near(p * 4, 58 * 58)) extra.push(p);
    }
  }
  for (const p of extra) bgMask[p] = 1;
}

let cleared = 0;
for (let p = 0; p < w * h; p++) {
  if (!bgMask[p]) continue;
  pixels[p * 4 + 3] = 0;
  cleared++;
}

await sharp(pixels, { raw: { width: w, height: h, channels: 4 } }).png().toFile(output);
console.log("bg", [Math.round(br), Math.round(bg), Math.round(bb)], "cleared", cleared, "of", w * h);
