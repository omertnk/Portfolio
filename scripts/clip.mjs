// Videodan sessiz, web için optimize kısa klip keser (GIF yerine <Figure> ile kullanılır).
//
// Kullanım:
//   node scripts/clip.mjs <kaynak-video> <slug>/<ad> <başlangıç> <süre> [genişlik]
//
// Örnek:
//   node scripts/clip.mjs ~/Downloads/trailer.mp4 ponchiqs/hook 0:42 5
//   → public/projects/ponchiqs/hook.mp4  (42. saniyeden 5 sn, 960px genişlik, sessiz)
//
// Gerekli: ffmpeg  →  winget install Gyan.FFmpeg
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [input, target, start, duration, width = "960"] = process.argv.slice(2);
if (!input || !target || !start || !duration) {
  console.error("Usage: node scripts/clip.mjs <input> <slug>/<name> <start mm:ss> <seconds> [width]");
  process.exit(1);
}

const out = path.join("public", "projects", `${target}.mp4`);
fs.mkdirSync(path.dirname(out), { recursive: true });

execFileSync(
  "ffmpeg",
  [
    "-y",
    "-ss", start,
    "-t", duration,
    "-i", input,
    "-an",                                   // ses yok
    "-vf", `scale=${width}:-2,fps=30`,       // genişlik sabit, yükseklik orantılı (çift sayı)
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "26",                            // kalite: 23 daha iyi/büyük, 28 daha küçük
    "-pix_fmt", "yuv420p",                   // Safari/iOS uyumu
    "-movflags", "+faststart",               // yüklenmeden oynamaya başlar
    out,
  ],
  { stdio: "inherit" },
);

const kb = (fs.statSync(out).size / 1024).toFixed(0);
console.log(`\n→ ${out} (${kb} KB)\n<Figure src="/projects/${target}.mp4" caption="..." />`);
