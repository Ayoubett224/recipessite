import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
    process.env.ADMIN_SECRET || 'zest-basil-super-secret-key-2026'
);

const PROTECTED_PATHS = ['/dashboard'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect dashboard routes
    const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p));
    if (!isProtected) {
        return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        await jwtVerify(token, SECRET);
        return NextResponse.next();
    } catch {
        // Invalid/expired token
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.set('admin_token', '', { maxAge: 0, path: '/' });
        return response;
    }
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
