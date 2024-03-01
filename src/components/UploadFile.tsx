"use client"
import { useRef, useState } from "react";
import { HumanSize } from "./HumanSize";
import { FileInfo } from "@/library";
import { OnUpdateFiles } from "./FileSystemRender";

export function UploadFile(props: { folder: string, onUpdateFiles: OnUpdateFiles }) {
  const { folder, onUpdateFiles } = props;
  const [files, setFiles] = useState<Array<{ name: string, size: number }>>([]);
  const input = useRef<HTMLInputElement>(null);

  const doUpload = async () => {
    if (!input.current) {
      return;
    }
    const files = input.current.files;
    if (!files || files.length === 0) {
      return;
    }
    const appendFiles: FileInfo[] = [];
    for (const file of files) {
      await uploadFile(folder, file);
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
    })
  }

  const onFilesChange = (files: FileList | null) => {
    if (!files) {
      setFiles([]);
      return;
    }
    const list = Array.from(files).map(file => ({
      name: file.name,
      size: file.size
    }));
    setFiles(list);
  }

  return (<div>
    <label>
      <span>选择文件：</span>
      <input type="file" ref={input} multiple onChange={e => onFilesChange(e.target.files)} />
    </label>
    {files.length > 0 && <div>
      <span>文件列表: </span>
      <ul>
        {files.map(file => <li key={file.name}>
          <span>{file.name}</span>
          <div style={{ float: "right" }}>
            <HumanSize size={file.size} />
          </div>
        </li>)}
      </ul>
    </div>}
    <button onClick={doUpload}>开始上传</button>
  </div>)
}

async function uploadFile(folder: string, file: File) {
  const blocks = splitFile(file);
  for (const block of blocks) {
    const base64 = await readAsBase64(block.buffer);

    const request = await fetch("/api/files", {
      method: "PUT",
      body: JSON.stringify({
        ...block,
        fileName: file.name,
        base64: base64,
        folder: folder
      })
    });
    const json = await request.json();
    console.log("response: ", json);
  }
}


function splitFile(file: File) {
  const BLOCK_SIZE = 50 * 1024;
  const blocksCount = Math.ceil(file.size / BLOCK_SIZE); // 分块数量
  const blocks: Array<{ offset: number, buffer: Blob, index: number }> = []; // 每块数据
  for (let index = 0; index < blocksCount; index++) {
    const offset = index * BLOCK_SIZE;
    blocks.push({
      offset: offset,
      buffer: file.slice(offset, offset + BLOCK_SIZE),
      index: index
    });
  }
  return blocks;
}

function readAsBase64(data: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve((reader.result as string).split(";base64,")[1]);
    reader.onerror = err => reject(err);
  })
}