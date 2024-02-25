import { join } from "path";
export function joinWithRootDirectory(dest?: string) {
  const cwd = process.cwd();
  if (!dest) {
    return cwd;
  }
  const fullPath = join(cwd, dest);
  if (fullPath.startsWith(cwd)) {
    return fullPath;
  }
  // 出现越权操作
  return process.cwd();
}