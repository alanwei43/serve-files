import { sep } from "node:path";
import { FileSystemRender } from "@/components/FileSystemRender";
import { listFolderFiles } from "@/library/listFolderFiles";
import { AppConfigRender } from "@/components/AppConfigRender";

export default async function Page({ params }: { params: { slug?: Array<string> } }) {
  const folder = (params.slug || []).map(pathSep => {
    try {
      return pathSep.includes("%") ? decodeURIComponent(pathSep) : pathSep;
    } catch (err) {
      return pathSep;
    }
  }).join(sep);
  const files = await listFolderFiles(folder);

  return <div className="container-fluid">
    <AppConfigRender />
    <hr />
    <FileSystemRender
      files={files}
      folder={folder} />
  </div>;
}