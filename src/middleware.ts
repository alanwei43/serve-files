import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // console.log(`${request.method} ${request.url}`);
}

// See "Matching Paths" below to learn more
export const config = {
}