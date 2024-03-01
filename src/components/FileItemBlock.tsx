import { FileInfo } from "@/library";
import { HumanSize } from "./HumanSize";
import { DeleteFile } from "./DeleteFile";
import { DownloadFile } from "./DownloadFile";
import { OnUpdateFiles } from "./FileSystemRender";

export function FileItemBlock(props: { file: FileInfo, onUpdateFiles: OnUpdateFiles }) {
  const { file, onUpdateFiles } = props;

  return (<div>
    <div>
      {file.isDirectory && (<a href={`/files/${file.path}`}>{file.name}</a>)}
      {file.isFile && <span>{file.name}</span>}
    </div>
    {file.isFile ? <HumanSize size={file.size} /> : "-"}
    <div>Create at {file.ctime}</div>
    <div>Modify at {file.atime}</div>
    <div>{file.ext || "-"}</div>
    <div>
      <DeleteFile file={file} onSuccess={() => {
        onUpdateFiles(files => {
          const index = files.indexOf(file);
          files.splice(index, 1);
          return files;
        })
      }} />
      <DownloadFile file={file} />
    </div>
  </div>)
}