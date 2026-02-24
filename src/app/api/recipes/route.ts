import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/recipes';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Get blog recipes (from content/recipes/*.md)
        const blogRecipes = getAllRecipes();

        return NextResponse.json({
            recipes: blogRecipes,
            pipeline: [],
            total: blogRecipes.length,
        });
    } catch (error) {
        console.error('Error reading recipes:', error);
        return NextResponse.json({
            recipes: [],
            pipeline: [],
            total: 0,
            error: 'Failed to fetch recipes'
        }, { status: 200 });
    }
}
