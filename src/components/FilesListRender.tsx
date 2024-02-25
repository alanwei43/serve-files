"use client"

import { FileInfo } from "@/library/listFolderFiles";
import { DeleteFile } from "./DeleteFile";
import { useState } from "react";
import { HumanSize } from "./HumanSize";
import { DownloadFile } from "./DownloadFile";
import { UploadFile } from "./UploadFile";
import { ParentFolderRender } from "./ParentFolderRender";

export function FilesListRender(props: { files: Array<FileInfo>, folder: string }) {
  const { folder } = props;
  const [files, setFiles] = useState(props.files);

  const onDeleteSuccess = (file: FileInfo) => {
    const index = files.indexOf(file);
    files.splice(index, 1);
    setFiles([...files]);
  }
  const onUploadSuccess = (file: FileInfo) => {
    files.push(file);
    setFiles([...files]);
  }

  const cellCls = "border p-2";

  return (<>
    <table className="border-collapse border border-slate-400">
      <caption>
        文件管理系统
      </caption>
      <thead>
        <tr>
          <td colSpan={3} className={cellCls}>
            <ParentFolderRender folder={folder} />
          </td>
        </tr>
        <tr>
          <td colSpan={3} className={cellCls}>
            <UploadFile folder={folder} onSuccess={onUploadSuccess} />
          </td>
        </tr>
        <tr>
          <th className={cellCls}>文件</th>
          <th className={cellCls}>大小</th>
          <th className={cellCls}>操作</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (<tr key={file.name} title={`文件路径为 ${file.path}`}>
          <td className={cellCls}>
            {file.isDirectory && (<a href={`/files/${file.path}`}>{file.name}</a>)}
            {file.isFile && <span>{file.name}</span>}
          </td>
          <td className={cellCls}>
            {file.isFile ? <HumanSize size={file.size} /> : "-"}
          </td>
          <td className={cellCls}>
            <DeleteFile file={file} onSuccess={() => onDeleteSuccess(file)} /> &nbsp;
            <DownloadFile file={file} />
          </td>
        </tr>))}
      </tbody>
    </table>
  </>);
}
