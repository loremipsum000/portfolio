'use client';

import { Fragment, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowUpRight, 
    Layers, 
    Zap, 
    Mail, 
    Globe, 
    Twitter, 
    Github,
    Wrench
} from 'lucide-react';
import Image from 'next/image';
import MouseSpotlight from '@/components/MouseSpotlight';
import SystemStatus from '@/components/SystemStatus';
import ThemeSelector from '@/components/ThemeSelector';
import Visualizer from '@/components/Visualizer';
import PersonalInterests from '@/components/PersonalInterests';
import BookFavorites from '@/components/BookFavorites';
import FavoriteMemes from '@/components/FavoriteMemes';
import CopyEmailButton from '@/components/CopyEmailButton';
import { EXPERIENCE, SKILLS, TOOLS, LANGUAGES, THEME_RGB_VALUES } from '@/lib/constants';
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
                                Design Engineer based in Croatia.
                                Experienced in <span className="text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] font-medium transition-colors duration-500">Blockchain</span> and a plethora of other industries — bridging design and code through Design Systems, Frontend Engineering, and Brand Identity.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6 sm:mt-8 relative z-10">
                            <CopyEmailButton 
                                email="hello@lorem-portfolio.com" 
                                className="text-sm text-[var(--text-main)] hover:text-[rgb(var(--theme-rgb))]" 
                            />
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
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                            {EXPERIENCE.map((job, index) => (
                                <Fragment key={job.slug}>
                                    <Link
                                        href={`/experience/${job.slug}`}
                                        className="group/item flex flex-col sm:flex-row sm:items-baseline md:flex-row md:items-baseline justify-between gap-1 sm:gap-2 md:gap-4 py-3 transition-colors cursor-pointer"
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
                                    {index < EXPERIENCE.length - 1 && (
                                        <div className="h-px w-full bg-[var(--border-color)]" aria-hidden="true" />
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </motion.div>

                    {/* 5.5. LATEST SIDE PROJECTS (1/2 width on sm, 1 column on md) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 lg:row-span-1 flex min-h-[340px] flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--panel-bg)] p-3 backdrop-blur-md transition-all duration-500 hover:border-[rgb(var(--theme-rgb))]/50 sm:min-h-[380px] sm:rounded-3xl lg:min-h-[300px] xl:min-h-[320px]"
                    >
                        {[
                            {
                                href: 'https://clovetrade.framer.website/',
                                src: '/media/clove-icon.jpg',
                                alt: 'Clove trading app icon',
                                label: 'LATEST SIDE PROJECT',
                                title: 'Clove',
                                description: 'Trading product concept and visual identity.',
                                cardClassName: 'bg-[#1A1A1A]',
                                imageClassName: 'object-contain'
                            },
                            {
                                href: 'https://www.thecolorsynth.xyz/',
                                src: '/media/Color-synth-3000-cover.jpg',
                                alt: 'Color Synth 3000 - Color Palette Synthesizer',
                                label: 'SIDE PROJECT',
                                title: 'Color Synth 3000',
                                description: 'Skeuomorphic color palette synthesiser.',
                                cardClassName: 'bg-[var(--panel-bg)]',
                                imageClassName: 'object-cover group-hover/project:scale-105'
                            }
                        ].map((project) => (
                            <a
                                key={project.title}
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Open ${project.title}`}
                                className={`group/project relative flex-1 overflow-hidden rounded-xl border border-[var(--border-color)] ${project.cardClassName} transition-all duration-500 hover:border-[rgb(var(--theme-rgb))]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--theme-rgb))] sm:rounded-2xl`}
                            >
                                <Image
                                    src={project.src}
                                    alt={project.alt}
                                    fill
                                    className={`${project.imageClassName} transition-transform duration-500`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 backdrop-blur-0 transition-all duration-300 group-hover/project:bg-black/55 group-hover/project:backdrop-blur-sm group-focus-visible/project:bg-black/55 group-focus-visible/project:backdrop-blur-sm" />
                                <div className="absolute inset-0 flex min-w-0 flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover/project:opacity-100 group-focus-visible/project:opacity-100 sm:p-4">
                                    <div className="mb-1.5 flex min-w-0 items-center gap-2">
                                        <span className="min-w-0 font-mono text-[9px] uppercase tracking-wider text-white/70 sm:text-[10px]">
                                            {project.label}
                                        </span>
                                        <ArrowUpRight size={13} className="shrink-0 text-white/70 transition-transform group-hover/project:-translate-y-0.5 group-hover/project:translate-x-0.5" />
                                    </div>
                                    <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-[11px] leading-snug text-white/75 sm:text-xs">
                                        {project.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

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
                            <div className="flex-1 lg:flex-[3]">
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
                                
                                {/* Spacer to push Tools down */}
                                <div className="mb-8"></div>
                                
                                {/* Tools Section */}
                                <div className="bg-[var(--bg-main)]/60 rounded-lg p-4 mb-6 border border-[var(--border-color)]">
                                    <h4 className="text-xs font-medium text-[var(--text-muted)] mb-3 flex items-center gap-2">
                                        <Wrench size={14} className="text-[rgb(var(--theme-rgb))]" />
                                        Tools
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {TOOLS.map(tool => (
                                            <span key={tool} className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-main)]/50 border border-[var(--border-color)] px-2 py-1 rounded hover:bg-[rgb(var(--theme-rgb))]/20 hover:border-[rgb(var(--theme-rgb))]/30 hover:text-[var(--text-main)] cursor-default transition-all duration-300">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="sm:mt-auto lg:mt-0 lg:flex-shrink-0 lg:w-auto">
                                <h3 className="text-sm font-medium text-[var(--text-muted)] mb-2">Connect</h3>
                                <div className="flex gap-2 mb-6">
                                    <a href="https://x.com/Lorem_Ipsum95" target="_blank" rel="noreferrer" className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300"><Twitter size={18} /></a>
                                    <a href="https://github.com/loremipsum000" target="_blank" rel="noreferrer" className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300"><Github size={18} /></a>
                                    <CopyEmailButton 
                                        email="hello@lorem-portfolio.com" 
                                        showEmail={false}
                                        iconOnly={true}
                                        className="p-2 bg-[var(--bg-main)]/50 rounded-lg hover:bg-[rgb(var(--theme-rgb))] hover:text-white text-[var(--text-muted)] transition-colors duration-300" 
                                    />
                                </div>
                                
                                {/* Languages Section */}
                                <div>
                                    <h4 className="text-xs font-medium text-[var(--text-muted)] mb-3">Languages</h4>
                                    <div className="flex flex-col gap-2">
                                        {LANGUAGES.map(lang => (
                                            <span key={lang.name} className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-main)]/50 border border-[var(--border-color)] px-2 py-1 rounded hover:bg-[rgb(var(--theme-rgb))]/20 hover:border-[rgb(var(--theme-rgb))]/30 hover:text-[var(--text-main)] cursor-default transition-all duration-300 flex items-center gap-1.5 w-fit">
                                                <span className="text-sm">{lang.flag}</span>
                                                <span>{lang.name}</span>
                                            </span>
                                        ))}
                                    </div>
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

                    {/* 10. MEMES (Full width) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.75 }}
                        className="col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-4 xl:col-span-8 lg:row-span-1 min-h-[250px] sm:min-h-[220px] md:min-h-[220px]"
                    >
                        <FavoriteMemes />
                    </motion.div>

                    {/* 11. FOOTER (Full Width) */}
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
