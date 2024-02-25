import { fork } from "child_process";
import { join, dirname } from "path";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = join(__dirname, "..", "..");


export const command = "start [port] [dir]"
export const desc = "启动文件服务"
export const builder = {

}
export const handler = function (argv) {
  const { port, dir } = argv;
  if (!port) {
    console.log(`port is required argument`);
    return;
  }

  console.log("write config: ", join(cwd, port + ".json"));
  writeFileSync(join(cwd, port + ".json"), JSON.stringify({
    root: dir || cwd
  }), { encoding: "utf-8" });

  fork(join(cwd, "server.js"), {
    env: {
      PORT: argv.port
    },
    cwd: cwd
  });
}