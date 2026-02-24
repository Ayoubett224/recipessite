import Link from "next/link";
import { ArrowLeft, ChefHat, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | ehesart",
    description: "Learn about ehesart — your go-to destination for delicious, tested recipes and cooking inspiration.",
};

export default function About() {
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
                        <Link href="/contact" className="hover:text-[#E87722]">Contact</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-5xl font-serif font-bold mb-6">About <span className="text-[#E87722]">e</span>hesart</h1>

                <div className="text-[#2A2A2A]/70 leading-relaxed space-y-6 text-lg mb-16">
                    <p>
                        Welcome to <strong className="text-[#2A2A2A]">ehesart</strong> — a food blog born from genuine love for home cooking and the belief that incredible meals should be accessible to everyone.
                    </p>
                    <p>
                        We create delicious, tested recipes that bring families together. Every recipe on ehesart is carefully crafted with clear instructions, realistic ingredient lists, and honest cooking times. No complicated techniques, no hard-to-find ingredients — just real food that tastes amazing.
                    </p>
                    <p>
                        Whether you&apos;re a beginner learning to cook your first meal or an experienced home chef looking for fresh inspiration, ehesart has something for you. From quick 20-minute dinners to indulgent weekend desserts, we cover every cuisine and craving.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
                        <div className="w-14 h-14 bg-[#E87722]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <ChefHat size={28} className="text-[#E87722]" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2">Tested Recipes</h3>
                        <p className="text-sm text-[#2A2A2A]/50">Every recipe is tested and perfected before it goes live. We only share food we&apos;d serve to our own families.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
                        <div className="w-14 h-14 bg-[#E87722]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Heart size={28} className="text-[#E87722]" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2">Made with Love</h3>
                        <p className="text-sm text-[#2A2A2A]/50">Cooking is an act of love. Our recipes are designed to bring joy and connection to your kitchen.</p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5 text-center">
                        <div className="w-14 h-14 bg-[#E87722]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Users size={28} className="text-[#E87722]" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2">Community First</h3>
                        <p className="text-sm text-[#2A2A2A]/50">Join thousands of food lovers who cook with ehesart recipes every week. Your feedback makes us better.</p>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-[#E87722] to-[#D06218] rounded-2xl p-10 text-center text-white">
                    <h2 className="text-2xl font-serif font-bold mb-3">Ready to Start Cooking?</h2>
                    <p className="text-white/70 mb-6">Browse our collection of recipes and find your next favorite meal.</p>
                    <Link href="/recipes" className="inline-block bg-white text-[#E87722] px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-all">
                        Explore Recipes
                    </Link>
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
