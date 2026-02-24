import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | ehesart",
    description: "Get in touch with the ehesart team. We'd love to hear from you!",
};

export default function Contact() {
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
                        <Link href="/about" className="hover:text-[#E87722]">About</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
                <p className="text-lg text-[#2A2A2A]/50 mb-12">Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
                        <div className="w-12 h-12 bg-[#E87722]/10 rounded-xl flex items-center justify-center mb-4">
                            <Mail size={24} className="text-[#E87722]" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2">Email</h3>
                        <p className="text-sm text-[#2A2A2A]/50 mb-3">For general inquiries, partnerships, and feedback.</p>
                        <a href="mailto:contact@ehesart.com" className="text-[#E87722] font-bold text-sm hover:underline">contact@ehesart.com</a>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-black/5">
                        <div className="w-12 h-12 bg-[#E87722]/10 rounded-xl flex items-center justify-center mb-4">
                            <MessageSquare size={24} className="text-[#E87722]" />
                        </div>
                        <h3 className="font-serif font-bold text-lg mb-2">Social Media</h3>
                        <p className="text-sm text-[#2A2A2A]/50 mb-3">Follow us for daily recipe inspiration and updates.</p>
                        <p className="text-[#E87722] font-bold text-sm">@ehesart on Pinterest</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5">
                    <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-bold text-[#2A2A2A]/60 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 border border-black/10 rounded-xl bg-[#FAFAF8] focus:outline-none focus:border-[#E87722] transition-colors" placeholder="Your name" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[#2A2A2A]/60 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 border border-black/10 rounded-xl bg-[#FAFAF8] focus:outline-none focus:border-[#E87722] transition-colors" placeholder="your@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#2A2A2A]/60 mb-2">Subject</label>
                            <input type="text" className="w-full px-4 py-3 border border-black/10 rounded-xl bg-[#FAFAF8] focus:outline-none focus:border-[#E87722] transition-colors" placeholder="What is this about?" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#2A2A2A]/60 mb-2">Message</label>
                            <textarea rows={5} className="w-full px-4 py-3 border border-black/10 rounded-xl bg-[#FAFAF8] focus:outline-none focus:border-[#E87722] transition-colors resize-none" placeholder="Your message..." />
                        </div>
                        <button type="submit" className="bg-[#E87722] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#D06218] transition-all shadow-lg shadow-[#E87722]/15">
                            Send Message
                        </button>
                    </form>
                </div>
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
