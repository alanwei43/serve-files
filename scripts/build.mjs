import path from "path";
import { existsSync, copyFileSync, mkdirSync } from "fs";
import { iterateFiles } from "node-io-core";

const list = [{ src: "public", dest: ".next/standalone/public" },
{ src: ".next/static", dest: ".next/standalone/.next/static" },
{ src: "scripts", dest: ".next/standalone/scripts" }];

for (const item of list) {
  if (!existsSync(item.dest)) {
    mkdirSync(item.dest, {
      recursive: true
    });
  }

  Array.from(iterateFiles(path.join(process.cwd(), item.src)))
    .map(file => {
      const dest = path.join(process.cwd(), item.dest, file.relativePath);

      if (file.state.isDirectory() && !existsSync(dest)) {
        mkdirSync(dest);
      }
      if (file.state.isFile()) {
        copyFileSync(file.fullPath, dest);
      }
    })
}
