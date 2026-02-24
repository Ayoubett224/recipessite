import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | ehesart",
    description: "Read the terms and conditions for using the ehesart website.",
};

export default function TermsOfService() {
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
                    </div>
                </div>
            </nav>

            <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-4xl font-serif font-bold mb-4">Terms of Service</h1>
                <p className="text-sm text-[#2A2A2A]/40 mb-10">Last updated: February 24, 2026</p>

                <div className="prose prose-lg max-w-none text-[#2A2A2A]/70 leading-relaxed space-y-6">
                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">1. Acceptance of Terms</h2>
                    <p>By accessing and using ehesart (&quot;the Website&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">2. Use of Content</h2>
                    <p>All content on this website, including but not limited to recipes, images, text, graphics, and logos, is the property of ehesart and is protected by copyright laws. You may:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>View and print content for personal, non-commercial use</li>
                        <li>Share links to our content on social media</li>
                        <li>Reference our recipes with proper attribution and a link back to our website</li>
                    </ul>
                    <p>You may NOT:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Reproduce, distribute, or republish our content without written permission</li>
                        <li>Use our images or content for commercial purposes</li>
                        <li>Remove any copyright or proprietary notices from our content</li>
                    </ul>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">3. Recipe Disclaimer</h2>
                    <p>The recipes and cooking information provided on ehesart are for informational and entertainment purposes only. We are not licensed nutritionists or dietitians. Nutritional information is provided as an estimate and may vary. Always consult with a qualified healthcare professional before making changes to your diet.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">4. Allergen Warning</h2>
                    <p>Our recipes may contain allergens including but not limited to nuts, dairy, gluten, eggs, shellfish, and soy. It is your responsibility to identify and avoid any allergens that may affect you. ehesart is not liable for any allergic reactions.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">5. Third-Party Links</h2>
                    <p>Our website may contain links to third-party websites. These links are provided for your convenience only. We do not endorse or assume any responsibility for the content or practices of linked websites.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">6. Advertising</h2>
                    <p>ehesart displays third-party advertisements to support the free content we provide. We are not responsible for the content of advertisements or the products/services they promote. Advertisements are clearly distinguished from our editorial content.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">7. User Comments</h2>
                    <p>If we allow user comments in the future, you agree to not post content that is harmful, offensive, defamatory, or violates any laws. We reserve the right to remove any comments at our discretion.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">8. Limitation of Liability</h2>
                    <p>ehesart and its creators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of the website or reliance on any information provided herein.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">9. Modifications</h2>
                    <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes constitutes acceptance of the updated terms.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">10. Contact</h2>
                    <p>For questions about these Terms of Service, contact us at <strong>contact@ehesart.com</strong>.</p>
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
