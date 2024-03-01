export function ParentFolderRender(props: { folder: string; }) {
  const { folder } = props;
  return (<>
    <div>
      {folder && <a href={`./`}>返回上级目录</a>}
      <div>
        <span>当前目录: </span><code>/{folder || ""}</code>
      </div>
    </div>
  </>);
}
