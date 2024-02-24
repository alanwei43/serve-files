import { fork } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cwd = join(__dirname, "..", "..");


export const command = 'start <port>'
export const desc = "start a files service"
export const builder = {}
export const handler = function (argv) {
  const { port } = argv;
  if (!port) {
    console.log(`port is required argument`);
    return;
  }

  fork(join(cwd, "server.js"), {
    env: {
      PORT: argv.port
    },
    cwd: cwd
  });
}