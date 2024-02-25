import { FileInfo } from "@/library/listFolderFiles";

export async function FilesListRender(props: { files: Array<FileInfo>, folder: string }) {
  const { files, folder } = props;

  return (<>
    <table className="table-auto">
      <caption>
        <h3 className="h3">Folder: {folder || "/"} </h3>
      </caption>
      <thead>
        <tr>
          <th>文件</th>
          <th>大小</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {folder && <tr>
          <td>
            <a href="../">返回上级目录</a>
          </td>
          <td></td>
          <td></td>
        </tr>
        }
        {files.map(file => (<tr key={file.name}>
          <td>
            {file.isDirectory && (<a href={`/files/${file.path}`}>{file.name}</a>)}
            {file.isFile && <span>{file.name}</span>}
          </td>
          <td><span>{file.size}</span></td>
          <td></td>
        </tr>))}
      </tbody>
    </table>
  </>);
}