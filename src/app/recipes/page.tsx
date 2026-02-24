import { getAllRecipes } from "@/lib/recipes";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Flame, ArrowRight, Leaf, ArrowLeft, ChefHat } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "All Recipes | Zest & Basil",
    description: "Browse our entire collection of handcrafted recipes. Easy weeknight dinners, decadent desserts, and everything in between.",
};

export default function RecipesPage() {
    const recipes = getAllRecipes();

    return (
        <main className="min-h-screen bg-[#FFFDF0]">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-[#FFFDF0]/70 backdrop-blur-xl border-b border-[#2D5A27]/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-[#2D5A27] rounded-full flex items-center justify-center text-[#FADA5E]">
                            <Leaf size={24} />
                        </div>
                        <span className="text-2xl font-serif font-bold tracking-tight">Zest & Basil</span>
                    </Link>
                    <div className="hidden md:flex gap-8 font-medium">
                        <Link href="/" className="hover:text-[#2D5A27] transition-colors">Home</Link>
                        <Link href="/recipes" className="text-[#2D5A27] font-bold">Recipes</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors hidden sm:block">Login</Link>
                        <Link href="/" className="bg-[#2D5A27] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#4A7C44] transition-all">
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#2D5A27] font-bold mb-6 hover:underline">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1A1A] mb-6">
                        All <span className="text-[#2D5A27] italic">Recipes</span>
                    </h1>
                    <p className="text-xl text-[#1A1A1A]/50 max-w-2xl mx-auto">
                        Browse our handcrafted collection of {recipes.length} recipes, each one tested and perfected in our kitchen.
                    </p>
                </div>
            </section>

            {/* Recipe Grid */}
            <section className="px-8 pb-24 max-w-7xl mx-auto">
                {recipes.length === 0 ? (
                    <div className="text-center py-32 px-8">
                        <div className="w-24 h-24 rounded-full bg-[#2D5A27]/10 flex items-center justify-center mx-auto mb-8">
                            <Flame size={40} className="text-[#2D5A27]" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold mb-4">No Recipes Yet</h2>
                        <p className="text-[#1A1A1A]/50 max-w-md mx-auto mb-8">
                            Run the Python automation script to generate your first batch of recipes and blog posts.
                        </p>
                        <code className="bg-[#1A1A1A] text-[#FADA5E] px-6 py-3 rounded-2xl text-sm inline-block">
                            python auto_pinterest_cf_top_bottom_openrouter2-blog.py
                        </code>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {recipes.map((recipe, idx) => (
                            <Link key={idx} href={`/recipes/${recipe.slug}`}>
                                <article className="group cursor-pointer">
                                    <div className="relative h-[320px] rounded-[28px] overflow-hidden shadow-xl mb-5">
                                        <Image
                                            src={recipe.image}
                                            alt={recipe.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        {recipe.difficulty && (
                                            <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase ${recipe.difficulty === 'Easy' ? 'bg-emerald-400 text-white' :
                                                    recipe.difficulty === 'Medium' ? 'bg-amber-400 text-white' :
                                                        'bg-red-400 text-white'
                                                }`}>
                                                {recipe.difficulty}
                                            </span>
                                        )}
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                                                Read Recipe <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-2">
                                        {recipe.tags && recipe.tags.length > 0 && (
                                            <div className="flex gap-2 mb-3 flex-wrap">
                                                {recipe.tags.slice(0, 3).map((tag: string, ti: number) => (
                                                    <span key={ti} className="text-[10px] font-bold uppercase tracking-widest text-[#2D5A27] bg-[#2D5A27]/10 px-2.5 py-1 rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2D5A27] transition-colors leading-tight">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-sm text-[#1A1A1A]/50 mb-4 line-clamp-2">{recipe.description}</p>
                                        <div className="flex items-center gap-5 text-xs font-bold text-[#1A1A1A]/30 uppercase tracking-wider">
                                            {recipe.totalTime && (
                                                <span className="flex items-center gap-1.5"><Clock size={14} /> {recipe.totalTime}</span>
                                            )}
                                            {recipe.servings && (
                                                <span className="flex items-center gap-1.5"><Users size={14} /> {recipe.servings} servings</span>
                                            )}
                                            {recipe.calories && (
                                                <span className="flex items-center gap-1.5"><Flame size={14} /> {recipe.calories} cal</span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-[#1A1A1A] text-white py-12 px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#FADA5E] rounded-lg flex items-center justify-center text-[#1A1A1A]">
                            <Leaf size={18} />
                        </div>
                        <span className="text-lg font-serif font-bold">Zest & Basil</span>
                    </Link>
                    <div className="flex gap-6 text-sm text-white/40">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
                        <Link href="/login" className="hover:text-white transition-colors">Admin</Link>
                    </div>
                    <p className="text-white/20 text-xs">© 2026 Zest & Basil</p>
                </div>
            </footer>
        </main>
    );
}
