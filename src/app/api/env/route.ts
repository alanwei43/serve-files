export async function GET(request: Request) {
  console.log("PORT: ", process.env.PORT);
  return Response.json({});
}