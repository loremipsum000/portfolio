'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowUpRight, 
    Layers, 
    Zap, 
    Mail, 
    Globe, 
    Twitter, 
    Github
} from 'lucide-react';
import Image from 'next/image';
import MouseSpotlight from '@/components/MouseSpotlight';
import SystemStatus from '@/components/SystemStatus';
import ThemeSelector from '@/components/ThemeSelector';
import Visualizer from '@/components/Visualizer';
import PersonalInterests from '@/components/PersonalInterests';
import BookFavorites from '@/components/BookFavorites';
import { EXPERIENCE, SKILLS, THEME_RGB_VALUES } from '@/lib/constants';
import Link from 'next/link';

export default function Home() {
    const [activeTheme, setActiveTheme] = useState(0);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Save theme preference
        localStorage.setItem('activeTheme', activeTheme.toString());
    }, [activeTheme]);

    useEffect(() => {
        // Save dark mode preference
        localStorage.setItem('isDark', String(isDark));

        document.documentElement.style.setProperty(
            '--scrollbar-thumb',
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        );
        document.documentElement.style.setProperty(
            '--scrollbar-thumb-hover',
            isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        );
    }, [isDark]);

    useEffect(() => {
        // Load preferences on mount
        const savedThemeIndex = localStorage.getItem('activeTheme');
        const savedIsDark = localStorage.getItem('isDark');

        if (savedThemeIndex) {
            const themeIndex = parseInt(savedThemeIndex, 10);
            if (!isNaN(themeIndex) && THEME_RGB_VALUES[themeIndex]) {
                setActiveTheme(themeIndex);
            }
        }

        if (savedIsDark) {
            setIsDark(savedIsDark === 'true');
        }
    }, []);

    return (
        <div 
            className="min-h-screen font-sans selection:bg-[rgb(var(--theme-rgb))]/30 selection:text-[var(--text-main)] overflow-x-hidden transition-colors duration-500"
            style={{ 
                "--theme-rgb": THEME_RGB_VALUES[activeTheme],
                "--bg-main": isDark ? '#09090b' : '#f4f4f5',
                "--text-main": isDark ? '#e4e4e7' : '#18181b',
                "--text-muted": isDark ? '#a1a1aa' : '#71717a',
                "--panel-bg": isDark ? 'rgba(24, 24, 27, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                "--border-color": isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                "--visualizer-bg": isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-main)'
            } as React.CSSProperties}
        >

            {/* Mouse Spotlight (Behind everything) */}
            <MouseSpotlight themeRgb={THEME_RGB_VALUES[activeTheme]} isDark={isDark} />

            {/* Fixed Background Grid (Behind spotlight) */}
            <div className="fixed inset-0 z-[-1]" style={{
                backgroundImage: isDark 
                    ? "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)"
                    : "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                opacity: isDark ? 0.1 : 0.4
            }}></div>

            <main className="max-w-[1280px] mx-auto relative z-10 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-4 auto-rows-min">
                    
                    {/* 1. HERO (4x2) */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-4 lg:row-span-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-[300px] sm:min-h-[400px]"
                    >
                        <div className="relative z-10">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
                                Dardan <span className="text-[rgb(var(--theme-rgb))] transition-colors duration-500">Berisha</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-[var(--text-muted)] max-w-md font-light leading-relaxed">
                                Senior Product Designer & Multimedia Engineer based in Croatia. 
                                Specializing in <span className="text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] font-medium transition-colors duration-500">Blockchain</span>, Design Systems, and Brand Identity.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 relative z-10">
                            <a href="mailto:hello@lorem-portfolio.com" className="flex items-center gap-2 text-sm font-medium text-[var(--text-main)] hover:text-[rgb(var(--theme-rgb))] transition-colors duration-300">
                                <Mail size={16} /> Get in touch
                            </a>
                            <a href="https://www.behance.net/dardan-berisha" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                                <Globe size={16} /> Behance
                            </a>
                        </div>
                    </motion.section>

                    {/* 2. STATUS (1/2 width on sm, 1/3 on md) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 lg:row-span-2 min-h-[200px] sm:min-h-[300px]"
                    >
                        <SystemStatus isDark={isDark} />
                    </motion.div>

                    {/* 3 & 4. THEME & BEHANCE - Wrapper for sm and lg screens (stacked), separate on md */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden sm:flex md:hidden lg:flex col-span-1 sm:col-span-1 xl:col-span-2 lg:row-span-2 flex-col gap-3 h-full"
                    >
                        {/* 3. THEME */}
                        <div className="flex-1 min-h-[150px] sm:min-h-[180px]">
                            <ThemeSelector currentTheme={activeTheme} setTheme={setActiveTheme} isDark={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
                        </div>
                        {/* 4. BEHANCE */}
                        <a 
                            href="https://www.behance.net/dardan-berisha" 
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-[rgb(var(--theme-rgb))] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:brightness-110 transition-all duration-300 relative overflow-hidden shadow-[0_0_20px_rgba(var(--theme-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--theme-rgb),0.5)] min-h-[150px] sm:min-h-[180px]"
                        >
                            <div className="flex justify-between items-start z-10">
                                <span className="font-mono text-xs opacity-70">UNCATEGORIZED WORK</span>
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                            <div className="z-10">
                                <div className="text-2xl font-semibold">Profile</div>
                                <div className="text-sm text-white/80 mt-1">on Behance</div>
                            </div>
                            <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                        </a>
                    </motion.div>

                    {/* 3. THEME - Separate on md only, hidden on sm and lg (shown in wrapper above) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-1 sm:hidden md:col-span-1 md:flex lg:hidden min-h-[150px] sm:min-h-[180px]"
                    >
                        <ThemeSelector currentTheme={activeTheme} setTheme={setActiveTheme} isDark={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
                    </motion.div>

                    {/* 4. BEHANCE - Separate on md only, hidden on sm and lg (shown in wrapper above) */}
                    <motion.a 
                        href="https://www.behance.net/dardan-berisha" 
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="col-span-1 sm:hidden md:col-span-1 md:flex lg:hidden bg-[rgb(var(--theme-rgb))] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between group hover:brightness-110 transition-all duration-300 relative overflow-hidden shadow-[0_0_20px_rgba(var(--theme-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--theme-rgb),0.5)] min-h-[150px] sm:min-h-[180px]"
                    >
                        <div className="flex justify-between items-start z-10">
                            <span className="font-mono text-xs opacity-70">UNCATEGORIZED WORK</span>
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                        <div className="z-10">
                            <div className="text-2xl font-semibold">Profile</div>
                            <div className="text-sm text-white/80 mt-1">on Behance</div>
                        </div>
                        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}></div>
                    </motion.a>

                    {/* 5. EXPERIENCE (2 columns on lg) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-4 lg:row-span-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 flex flex-col h-[400px] sm:h-[450px] lg:h-auto"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6 flex-shrink-0">
                            <h2 className="text-lg sm:text-xl font-medium text-[var(--text-main)] flex items-center gap-2">
                                <Layers size={18} className="text-[rgb(var(--theme-rgb))] transition-colors duration-500" />
                                Experience
                            </h2>
                            <span className="text-xs font-mono text-[var(--text-muted)] border border-[var(--border-color)] px-2 py-1 rounded group-hover:border-[rgb(var(--theme-rgb))]/30 transition-colors">9+ YEARS</span>
                        </div>

                        {/* Scrollable Container */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                            {EXPERIENCE.map((job, index) => (
                                <Link 
                                    key={index} 
                                    href={`/experience/${job.slug}`}
                                    className="group/item flex flex-col sm:flex-row sm:items-baseline md:flex-row md:items-baseline justify-between gap-1 sm:gap-2 md:gap-4 border-b border-[var(--border-color)] pb-3 last:border-0 last:pb-0 hover:bg-[rgb(var(--theme-rgb))]/10 p-2 -mx-2 rounded-lg transition-colors cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-[var(--text-main)] group-hover/item:text-[rgb(var(--theme-rgb))] transition-colors">{job.role}</span>
                                            <span className="text-[var(--text-muted)] text-sm hidden md:inline">at</span>
                                            <span className="text-[var(--text-muted)] text-sm hidden md:inline group-hover/item:text-[var(--text-main)] transition-colors">{job.company}</span>
                                        </div>
                                        <div className="text-xs text-[var(--text-muted)] mt-1 md:hidden">{job.company}</div>
                                        <div className="text-xs text-[var(--text-muted)] mt-1 max-w-md line-clamp-1">{job.desc}</div>
                                    </div>
                                    <div className="font-mono text-xs text-[var(--text-muted)] whitespace-nowrap bg-[var(--bg-main)]/50 px-2 py-1 rounded">
                                        {job.period}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* 5.5. LATEST SIDE PROJECT (1/2 width on sm, 1 column on md) */}
                    <motion.a 
                        href="https://www.thecolorsynth.xyz/" 
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 lg:row-span-1 rounded-2xl sm:rounded-3xl overflow-hidden group bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 relative min-h-[200px] sm:min-h-[320px] lg:min-h-[280px] xl:min-h-[300px] flex flex-col"
                    >
                        <div className="relative flex-1 overflow-hidden min-h-[120px] sm:min-h-[150px] lg:min-h-[180px]">
                            <Image
                                src="/media/Color-synth-3000-cover.jpg"
                                alt="Color Synth 3000 - Color Palette Synthesizer"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/90 via-[var(--bg-main)]/50 to-transparent"></div>
                        </div>
                        <div className="p-4 sm:p-5 lg:p-6 relative z-10 flex flex-col gap-2 flex-shrink-0">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs text-[var(--text-muted)]">LATEST SIDE PROJECT</span>
                                        <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[rgb(var(--theme-rgb))] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] transition-colors mb-1">
                                        Color Synth 3000
                                    </h3>
                                </div>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                                In homage to the great Dieter Rams - the iconic German industrial designer - I created this skeuomorphic color palette synthesiser.
                            </p>
                        </div>
                    </motion.a>

                    {/* 6. VISUALIZER (1/2 width on sm, 1 column on md) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 lg:row-span-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[280px] xl:min-h-[300px]"
                    >
                        <Visualizer isDark={isDark} />
                    </motion.div>

                    {/* 7. SKILLS / CONNECT (1/2 width on sm, 2 columns on md) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-4 lg:row-span-1 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-[200px] sm:min-h-[400px] lg:min-h-[280px] xl:min-h-[300px]"
                    >
                        <div className="flex flex-col sm:flex-col sm:justify-between sm:h-full lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-4 lg:gap-6">
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4 flex items-center gap-2">
                                    <Zap size={16} className="text-[rgb(var(--theme-rgb))]" />
                                    Skillset
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {SKILLS.map(skill => (
                                        <span key={skill} className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-main)]/50 border border-[var(--border-color)] px-2 py-1 rounded hover:bg-[rgb(var(--theme-rgb))]/20 hover:border-[rgb(var(--theme-rgb))]/30 hover:text-[var(--text-main)] cursor-default transition-all duration-300">
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="text-[11px] font-mono text-[var(--text-muted)] px-2 py-1">+ More</span>
                                </div>
                            </div>
                            <div className="sm:mt-auto lg:mt-0">
                                <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Connect</h3>
                                <div className="flex gap-2">
                                    <a href="https://x.com/Lorem_Ipsum95" target="_blank" rel="noreferrer" className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300"><Twitter size={18} /></a>
                                    <a href="https://github.com/loremipsum000" target="_blank" rel="noreferrer" className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300"><Github size={18} /></a>
                                    <a href="mailto:hello@lorem-portfolio.com" className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300"><Mail size={18} /></a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 8. PERSONAL INTERESTS (1/2 width on sm, 1 column on md) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 lg:row-span-1 xl:row-span-1 min-h-[250px] sm:min-h-[300px] md:min-h-[220px]"
                    >
                        <PersonalInterests />
                    </motion.div>

                    {/* 9. BOOK FAVORITES (Full width on sm, 2 columns on md) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-6 lg:row-span-1 min-h-[250px] sm:min-h-[220px] md:min-h-[220px]"
                    >
                        <BookFavorites />
                    </motion.div>

                    {/* 9. FOOTER (Full Width) */}
                    <footer className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-8 mt-6 sm:mt-8 border-t border-[var(--border-color)] pt-6 sm:pt-8 pb-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-[var(--text-muted)] text-xs sm:text-sm">
                        <div className="flex items-center gap-2 mb-4 md:mb-0">
                            <span className="w-2 h-2 bg-zinc-500 rounded-full"></span>
                            <span className="font-mono text-xs">Based in Croatia / Open to Contracts</span>
                        </div>
                        <div className="font-mono text-xs opacity-50">
                            © 2025 Dardan Berisha. Built with Next.js & Tailwind.
                        </div>
                    </footer>

                </div>
            </main>
        </div>
    );
}

