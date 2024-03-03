import { joinWithRootDirectory } from "@/library";
import { NextApiRequest, NextApiResponse } from "next";
import { stat } from "node:fs/promises";
import { createReadStream } from "fs";
import { basename } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = req.query.file as string;
  const view = req.query.view === "1";

  const fullPath = joinWithRootDirectory(file);
  const info = await stat(fullPath)
  if (info.isFile()) {
    // 下载/查看 文件
    const data = createReadStream(fullPath, {});
    if (!view) {
      res.setHeader("content-disposition", `attachment; filename="${encodeURIComponent(basename(file))}"`);
    }
    data.pipe(res);
    return;
  }
  res.status(400)
    .json({
      message: "invalid file parameter"
    });
}
