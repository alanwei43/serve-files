import { join } from "path";
import { getAppConfig } from ".";


export function joinWithRootDirectory(dest?: string) {
  const { root } = getAppConfig();

  if (!dest) {
    return root;
  }
  const fullPath = join(root, dest);
  if (fullPath.startsWith(root)) {
    return fullPath;
  }
  // 出现越权操作
  return root;
}