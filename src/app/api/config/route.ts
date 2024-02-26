import { getAppConfig } from "@/library";

export async function GET() {
  const config = getAppConfig();
  return Response.json({
    ...config,
    time: new Date().toLocaleString(),
  }, {
    status: 500
  });
}