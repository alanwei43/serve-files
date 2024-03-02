import { getAppConfig } from "@/library";

export function AppConfigRender() {
  const config = getAppConfig();

  return (<div>
    <h3>配置信息</h3>
    <div>
      <div> <span>初始化时间</span> <span>{config._initTime}</span> </div>
      <div> <span>服务器时间</span> <span>{new Date().toLocaleString()}</span> </div>
      <div>
        <span>可访问地址</span>
        <span>
          <ul>
            {config.ipList.map(ip => (<li key={ip.ip}>
              <span>{ip.ip}</span>
            </li>))}
          </ul>
        </span>
      </div>
      <div> <span>端口号</span> <span>{config.port}</span> </div>
      <div> <span>伺服目录</span> <span>{config.root}</span> </div>
      <div> <span>应用目录</span> <span>{config.cwd}</span> </div>
      <div> <span>应用版本</span> <span>{config.version}</span> </div>
    </div>
  </div>);
}