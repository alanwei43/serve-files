"use client"

import { FileInfo } from "@/library/listFolderFiles";
import { useState } from "react";
import { HumanSize } from "./HumanSize";
import { UploadFile } from "./UploadFile";
import { ParentFolderRender } from "./ParentFolderRender";
import { FilesListContainer } from "./FilesListContainer";
import { FilesListOptions, type FunctionOptions } from "./FilesListOptions";

export function FileSystemRender(props: { files: Array<FileInfo>, folder: string }) {
  const { folder } = props;

  const [options, setOptions] = useState<FunctionOptions>({
    sortType: "Type",
    viewType: "Details"
  });
  const [files, setFiles] = useState(props.files);

  const onUpdateFiles: OnUpdateFiles = (update) => {
    setFiles(update([...files]));
  };

  return (<>
    <div>
      <h3>文件管理系统</h3>
      <UploadFile folder={folder} onUpdateFiles={onUpdateFiles} />
      <ParentFolderRender folder={folder} />
      <FilesListOptions options={options} setOptions={setOptions} />
      <FilesListContainer files={files} onUpdateFiles={onUpdateFiles} options={options} />
      <div>
        {files.length} 个文件, 总共 <HumanSize size={files.filter(f => f.isFile).map(f => f.size).reduce((sum, next) => sum + next, 0)} />
      </div>
    </div>
  </>);
}

export type OnUpdateFiles = {
  (update: (old: Array<FileInfo>) => Array<FileInfo>): void
}
