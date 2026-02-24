"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Leaf, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push("/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch {
            setError("Connection error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FFFDF0] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#2D5A27]/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-[#FADA5E]/15 rounded-full blur-[100px]"></div>
            <div className="absolute top-[40%] right-[20%] w-[200px] h-[200px] bg-[#2D5A27]/3 rounded-full blur-[80px]"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-[440px] z-10"
            >
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-14 h-14 bg-[#2D5A27] rounded-2xl flex items-center justify-center text-[#FADA5E] shadow-xl shadow-[#2D5A27]/20 group-hover:rotate-6 transition-transform">
                            <Leaf size={32} />
                        </div>
                        <span className="text-3xl font-serif font-bold tracking-tight text-[#1A1A1A]">Zest & Basil</span>
                    </Link>
                    <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-2">Admin Access</h1>
                    <p className="text-[#1A1A1A]/40 text-sm">Sign in to manage your recipe empire</p>
                </div>

                {/* Card */}
                <div className="bg-white/60 backdrop-blur-2xl p-10 rounded-[36px] shadow-2xl shadow-[#2D5A27]/5 border border-white/50">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-medium"
                        >
                            <AlertCircle size={18} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-[#1A1A1A]/50 mb-2 ml-1 uppercase tracking-widest">Username</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin"
                                    className="w-full bg-[#F8F9F4] border border-[#1A1A1A]/5 rounded-2xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27]/30 transition-all text-[#1A1A1A] placeholder:text-[#1A1A1A]/20"
                                />
                                <Mail className="absolute left-4 top-4 text-[#1A1A1A]/20" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#1A1A1A]/50 mb-2 ml-1 uppercase tracking-widest">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#F8F9F4] border border-[#1A1A1A]/5 rounded-2xl py-4 px-12 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]/20 focus:border-[#2D5A27]/30 transition-all text-[#1A1A1A] placeholder:text-[#1A1A1A]/20"
                                />
                                <Lock className="absolute left-4 top-4 text-[#1A1A1A]/20" size={20} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2D5A27] text-[#FFFDF0] py-4 rounded-2xl font-bold text-lg hover:bg-[#4A7C44] transition-all shadow-xl shadow-[#2D5A27]/20 flex items-center justify-center gap-2 group disabled:opacity-50 mt-8"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-8 text-[#1A1A1A]/30 text-xs">
                    Secured with JWT authentication · HttpOnly cookies
                </p>
            </motion.div>
        </main>
    );
}
