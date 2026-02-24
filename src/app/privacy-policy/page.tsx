import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | ehesart",
    description: "Learn how ehesart collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
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

            <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#E87722] font-bold mb-8 hover:underline">
                    <ArrowLeft size={14} /> Back to Home
                </Link>

                <h1 className="text-4xl font-serif font-bold mb-4">Privacy Policy</h1>
                <p className="text-sm text-[#2A2A2A]/40 mb-10">Last updated: February 24, 2026</p>

                <div className="prose prose-lg max-w-none text-[#2A2A2A]/70 leading-relaxed space-y-6">
                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">1. Introduction</h2>
                    <p>Welcome to ehesart (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible way. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">2. Information We Collect</h2>
                    <p><strong>Personal Information:</strong> When you subscribe to our newsletter or contact us, we may collect your name, email address, and any other information you voluntarily provide.</p>
                    <p><strong>Usage Data:</strong> We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits.</p>
                    <p><strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to enhance your experience. See our Cookie Policy for more details.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">3. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide, maintain, and improve our website</li>
                        <li>Send you newsletters and updates (with your consent)</li>
                        <li>Respond to your comments, questions, and requests</li>
                        <li>Monitor and analyze usage and trends to improve your experience</li>
                        <li>Detect, prevent, and address technical issues</li>
                        <li>Serve relevant advertisements through third-party ad networks</li>
                    </ul>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">4. Third-Party Advertising</h2>
                    <p>We use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies and similar technologies to collect information about your visits to this and other websites in order to provide relevant advertisements about goods and services that may interest you.</p>
                    <p>Google, as a third-party vendor, uses cookies to serve ads on our site. Google&apos;s use of the DART cookie enables it to serve ads based on your visit to our site and other sites on the Internet. You may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" className="text-[#E87722] underline" target="_blank" rel="noopener noreferrer">Google ad and content network privacy policy</a>.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">5. Data Sharing</h2>
                    <p>We do not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic information not linked to any personal identification information with our business partners, trusted affiliates, and advertisers.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">6. Data Security</h2>
                    <p>We implement appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">7. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal information. You can unsubscribe from our newsletter at any time by clicking the &quot;unsubscribe&quot; link in any email we send. For other requests, please contact us at the email listed below.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">8. Children&apos;s Privacy</h2>
                    <p>Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">9. Changes to This Policy</h2>
                    <p>We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>

                    <h2 className="text-xl font-serif font-bold text-[#2A2A2A] mt-8">10. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p><strong>Email:</strong> contact@ehesart.com</p>
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
