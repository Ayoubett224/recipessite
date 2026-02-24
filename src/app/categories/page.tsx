"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const CATEGORIES = [
    { name: "Dinner", emoji: "🍽️", color: "from-orange-400 to-orange-600", desc: "Hearty dinner recipes for the whole family" },
    { name: "Healthy", emoji: "🥗", color: "from-green-400 to-green-600", desc: "Nutritious meals that taste incredible" },
    { name: "Easy", emoji: "✨", color: "from-blue-400 to-blue-600", desc: "Simple recipes anyone can make" },
    { name: "Quick and easy", emoji: "⚡", color: "from-yellow-400 to-yellow-600", desc: "Ready in 30 minutes or less" },
    { name: "Keto", emoji: "🥑", color: "from-emerald-400 to-emerald-600", desc: "Low-carb, keto-friendly dishes" },
    { name: "Pasta", emoji: "🍝", color: "from-red-400 to-red-600", desc: "Comforting pasta recipes for every mood" },
    { name: "Family", emoji: "👨‍👩‍👧‍👦", color: "from-purple-400 to-purple-600", desc: "Kid-approved meals everyone loves" },
    { name: "Low carb", emoji: "🥩", color: "from-rose-400 to-rose-600", desc: "Delicious low-carb options" },
    { name: "Shrimp", emoji: "🦐", color: "from-pink-400 to-pink-600", desc: "Fresh & flavorful shrimp dishes" },
    { name: "Quick", emoji: "🔥", color: "from-amber-400 to-amber-600", desc: "Speedy recipes for busy days" },
    { name: "Light", emoji: "🌿", color: "from-lime-400 to-lime-600", desc: "Light and refreshing meal ideas" },
];

interface RecipeMeta {
    title: string;
    slug: string;
    image: string;
    category: string;
}

export default function Categories() {
    const [recipes, setRecipes] = useState<RecipeMeta[]>([]);

    useEffect(() => {
        fetch("/api/recipes")
            .then(r => r.json())
            .then(data => setRecipes(data.recipes || []))
            .catch(() => { });
    }, []);

    const getCategoryCount = (name: string) =>
        recipes.filter(r =>
            r.category?.toLowerCase() === name.toLowerCase() ||
            r.title?.toLowerCase().includes(name.toLowerCase().split(" ")[0])
        ).length;

    const getCategoryImage = (name: string) => {
        const match = recipes.find(r =>
            r.category?.toLowerCase() === name.toLowerCase() ||
            r.title?.toLowerCase().includes(name.toLowerCase().split(" ")[0])
        );
        return match?.image;
    };

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
                        <Link href="/about" className="hover:text-[#E87722]">About</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-5xl font-serif font-bold mb-4">Recipe Categories</h1>
                <p className="text-lg text-[#2A2A2A]/50 mb-12 max-w-xl">Find exactly what you&apos;re craving. Browse our recipes organized by category.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((cat, i) => {
                        const count = getCategoryCount(cat.name);
                        const img = getCategoryImage(cat.name);
                        return (
                            <Link
                                key={i}
                                href={`/categories/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                                className="group relative h-[220px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                {img ? (
                                    <Image src={img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{cat.emoji}</span>
                                        <h3 className="text-xl font-serif font-bold">{cat.name}</h3>
                                    </div>
                                    <p className="text-white/60 text-sm">{cat.desc}</p>
                                    {count > 0 && (
                                        <p className="text-xs text-white/40 mt-2 font-bold">{count} recipe{count !== 1 ? 's' : ''}</p>
                                    )}
                                </div>
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight size={16} className="text-white" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
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
