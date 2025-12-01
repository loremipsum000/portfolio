'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Building2, Sun, Moon } from 'lucide-react';
import { EXPERIENCE, THEMES, THEME_RGB_VALUES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import ImageModal from '@/components/ImageModal';
import BrandGuidelinesCarousel from '@/components/BrandGuidelinesCarousel';
import PinterestImageCard from '@/components/PinterestImageCard';

// --- Type Definitions ---

interface ImageAsset {
    src: string;
    alt: string;
    title: string;
    description: string;
    embedUrl?: string;
}

// Flexible data structure for any project
interface ExperienceData {
    [key: string]: ImageAsset[];
}

// Configuration for each section
interface ExperienceFeature {
    title: string;
    key: string;
    layout: 'grid' | 'pinterest' | 'carousel';
    aspectRatio?: string; // Optional override for grid layout (e.g. '16/9' or '4/3')
    description?: string; // Added description for section
}

// --- Embedded Theme Selector (Fail-Safe) ---
const SimpleThemeSelector = ({ currentTheme, setTheme, isDark, toggleDarkMode }: any) => {
    return (
        <div className="flex items-center gap-2 sm:gap-4 bg-[var(--panel-bg)] p-1.5 sm:p-2 rounded-full border border-[var(--border-color)]">
            <div className="flex items-center gap-1 sm:gap-2 px-1 sm:px-2">
                {THEMES.map((theme, index) => (
                    <button
                        key={theme.name}
                        onClick={() => setTheme(index)}
                        className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full transition-all duration-300 ${
                            currentTheme === index ? 'scale-110 ring-2 ring-offset-2 ring-offset-[var(--bg-main)]' : 'hover:scale-110 opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: theme.color }}
                        title={theme.name}
                        aria-label={`Select ${theme.name} theme`}
                    />
                ))}
            </div>
            <div className="w-[1px] h-4 sm:h-6 bg-[var(--border-color)]" />
            <button
                onClick={toggleDarkMode}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--bg-main)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                aria-label="Toggle dark mode"
            >
                {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
        </div>
    );
};

// --- Data Functions ---

const getSonicLabsImages = (): ExperienceData => {
    const howItStarted = [
        {
            src: '/media/sonic-labs/how-it-started/sonic-initial-sketch-01.jpg',
            alt: 'Sonic Initial Sketch 01',
            title: 'Initial Sketch 01',
            description: ''
        },
        {
            src: '/media/sonic-labs/how-it-started/sonic-initial-sketch-02.jpg',
            alt: 'Sonic Initial Sketch 02',
            title: 'Initial Sketch 02',
            description: ''
        }
    ];

    const website = [
        {
            src: '/media/sonic-labs/website/home.jpg',
            alt: 'Homepage',
            title: 'Homepage',
            description: 'Interactive homepage prototype',
            embedUrl: 'https://embed.figma.com/proto/upcsVVc11ILysX2wI5WzFL/Untitled?page-id=0%3A1&node-id=25-634&node-type=frame&viewport=553%2C382%2C0.18&scaling=scale-down&content-scaling=fixed&starting-point-node-id=25%3A634&embed-host=share'
        },
        {
            src: '/media/sonic-labs/website/token.jpg',
            alt: 'Token Page',
            title: 'Token Page',
            description: 'Token utility and distribution information'
        },
        {
            src: '/media/sonic-labs/website/Wallet.jpg',
            alt: 'Wallet Interface',
            title: 'Wallet UI',
            description: 'User wallet management interface design'
        }
    ];

    const brandGuidelines = Array.from({ length: 17 }, (_, i) => ({
        src: `/media/sonic-labs/brand-guidelines/${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Brand Guidelines Page ${i + 1}`,
        title: `Brand Guidelines ${i + 1}`,
        description: 'Comprehensive brand identity and usage guidelines'
    }));

    const brand = [
        {
            src: '/media/sonic-labs/brand/sonic-banner.jpg',
            alt: 'Sonic Banner',
            title: 'Brand Banner',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-defi.jpg',
            alt: 'DeFi Visuals',
            title: 'DeFi Dashboard',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-banner.jpg',
            alt: 'Summit Banner',
            title: 'Summit Assets',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-inviite.jpg',
            alt: 'Summit Invite',
            title: 'Summit Invitation',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-speakers.jpg',
            alt: 'Speakers Card',
            title: 'Speaker Template',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonicdb.jpg',
            alt: 'Sonic DB',
            title: 'Database Visuals',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonicxgasly22.jpg',
            alt: 'Pierre Gasly Collab',
            title: 'Partnership Asset',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/stickers.jpg',
            alt: 'Stickers',
            title: 'Brand Swag',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/EcoMap22.jpg',
            alt: 'Ecosystem Map',
            title: 'Ecosystem',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/1banner012.jpg',
            alt: 'Alternative Banner',
            title: 'Campaign Banner',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-01.jpg',
            alt: 'Event Photo 1',
            title: 'Event Photography',
            description: ''
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-02.jpg',
            alt: 'Event Photo 2',
            title: 'Event Atmosphere',
            description: ''
        }
    ];

    const feem = [
        {
            src: '/media/sonic-labs/feem/feem-proto-thumbnail.jpg',
            alt: 'FEEM Prototype',
            title: 'FEEM Protocol',
            description: 'Protocol interface design',
            embedUrl: 'https://embed.figma.com/proto/7gE4e9iMUE5kRvvulC38Kx/FEEM?page-id=0%3A1&node-id=227-2274&node-type=canvas&viewport=1295%2C573%2C0.1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=227%3A2274&embed-host=share'
        },
        {
            src: '/media/sonic-labs/feem/feem11.jpg',
            alt: 'FEEM Dashboard',
            title: 'Dashboard UI',
            description: 'Main user dashboard for FEEM protocol'
        }
    ];

    const mySonic = [
        {
            src: '/media/sonic-labs/mysonic/mysonic-01.jpg',
            alt: 'MySonic UI 1',
            title: 'User Profile',
            description: 'User profile management interface'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic-02.jpg',
            alt: 'MySonic UI 2',
            title: 'Asset Overview',
            description: 'Digital asset tracking overview'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic-03.jpg',
            alt: 'MySonic UI 3',
            title: 'Transaction History',
            description: 'Detailed transaction logs and filtering'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic-04.jpg',
            alt: 'MySonic UI 4',
            title: 'Settings',
            description: 'Platform configuration settings'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic-05.jpg',
            alt: 'MySonic UI 5',
            title: 'Mobile View',
            description: 'Responsive mobile interface design'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic-06.jpg',
            alt: 'MySonic UI 6',
            title: 'Dark Mode',
            description: 'Dark mode interface variant'
        },
        {
            src: '/media/sonic-labs/mysonic/mysonic11 (1).jpg',
            alt: 'MySonic Dashboard',
            title: 'Main Dashboard',
            description: 'Primary user interaction hub'
        }
    ];

    const spawn = [
        {
            src: '/media/sonic-labs/spawn/What-is-Spawn-16x9.jpg',
            alt: 'What is Spawn',
            title: 'Spawn Intro',
            description: 'Explainer visual for Spawn project'
        },
        {
            src: '/media/sonic-labs/spawn/Spawn-UI.jpg',
            alt: 'Spawn UI',
            title: 'Interface Design',
            description: 'User interface for game mechanics'
        },
        {
            src: '/media/sonic-labs/spawn/spawn-ui2.jpg',
            alt: 'Spawn Gameplay',
            title: 'Gameplay UI',
            description: 'In-game overlay and HUD elements'
        }
    ];

    return {
        howItStarted,
        website,
        brandGuidelines,
        brand,
        feem,
        mySonic,
        spawn
    };
};

// 2. Retrieve Data
const getExperienceImages = (slug: string): ExperienceData | null => {
    switch (slug) {
        case 'sonic-labs':
            return getSonicLabsImages();
        // TODO: Add cases for 'fantom-foundation', 'mueshi', etc.
        default:
            return null;
    }
};

const getExperienceTheme = (slug: string) => {
    switch (slug) {
        case 'sonic-labs':
            return {
                rgb: '235, 94, 40', // Orange
                hex: '#eb5e28'
            };
        case 'fantom-foundation':
            return {
                rgb: '19, 181, 234', // Blue
                hex: '#13b5ea'
            };
        case 'quantum-black':
            return {
                rgb: '124, 58, 237', // Purple
                hex: '#7c3aed'
            };
        default:
            return {
                rgb: '255, 255, 255',
                hex: '#ffffff'
            };
    }
};

// 3. Define Page Structure
const getExperienceFeatures = (slug: string): ExperienceFeature[] => {
    switch (slug) {
        case 'sonic-labs':
            return [
                { 
                    title: 'Where it started', 
                    key: 'howItStarted', 
                    layout: 'grid', 
                    aspectRatio: '4/3',
                    description: 'Early conceptual sketches and initial explorations that laid the foundation for the Sonic Labs brand identity. These initial designs capture the creative process and evolution of the visual language.'
                },
                { 
                    title: "Where it's now", 
                    key: 'brand', 
                    layout: 'pinterest',
                    description: 'The current brand identity system, featuring a cohesive visual language across digital and physical touchpoints. From event branding to social media assets, the system is designed to be flexible and scalable.'
                },
                { 
                    title: 'Website Design', 
                    key: 'website', 
                    layout: 'pinterest',
                    description: 'Interactive prototypes and interface designs for the main Sonic Labs website. These designs showcase the user experience, navigation patterns, and visual design system applied across different sections of the platform.'
                },
                { 
                    title: 'Brand Guidelines', 
                    key: 'brandGuidelines', 
                    layout: 'carousel',
                    description: 'Comprehensive brand guidelines documenting the visual identity system for Sonic Labs. This includes logo usage, color palettes, typography, spacing systems, and application examples.'
                },
                { 
                    title: 'MySonic Dashboard', 
                    key: 'mySonic', 
                    layout: 'pinterest',
                    description: 'MySonic is a comprehensive user dashboard that provides access to staking, governance, bridging, and ecosystem features. The interface design focuses on clarity and ease of use.'
                },
                { 
                    title: 'FEEM Protocol', 
                    key: 'feem', 
                    layout: 'pinterest',
                    description: 'The Fee Monetization Dashboard provides users with comprehensive tools to manage and track fee-related activities. The design emphasizes data visualization and real-time analytics.'
                },
                { 
                    title: 'Spawn Game', 
                    key: 'spawn', 
                    layout: 'pinterest',
                    description: 'Spawn is a key feature of the Sonic ecosystem, designed to facilitate seamless interactions and operations. The interface design focuses on intuitive user flows and clear information architecture.'
                }
            ];
        
        default:
            return [];
    }
};

const getFallbackImages = (slug: string) => {
    const images = [];
    for (let i = 1; i <= 6; i++) {
        images.push({
            src: `/api/placeholder/800/600?text=${slug}+image+${i}`,
            alt: `${slug} project image ${i}`,
            title: `Project Screenshot ${i}`,
            description: `Visual exploration and design work for ${slug}`
        });
    }
    return images;
};

// --- Main Component ---

export default function ExperienceView({ slug }: { slug: string }) {
    const router = useRouter();
    
    const [activeTheme, setActiveTheme] = useState(0);
    const [isDark, setIsDark] = useState(true);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState<Array<{ src: string; alt: string; title: string; description?: string; embedUrl?: string; isVideo?: boolean }>>([]);
    const [modalIndex, setModalIndex] = useState(0);

    const experience = EXPERIENCE.find(exp => exp.slug === slug);
    const images = getExperienceImages(slug);
    const theme = getExperienceTheme(slug);
    const features = getExperienceFeatures(slug);
    const fallbackImages = getFallbackImages(slug);

    useEffect(() => {
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

    // Update CSS variables when theme changes
    useEffect(() => {
        const root = document.documentElement;
        const currentThemeRgb = THEME_RGB_VALUES[activeTheme];
        
        root.style.setProperty('--theme-rgb', currentThemeRgb);
        
        // Set scrollbar colors
        root.style.setProperty(
            '--scrollbar-thumb',
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        );
        root.style.setProperty(
            '--scrollbar-thumb-hover',
            isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        );

        return () => {
            // Optional: Don't remove properties if you want them to persist when navigating back
            // root.style.removeProperty('--theme-rgb');
            // root.style.removeProperty('--scrollbar-thumb');
            // root.style.removeProperty('--scrollbar-thumb-hover');
        };
    }, [activeTheme, isDark]);

    if (!experience) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[var(--text-main)]" style={{ backgroundColor: isDark ? '#09090b' : '#f4f4f5' }}>
                Experience not found
            </div>
        );
    }

    const openModal = (images: any[], index: number) => {
        setModalImages(images);
        setModalIndex(index);
        setModalOpen(true);
    };

    return (
        <div 
            className={`min-h-screen font-sans selection:bg-[rgb(var(--theme-rgb))]/30 selection:text-[var(--text-main)] overflow-x-hidden transition-colors duration-500 relative`}
            style={{ 
                "--theme-rgb": theme.rgb,
                "--bg-main": isDark ? '#09090b' : '#f4f4f5',
                "--text-main": isDark ? '#e4e4e7' : '#18181b',
                "--text-muted": isDark ? '#a1a1aa' : '#71717a',
                "--panel-bg": isDark ? 'rgba(24, 24, 27, 0.4)' : 'rgba(255, 255, 255, 0.5)',
                "--border-color": isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                backgroundColor: 'var(--bg-main)',
                color: 'var(--text-main)'
            } as React.CSSProperties}
        >
            {/* Fixed Background Grid */}
            <div className="fixed inset-0 z-[-1]" style={{
                backgroundImage: isDark 
                    ? "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)"
                    : "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                opacity: isDark ? 0.1 : 0.4
            }}></div>

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-main)]/80 backdrop-blur-md border-b border-[var(--border-color)]">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 -ml-2 hover:bg-[var(--panel-bg)] rounded-full transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors" />
                    </button>
                </div>
            </header>

            <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-[1280px] mx-auto relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="flex items-center gap-4 sm:gap-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-[var(--text-main)]">
                                {experience.company}
                            </h1>
                            {(experience as any).logo && (
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--panel-bg)]">
                                    <img
                                        src={(experience as any).logo}
                                        alt={`${experience.company} Logo`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-[var(--text-muted)] text-sm sm:text-base">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span>{experience.role}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{experience.period}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed">
                        {experience.description}
                    </p>
                </motion.div>

                {/* Content Sections */}
                {images ? (
                    <div className="space-y-16 sm:space-y-32">
                        {features.map((feature, index) => {
                            const sectionImages = images[feature.key];

                            if (!sectionImages || sectionImages.length === 0) return null;

                            return (
                                <motion.section
                                    key={feature.key}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-light mb-6 flex items-center gap-3 text-[var(--text-main)]">
                                        <span className="w-8 sm:w-12 h-[1px] bg-[var(--text-muted)] opacity-50"></span>
                                        {feature.title}
                                    </h2>
                                    
                                    {feature.description && (
                                        <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed max-w-3xl">
                                            {feature.description}
                                        </p>
                                    )}

                                    {feature.layout === 'carousel' ? (
                                        <BrandGuidelinesCarousel
                                            images={sectionImages}
                                            onImageClick={(idx: any) => openModal(sectionImages, idx)}
                                        />
                                    ) : feature.layout === 'pinterest' ? (
                                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                                            {sectionImages.map((image, imgIndex) => (
                                                <div key={imgIndex} className="break-inside-avoid">
                                                    <PinterestImageCard
                                                        {...image}
                                                        onClick={() => openModal(sectionImages, imgIndex)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        /* Default to Grid */
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            {sectionImages.map((image, imgIndex) => (
                                                <ImageCard
                                                    key={imgIndex}
                                                    {...image}
                                                    onClick={() => openModal(sectionImages, imgIndex)}
                                                    aspectRatio={feature.aspectRatio || '16/9'}
                                                    // Only show title/desc if it's NOT 'howItStarted' or 'brand' (Where it started/Where it's now)
                                                    // BUT per new instructions: remove from cards for "Where it's now" (brand) and "Where it started" (howItStarted)
                                                    // For "howItStarted" user specifically said: "remove this title and description from the cards in this section"
                                                    // So we hide it for both specific sections where we moved to section description
                                                    title={ (feature.key === 'howItStarted' || feature.key === 'brand') ? '' : image.title }
                                                    description={ (feature.key === 'howItStarted' || feature.key === 'brand') ? '' : image.description }
                                                />
                                            ))}
                                        </div>
                                    )}
                                </motion.section>
                            );
                        })}
                    </div>
                ) : (
                    /* Fallback Grid */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                    >
                        {fallbackImages.map((image, index) => (
                            <ImageCard
                                key={index}
                                src={image.src}
                                alt={image.alt}
                                title={image.title}
                                description={image.description}
                                onClick={() => openModal(fallbackImages, index)}
                                aspectRatio="4/3"
                            />
                        ))}
                    </motion.div>
                )}
            </main>

            {/* Modal */}
            <ImageModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                images={modalImages}
                initialIndex={modalIndex}
            />
        </div>
    );
}
