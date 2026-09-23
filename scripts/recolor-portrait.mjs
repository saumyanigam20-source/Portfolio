import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const input =
  "C:/Users/Saumya Nigam/.cursor/projects/c-Users-Saumya-Nigam-Portfolio/assets/c__Users_Saumya_Nigam_AppData_Roaming_Cursor_User_workspaceStorage_f3a89b80925fef8d4e98fec3d1dcf6bd_images_image-b7693590-f2c5-4f0f-ae59-f215f626ded4.jpg";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../public/images/aside");

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return [h * 360, s, l];
}

function mix(channel, target, amount) {
  return Math.round(channel + (target - channel) * amount);
}

function toward(r, g, b, hex, amount) {
  const t = [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  return [mix(r, t[0], amount), mix(g, t[1], amount), mix(b, t[2], amount)];
}

const base = sharp(input).rotate();
const meta = await base.metadata();
const { data, info } = await base.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const [h, s, l] = rgbToHsl(r, g, b);
  let next = [r, g, b];

  const paper = l > 0.76 && h < 55 && s < 0.75;
  const skin = !paper && h > 8 && h < 45 && l > 0.5 && l <= 0.76 && s > 0.35;
  const hair = l <= 0.42 && l > 0.12 && h < 50 && s > 0.2 && s < 0.85;
  const cloth = l <= 0.18;
  const spark = l > 0.88 && s < 0.25;

  if (skin) {
    next = toward(r, g, b, "#e6c4a6", 0.22);
  } else if (spark) {
    next = toward(r, g, b, "#f3f6ef", 0.7);
  } else if (paper) {
    next = toward(r, g, b, "#e3ebe0", 0.88);
  } else if (cloth) {
    next = toward(r, g, b, "#161a17", 0.7);
  } else if (hair) {
    next = toward(r, g, b, "#3a332c", 0.35);
  } else if (h >= 70 && h <= 170) {
    next = toward(r, g, b, "#7d9a72", 0.78);
  } else if (h > 250 && h < 340) {
    next = toward(r, g, b, "#8eae86", 0.82);
  } else if (h >= 180 && h <= 250) {
    next = toward(r, g, b, "#8aa394", 0.8);
  } else if (h >= 42 && h < 75 && s > 0.3) {
    next = toward(r, g, b, "#d5d0c0", 0.7);
  } else if (s > 0.4) {
    next = l > 0.5 ? toward(r, g, b, "#c4a394", 0.62) : toward(r, g, b, "#5f7358", 0.72);
  }

  data[i] = next[0];
  data[i + 1] = next[1];
  data[i + 2] = next[2];
}

await mkdir(outDir, { recursive: true });
const portrait = sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).png();

await portrait.toFile(join(outDir, "portrait.png"));

const size = Math.min(info.width, info.height);
const left = Math.round((info.width - size) / 2);
const top = Math.round(info.height * 0.08);
const crop = Math.round(size * 0.72);

await sharp(join(outDir, "portrait.png"))
  .extract({
    left: Math.max(0, Math.round((info.width - crop) / 2)),
    top: Math.min(top, info.height - crop),
    width: crop,
    height: crop,
  })
  .resize(320, 320)
  .png()
  .toFile(join(outDir, "avatar.png"));

console.log(meta.width, meta.height, "wrote portrait + avatar", { left, crop });
