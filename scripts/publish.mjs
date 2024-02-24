import { join } from "path";
import { exec } from "child_process";

exec("npm publish", {
  cwd: join(process.cwd(), ".next/standalone"),
}, (err, stdout) => {
  err && console.error(err)
  console.log(stdout);
});