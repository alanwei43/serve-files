"use client"
import { useRef, useState } from "react";
import { HumanSize } from "./HumanSize";
import { FileInfo } from "@/library";
import { OnUpdateFiles } from "./FileSystemRender";
import { uploadFile } from "../library/uploadFile";

export function UploadFile(props: { folder: string, onUpdateFiles: OnUpdateFiles }) {
  const { folder, onUpdateFiles } = props;
  const [selectedFiles, setSelectedFiles] = useState<Array<{ name: string, size: number, progress: number }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const doUpload = async () => {
    if (!input.current) {
      return;
    }
    const files = input.current.files;
    if (!files || files.length === 0) {
      return;
    }
    setIsUploading(true);
    const appendFiles: FileInfo[] = [];
    for (const file of files) {
      await uploadFile(folder, file, (progress) => {
        const match = selectedFiles.find(f => f.name === file.name);
        if (match) {
          match.progress = progress.blocks.percent;
        }
      });
      appendFiles.push({
        name: file.name,
        size: file.size,
        isDirectory: false,
        isFile: true,
        path: [folder, file.name].join("/"),
        atime: new Date().toLocaleString(),
        ctime: new Date().toLocaleString(),
        ext: file.name.split(".").slice(-1).join("")
      });
    }
    onUpdateFiles(old => {
      return [...old, ...appendFiles];
    });
    setIsUploading(false);
  }

  const onFilesChange = (files: FileList | null) => {
    if (!files) {
      setSelectedFiles([]);
      return;
    }
    const list = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      progress: 0
    }));
    setSelectedFiles(list);
  }

  return (<div>
    <div>
      <label className="form-label">选择文件：
        <input className="form-control form-control-sm" type="file" ref={input} multiple onChange={e => onFilesChange(e.target.files)} />
      </label>
    </div>
    {selectedFiles.length > 0 && <div>
      <span>文件列表: </span>
      <ul className="list-group">
        {selectedFiles.map(file => <li key={file.name} className={`list-group-item ${file.progress === 1 && 'active'}`}>
          <span>{file.name}</span>
          <div style={{ float: "right" }}>
            <HumanSize size={file.size} />
          </div>
        </li>)}
      </ul>
      <button disabled={isUploading}
        style={{ margin: "10px 0" }}
        className="btn btn-primary btn-sm btn-xs"
        onClick={doUpload}>开始上传</button>
    </div>}
  </div>)
}
