import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Flame, ChefHat, ArrowLeft, Leaf, Share2, Bookmark, Printer, ArrowRight, Star, Instagram, Facebook, Twitter } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);
    if (!recipe) return {};
    return {
        title: `${recipe.title} | Zest & Basil`,
        description: recipe.description,
    };
}

/* ── Helper: parse markdown sections ────────────────────── */
function parseSections(content: string) {
    const sections: { type: string; content: string }[] = [];
    const lines = content.split('\n');
    let currentSection = '';
    let currentContent: string[] = [];

    for (const line of lines) {
        if (line.startsWith('## ')) {
            if (currentContent.length > 0) {
                sections.push({ type: currentSection, content: currentContent.join('\n').trim() });
            }
            currentSection = line.replace('## ', '').trim().toLowerCase();
            currentContent = [];
        } else if (line.startsWith('---')) {
            // skip hr
        } else if (line.startsWith('*This recipe')) {
            sections.push({ type: 'footer_note', content: line });
        } else {
            currentContent.push(line);
        }
    }
    if (currentContent.length > 0) {
        sections.push({ type: currentSection, content: currentContent.join('\n').trim() });
    }
    return sections;
}

function parseList(content: string): string[] {
    return content.split('\n')
        .filter(l => l.trim().startsWith('-') || l.trim().match(/^\d+\./))
        .map(l => l.replace(/^[-•]\s*/, '').replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean);
}

function parseTable(content: string): { nutrient: string; amount: string }[] {
    return content.split('\n')
        .filter(l => l.includes('|') && !l.includes('---') && !l.toLowerCase().includes('nutrient'))
        .map(l => {
            const cols = l.split('|').map(c => c.trim()).filter(Boolean);
            return { nutrient: cols[0] || '', amount: cols[1] || '' };
        })
        .filter(r => r.nutrient);
}

/* ── Ad Slot Component ────────────────────── */
function AdSlot({ id, className = "" }: { id: string; className?: string }) {
    return (
        <div id={`ad-${id}`} className={`bg-[#F8F9F4] border-2 border-dashed border-[#2D5A27]/10 rounded-3xl p-6 text-center ${className}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/15 mb-1">Advertisement</p>
            <div className="h-[250px] flex items-center justify-center">
                <p className="font-bold text-[#1A1A1A]/10 text-sm">Ad Space · {id}</p>
            </div>
        </div>
    );
}

/* ── Main Page ────────────────────── */
export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);
    if (!recipe) notFound();

    const allRecipes = getAllRecipes();
    const related = allRecipes.filter(r => r.slug !== slug).slice(0, 3);
    const sections = parseSections(recipe.content);
    const intro = sections.find(s => s.type === '')?.content || '';
    const ingredients = parseList(sections.find(s => s.type.includes('ingredient'))?.content || '');
    const instructions = parseList(sections.find(s => s.type.includes('instruction'))?.content || '');
    const tips = parseList(sections.find(s => s.type.includes('tip'))?.content || '');
    const nutritionSection = sections.find(s => s.type.includes('nutrition'));
    const nutrition = nutritionSection ? parseTable(nutritionSection.content) : [];

    return (
        <main className="min-h-screen bg-[#FFFDF0]">
            {/* ─── Nav ─── */}
            <nav className="fixed top-0 w-full z-50 bg-[#FFFDF0]/80 backdrop-blur-2xl border-b border-[#2D5A27]/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 py-4">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#2D5A27] rounded-xl flex items-center justify-center text-[#FADA5E]">
                            <Leaf size={20} />
                        </div>
                        <span className="text-xl font-serif font-bold tracking-tight">Zest & Basil</span>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/recipes" className="hover:text-[#2D5A27] transition-colors">Recipes</Link>
                        <Link href="#" className="hover:text-[#2D5A27] transition-colors">About</Link>
                    </div>
                </div>
            </nav>

            {/* ─── Hero ─── */}
            <section className="relative h-[75vh] min-h-[550px]">
                <Image src={recipe.image} alt={recipe.title} fill className="object-cover" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-14 max-w-5xl mx-auto">
                    <Link href="/recipes" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                        <ArrowLeft size={14} /> Back to recipes
                    </Link>

                    {recipe.tags?.length > 0 && (
                        <div className="flex gap-2 mb-5 flex-wrap">
                            {recipe.tags.map((tag: string, i: number) => (
                                <span key={i} className="bg-[#FADA5E] text-[#1A1A1A] px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-5 leading-[1.1] max-w-4xl">
                        {recipe.title}
                    </h1>
                    <p className="text-base md:text-lg text-white/60 max-w-2xl mb-8 leading-relaxed">{recipe.description}</p>

                    {/* Stats pills */}
                    <div className="flex flex-wrap gap-3">
                        {recipe.prepTime && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-white/80 text-sm font-medium border border-white/5">
                                <Clock size={15} className="text-[#FADA5E]" /> Prep {recipe.prepTime}
                            </div>
                        )}
                        {recipe.cookTime && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-white/80 text-sm font-medium border border-white/5">
                                <Flame size={15} className="text-[#FADA5E]" /> Cook {recipe.cookTime}
                            </div>
                        )}
                        {recipe.servings && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-white/80 text-sm font-medium border border-white/5">
                                <Users size={15} className="text-[#FADA5E]" /> Serves {recipe.servings}
                            </div>
                        )}
                        {recipe.calories && (
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-white/80 text-sm font-medium border border-white/5">
                                <ChefHat size={15} className="text-[#FADA5E]" /> {recipe.calories} cal
                            </div>
                        )}
                        {recipe.difficulty && (
                            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border ${recipe.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/20' :
                                    recipe.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300 border-amber-500/20' :
                                        'bg-red-500/20 text-red-300 border-red-500/20'
                                }`}>
                                <Star size={15} /> {recipe.difficulty}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ─── Sticky Action Bar ─── */}
            <div className="sticky top-[60px] z-40 bg-white/90 backdrop-blur-2xl border-b border-[#2D5A27]/5 shadow-sm">
                <div className="max-w-5xl mx-auto flex justify-between items-center px-6 md:px-8 py-3">
                    <div className="hidden sm:flex items-center gap-6 text-xs font-bold text-[#1A1A1A]/30 uppercase tracking-[0.15em]">
                        <a href="#intro" className="hover:text-[#2D5A27] transition-colors">Intro</a>
                        <a href="#ingredients" className="hover:text-[#2D5A27] transition-colors">Ingredients</a>
                        <a href="#instructions" className="hover:text-[#2D5A27] transition-colors">Steps</a>
                        {tips.length > 0 && <a href="#tips" className="hover:text-[#2D5A27] transition-colors">Tips</a>}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2D5A27]/5 text-[#2D5A27]/50 hover:bg-[#2D5A27] hover:text-white transition-all" title="Share">
                            <Share2 size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2D5A27]/5 text-[#2D5A27]/50 hover:bg-[#2D5A27] hover:text-white transition-all" title="Save">
                            <Bookmark size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#2D5A27]/5 text-[#2D5A27]/50 hover:bg-[#2D5A27] hover:text-white transition-all" title="Print">
                            <Printer size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Content + Sidebar Layout ─── */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 flex flex-col lg:flex-row gap-12">

                {/* Main Content */}
                <article className="flex-1 min-w-0">

                    {/* ── Intro ── */}
                    <section id="intro" className="mb-14">
                        {intro.split('\n\n').filter(Boolean).map((para, i) => (
                            <p key={i} className="text-lg text-[#1A1A1A]/70 leading-[1.9] mb-6 first:text-xl first:text-[#1A1A1A]/80 first:leading-[1.8]">
                                {para.trim()}
                            </p>
                        ))}
                    </section>

                    {/* ── AD SLOT: After Intro ── */}
                    <AdSlot id="after-intro" className="mb-14" />

                    {/* ── Recipe Image (Pinterest cover) ── */}
                    <div className="mb-14 rounded-[32px] overflow-hidden shadow-2xl shadow-[#2D5A27]/10 relative aspect-[9/16] max-h-[700px]">
                        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                    </div>

                    {/* ── Ingredients ── */}
                    {ingredients.length > 0 && (
                        <section id="ingredients" className="mb-14">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#2D5A27] rounded-xl flex items-center justify-center text-[#FADA5E]">
                                    <ChefHat size={22} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Ingredients</h2>
                            </div>
                            <div className="bg-white rounded-[28px] border border-[#2D5A27]/8 shadow-sm p-8">
                                <ul className="space-y-4">
                                    {ingredients.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 group">
                                            <div className="mt-1 w-6 h-6 rounded-lg bg-[#2D5A27]/8 flex items-center justify-center shrink-0 group-hover:bg-[#2D5A27] transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-[#2D5A27] group-hover:bg-white transition-colors"></div>
                                            </div>
                                            <span className="text-[#1A1A1A]/70 text-lg leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* ── AD SLOT: Before Instructions ── */}
                    <AdSlot id="before-instructions" className="mb-14" />

                    {/* ── Instructions ── */}
                    {instructions.length > 0 && (
                        <section id="instructions" className="mb-14">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#FADA5E] rounded-xl flex items-center justify-center text-[#1A1A1A]">
                                    <Flame size={22} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Instructions</h2>
                            </div>
                            <div className="space-y-6">
                                {instructions.map((step, i) => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#2D5A27] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#2D5A27]/15 group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1 bg-white rounded-2xl border border-[#2D5A27]/5 p-6 shadow-sm group-hover:shadow-md transition-shadow">
                                            <p className="text-[#1A1A1A]/70 text-lg leading-relaxed">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Pro Tips ── */}
                    {tips.length > 0 && (
                        <section id="tips" className="mb-14">
                            <div className="bg-gradient-to-br from-[#2D5A27] to-[#1a3a16] rounded-[28px] p-10 text-white shadow-xl shadow-[#2D5A27]/15">
                                <div className="flex items-center gap-3 mb-6">
                                    <Star size={24} className="text-[#FADA5E]" />
                                    <h2 className="text-2xl font-serif font-bold">Pro Tips</h2>
                                </div>
                                <ul className="space-y-4">
                                    {tips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#FADA5E] shrink-0"></div>
                                            <p className="text-white/80 text-base leading-relaxed">{tip}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* ── AD SLOT: After Tips ── */}
                    <AdSlot id="after-tips" className="mb-14" />

                    {/* ── Nutrition ── */}
                    {nutrition.length > 0 && (
                        <section id="nutrition" className="mb-14">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#FADA5E]/30 rounded-xl flex items-center justify-center text-[#2D5A27]">
                                    <Flame size={22} />
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">Nutrition Info</h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {nutrition.map((n, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-[#2D5A27]/8 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-2xl font-bold text-[#2D5A27] mb-1">{n.amount}</p>
                                        <p className="text-xs font-bold text-[#1A1A1A]/30 uppercase tracking-widest">{n.nutrient}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── Zest & Basil sign-off ── */}
                    <div className="border-t border-[#2D5A27]/10 pt-10 mb-14">
                        <p className="text-[#1A1A1A]/40 italic text-base leading-relaxed">
                            This recipe was crafted with love by the Zest & Basil kitchen. Tag us on Pinterest if you make it! 💚
                        </p>
                    </div>
                </article>

                {/* ─── Sidebar ─── */}
                <aside className="w-full lg:w-[340px] shrink-0 space-y-8">
                    {/* Sticky sidebar content */}
                    <div className="lg:sticky lg:top-[130px] space-y-8">

                        {/* ── AD SLOT: Sidebar Top ── */}
                        <AdSlot id="sidebar-top" />

                        {/* ── Quick Info Card ── */}
                        <div className="bg-white rounded-[28px] border border-[#2D5A27]/8 p-7 shadow-sm">
                            <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-5">Quick Info</h3>
                            <div className="space-y-4">
                                {recipe.prepTime && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#1A1A1A]/40 font-medium">Prep Time</span>
                                        <span className="font-bold text-[#1A1A1A]">{recipe.prepTime}</span>
                                    </div>
                                )}
                                {recipe.cookTime && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#1A1A1A]/40 font-medium">Cook Time</span>
                                        <span className="font-bold text-[#1A1A1A]">{recipe.cookTime}</span>
                                    </div>
                                )}
                                {recipe.totalTime && (
                                    <div className="flex justify-between items-center text-sm border-t border-[#2D5A27]/5 pt-4">
                                        <span className="text-[#1A1A1A]/40 font-medium">Total</span>
                                        <span className="font-bold text-[#2D5A27]">{recipe.totalTime}</span>
                                    </div>
                                )}
                                {recipe.servings && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#1A1A1A]/40 font-medium">Servings</span>
                                        <span className="font-bold text-[#1A1A1A]">{recipe.servings}</span>
                                    </div>
                                )}
                                {recipe.calories && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#1A1A1A]/40 font-medium">Calories</span>
                                        <span className="font-bold text-[#1A1A1A]">{recipe.calories}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Share Card ── */}
                        <div className="bg-[#2D5A27] rounded-[28px] p-7 text-white">
                            <h3 className="text-lg font-serif font-bold mb-4">Share This Recipe</h3>
                            <p className="text-white/50 text-sm mb-5">Loved it? Spread the flavor!</p>
                            <div className="flex gap-3">
                                <button className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#FADA5E] hover:text-[#1A1A1A] transition-all">
                                    <Facebook size={18} />
                                </button>
                                <button className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#FADA5E] hover:text-[#1A1A1A] transition-all">
                                    <Twitter size={18} />
                                </button>
                                <button className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#FADA5E] hover:text-[#1A1A1A] transition-all">
                                    <Instagram size={18} />
                                </button>
                                <button className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#FADA5E] hover:text-[#1A1A1A] transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* ── AD SLOT: Sidebar Bottom ── */}
                        <AdSlot id="sidebar-bottom" />

                        {/* ── Newsletter ── */}
                        <div className="bg-[#FADA5E]/20 rounded-[28px] p-7 border border-[#FADA5E]/30">
                            <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Get New Recipes</h3>
                            <p className="text-sm text-[#1A1A1A]/40 mb-5">Weekly inspiration in your inbox.</p>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white border border-[#1A1A1A]/5 rounded-xl py-3 px-4 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20"
                            />
                            <button className="w-full bg-[#2D5A27] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#4A7C44] transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* ─── Related Recipes ─── */}
            {related.length > 0 && (
                <section className="border-t border-[#2D5A27]/5 py-20 px-6 md:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-10">You Might Also Love</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {related.map((r, i) => (
                                <Link key={i} href={`/recipes/${r.slug}`} className="group">
                                    <div className="relative h-[280px] rounded-[28px] overflow-hidden shadow-lg mb-5">
                                        <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent"></div>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#2D5A27] transition-colors leading-tight">
                                        {r.title}
                                    </h3>
                                    {r.totalTime && (
                                        <p className="text-xs text-[#1A1A1A]/30 mt-2 font-bold uppercase tracking-widest flex items-center gap-1">
                                            <Clock size={12} /> {r.totalTime}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── AD SLOT: Before Footer ── */}
            <div className="max-w-5xl mx-auto px-6 md:px-8 pb-10">
                <AdSlot id="before-footer" />
            </div>

            {/* ─── Footer ─── */}
            <footer className="bg-[#1A1A1A] text-white py-16 px-6 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#FADA5E] rounded-xl flex items-center justify-center text-[#1A1A1A]">
                            <Leaf size={20} />
                        </div>
                        <span className="text-xl font-serif font-bold">Zest & Basil</span>
                    </div>
                    <div className="flex gap-8 text-sm text-white/40">
                        <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                    <p className="text-white/20 text-xs">© 2026 Zest & Basil. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
