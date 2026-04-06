import { NextRequest, NextResponse } from 'next/server';
import { decode } from '@auth/core/jwt';

// NextAuth v5 cookie names (matches defaultCookies() in @auth/core)
function getSessionCookieName(req: NextRequest) {
  const isSecure = req.url.startsWith('https://');
  return isSecure ? '__Secure-authjs.session-token' : 'authjs.session-token';
}

async function getSession(req: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieName = getSessionCookieName(req);
  const token = req.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const payload = await decode({
      token,
      secret,
      salt: cookieName,
    });
    return payload as { sub?: string; role?: string; name?: string; email?: string } | null;
  } catch {
    return null;
  }
}

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSession(req);
  const isAuthenticated = !!session?.sub;
  const role = session?.role;

  // Protect dashboard and builder
  if (
    !isAuthenticated &&
    (pathname.startsWith('/dashboard') || pathname.startsWith('/builder'))
  ) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Protect admin routes — must be authenticated
  if (!isAuthenticated && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Admin routes require ADMIN role
  if (isAuthenticated && pathname.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect logged-in users away from the auth page
  if (isAuthenticated && pathname === '/auth') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/builder/:path*', '/admin/:path*', '/auth'],
};
