import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST() {
    try {
        const scriptPath = path.join(process.cwd(), '..', 'auto_pinterest_cf_top_bottom_openrouter2-blog.py');
        const pythonPath = 'python'; // or the path to user's python executable

        console.log(`Starting Python script: ${scriptPath}`);

        // Spawn the python process
        const pythonProcess = spawn(pythonPath, [scriptPath], {
            cwd: path.join(process.cwd(), '..'),
            env: { ...process.env } // Pass environment variables
        });

        pythonProcess.stdout.on('data', (data: any) => {
            console.log(`Python STDOUT: ${data}`);
        });

        pythonProcess.stderr.on('data', (data: any) => {
            console.error(`Python STDERR: ${data}`);
        });

        pythonProcess.on('close', (code: any) => {
            console.log(`Python script exited with code ${code}`);
        });

        return NextResponse.json({
            success: true,
            message: 'Image generation job started in background'
        });
    } catch (error: any) {
        console.error('Error starting generation:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
