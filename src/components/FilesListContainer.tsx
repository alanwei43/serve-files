import { FileInfo } from "@/library";
import { OnUpdateFiles } from "./FileSystemRender";
import { FileItemBlock } from "./FileItemBlock";
import type { FunctionOptions } from "./FilesListOptions";
import { useEffect } from "react";

export function FilesListContainer(props: {
  files: FileInfo[],
  onUpdateFiles: OnUpdateFiles,
  options: FunctionOptions
}) {
  const { files, onUpdateFiles, options } = props;

  useEffect(() => {
    // 排序
    const list = (files || []).sort((prev, next) => {
      if (prev.isDirectory && next.isFile) {
        return -1;
      }
      if (prev.isFile && next.isDirectory) {
        return 1;
      }

      return prev.name.localeCompare(next.name);
    });
    onUpdateFiles(() => list);
  }, [files, onUpdateFiles, options.sortType]);

  return (<div>
    {files.map(file => <div key={file.name} style={{ display: "inline-block", border: "1px solid #aaa", margin: "5px", padding: "5px" }}>
      <FileItemBlock file={file} onUpdateFiles={onUpdateFiles} />
    </div>)}
  </div>)
}