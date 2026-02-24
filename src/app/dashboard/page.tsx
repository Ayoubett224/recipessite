"use client";

import { motion } from "motion/react";
import {
    LayoutDashboard,
    BookOpen,
    TrendingUp,
    Settings,
    Bell,
    Plus,
    MoreVertical,
    Clock,
    Eye,
    Share2,
    RefreshCw,
    CheckCircle2,
    LogOut,
    ExternalLink,
    Leaf,
    FileText,
    Image as ImageIcon,
    Globe
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/recipes');
            const data = await res.json();
            setRecipes(data.recipes || []);
        } catch (err) {
            console.error("Failed to fetch recipes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleGenerate = async () => {
        try {
            setGenerating(true);
            setMessage("🚀 Starting Python pipeline (images + blog + results)...");
            const res = await fetch('/api/generate', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
                setMessage("✅ Pipeline started! New recipes will appear shortly.");
                setTimeout(fetchRecipes, 15000);
            } else {
                setMessage("❌ Error: " + data.error);
            }
        } catch {
            setMessage("❌ Connection failed");
        } finally {
            setTimeout(() => {
                setGenerating(false);
                setMessage("");
            }, 8000);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8F9F4] flex">
            {/* ─── Sidebar ─── */}
            <aside className="w-72 bg-[#1A1A1A] text-[#FFFDF0] flex flex-col p-6 fixed h-full z-20">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-10 h-10 bg-[#FADA5E] rounded-xl flex items-center justify-center text-[#1A1A1A] shadow-lg shadow-[#FADA5E]/10">
                        <Leaf size={24} />
                    </div>
                    <div>
                        <span className="text-lg font-serif font-bold tracking-tight block">Zest & Basil</span>
                        <span className="text-[10px] text-[#FFFDF0]/30 font-bold uppercase tracking-[0.2em]">Admin Panel</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <NavItem icon={LayoutDashboard} label="Overview" active />
                    <NavItem icon={BookOpen} label="Recipes" />
                    <NavItem icon={FileText} label="Blog Posts" />
                    <NavItem icon={Share2} label="Pinterest" />
                    <NavItem icon={TrendingUp} label="Analytics" />
                    <NavItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-auto pt-6 space-y-4">
                    <Link href="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[#FFFDF0]/30 hover:text-[#FFFDF0] hover:bg-[#FFFDF0]/5 transition-all text-sm font-medium cursor-pointer">
                        <Globe size={18} /> View Site <ExternalLink size={12} className="ml-auto opacity-50" />
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-red-400/60 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm font-medium"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ─── Main ─── */}
            <main className="flex-1 ml-72 p-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-1">Dashboard</h1>
                        <p className="text-[#1A1A1A]/30 text-sm font-medium">Pipeline: Images → Blog → Pinterest Meta → Results</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={fetchRecipes}
                            className="w-11 h-11 bg-white border border-[#1A1A1A]/5 rounded-2xl flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#2D5A27] transition-all active:scale-95"
                        >
                            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                        </button>
                        <div className="w-11 h-11 bg-white border border-[#1A1A1A]/5 rounded-2xl flex items-center justify-center text-[#1A1A1A]/40 relative cursor-pointer">
                            <Bell size={18} />
                            {recipes.length > 0 && <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#2D5A27] rounded-full border-2 border-white"></div>}
                        </div>
                        <div className="w-11 h-11 rounded-2xl bg-[#2D5A27] flex items-center justify-center text-white font-bold text-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Status Message */}
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-[#2D5A27] text-white rounded-2xl flex items-center gap-3 font-medium text-sm shadow-lg shadow-[#2D5A27]/15"
                    >
                        {message}
                    </motion.div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard label="Total Recipes" value={recipes.length.toString()} icon={BookOpen} color="bg-[#2D5A27]" />
                    <StatCard label="Blog Posts" value={recipes.length.toString()} icon={FileText} color="bg-[#FADA5E]" textColor="text-[#1A1A1A]" />
                    <StatCard label="Pinterest Ready" value={recipes.filter(r => r.hasCover).length.toString()} icon={ImageIcon} color="bg-orange-500" />
                    <StatCard label="Results Files" value={recipes.length.toString()} icon={CheckCircle2} color="bg-emerald-500" />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recipes List */}
                    <div className="lg:col-span-2 bg-white rounded-[32px] border border-[#1A1A1A]/5 p-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">Generated Recipes</h2>
                                <p className="text-xs text-[#1A1A1A]/30 mt-1 font-medium">From outputs_flux/ directory</p>
                            </div>
                            <button
                                onClick={handleGenerate}
                                disabled={generating}
                                className="bg-[#2D5A27] text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-[#4A7C44] transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-[#2D5A27]/15"
                            >
                                {generating ? <RefreshCw className="animate-spin" size={16} /> : <Plus size={16} />}
                                Run Pipeline
                            </button>
                        </div>

                        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                            {loading && recipes.length === 0 ? (
                                <div className="text-center py-20 opacity-20">
                                    <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
                                    <p className="font-bold text-sm">Syncing...</p>
                                </div>
                            ) : recipes.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-[#2D5A27]/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <BookOpen size={28} className="text-[#2D5A27]/30" />
                                    </div>
                                    <p className="font-bold text-[#1A1A1A]/30 text-sm mb-2">No recipes yet</p>
                                    <p className="text-[#1A1A1A]/15 text-xs">Click &quot;Run Pipeline&quot; to generate your first batch</p>
                                </div>
                            ) : (
                                recipes.map((recipe, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="flex items-center gap-5 p-4 rounded-2xl hover:bg-[#F8F9F4] transition-all border border-transparent hover:border-[#1A1A1A]/5 group"
                                    >
                                        <div className="w-16 h-16 relative rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform bg-[#1A1A1A]/5 shrink-0">
                                            {recipe.hasCover ? (
                                                <img
                                                    src={`/api/images?folder=${recipe.folder}`}
                                                    alt={recipe.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#1A1A1A]/15">
                                                    <BookOpen size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-serif font-bold text-[#1A1A1A] mb-1 truncate">{recipe.title}</h4>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-[#1A1A1A]/25 uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><Clock size={10} /> {new Date(recipe.createdAt).toLocaleDateString()}</span>
                                                {recipe.hasCover && <span className="flex items-center gap-1 text-[#2D5A27]"><CheckCircle2 size={10} /> Ready</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <Link
                                                href={`/recipes/${recipe.folder.replace(/^\d+-/, '')}`}
                                                target="_blank"
                                                className="w-9 h-9 rounded-xl bg-[#2D5A27]/5 flex items-center justify-center text-[#2D5A27]/50 hover:bg-[#2D5A27] hover:text-white transition-all"
                                                title="View Blog"
                                            >
                                                <Eye size={14} />
                                            </Link>
                                            <button className="w-9 h-9 rounded-xl bg-[#1A1A1A]/5 flex items-center justify-center text-[#1A1A1A]/20 hover:text-[#1A1A1A]/60 transition-all">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6">
                        {/* Pipeline Status */}
                        <div className="bg-[#2D5A27] p-8 rounded-[32px] text-white relative overflow-hidden">
                            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-serif font-bold mb-3">Full Pipeline</h3>
                                <p className="text-white/50 text-sm leading-relaxed mb-6">
                                    Each run generates: cover images, blog articles, Pinterest meta, and results.txt files.
                                </p>
                                <div className="space-y-3">
                                    <PipelineStep num="1" label="FLUX Image Gen" />
                                    <PipelineStep num="2" label="Pinterest Meta" />
                                    <PipelineStep num="3" label="Blog Article" />
                                    <PipelineStep num="4" label="Results.txt" />
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-[32px] border border-[#1A1A1A]/5 p-8">
                            <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-5">Quick Links</h3>
                            <div className="space-y-3">
                                <Link href="/recipes" target="_blank" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F9F4] transition-all text-sm font-medium text-[#1A1A1A]/60 hover:text-[#2D5A27]">
                                    <span className="flex items-center gap-2"><Globe size={16} /> View All Recipes</span>
                                    <ExternalLink size={14} />
                                </Link>
                                <Link href="/" target="_blank" className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F9F4] transition-all text-sm font-medium text-[#1A1A1A]/60 hover:text-[#2D5A27]">
                                    <span className="flex items-center gap-2"><Leaf size={16} /> Homepage</span>
                                    <ExternalLink size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="bg-white rounded-[32px] border border-[#1A1A1A]/5 p-8 text-center">
                            <div className="flex items-center justify-center gap-2 text-[#2D5A27] font-bold text-xs uppercase tracking-[0.15em]">
                                <div className="w-2 h-2 bg-[#2D5A27] rounded-full animate-pulse"></div>
                                System Online
                            </div>
                            <p className="text-[10px] text-[#1A1A1A]/15 mt-2 font-medium">Connected to local Python engine</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ icon: Icon, label, active = false }: any) {
    return (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-medium text-sm
      ${active ? 'bg-[#FADA5E] text-[#1A1A1A] font-bold shadow-lg shadow-[#FADA5E]/10' : 'text-[#FFFDF0]/30 hover:text-[#FFFDF0] hover:bg-[#FFFDF0]/5'}`}>
            <Icon size={18} className={active ? 'text-[#1A1A1A]' : 'text-[#FFFDF0]/20'} />
            {label}
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color, textColor = "text-white" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[28px] border border-[#1A1A1A]/5"
        >
            <div className="flex justify-between items-start mb-5">
                <div className={`${color} p-3 rounded-xl ${textColor} shadow-lg`}>
                    <Icon size={20} />
                </div>
            </div>
            <p className="text-[#1A1A1A]/30 font-bold text-[10px] uppercase tracking-[0.15em] mb-1">{label}</p>
            <h3 className="text-3xl font-serif font-bold text-[#1A1A1A]">{value}</h3>
        </motion.div>
    );
}

function PipelineStep({ num, label }: { num: string; label: string }) {
    return (
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur px-4 py-2.5 rounded-xl border border-white/5">
            <div className="w-6 h-6 bg-[#FADA5E] text-[#1A1A1A] rounded-lg flex items-center justify-center text-xs font-bold">{num}</div>
            <span className="text-white/70 text-sm font-medium">{label}</span>
            <CheckCircle2 size={14} className="ml-auto text-[#FADA5E]" />
        </div>
    );
}
