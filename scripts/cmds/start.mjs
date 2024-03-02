import { fork } from "child_process";
import { join, dirname } from "path";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { networkInterfaces } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = join(__dirname, "..", "..");


export const command = "start [port] [dir]"
export const desc = "启动文件服务"
export const builder = {
  allowDelete: {
    required: false,
    type: "boolean",
    desc: "是否允许删除文件或目录"
  }
}
export const handler = function (argv) {
  const { port, dir } = argv;
  if (!port) {
    console.log(`port is required argument`);
    return;
  }

  console.log("Write config to ", join(cwd, port + ".json"));
  const listeners = getAllInterfaces().map(int => `  http://${int.ip}:${port}`).join("\n");
  console.log(`Access URL:\n${listeners}\n`);

  writeFileSync(join(cwd, port + ".json"), JSON.stringify({
    root: dir || cwd,
    _cli_args: argv,
    allowDelete: argv.allowDelete,
  }), { encoding: "utf-8" });

  fork(join(cwd, "server.js"), {
    env: {
      PORT: argv.port
    },
    cwd: cwd
  });
}
function getAllInterfaces() {
  const interfaces = networkInterfaces();
  const ips = [];
  for (const name in interfaces) {
    const list = interfaces[name] || [];
    for (const int of list) {
      if (int.internal) {
        continue;
      }
      ips.push({
        name: name,
        ip: int.address,
      });
    }
  }
  return ips;
}