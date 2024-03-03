import { FileInfo } from "./listFolderFiles";

export function sortByType(files: Array<FileInfo>) {
  files.sort((prev, next) => {
    if (prev.isDirectory && next.isFile) {
      return -1;
    }
    if (prev.isFile && next.isDirectory) {
      return 1;
    }

    return prev.name.localeCompare(next.name);
  });
  return files;
}