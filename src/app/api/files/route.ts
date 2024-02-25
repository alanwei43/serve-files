import { joinWithRootDirectory } from "@/library";
import { existsSync } from "fs";
import { stat, rm, } from "node:fs/promises"
import { listFolderFiles } from "@/library/listFolderFiles";

// 下载文件
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("file") as string;

  const fullPath = joinWithRootDirectory(folder);
  const info = await stat(fullPath)
  if (info.isDirectory()) {
    const files = await listFolderFiles(folder);
    return Response.json(files, {})
  }
  return Response.json({}, { status: 400 });
}

// 删除文件或目录
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file") as string;
  if (!file) {
    return Response.json({
      message: "file 参数不能为空"
    }, { status: 400 });
  }
  const fullPath = joinWithRootDirectory(file);
  if (!existsSync(fullPath)) {
    return Response.json({
      message: `文件或目录不存在(${fullPath})`
    }, {
      status: 404
    });
  }
  const info = await stat(fullPath);
  if (info.isDirectory() || info.isFile()) {
    await rm(fullPath, {
      recursive: true,
      force: true,
      retryDelay: 300
    });
    return Response.json({ success: true });
  }

  return Response.json({
    message: "invalid type"
  }, {
    status: 400
  });
}
