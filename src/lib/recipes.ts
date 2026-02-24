import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'recipes');

export interface RecipeMeta {
    title: string;
    date: string;
    description: string;
    prepTime: string;
    cookTime: string;
    totalTime: string;
    servings: string;
    calories: string;
    difficulty: string;
    tags: string[];
    keywords: string;
    category: string;
    cuisine: string;
    author: string;
    slug: string;
    image: string;
    extraImage: string | null;
}

export interface Recipe extends RecipeMeta {
    content: string;
}

export function getAllRecipes(): RecipeMeta[] {
    if (!fs.existsSync(CONTENT_DIR)) {
        return [];
    }

    const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

    const recipes = files.map(filename => {
        const slug = filename.replace('.md', '');
        const filePath = path.join(CONTENT_DIR, filename);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        // Check if extra cooking image exists
        const extraImagePath = path.join(process.cwd(), 'public', 'recipes', `${slug}-cooking.jpg`);
        const hasExtraImage = fs.existsSync(extraImagePath);

        return {
            title: data.title || slug,
            date: data.date || '',
            description: data.description || '',
            prepTime: data.prepTime || '',
            cookTime: data.cookTime || '',
            totalTime: data.totalTime || '',
            servings: data.servings || '',
            calories: data.calories || '',
            difficulty: data.difficulty || 'Easy',
            tags: data.tags || [],
            keywords: data.keywords || '',
            category: data.category || '',
            cuisine: data.cuisine || '',
            author: data.author || 'Zest & Basil',
            slug,
            image: `/recipes/${slug}.jpg`,
            extraImage: hasExtraImage ? `/recipes/${slug}-cooking.jpg` : null,
        } as RecipeMeta;
    });

    // Sort by date, newest first
    recipes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return recipes;
}

export function getRecipeBySlug(slug: string): Recipe | null {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const extraImagePath = path.join(process.cwd(), 'public', 'recipes', `${slug}-cooking.jpg`);
    const hasExtraImage = fs.existsSync(extraImagePath);

    return {
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        prepTime: data.prepTime || '',
        cookTime: data.cookTime || '',
        totalTime: data.totalTime || '',
        servings: data.servings || '',
        calories: data.calories || '',
        difficulty: data.difficulty || 'Easy',
        tags: data.tags || [],
        keywords: data.keywords || '',
        category: data.category || '',
        cuisine: data.cuisine || '',
        author: data.author || 'Zest & Basil',
        slug,
        image: `/recipes/${slug}.jpg`,
        extraImage: hasExtraImage ? `/recipes/${slug}-cooking.jpg` : null,
        content,
    };
}

export function getAllSlugs(): string[] {
    if (!fs.existsSync(CONTENT_DIR)) {
        return [];
    }
    return fs.readdirSync(CONTENT_DIR)
        .filter(f => f.endsWith('.md'))
        .map(f => f.replace('.md', ''));
}
