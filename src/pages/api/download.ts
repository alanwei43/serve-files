import { joinWithRootDirectory } from "@/library";
import { NextApiRequest, NextApiResponse } from "next";
import { stat } from "node:fs/promises";
import { createReadStream } from "fs";
import { basename } from "path";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const file = req.query.file as string;
  const fullPath = joinWithRootDirectory(file);
  const info = await stat(fullPath)
  if (info.isFile()) {
    const data = createReadStream(fullPath, {});
    res.setHeader("content-disposition", `attachment; filename="${encodeURIComponent(basename(file))}"`);
    data.pipe(res);
    return;
  }
  res.status(400)
    .json({
      message: "invalid file parameter"
    });
}
