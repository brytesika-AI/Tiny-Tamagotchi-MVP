import { cp, mkdir, rm } from "node:fs/promises";

const output = ".deploy";
const paths = [
  "assets",
  "src",
  "specs",
  "index.html",
  "styles.css",
  "README.md"
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const path of paths) {
  await cp(path, `${output}/${path}`, { recursive: true });
}

console.log(`Prepared Cloudflare Pages assets in ${output}`);
