import { mkdir, cp } from "node:fs/promises";
await mkdir("dist", { recursive: true });
for (const path of [
  "index.html",
  "styles.css",
  "script.js",
  "utils.js",
  "assets",
])
  await cp(path, `dist/${path}`, { recursive: true });
console.log(
  "Static site copied to dist/. No application runtime dependencies.",
);
