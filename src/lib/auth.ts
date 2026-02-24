import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
    process.env.ADMIN_SECRET || 'zest-basil-super-secret-key-2026'
);

const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'zestbasil2026';

export async function createToken(username: string): Promise<string> {
    return new SignJWT({ username, role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .setIssuedAt()
        .sign(SECRET);
}

export async function verifyToken(token: string): Promise<boolean> {
    try {
        await jwtVerify(token, SECRET);
        return true;
    } catch {
        return false;
    }
}

export function validateCredentials(username: string, password: string): boolean {
    return username === ADMIN_USER && password === ADMIN_PASS;
}
