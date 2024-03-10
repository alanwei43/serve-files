"use client"

import { FileInfo } from "@/library/listFolderFiles";
import { useState } from "react";
import { HumanSize } from "./utility/HumanSize";
import { UploadFile } from "./UploadFile";
import { ParentFolderRender } from "./ParentFolderRender";
import { FilesListContainer } from "./FilesListContainer";
import { FilesListOptions, type FunctionOptions } from "./FilesListOptions";
import { sortByType } from "@/library/sort";

export function FileSystemRender(props: { files: Array<FileInfo>, folder: string }) {
  const { folder } = props;

  const [options, setOptions] = useState<FunctionOptions>({
    sortType: "Type",
    viewType: "Details"
  });
  const [files, setFiles] = useState(sortByType(props.files));

  const onUpdateFiles: OnUpdateFiles = (update) => {
    setFiles(update([...files]));
  };

  return (<>
    <div>
      <h4>文件管理</h4>
      <UploadFile folder={folder} onUpdateFiles={onUpdateFiles} />
      <ParentFolderRender folder={folder} updateFiles={onUpdateFiles} />
      <FilesListOptions options={options} setOptions={setOptions} />
      <FilesListContainer files={files} onUpdateFiles={onUpdateFiles} options={options} />
      <hr />
      <div className="row">
        <div className="col">
          {files.filter(f => f.isDirectory).length} 个目录, {files.filter(f => f.isFile).length} 个文件, 总共 <HumanSize size={files.filter(f => f.isFile).map(f => f.size).reduce((sum, next) => sum + next, 0)} />
        </div>
      </div>
    </div>
  </>);
}

export type OnUpdateFiles = {
  (update: (old: Array<FileInfo>) => Array<FileInfo>): void
}
