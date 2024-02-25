import { fork } from "child_process";
import { join, dirname } from "path";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = join(__dirname, "..", "..");


export const command = "start [port] <dir>"
export const desc = "start a files service"
export const builder = {
  port: {
    type: "number",
    required: true,
    desc: "端口号"
  },
  dir: {
    type: "string",
    required: false,
    desc: "伺服的目录"
  }
}
export const handler = function (argv) {
  const { port, dir } = argv;
  if (!port) {
    console.log(`port is required argument`);
    return;
  }

  writeFileSync(join(cwd, port), dir || cwd, { encoding: "utf-8" });

  fork(join(cwd, "server.js"), {
    env: {
      PORT: argv.port
    },
    cwd: cwd
  });
}