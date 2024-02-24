import { join } from "path";
import { execSync } from "child_process";

execSync("npm publish", {
  cwd: join(process.cwd(), ".next/standalone"),
});