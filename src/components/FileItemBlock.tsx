import { FileInfo } from "@/library";
import { HumanSize } from "./HumanSize";
import { DeleteFile } from "./DeleteFile";
import { DownloadFile } from "./DownloadFile";
import { OnUpdateFiles } from "./FileSystemRender";

export function FileItemBlock(props: { file: FileInfo, onUpdateFiles: OnUpdateFiles }) {
  const { file, onUpdateFiles } = props;

  return (<div className="row align-items-center my-2">
    <div className="col-12 col-sm-12 col-md-4 text-ellipsis">
      {/* 文件名 */}
      <span className="me-1"> <i className={`fa-solid fa-${file.isDirectory && "folder"} fa-${file.isFile && "file"}`}></i> </span>
      {file.isDirectory && (<a href={`/files/${file.path}`} className="text-secondary">{file.name}</a>)}
      {file.isFile && <a href={`/api/download?file=${encodeURIComponent(file.path)}&view=1`} className="text-info" target="_blank">{file.name}</a>}
    </div>
    <div className="col-12 col-sm-12 col-md-8">
      <div className="row align-items-center">
        <div className="col">
          <div>{file.isFile ? <HumanSize size={file.size} /> : "-"} {file.ext || "-"}</div>
        </div>
        <div className="col-4 col-sm-4">
          <div><i className="fa fa-clock"></i> {file.ctime}</div>
          <div><i className="fa fa-calendar-days"></i> {file.atime}</div>
        </div>
        <div className="col-4 col-sm-4 text-end">
          <DeleteFile file={file} onSuccess={() => {
            onUpdateFiles(files => {
              const index = files.indexOf(file);
              files.splice(index, 1);
              return files;
            })
          }} />&nbsp;
          <DownloadFile file={file} />
        </div>
      </div>
    </div>
  </div>);
}