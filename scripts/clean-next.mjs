import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

for (const rel of [".next", path.join("node_modules", ".cache")]) {
  const target = path.join(root, rel);
  try {
    fs.rmSync(target, { recursive: true, force: true });
    console.log("Removed", rel);
  } catch {
    // ignore
  }
}
