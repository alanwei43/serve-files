import { open, write, close, appendFileSync, existsSync } from "node:fs";

export async function writeFile(file: string, data: Buffer, offset: number): Promise<number> {
  if (!existsSync(file)) {
    appendFileSync(file, "<empty>", { encoding: "utf-8" });
  }

  return new Promise((resolve, reject) => {
    open(file, "r+", (err, fd) => {
      if (err) {
        reject(err);
        return;
      }
      write(fd, data, 0, data.length, offset, (ex, written) => {
        if (ex) {
          reject(ex);
          return;
        }
        close(fd, () => {
          resolve(written);
        });
      });
    });
  });
}