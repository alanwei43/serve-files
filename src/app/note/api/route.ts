import { NextRequest } from "next/server";

const notes:Array<{
  content: string
}> = [];

// https://nextjs.org/docs/app/api-reference/file-conventions/route
export async function GET(request: NextRequest, context: { params: unknown }) {
  return Response.json(notes);
}

// export async function HEAD(request: NextRequest) { } 

export async function POST(request: NextRequest) { 
  const note = await request.json();
  notes.push(note);
  return Response.json(note);
} 

// export async function PUT(request: NextRequest) { } 

// export async function DELETE(request: NextRequest) { } 

// export async function PATCH(request: NextRequest) { } 

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler. 
export async function OPTIONS(request: NextRequest) { }

export const dynamic: 'auto' | 'force-dynamic' | 'error' | 'force-static' = "auto"; 