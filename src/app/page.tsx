"use client";

import { motion } from "motion/react";
import { Utensils, Zap, Leaf, ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const recipes = [
  {
    title: "Honey Garlic Shrimp",
    tagline: "High Protein & Juicy",
    image: "/images/shrimp.jpg",
    color: "bg-zest",
  },
  {
    title: "Banana Crunch Cheesecake",
    tagline: "Creamy & Decadent",
    image: "/images/cheesecake.jpg",
    color: "bg-orange-400",
  },
  {
    title: "Texas Roadhouse Salmon",
    tagline: "Glazed to Perfection",
    image: "/images/salmon.jpg",
    color: "bg-red-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-charcoal selection:bg-zest selection:text-charcoal">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6 glass">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-basil rounded-full flex items-center justify-center text-zest">
            <Leaf size={24} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">Zest & Basil</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium">
          <Link href="/recipes" className="hover:text-basil transition-colors">Recipes</Link>
          <Link href="#" className="hover:text-basil transition-colors">Categories</Link>
          <Link href="#" className="hover:text-basil transition-colors">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="font-bold text-charcoal/60 hover:text-charcoal transition-colors">
            Login
          </Link>
          <button className="bg-basil text-cream px-6 py-2 rounded-full font-bold hover:bg-basil-light transition-all shadow-lg hover:shadow-basil/20 text-sm md:text-base">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/shrimp.jpg"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-zest text-charcoal px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-widest uppercase">
              The Art of Home Cooking
            </span>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-cream mb-8 leading-tight">
              Elevate Your Daily <br /> <span className="text-zest italic">Flavor Journey</span>
            </h1>
            <p className="text-xl text-cream/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Discover handcrafted recipes where every ingredient tells a story.
              From the zest of fresh citrus to the aromatic touch of basil.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recipes" className="bg-zest text-charcoal px-10 py-4 rounded-full font-bold text-lg hover:bg-zest-dark transition-all flex items-center justify-center gap-2 group">
                Explore Recipes <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-transparent border-2 border-cream text-cream px-10 py-4 rounded-full font-bold text-lg hover:bg-cream hover:text-charcoal transition-all">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Badges */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 hidden lg:flex items-center gap-4 glass p-4 rounded-2xl shadow-xl"
        >
          <div className="w-12 h-12 bg-basil/20 rounded-xl flex items-center justify-center text-basil">
            <Utensils size={24} />
          </div>
          <div>
            <p className="text-sm font-bold">500+ Recipes</p>
            <p className="text-xs opacity-60">Hand-picked selection</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-10 hidden lg:flex items-center gap-4 glass p-4 rounded-2xl shadow-xl"
        >
          <div className="w-12 h-12 bg-zest/20 rounded-xl flex items-center justify-center text-zest-dark">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm font-bold">Weekly Freshness</p>
            <p className="text-xs opacity-60">New recipes every Monday</p>
          </div>
        </motion.div>
      </section>

      {/* Featured section */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Featured Delights</h2>
            <div className="w-24 h-1 bg-zest rounded-full"></div>
          </div>
          <Link href="/recipes" className="text-basil font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
            View All Recipes <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {recipes.map((recipe, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -15 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl"
            >
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              <div className="absolute bottom-0 p-10 w-full text-cream">
                <span className={`inline-block ${recipe.color} text-charcoal px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-tighter`}>
                  {recipe.tagline}
                </span>
                <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">{recipe.title}</h3>
                <div className="overflow-hidden h-0 group-hover:h-12 transition-all duration-300">
                  <button className="flex items-center gap-2 text-zest font-bold">
                    Learn To Cook <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-zest rounded-full flex items-center justify-center text-charcoal">
                <Leaf size={24} />
              </div>
              <span className="text-3xl font-serif font-bold tracking-tight">Zest & Basil</span>
            </div>
            <p className="text-cream/60 max-w-sm mb-8 leading-relaxed">
              We believe that cooking is an art form that brings people together.
              Our mission is to inspire you to create beautiful, delicious meals every single day.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-zest hover:text-charcoal transition-all cursor-pointer">
                <Instagram size={20} />
              </div>
              <div className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-zest hover:text-charcoal transition-all cursor-pointer">
                <Facebook size={20} />
              </div>
              <div className="w-10 h-10 bg-cream/10 rounded-full flex items-center justify-center hover:bg-zest hover:text-charcoal transition-all cursor-pointer">
                <Twitter size={20} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-xl text-zest">Quick Links</h4>
            <ul className="space-y-4 text-cream/60">
              <li className="hover:text-cream cursor-pointer">Privacy Policy</li>
              <li className="hover:text-cream cursor-pointer">Terms of Service</li>
              <li className="hover:text-cream cursor-pointer">Cookie Policy</li>
              <li className="hover:text-cream cursor-pointer">Accessibility</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-xl text-zest">Newsletter</h4>
            <p className="text-cream/60 mb-6 text-sm">Join 10,000+ foodies getting weekly recipes.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-cream/10 rounded-full py-3 px-6 border border-cream/20 focus:outline-none focus:border-zest"
              />
              <button className="absolute right-2 top-1.5 bg-zest text-charcoal p-1.5 rounded-full">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-cream/10 flex flex-col md:row justify-between items-center gap-4 text-cream/40 text-xs">
          <p>© 2026 Zest & Basil Recipes. All rights reserved.</p>
          <p>Handcrafted with passion for the culinary arts.</p>
        </div>
      </footer>
    </main>
  );
}
