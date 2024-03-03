import { useState } from "react";
import { OnUpdateFiles } from "./FileSystemRender";

export function ParentFolderRender(props: { folder: string, updateFiles: OnUpdateFiles }) {
  const { folder, updateFiles } = props;
  const [dir, setDir] = useState("");
  const createFolder = async () => {
    if (!dir) {
      return;
    }
    const fullPath = [folder, dir].join("/");
    const request = await fetch("/api/files", {
      method: "POST",
      body: JSON.stringify({
        dir: fullPath
      })
    });
    const response: { success: boolean } = await request.json();
    if (response.success) {
      updateFiles(files => {
        files.unshift({
          "name": dir,
          isDirectory: true,
          isFile: false,
          path: fullPath,
          size: 0,
          ext: "",
          atime: new Date().toLocaleString(),
          ctime: new Date().toLocaleString()
        });
        return files;
      });
    }
  };

  return (<>
    <div className="row">
      <div className="col-6 col-md-10">
        <span className="pe-2">当前目录</span><code>/{folder || ""}</code>
      </div>
      {folder && <div className="col-6 col-md-2 text-end">
        <a className="btn btn-success btn-sm" href={`./`}>返回上级目录</a>
      </div>}
      <div className="col-12 input-group input-group-sm my-1">
        <input type="text" className="form-control" placeholder="输入目录名称" value={dir} onChange={e => setDir(e.target.value)} />
        <button className="btn btn-success" onClick={createFolder}>点击创建</button>
      </div>
    </div>
  </>);
}
