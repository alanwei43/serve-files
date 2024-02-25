import { join } from "path";
import { iterateFiles } from "node-io-core";
import { getRootDirectory } from "@/library";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder") as string;
  
  const root = join(getRootDirectory(), folder);
  const files = Array.from(iterateFiles(root)).map(file => ({
    name: file.name,
    isDirectory: file.state.isDirectory(),
    isFile: file.state.isFile(),
    path: file.relativePath,
    size: file.state.size
  }));
  return Response.json(files);
}