"use client"
import { useRef, useState } from "react";
import { HumanSize } from "./utility/HumanSize";
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
    if (isUploading) {
      return;
    }
    setIsUploading(true);
    const appendFiles: FileInfo[] = [];
    for (const file of files) {
      await uploadFile(folder, file, (progress) => {
        const match = selectedFiles.find(f => f.name === file.name);
        if (match) {
          match.progress = progress.blocks.percent;
          setSelectedFiles([...selectedFiles]);
        }
        if (!progress.success) {
          alert("文件上传失败 " + progress.message);
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

  return (<div className="row mb-3">
    <div className="col-12 mb-1 d-none d-lg-block">
      <div className="input-group input-group-sm">
        <input className="form-control"
          type="file"
          ref={input}
          multiple
          onChange={e => onFilesChange(e.target.files)}
          id="file-upload" />
      </div>
    </div>
    {selectedFiles.length > 0 && <div className="col-12 mt-2">
      <ul className="list-group list-group-numbered">
        {selectedFiles.map(file => <li key={file.name}
          className={`list-group-item d-flex justify-content-between align-items-start`}>
          <div className="ms-2 me-auto" style={{ width: "100%" }}>
            <div style={{ fontSize: ".7em" }}>{file.name}<br /><HumanSize size={file.size} /></div>
            <div className="progress" style={{ height: "5px" }}>
              <div className="progress-bar" style={{ width: `${(file.progress * 100).toFixed(2)}%` }}></div>
            </div>
          </div>
          {file.progress === 1
            && <span className="badge text-bg-primary rounded-pill">
              <i className="bi bi-check"></i>
            </span>}
          {file.progress > 0 && file.progress < 1 && <div className="spinner-border spinner-border-sm text-info">
            <span className="visually-hidden">Loading...</span>
          </div>}
        </li>)}
      </ul>
      <div>
        <span className="btn btn-sm btn-primary my-2" onClick={doUpload}>点击上传</span>
      </div>
    </div>}
  </div>)
}
