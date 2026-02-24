import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/recipes';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // Get blog recipes (from content/recipes/*.md)
        const blogRecipes = getAllRecipes();

        // Also get pipeline output folders (for dashboard)
        const outputsDir = path.join(process.cwd(), '..', 'outputs_flux');
        let pipelineRecipes: any[] = [];

        if (fs.existsSync(outputsDir)) {
            const folders = fs.readdirSync(outputsDir);
            pipelineRecipes = folders.map(folder => {
                const folderPath = path.join(outputsDir, folder);
                if (!fs.statSync(folderPath).isDirectory()) return null;

                const metaPath = path.join(folderPath, 'meta.txt');
                const coverPath = path.join(folderPath, 'cover.jpg');

                let title = folder.split('-').slice(1).join(' ').replace(/-/g, ' ');
                title = title.replace(/\b\w/g, c => c.toUpperCase());
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

            pipelineRecipes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }

        return NextResponse.json({
            recipes: blogRecipes,
            pipeline: pipelineRecipes,
            total: blogRecipes.length,
        });
    } catch (error) {
        console.error('Error reading recipes:', error);
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}
