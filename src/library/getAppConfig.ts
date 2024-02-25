import { existsSync, readFileSync, appendFileSync } from "fs";
import { join } from "path";

const AppConfig = {
  port: "",
  root: "",
  cwd: ""
};


export function getAppConfig(): typeof AppConfig {
  if (AppConfig.port) {
    return {
      ...AppConfig
    };
  }
  if (!AppConfig.port) {
    AppConfig.port = process.env.PORT + "";

    const portFile = join(process.cwd(), AppConfig.port + ".json");

    if (existsSync(portFile)) {
      const value = JSON.parse(readFileSync(portFile, { encoding: "utf-8" })) as typeof AppConfig;
      appendFileSync("./log", `配置文件 ${portFile} 内容 ${JSON.stringify(value)}\n`);
      AppConfig.root = value.root;
    }

    AppConfig.cwd = process.cwd();
    AppConfig.root = AppConfig.root || AppConfig.cwd;
  }

  return { ...AppConfig };
}
