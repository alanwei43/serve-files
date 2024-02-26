import { existsSync, readFileSync } from "fs";
import { join } from "path";

const AppConfig = {
  _initTime: "",
  port: "",
  root: "",
  cwd: "",
  allowDelete: false
};


export function getAppConfig(): typeof AppConfig {
  if (AppConfig._initTime) {
    return {
      ...AppConfig
    };
  }

  // TODO 增加本地网络IP信息

  AppConfig._initTime = new Date().toLocaleString();
  AppConfig.port = process.env.PORT + "";

  const portFile = join(process.cwd(), AppConfig.port + ".json");

  if (existsSync(portFile)) {
    const value = JSON.parse(readFileSync(portFile, { encoding: "utf-8" })) as typeof AppConfig;
    Object.assign(AppConfig, value);
  }

  AppConfig.cwd = process.cwd();
  AppConfig.root = AppConfig.root || AppConfig.cwd;

  return { ...AppConfig };
}
