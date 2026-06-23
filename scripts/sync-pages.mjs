import { cp, rm, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const publishArtifacts = ["_next", "404.html", "index.html", "favicon.ico", "robots.txt", "sitemap.xml"];

async function copyExport() {
  for (const artifact of publishArtifacts) {
    await rm(path.join(root, artifact), { recursive: true, force: true });
  }

  const entries = await readdir(outDir, { withFileTypes: true });

  for (const entry of entries) {
    const source = path.join(outDir, entry.name);
    const destination = path.join(root, entry.name);
    await cp(source, destination, { recursive: true, force: true });
  }
}

copyExport().catch((error) => {
  console.error("Failed to sync export output:", error);
  process.exit(1);
});
