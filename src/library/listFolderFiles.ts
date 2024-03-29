import { join } from "path";
import { iterateFiles } from "node-io-core";
import { joinWithRootDirectory } from "./joinWithRootDirectory";

export async function listFolderFiles(folder?: string) {
  const relativeRoot = folder || "";
  const absRoot = joinWithRootDirectory(relativeRoot);

  const files = Array.from(iterateFiles(absRoot, {
    "deep": 1
  }))
    .map(file => ({
      name: file.name,
      isDirectory: file.state.isDirectory(),
      isFile: file.state.isFile(),
      path: join(relativeRoot, file.relativePath),
      size: file.state.size,
      ext: file.ext,
      atime: file.state.atime.toLocaleString(),
      ctime: file.state.ctime.toLocaleString()
    }));
  return files;
}

export type FileInfo = ReturnType<typeof listFolderFiles> extends Promise<Array<infer T>> ? T : never

