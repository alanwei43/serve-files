import { joinWithRootDirectory, writeFile } from "@/library";
import { existsSync } from "node:fs";
import { stat, rm, mkdir } from "node:fs/promises"
import { listFolderFiles } from "@/library/listFolderFiles";
import { sep } from "path";

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

// 上传文件
export async function PUT(request: Request) {
  if (!request.body) {
    return Response.json({}, { status: 400 });
  }
  const body = await request.json() as {
    offset: number,
    folder: string,
    base64: string,
    fileName: string,
  };
  const buf = Buffer.from(body.base64, "base64");
  const dest = joinWithRootDirectory([body.folder || "", body.fileName].join(sep));
  try {
    const len = await writeFile(dest, buf, body.offset);

    return Response.json({
      success: true,
      length: len
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      success: false,
      message: `文件上传失败 ${err}`
    })
  }
}

/**
 * 创建目录
 */
export async function POST(request: Request) {
  const body: { dir: string } = await request.json();
  if (!body.dir) {
    return Response.json({
      success: false,
      message: "目录为空"
    });
  }
  const dest = joinWithRootDirectory(body.dir);
  const result = await mkdir(dest, {
    recursive: true
  });
  return Response.json({
    success: true,
    result: {
      abs: result,
      relative: dest
    }
  });
}