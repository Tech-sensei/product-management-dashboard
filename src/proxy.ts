import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Define paths
  const authRoutes = ['/login', '/register', '/forgot-password'];
  const protectedRoutes = ['/overview', '/products', '/orders', '/settings'];

  // 1. If user is logged in (has token) and tries to access auth routes, redirect to overview
  if (token && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  // 2. If user is NOT logged in (no token) and tries to access protected routes, redirect to login
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 3. Root path handling
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/overview', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
