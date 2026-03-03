import { getRecipeBySlug, getAllRecipes } from "@/lib/recipes";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, Flame, ChefHat, ArrowLeft, Leaf, Share2, Bookmark, Printer, Star, Instagram, Facebook, Twitter, Tag, Globe, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const recipe = getRecipeBySlug(slug);
    if (!recipe) return {};

    const keywords = recipe.keywords ? recipe.keywords.split(',').map((k: string) => k.trim()) : recipe.tags;

    return {
        title: `${recipe.title} | ehesart`,
        description: recipe.description,
        keywords: keywords,
        openGraph: {
            title: recipe.title,
            description: recipe.description,
            images: [recipe.image],
            type: 'article',
        },
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
        .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
        .map(l => l.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean);
}

function parseBulletPoints(content: string): string[] {
    return content.split('\n')
        .filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
        .map(l => l.replace(/^[-•*]\s*/, '').trim())
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

/* ── HB Agency Ad Slot Component ────────────────────── */
function AdSlot({ placementId, className = "" }: { placementId: string; className?: string }) {
    return (
        <div className={`text-center ${className}`}>
            <div id={`hbagency_space_${placementId}`} className="min-h-[50px]" />
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
    const whyLove = sections.find(s => s.type.includes("why you"))?.content || '';
    const ingredients = parseList(sections.find(s => s.type.includes('ingredient'))?.content || '');
    const instructions = parseList(sections.find(s => s.type.includes('instruction'))?.content || '');
    const tips = parseList(sections.find(s => s.type.includes('tip'))?.content || '');
    const storage = sections.find(s => s.type.includes('storage'))?.content || '';
    const nutritionSection = sections.find(s => s.type.includes('nutrition'));
    const nutrition = nutritionSection ? parseTable(nutritionSection.content) : [];
    const whyLovePoints = whyLove ? parseBulletPoints(whyLove) : [];

    // Parse keywords
    const keywordList = recipe.keywords
        ? recipe.keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : recipe.tags;

    return (
        <main className="min-h-screen bg-white">
            {/* ─── Nav ─── */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-2xl border-b border-gray-100">
                <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-3">
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tight">
                        <span className="text-[#E87722]">e</span>hesart
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
                        <Link href="/" className="hover:text-[#E87722] transition-colors">Home</Link>
                        <Link href="/recipes" className="hover:text-[#E87722] transition-colors">Recipes</Link>
                        <Link href="/categories" className="hover:text-[#E87722] transition-colors">Categories</Link>
                    </div>
                </div>
            </nav>

            {/* ─── Content + Sidebar Layout ─── */}
            <div className="max-w-6xl mx-auto px-5 pt-20 flex flex-col lg:flex-row gap-10">

                {/* ═══ Main Content ═══ */}
                <article className="flex-1 min-w-0 max-w-3xl">

                    {/* ── Breadcrumb ── */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-6 pt-4">
                        <Link href="/" className="hover:text-[#E87722]">Home</Link>
                        <span>/</span>
                        <Link href="/recipes" className="hover:text-[#E87722]">Recipes</Link>
                        {recipe.category && <><span>/</span><span>{recipe.category}</span></>}
                    </div>

                    {/* ── Title & Meta ── */}
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] leading-tight mb-4">
                        {recipe.title}
                    </h1>

                    <p className="text-gray-500 text-base leading-relaxed mb-5">{recipe.description}</p>

                    {/* ── Author & Date ── */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 bg-[#E87722] rounded-full flex items-center justify-center text-white font-bold text-sm">eh</div>
                        <div>
                            <p className="font-bold text-sm text-[#1A1A1A]">{recipe.author || 'ehesart'}</p>
                            <p className="text-xs text-gray-400">
                                {recipe.date && new Date(recipe.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                {recipe.cuisine && ` · ${recipe.cuisine} Cuisine`}
                            </p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white transition-all"><Share2 size={14} /></button>
                            <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white transition-all"><Bookmark size={14} /></button>
                            <button className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white transition-all"><Printer size={14} /></button>
                        </div>
                    </div>

                    {/* ── Hero Image (clean, no text) ── */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg relative aspect-[4/3]">
                        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" priority />
                    </div>

                    {/* ── Quick Stats ── */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {recipe.prepTime && (
                            <div className="bg-[#f8faf6] rounded-xl p-4 text-center">
                                <Clock size={18} className="mx-auto mb-1 text-[#E87722]" />
                                <p className="text-xs text-gray-400 mb-0.5">Prep</p>
                                <p className="font-bold text-sm text-[#1A1A1A]">{recipe.prepTime}</p>
                            </div>
                        )}
                        {recipe.cookTime && (
                            <div className="bg-[#f8faf6] rounded-xl p-4 text-center">
                                <Flame size={18} className="mx-auto mb-1 text-[#E87722]" />
                                <p className="text-xs text-gray-400 mb-0.5">Cook</p>
                                <p className="font-bold text-sm text-[#1A1A1A]">{recipe.cookTime}</p>
                            </div>
                        )}
                        {recipe.servings && (
                            <div className="bg-[#f8faf6] rounded-xl p-4 text-center">
                                <Users size={18} className="mx-auto mb-1 text-[#E87722]" />
                                <p className="text-xs text-gray-400 mb-0.5">Serves</p>
                                <p className="font-bold text-sm text-[#1A1A1A]">{recipe.servings}</p>
                            </div>
                        )}
                        {recipe.calories && (
                            <div className="bg-[#f8faf6] rounded-xl p-4 text-center">
                                <ChefHat size={18} className="mx-auto mb-1 text-[#E87722]" />
                                <p className="text-xs text-gray-400 mb-0.5">Calories</p>
                                <p className="font-bold text-sm text-[#1A1A1A]">{recipe.calories}</p>
                            </div>
                        )}
                    </div>

                    {/* ── Tags ── */}
                    {recipe.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {recipe.tags.map((tag: string, i: number) => (
                                <span key={i} className="bg-[#E87722]/5 text-[#E87722] px-3 py-1.5 rounded-lg text-xs font-medium">
                                    {tag}
                                </span>
                            ))}
                            {recipe.difficulty && (
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${recipe.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                                    recipe.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                        'bg-red-50 text-red-600'
                                    }`}>{recipe.difficulty}</span>
                            )}
                        </div>
                    )}

                    {/* ── AD: After Tags ── */}
                    <AdSlot placementId="301494" className="mb-8" />

                    {/* ── Intro ── */}
                    <section id="intro" className="mb-10">
                        {intro.split('\n\n').filter(Boolean).map((para, i) => (
                            <p key={i} className="text-gray-600 text-[16px] leading-[1.85] mb-5">
                                {para.trim()}
                            </p>
                        ))}
                    </section>

                    {/* ── Why You'll Love This ── */}
                    {whyLovePoints.length > 0 && (
                        <section className="mb-10 bg-[#f8faf6] rounded-2xl p-8">
                            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
                                <Star size={22} className="text-[#FADA5E]" /> Why You&apos;ll Love This Recipe
                            </h2>
                            <ul className="space-y-3">
                                {whyLovePoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#E87722] shrink-0"></div>
                                        <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1A1A]">$1</strong>') }} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* ── Extra Cooking Image (if available) ── */}
                    {recipe.extraImage && (
                        <div className="mb-10 rounded-2xl overflow-hidden shadow-md relative aspect-[16/10]">
                            <Image src={recipe.extraImage} alt={`Making ${recipe.title}`} fill className="object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/40 to-transparent p-4">
                                <p className="text-white text-sm font-medium">Making {recipe.title}</p>
                            </div>
                        </div>
                    )}

                    {/* ── Ingredients ── */}
                    {ingredients.length > 0 && (
                        <section id="ingredients" className="mb-10">
                            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                                <ChefHat size={22} className="text-[#E87722]" /> Ingredients
                            </h2>
                            <ul className="space-y-3">
                                {ingredients.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 group">
                                        <input type="checkbox" className="mt-1.5 w-4 h-4 rounded border-gray-300 text-[#E87722] focus:ring-[#E87722] cursor-pointer" />
                                        <span className="text-gray-600 text-[15px] leading-relaxed group-has-[:checked]:line-through group-has-[:checked]:text-gray-300 transition-colors"
                                            dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1A1A]">$1</strong>') }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* ── AD: Before Instructions ── */}
                    <AdSlot placementId="301493" className="mb-10" />

                    {/* ── Instructions ── */}
                    {instructions.length > 0 && (
                        <section id="instructions" className="mb-10">
                            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-6 pb-3 border-b border-gray-100 flex items-center gap-2">
                                <Flame size={22} className="text-[#E87722]" /> Instructions
                            </h2>
                            <ol className="space-y-6">
                                {instructions.map((step, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-[#E87722] text-white flex items-center justify-center font-bold text-sm">
                                            {i + 1}
                                        </div>
                                        <p className="flex-1 text-gray-600 text-[15px] leading-[1.85] pt-1"
                                            dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1A1A1A]">$1</strong>') }}
                                        />
                                    </li>
                                ))}
                            </ol>
                        </section>
                    )}

                    {/* ── Pro Tips ── */}
                    {tips.length > 0 && (
                        <section id="tips" className="mb-10">
                            <div className="bg-gradient-to-br from-[#E87722] to-[#C55F10] rounded-2xl p-8 text-white">
                                <h2 className="text-xl font-serif font-bold mb-5 flex items-center gap-2">
                                    <Star size={20} className="text-white" /> Pro Tips
                                </h2>
                                <ul className="space-y-3">
                                    {tips.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
                                            <p className="text-white/80 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {/* ── AD: After Tips ── */}
                    <AdSlot placementId="301494" className="mb-10" />

                    {/* ── Storage ── */}
                    {storage && (
                        <section className="mb-10 bg-amber-50 rounded-2xl p-6 border border-amber-100">
                            <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-2">Storage & Leftovers</h2>
                            <p className="text-gray-600 text-sm leading-relaxed">{storage}</p>
                        </section>
                    )}

                    {/* ── Nutrition ── */}
                    {nutrition.length > 0 && (
                        <section id="nutrition" className="mb-10">
                            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-6 pb-3 border-b border-gray-100">
                                Nutrition Info
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                {nutrition.map((n, i) => (
                                    <div key={i} className="bg-[#f8faf6] rounded-xl p-4 text-center">
                                        <p className="text-xl font-bold text-[#E87722]">{n.amount}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{n.nutrient}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── SEO Keywords (visible as tags for SEO) ── */}
                    {keywordList.length > 0 && (
                        <section className="mb-10 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                                <Tag size={14} className="text-gray-300" />
                                <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Keywords</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {keywordList.map((kw: string, i: number) => (
                                    <span key={i} className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* ── ehesart sign-off ── */}
                    <div className="border-t border-gray-100 pt-8 mb-10">
                        <p className="text-gray-400 italic text-sm leading-relaxed">
                            This recipe was crafted with love by the ehesart kitchen. Tag us on Pinterest if you make it! 🧡
                        </p>
                    </div>
                </article>

                {/* ═══ Sidebar ═══ */}
                <aside className="w-full lg:w-[300px] shrink-0 space-y-6 pt-4">
                    <div className="lg:sticky lg:top-[70px] space-y-6">

                        {/* ── AD: Sidebar Top ── */}
                        <AdSlot placementId="301491" />

                        {/* ── Quick Info Card ── */}
                        <div className="bg-[#f8faf6] rounded-2xl p-6">
                            <h3 className="text-sm font-bold text-[#1A1A1A] mb-4 uppercase tracking-wider">Recipe Details</h3>
                            <div className="space-y-3 text-sm">
                                {recipe.prepTime && <div className="flex justify-between"><span className="text-gray-400">Prep</span><span className="font-bold">{recipe.prepTime}</span></div>}
                                {recipe.cookTime && <div className="flex justify-between"><span className="text-gray-400">Cook</span><span className="font-bold">{recipe.cookTime}</span></div>}
                                {recipe.totalTime && <div className="flex justify-between border-t border-gray-200 pt-3"><span className="text-gray-400">Total</span><span className="font-bold text-[#E87722]">{recipe.totalTime}</span></div>}
                                {recipe.servings && <div className="flex justify-between"><span className="text-gray-400">Servings</span><span className="font-bold">{recipe.servings}</span></div>}
                                {recipe.calories && <div className="flex justify-between"><span className="text-gray-400">Calories</span><span className="font-bold">{recipe.calories}</span></div>}
                                {recipe.difficulty && <div className="flex justify-between"><span className="text-gray-400">Difficulty</span><span className="font-bold">{recipe.difficulty}</span></div>}
                                {recipe.category && <div className="flex justify-between"><span className="text-gray-400">Category</span><span className="font-bold">{recipe.category}</span></div>}
                                {recipe.cuisine && <div className="flex justify-between"><span className="text-gray-400">Cuisine</span><span className="font-bold">{recipe.cuisine}</span></div>}
                            </div>
                        </div>

                        {/* ── Share Card ── */}
                        <div className="bg-[#E87722] rounded-2xl p-6 text-white">
                            <h3 className="text-sm font-bold mb-3">Share This Recipe</h3>
                            <div className="flex gap-2">
                                <button className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#E87722] transition-all"><Facebook size={16} /></button>
                                <button className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#E87722] transition-all"><Twitter size={16} /></button>
                                <button className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#E87722] transition-all"><Instagram size={16} /></button>
                                <button className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-[#E87722] transition-all"><Share2 size={16} /></button>
                            </div>
                        </div>

                        {/* ── AD: Sidebar Bottom ── */}
                        <AdSlot placementId="301493" />

                        {/* ── Newsletter ── */}
                        <div className="bg-[#E87722]/10 rounded-2xl p-6 border border-[#E87722]/15">
                            <h3 className="text-sm font-bold text-[#1A1A1A] mb-1">Get New Recipes Weekly</h3>
                            <p className="text-xs text-gray-400 mb-4">Join our community of food lovers.</p>
                            <input type="email" placeholder="Your email" className="w-full bg-white border border-gray-200 rounded-lg py-2.5 px-3 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#E87722]/20" />
                            <button className="w-full bg-[#E87722] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#D06218] transition-colors">Subscribe</button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* ─── Related Recipes ─── */}
            {related.length > 0 && (
                <section className="border-t border-gray-100 py-16 px-5 mt-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">You Might Also Love</h2>
                            <Link href="/recipes" className="text-sm font-bold text-[#E87722] flex items-center gap-1 hover:underline">
                                All Recipes <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {related.map((r, i) => (
                                <Link key={i} href={`/recipes/${r.slug}`} className="group">
                                    <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-md mb-4">
                                        <Image src={r.image} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <h3 className="font-serif font-bold text-[#1A1A1A] group-hover:text-[#E87722] transition-colors leading-tight mb-1">
                                        {r.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        {r.totalTime && <><Clock size={10} /> {r.totalTime}</>}
                                        {r.difficulty && <> · {r.difficulty}</>}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── AD: Before Footer ── */}
            <div className="max-w-4xl mx-auto px-5 pb-8">
                <AdSlot placementId="301490" />
            </div>

            {/* ─── Footer ─── */}
            <footer className="bg-[#2A2A2A] text-white py-12 px-5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <span className="text-lg font-serif font-bold"><span className="text-[#E87722]">e</span>hesart</span>
                    <div className="flex gap-6 text-sm text-white/40">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                    <p className="text-white/20 text-xs">© 2026 ehesart</p>
                </div>
            </footer>
        </main>
    );
}
