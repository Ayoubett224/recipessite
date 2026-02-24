import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    const filename = searchParams.get('file') || 'cover.jpg';

    if (!folder) {
        return new NextResponse('Missing folder parameter', { status: 400 });
    }

    const filePath = path.join(process.cwd(), '..', 'outputs_flux', folder, filename);

    if (!fs.existsSync(filePath)) {
        return new NextResponse('File not found', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
        },
    });
}
