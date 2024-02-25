import { FileInfo } from "@/library/listFolderFiles";

export function DownloadFile(props: { file: FileInfo }) {
  const { file } = props;
  const query = new URLSearchParams({
    file: file.path
  }).toString();
  const downloadLink = `/api/download?${query}`;

  return (<> {file.isFile && <a href={downloadLink} target="_blank">下载</a>}</>);
}