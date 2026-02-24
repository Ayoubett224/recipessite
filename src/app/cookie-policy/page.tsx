import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | ehesart",
    description: "Learn about how ehesart uses cookies and similar technologies.",
};

export default function CookiePolicy() {
    return (
        <main className="min-h-screen bg-[#FAFAF8]">
            <nav className="fixed top-0 w-full z-50 glass border-b border-black/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <Link href="/" className="text-3xl font-serif font-bold tracking-tight">
                        <span className="text-[#E87722]">e</span>hesart
                    </Link>
                </div>
            </nav>

            <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-4xl font-serif font-bold mb-4">Cookie Policy</h1>
                <p className="text-sm text-[#2A2A2A]/40 mb-10">Last updated: February 24, 2026</p>

                <div className="prose prose-lg max-w-none text-[#2A2A2A]/70 leading-relaxed space-y-6">
                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">What Are Cookies?</h2>
                    <p>Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">How We Use Cookies</h2>
                    <p>ehesart uses cookies for the following purposes:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., navigation, secure areas).</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                        <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track ad campaign performance. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites on the Internet.</li>
                        <li><strong>Functional Cookies:</strong> Remember your preferences and settings to enhance your experience.</li>
                    </ul>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Third-Party Cookies</h2>
                    <p>We use third-party services that may set cookies on your device:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Google AdSense:</strong> Serves personalized ads. <a href="https://policies.google.com/technologies/ads" className="text-[#E87722] underline" target="_blank" rel="noopener noreferrer">Learn more</a></li>
                        <li><strong>Google Analytics:</strong> Tracks website usage. <a href="https://policies.google.com/privacy" className="text-[#E87722] underline" target="_blank" rel="noopener noreferrer">Learn more</a></li>
                    </ul>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Managing Cookies</h2>
                    <p>You can control and manage cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling cookies may affect the functionality of certain parts of our website.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Contact</h2>
                    <p>If you have questions about our use of cookies, please contact us at <strong>contact@ehesart.com</strong>.</p>
                </div>
            </article>

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
