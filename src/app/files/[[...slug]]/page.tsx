import { sep } from "node:path";
import { FileSystemRender } from "@/components/FileSystemRender";
import { listFolderFiles } from "@/library/listFolderFiles";
import { AppConfigRender } from "@/components/AppConfigRender";
import { FloatQuickFunctions } from "@/components/FloatQuickFunctions/index";

export default async function Page({ params }: { params: { slug?: Array<string> } }) {
  const folder = (params.slug || []).map(pathSep => {
    try {
      return pathSep.includes("%") ? decodeURIComponent(pathSep) : pathSep;
    } catch (err) {
      return pathSep;
    }
  }).join(sep);
  const files = await listFolderFiles(folder);

  return <>
    <FloatQuickFunctions appConfig={<AppConfigRender />} />
    <FileSystemRender
      files={files}
      folder={folder} />
  </>;
}