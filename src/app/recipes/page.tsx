"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

interface RecipeMeta {
    title: string;
    slug: string;
    image: string;
    description: string;
    tags: string[];
    totalTime: string;
    difficulty: string;
    category: string;
}

export default function RecipesPage() {
    const [recipes, setRecipes] = useState<RecipeMeta[]>([]);

    useEffect(() => {
        fetch("/api/recipes")
            .then(r => r.json())
            .then(data => setRecipes(data.recipes || []))
            .catch(() => { });
    }, []);

    return (
        <main className="min-h-screen bg-[#FAFAF8]">
            <nav className="fixed top-0 w-full z-50 glass border-b border-black/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-tight">
                        <span className="text-[#E87722]">e</span>hesart
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2A2A2A]/60">
                        <Link href="/" className="hover:text-[#E87722]">Home</Link>
                        <Link href="/recipes" className="text-[#E87722] font-bold">Recipes</Link>
                        <Link href="/categories" className="hover:text-[#E87722]">Categories</Link>
                        <Link href="/about" className="hover:text-[#E87722]">About</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-5xl font-serif font-bold mb-4">All Recipes</h1>
                <p className="text-lg text-[#2A2A2A]/50 mb-12">
                    {recipes.length > 0 ? `${recipes.length} delicious recipes to explore` : 'Browse our collection of tested, delicious recipes'}
                </p>

                {recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe, idx) => (
                            <Link key={idx} href={`/recipes/${recipe.slug}`}>
                                <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-lg hover:-translate-y-1 transition-all">
                                    <div className="relative h-[240px] overflow-hidden">
                                        <Image src={recipe.image} alt={recipe.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {recipe.difficulty && (
                                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                                                    recipe.difficulty === 'Medium' ? 'bg-amber-500 text-white' :
                                                        'bg-red-500 text-white'
                                                }`}>{recipe.difficulty}</span>
                                        )}
                                        {recipe.category && (
                                            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#E87722] uppercase tracking-wider">
                                                {recipe.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        {recipe.tags?.length > 0 && (
                                            <div className="flex gap-1.5 mb-3 flex-wrap">
                                                {recipe.tags.slice(0, 3).map((tag: string, ti: number) => (
                                                    <span key={ti} className="text-[10px] font-bold text-[#E87722] bg-[#E87722]/8 px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                        <h3 className="font-serif font-bold text-lg text-[#2A2A2A] group-hover:text-[#E87722] transition-colors leading-snug mb-2">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-sm text-[#2A2A2A]/40 line-clamp-2 mb-4">{recipe.description}</p>
                                        <div className="flex items-center justify-between text-[10px] font-bold text-[#2A2A2A]/25 uppercase tracking-wider border-t border-black/5 pt-3">
                                            {recipe.totalTime && <span className="flex items-center gap-1"><Clock size={12} /> {recipe.totalTime}</span>}
                                            <span className="flex items-center gap-1 text-[#E87722]">View <ArrowRight size={12} /></span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-6xl mb-6">🍳</p>
                        <h3 className="text-xl font-serif font-bold mb-2">Recipes Coming Soon</h3>
                        <p className="text-[#2A2A2A]/40 text-sm">Our kitchen is warming up. Check back soon for new recipes!</p>
                    </div>
                )}
            </div>

            <footer className="bg-[#2A2A2A] text-white py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="font-serif font-bold"><span className="text-[#E87722]">e</span>hesart</span>
                    <div className="flex gap-6 text-xs text-white/30">
                        <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
                        <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
                        <Link href="/contact" className="hover:text-white">Contact</Link>
                    </div>
                    <p className="text-white/20 text-xs">© 2026 ehesart</p>
                </div>
            </footer>
        </main>
    );
}
