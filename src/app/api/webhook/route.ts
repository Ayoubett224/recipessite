import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('--- PYTHON WEBHOOK RECEIVED ---');
        console.log('Recipe:', data.title);
        console.log('Status:', data.status);
        console.log('------------------------------');

        // Here you could send a WebSocket message to the UI or update a DB
        // For now, we just acknowledge it.

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
