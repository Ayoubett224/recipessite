"use client";

import { motion } from "motion/react";
import { ArrowRight, Clock, ChefHat, Search, TrendingUp, Utensils } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecipeMeta {
  title: string;
  slug: string;
  image: string;
  description: string;
  tags: string[];
  totalTime: string;
  servings: string;
  calories: string;
  difficulty: string;
  category: string;
}

const CATEGORIES = [
  { name: "Dinner", emoji: "🍽️", color: "bg-orange-50 border-orange-200 text-orange-700" },
  { name: "Healthy", emoji: "🥗", color: "bg-green-50 border-green-200 text-green-700" },
  { name: "Easy", emoji: "✨", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { name: "Quick and easy", emoji: "⚡", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { name: "Keto", emoji: "🥑", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
  { name: "Pasta", emoji: "🍝", color: "bg-red-50 border-red-200 text-red-700" },
  { name: "Family", emoji: "👨‍👩‍👧‍👦", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { name: "Low carb", emoji: "🥩", color: "bg-rose-50 border-rose-200 text-rose-700" },
  { name: "Shrimp", emoji: "🦐", color: "bg-pink-50 border-pink-200 text-pink-700" },
  { name: "Quick", emoji: "🔥", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { name: "Light", emoji: "🌿", color: "bg-lime-50 border-lime-200 text-lime-700" },
];

export default function Home() {
  const [recipes, setRecipes] = useState<RecipeMeta[]>([]);

  useEffect(() => {
    fetch("/api/recipes")
      .then(r => r.json())
      .then((data) => setRecipes(data.recipes || []))
      .catch(() => { });
  }, []);

  const featured = recipes.slice(0, 6);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#2A2A2A]">
      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-black/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0">
            <span className="text-3xl font-serif font-bold tracking-tight">
              <span className="text-[#E87722]">e</span>hesart
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2A2A2A]/60">
            <Link href="/" className="text-[#E87722] font-bold">Home</Link>
            <Link href="/recipes" className="hover:text-[#E87722] transition-colors">Recipes</Link>
            <Link href="/categories" className="hover:text-[#E87722] transition-colors">Categories</Link>
            <Link href="/about" className="hover:text-[#E87722] transition-colors">About</Link>
            <Link href="/contact" className="hover:text-[#E87722] transition-colors">Contact</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link href="/recipes" className="hidden sm:flex items-center gap-2 bg-[#E87722] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#D06218] transition-all shadow-lg shadow-[#E87722]/10">
              <Search size={14} /> Browse Recipes
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block bg-[#E87722]/10 text-[#E87722] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                🔥 New Recipes Daily
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
                Cook Something
                <br />
                <span className="text-[#E87722] italic">Incredible</span> Today
              </h1>
              <p className="text-lg text-[#2A2A2A]/50 mb-8 max-w-lg leading-relaxed">
                Discover hundreds of easy, delicious recipes for every occasion.
                From quick weeknight dinners to show-stopping desserts.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/recipes" className="bg-[#E87722] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#D06218] transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#E87722]/20">
                  Explore Recipes <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link href="/categories" className="bg-transparent border-2 border-[#2A2A2A]/10 text-[#2A2A2A] px-8 py-4 rounded-full font-bold text-base hover:bg-[#2A2A2A] hover:text-white transition-all text-center">
                  Categories
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 pt-8 border-t border-black/5">
                <div>
                  <p className="text-2xl font-bold text-[#E87722]">{recipes.length || '100+'}</p>
                  <p className="text-xs text-[#2A2A2A]/40 font-medium">Recipes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#E87722]">{CATEGORIES.length}</p>
                  <p className="text-xs text-[#2A2A2A]/40 font-medium">Categories</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#E87722]">Free</p>
                  <p className="text-xs text-[#2A2A2A]/40 font-medium">Always</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {featured.length >= 4 ? (
                <>
                  <div className="space-y-3">
                    <Link href={`/recipes/${featured[0].slug}`} className="block relative h-[240px] rounded-2xl overflow-hidden group">
                      <Image src={featured[0].image} alt={featured[0].title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">{featured[0].title}</p>
                    </Link>
                    <Link href={`/recipes/${featured[1].slug}`} className="block relative h-[280px] rounded-2xl overflow-hidden group">
                      <Image src={featured[1].image} alt={featured[1].title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">{featured[1].title}</p>
                    </Link>
                  </div>
                  <div className="space-y-3 pt-6">
                    <Link href={`/recipes/${featured[2].slug}`} className="block relative h-[280px] rounded-2xl overflow-hidden group">
                      <Image src={featured[2].image} alt={featured[2].title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">{featured[2].title}</p>
                    </Link>
                    <Link href={`/recipes/${featured[3].slug}`} className="block relative h-[240px] rounded-2xl overflow-hidden group">
                      <Image src={featured[3].image} alt={featured[3].title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">{featured[3].title}</p>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="relative h-[240px] rounded-2xl overflow-hidden">
                      <Image src="/images/shrimp.jpg" alt="Shrimp" fill className="object-cover" />
                    </div>
                    <div className="relative h-[280px] rounded-2xl overflow-hidden">
                      <Image src="/images/cheesecake.jpg" alt="Cheesecake" fill className="object-cover" />
                    </div>
                  </div>
                  <div className="space-y-3 pt-6">
                    <div className="relative h-[280px] rounded-2xl overflow-hidden">
                      <Image src="/images/salmon.jpg" alt="Salmon" fill className="object-cover" />
                    </div>
                    <div className="relative h-[240px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#E87722] to-[#D06218] flex items-center justify-center">
                      <div className="text-center text-white p-6">
                        <p className="text-4xl mb-2">🍳</p>
                        <p className="font-bold text-lg">More recipes coming!</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-12 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">Browse by Category</h2>
            <Link href="/categories" className="text-sm text-[#E87722] font-bold flex items-center gap-1 hover:underline">
              See All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={i}
                href={`/categories/${cat.name.toLowerCase().replace(/ /g, '-')}`}
                className={`category-pill flex items-center gap-2 px-5 py-3 rounded-full border font-medium text-sm whitespace-nowrap ${cat.color}`}
              >
                <span className="text-base">{cat.emoji}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LATEST RECIPES ═══ */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-[#E87722] uppercase tracking-widest mb-2 block">Fresh from the kitchen</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Recipes</h2>
            </div>
            <Link href="/recipes" className="text-[#E87722] font-bold flex items-center gap-2 text-sm hover:translate-x-1 transition-transform">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((recipe, idx) => (
                <Link key={idx} href={`/recipes/${recipe.slug}`}>
                  <article className="group">
                    <div className="relative h-[280px] rounded-2xl overflow-hidden mb-4 shadow-md">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {recipe.difficulty && (
                        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${recipe.difficulty === 'Easy' ? 'bg-emerald-500 text-white' :
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
                    <div className="px-1">
                      {recipe.tags?.length > 0 && (
                        <div className="flex gap-1.5 mb-2">
                          {recipe.tags.slice(0, 2).map((tag: string, ti: number) => (
                            <span key={ti} className="text-[10px] font-bold text-[#E87722] bg-[#E87722]/8 px-2 py-0.5 rounded-full uppercase tracking-wider">{tag}</span>
                          ))}
                        </div>
                      )}
                      <h3 className="font-serif font-bold text-lg text-[#2A2A2A] group-hover:text-[#E87722] transition-colors leading-snug mb-2">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-[#2A2A2A]/40 line-clamp-2 mb-3">{recipe.description}</p>
                      <div className="flex items-center gap-4 text-[10px] font-bold text-[#2A2A2A]/25 uppercase tracking-wider">
                        {recipe.totalTime && <span className="flex items-center gap-1"><Clock size={12} /> {recipe.totalTime}</span>}
                        {recipe.category && <span className="flex items-center gap-1"><Utensils size={12} /> {recipe.category}</span>}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 px-8">
              <div className="w-20 h-20 rounded-full bg-[#E87722]/10 flex items-center justify-center mx-auto mb-6">
                <ChefHat size={32} className="text-[#E87722]" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">No Recipes Yet</h3>
              <p className="text-[#2A2A2A]/40 mb-6 text-sm">Run the Python script to generate your first batch.</p>
              <code className="bg-[#2A2A2A] text-[#E87722] px-4 py-2 rounded-lg text-xs">
                python auto_pinterest_cf_top_bottom_openrouter2-blog.py
              </code>
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#E87722] to-[#D06218]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Never Miss a Recipe</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">Join our community and get new recipes delivered straight to your inbox every week.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/15 backdrop-blur border border-white/20 rounded-full py-3 px-6 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
            />
            <button className="bg-white text-[#E87722] px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#2A2A2A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif font-bold">
                <span className="text-[#E87722]">e</span>hesart
              </span>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm mb-6">
              Your go-to destination for delicious, tested recipes. From simple weeknight meals to show-stopping dishes — we inspire you to cook with confidence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6 text-[#E87722]">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/recipes" className="hover:text-white transition-colors">All Recipes</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-6 text-[#E87722]">Legal</h4>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 text-xs">
          <p>© 2026 ehesart. All rights reserved.</p>
          <p>Handcrafted with ❤️ for food lovers everywhere.</p>
        </div>
      </footer>
    </main>
  );
}
