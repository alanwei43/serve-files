import { FilesListRender } from "@/components/FilesListRender";
import { listFolderFiles } from "@/library/listFolderFiles";
import { sep } from "path";

export default async function Page({ params }: { params: { slug?: Array<string> } }) {
  const folder = (params.slug || []).map(pathSep => {
    try {
      return pathSep.includes("%") ? decodeURIComponent(pathSep) : pathSep;
    } catch (err) {
      return pathSep;
    }
  }).join(sep);
  const files = await listFolderFiles(folder);

  return <div className="md:container md:mx-auto">
    <FilesListRender
      files={files}
      folder={folder} />
  </div>;
}