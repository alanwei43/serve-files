"use client"

import { FileInfo } from "@/library/listFolderFiles";
import { DeleteFile } from "./DeleteFile";
import { CSSProperties, useEffect, useState } from "react";
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
  const headers = ["文件", "大小", "创建时间", "修改时间", "操作"];

  return (<>
    <table className="border-collapse border border-slate-400">
      <caption>
        文件管理系统
      </caption>
      <thead>
        <tr>
          <td colSpan={headers.length} className={cellCls}>
            <ParentFolderRender folder={folder} />
          </td>
        </tr>
        <tr>
          <td colSpan={headers.length} className={cellCls}>
            <UploadFile folder={folder} onSuccess={onUploadSuccess} />
          </td>
        </tr>
        <tr>
          {headers.map(header => (<th key={header} className={cellCls}>{header}</th>))}
        </tr>
      </thead>
      <tbody>
        {files.map(file => (<tr key={file.name} title={`文件路径为 ${file.path}`}>
          <td className={cellCls}>
            <div>
              {file.isDirectory && (<a href={`/files/${file.path}`}>{file.name}</a>)}
              {file.isFile && <span>{file.name}</span>}
            </div>
          </td>
          <td className={cellCls}>
            {file.isFile ? <HumanSize size={file.size} /> : "-"}
          </td>
          <td className={cellCls}>{file.ctime}</td>
          <td className={cellCls}>{file.atime}</td>
          <td className={cellCls}>
            <DeleteFile file={file} onSuccess={() => onDeleteSuccess(file)} />
            <DownloadFile file={file} />
          </td>
        </tr>))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={headers.length} className={cellCls}>
            {files.length} 个文件, 总共 <HumanSize size={files.filter(f => f.isFile).map(f => f.size).reduce((sum, next) => sum + next, 0)} />
          </td>
        </tr>
      </tfoot>
    </table>
  </>);
}
