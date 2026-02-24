"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowRight, Utensils } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CATEGORY_META: Record<string, { emoji: string; desc: string }> = {
    "dinner": { emoji: "🍽️", desc: "Hearty dinner recipes for the whole family" },
    "healthy": { emoji: "🥗", desc: "Nutritious meals that taste incredible" },
    "easy": { emoji: "✨", desc: "Simple recipes anyone can make" },
    "quick-and-easy": { emoji: "⚡", desc: "Ready in 30 minutes or less" },
    "keto": { emoji: "🥑", desc: "Low-carb, keto-friendly dishes" },
    "pasta": { emoji: "🍝", desc: "Comforting pasta recipes for every mood" },
    "family": { emoji: "👨‍👩‍👧‍👦", desc: "Kid-approved meals everyone loves" },
    "low-carb": { emoji: "🥩", desc: "Delicious low-carb options" },
    "shrimp": { emoji: "🦐", desc: "Fresh & flavorful shrimp dishes" },
    "quick": { emoji: "🔥", desc: "Speedy recipes for busy days" },
    "light": { emoji: "🌿", desc: "Light and refreshing meal ideas" },
};

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

export default function CategoryPage() {
    const params = useParams();
    const slug = params.category as string;
    const label = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const meta = CATEGORY_META[slug] || { emoji: "📂", desc: `Browse all ${label} recipes` };

    const [recipes, setRecipes] = useState<RecipeMeta[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/recipes")
            .then(r => r.json())
            .then(data => {
                const all: RecipeMeta[] = data.recipes || [];
                const keyword = slug.replace(/-/g, " ").toLowerCase();
                const keywords = keyword.split(" ");
                const filtered = all.filter(r => {
                    const cat = (r.category || "").toLowerCase();
                    const tags = (r.tags || []).join(" ").toLowerCase();
                    const title = r.title.toLowerCase();
                    return cat === keyword ||
                        cat.includes(keyword) ||
                        tags.includes(keyword) ||
                        keywords.some(k => tags.includes(k) || title.includes(k) || cat.includes(k));
                });
                setRecipes(filtered);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [slug]);

    return (
        <main className="min-h-screen bg-[#FAFAF8]">
            <nav className="fixed top-0 w-full z-50 glass border-b border-black/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-tight">
                        <span className="text-[#E87722]">e</span>hesart
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2A2A2A]/60">
                        <Link href="/" className="hover:text-[#E87722]">Home</Link>
                        <Link href="/recipes" className="hover:text-[#E87722]">Recipes</Link>
                        <Link href="/categories" className="text-[#E87722] font-bold">Categories</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <div className="flex items-center gap-4 mb-2 text-sm text-[#2A2A2A]/40">
                    <Link href="/" className="hover:text-[#E87722]">Home</Link>
                    <span>›</span>
                    <Link href="/categories" className="hover:text-[#E87722]">Categories</Link>
                    <span>›</span>
                    <span className="text-[#2A2A2A]">{label}</span>
                </div>

                <div className="flex items-center gap-4 mb-4 mt-6">
                    <span className="text-4xl">{meta.emoji}</span>
                    <h1 className="text-5xl font-serif font-bold">{label}</h1>
                </div>
                <p className="text-lg text-[#2A2A2A]/50 mb-12">{meta.desc}</p>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-10 h-10 border-4 border-[#E87722]/20 border-t-[#E87722] rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-[#2A2A2A]/40">Loading recipes...</p>
                    </div>
                ) : recipes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recipes.map((recipe, idx) => (
                            <Link key={idx} href={`/recipes/${recipe.slug}`}>
                                <article className="group">
                                    <div className="relative h-[260px] rounded-2xl overflow-hidden mb-4 shadow-md">
                                        <Image src={recipe.image} alt={recipe.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {recipe.difficulty && (
                                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
                                                    recipe.difficulty === 'Medium' ? 'bg-amber-500 text-white' :
                                                        'bg-red-500 text-white'
                                                }`}>{recipe.difficulty}</span>
                                        )}
                                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-white text-[#2A2A2A] px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                View Recipe <ArrowRight size={12} />
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-serif font-bold text-lg group-hover:text-[#E87722] transition-colors mb-1">{recipe.title}</h3>
                                    <p className="text-sm text-[#2A2A2A]/40 line-clamp-2 mb-2">{recipe.description}</p>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-[#2A2A2A]/25 uppercase tracking-wider">
                                        {recipe.totalTime && <span className="flex items-center gap-1"><Clock size={12} /> {recipe.totalTime}</span>}
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-black/5">
                        <span className="text-5xl mb-4 block">{meta.emoji}</span>
                        <h3 className="text-xl font-serif font-bold mb-2">No {label} Recipes Yet</h3>
                        <p className="text-[#2A2A2A]/40 mb-6 text-sm">New recipes are added regularly. Check back soon!</p>
                        <Link href="/recipes" className="text-[#E87722] font-bold text-sm hover:underline flex items-center gap-1 justify-center">
                            Browse All Recipes <ArrowRight size={14} />
                        </Link>
                    </div>
                )}
            </div>

            <footer className="bg-[#2A2A2A] text-white py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="font-serif font-bold"><span className="text-[#E87722]">e</span>hesart</span>
                    <div className="flex gap-6 text-xs text-white/30">
                        <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
                        <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
                    </div>
                    <p className="text-white/20 text-xs">© 2026 ehesart</p>
                </div>
            </footer>
        </main>
    );
}
