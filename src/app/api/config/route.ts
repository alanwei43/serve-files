import { getAppConfig } from "@/library";

export async function GET() {
  const config = getAppConfig();
  return Response.json({
    ...config,
    time: new Date().toLocaleString(),
    // env: process.env
  }, {
    status: 500
  });
}