"use client"

import { FileInfo } from "@/library/listFolderFiles";

export function DeleteFile(props: { file: FileInfo, onSuccess: () => void }) {
  const { file, onSuccess } = props;

  const doDelete = async () => {
    const query = new URLSearchParams({
      file: file.path
    }).toString();
    const request = await fetch("/api/files?" + query, {
      method: "DELETE",
    });
    const success = request.status === 200;
    if (success) {
      onSuccess();
    } else {
      const response = await request.json();
      console.log("文件删除失败: ", response);
    }
    // const response = await request.json();
  };

  return (<span className="btn btn-danger btn-sm" onClick={doDelete}>删除</span>);
}