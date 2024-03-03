export function ParentFolderRender(props: { folder: string; }) {
  const { folder } = props;
  return (<>
    <div className="row">
      <div className="col-6 col-md-10">
        <span className="pe-2">当前目录</span><code>/{folder || ""}</code>
      </div>
      {folder && <div className="col-6 col-md-2 text-end">
        <a className="btn btn-primary btn-sm" href={`./`}>返回上级目录</a>
      </div>}
    </div>
  </>);
}
