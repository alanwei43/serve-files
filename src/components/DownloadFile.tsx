import { FileInfo } from "@/library/listFolderFiles";

export function DownloadFile(props: { file: FileInfo }) {
  const { file } = props;
  const query = new URLSearchParams({
    file: file.path
  }).toString();

  const downloadLink = `/api/download?${query}`;

  if (!file.isFile) {
    return (<></>);
  }

  return (<>
    <a href={downloadLink} target="_blank" className="btn btn-info btn-sm" style={{ color: "white" }}>下载</a>&nbsp;
    <a href={downloadLink + "&view=1"} target="_blank" className="btn btn-info btn-sm" style={{ color: "white" }}>查看</a>
  </>);
}