import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import pkg from "../../package.json";
import { getAllInterfaces } from "./getAllInterfaces";

const AppConfig: {
  _initTime: string,
  port: string,
  root: string,
  cwd: string,
  allowDelete: boolean,
  version: string,
  ipList: ReturnType<typeof getAllInterfaces>
} = {
  _initTime: "",
  port: "",
  root: "",
  cwd: "",
  allowDelete: false,
  version: pkg.version,
  ipList: []
};


export function getAppConfig(): typeof AppConfig {
  if (AppConfig._initTime) {
    return {
      ...AppConfig
    };
  }

  AppConfig._initTime = new Date().toLocaleString();
  AppConfig.port = process.env.PORT + "";

  const portFile = join(process.cwd(), AppConfig.port + ".json");

  if (existsSync(portFile)) {
    const value = JSON.parse(readFileSync(portFile, { encoding: "utf-8" })) as typeof AppConfig;
    Object.assign(AppConfig, value);
  }

  AppConfig.cwd = process.cwd();
  AppConfig.root = AppConfig.root || AppConfig.cwd;
  AppConfig.ipList = getAllInterfaces();

  return { ...AppConfig };
}
