import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Path to the outputs_flux directory (relative to the project root)
        // The outputs_flux is in the parent directory of zest-basil-site
        const outputsDir = path.join(process.cwd(), '..', 'outputs_flux');

        if (!fs.existsSync(outputsDir)) {
            return NextResponse.json({ recipes: [] });
        }

        const folders = fs.readdirSync(outputsDir);
        const recipes = folders.map(folder => {
            const folderPath = path.join(outputsDir, folder);
            if (!fs.statSync(folderPath).isDirectory()) return null;

            const metaPath = path.join(folderPath, 'meta.txt');
            const coverPath = path.join(folderPath, 'cover.jpg');

            let title = folder.split('-').slice(1).join(' ').toUpperCase();
            let metaContent = "";

            if (fs.existsSync(metaPath)) {
                metaContent = fs.readFileSync(metaPath, 'utf8');
            }

            return {
                id: folder,
                title: title,
                folder: folder,
                hasCover: fs.existsSync(coverPath),
                meta: metaContent,
                createdAt: fs.statSync(folderPath).birthtime
            };
        }).filter(Boolean);

        // Sort by most recent
        recipes.sort((a: any, b: any) => b.createdAt - a.createdAt);

        return NextResponse.json({ recipes });
    } catch (error) {
        console.error('Error reading recipes:', error);
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}
