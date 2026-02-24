import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | ehesart",
    description: "Important disclaimers about the content on ehesart.",
};

export default function Disclaimer() {
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

                <h1 className="text-4xl font-serif font-bold mb-4">Disclaimer</h1>
                <p className="text-sm text-[#2A2A2A]/40 mb-10">Last updated: February 24, 2026</p>

                <div className="prose prose-lg max-w-none text-[#2A2A2A]/70 leading-relaxed space-y-6">
                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">General Disclaimer</h2>
                    <p>The information provided on ehesart is for general informational and entertainment purposes only. All recipes, cooking tips, and nutritional information are provided in good faith, but we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the website.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Nutritional Information Disclaimer</h2>
                    <p>All nutritional information is provided as an estimate only. Values may vary depending on the specific ingredients and brands used, portion sizes, and preparation methods. This information should not be considered a substitute for professional nutritional advice. Always consult a registered dietitian or healthcare professional for personalized dietary guidance.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Allergen Disclaimer</h2>
                    <p>ehesart recipes may contain or come into contact with common allergens, including but not limited to: wheat, eggs, dairy, soy, tree nuts, peanuts, fish, and shellfish. It is the reader&apos;s responsibility to verify ingredient labels and ensure all ingredients are safe for their consumption.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Affiliate &amp; Advertising Disclaimer</h2>
                    <p>ehesart may contain affiliate links and advertisements. We may earn a commission from qualifying purchases made through affiliate links at no additional cost to you. Advertisements displayed on our website are served by third-party advertising networks and may use cookies. These ads help us provide free content to our readers.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Photography Disclaimer</h2>
                    <p>Food photography and images on ehesart are used for illustrative purposes. Actual results may vary based on ingredients, equipment, and preparation methods.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">Contact</h2>
                    <p>If you have any concerns or questions, please contact us at <strong>contact@ehesart.com</strong>.</p>
                </div>
            </article>

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
