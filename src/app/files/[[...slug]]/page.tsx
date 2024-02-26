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

  return <div style={{ padding: "5px 10px" }}>
    {/* <div style={{ float: "right" }}>
      <div>查看配置信息</div>
      <div>运行目录: /data</div>
      <div>启动时间: xoxxxx</div>
    </div> */}
    <FilesListRender
      files={files}
      folder={folder} />
  </div>;
}