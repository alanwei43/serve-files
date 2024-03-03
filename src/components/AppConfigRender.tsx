import { getAppConfig } from "@/library";

export function AppConfigRender() {
  const config = getAppConfig();
  const info = [
    { name: "初始化时间", value: config._initTime },
    { name: "服务器时间", value: new Date().toLocaleString() },
    { name: "端口号", value: config.port },
    { name: "伺服目录", value: config.root },
    { name: "应用目录", value: config.cwd },
    { name: "应用版本", value: config.version },
    { name: "访问地址", value: config.ipList.map(item => item.ip).join(", ") },
  ];
  return (<div>
    <div className="card">
      <div className="card-header">
        配置信息
        <span className="text-info text-sm" style={{ float: "right" }}>查看</span>
      </div>
      <div className="card-body">
        {info.map(item => (<div key={item.name} className="row mb-1 justify-content-start">
          <div className="col-4 col-sm-3 col-md-2">{item.name}</div>
          <div className="col-auto"> {item.value} </div>
        </div>))}
        <div className="row text-info">
          <span className="col-4 col-sm-3 col-md-2">View Port:</span>
          <span className="col show-on-xs">Mobile</span>
          <span className="col show-on-sm">Landscape</span>
          <span className="col show-on-md">Tablets</span>
          <span className="col show-on-lg">Desktop</span>
          <span className="col show-on-xl">Extral large</span>
          <span className="col show-on-xxl">Double extral lage</span>
        </div>
      </div>
    </div>
  </div>);
}