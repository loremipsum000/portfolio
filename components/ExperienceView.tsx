'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Building2 } from 'lucide-react';
import { EXPERIENCE, THEME_RGB_VALUES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import ImageModal from '@/components/ImageModal';
import BrandGuidelinesCarousel from '@/components/BrandGuidelinesCarousel';
import PinterestImageCard from '@/components/PinterestImageCard';

// Helper function to get images for sonic-labs
const getSonicLabsImages = () => {
    const howItStarted = [
        {
            src: '/media/sonic-labs/how-it-started/sonic-initial-sketch-01.jpg',
            alt: 'Sonic Initial Sketch 01',
            title: 'Initial Sketch 01',
            description: 'Early conceptual sketch exploring the Sonic Labs brand identity'
        },
        {
            src: '/media/sonic-labs/how-it-started/sonic-initial-sketch-02.jpg',
            alt: 'Sonic Initial Sketch 02',
            title: 'Initial Sketch 02',
            description: 'Further development of the initial brand concept'
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
            description: 'Main brand visual identity banner'
        },
        {
            src: '/media/sonic-labs/brand/sonic-defi.jpg',
            alt: 'DeFi Visuals',
            title: 'DeFi Dashboard',
            description: 'Decentralized finance platform visualization'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-banner.jpg',
            alt: 'Summit Banner',
            title: 'Summit Assets',
            description: 'Event branding for Sonic Summit'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-inviite.jpg',
            alt: 'Summit Invite',
            title: 'Summit Invitation',
            description: 'Digital invitation design for stakeholders'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-speakers.jpg',
            alt: 'Speakers Card',
            title: 'Speaker Template',
            description: 'Social media templates for event speakers'
        },
        {
            src: '/media/sonic-labs/brand/sonicdb.jpg',
            alt: 'Sonic DB',
            title: 'Database Visuals',
            description: 'Technical infrastructure visualization'
        },
        {
            src: '/media/sonic-labs/brand/sonicxgasly22.jpg',
            alt: 'Pierre Gasly Collab',
            title: 'Partnership Asset',
            description: 'Brand collaboration materials'
        },
        {
            src: '/media/sonic-labs/brand/stickers.jpg',
            alt: 'Stickers',
            title: 'Brand Swag',
            description: 'Physical merchandise and sticker designs'
        },
        {
            src: '/media/sonic-labs/brand/EcoMap22.jpg',
            alt: 'Ecosystem Map',
            title: 'Ecosystem',
            description: 'Visual map of the Sonic ecosystem'
        },
        {
            src: '/media/sonic-labs/brand/1banner012.jpg',
            alt: 'Alternative Banner',
            title: 'Campaign Banner',
            description: 'Alternative visual direction for campaigns'
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-01.jpg',
            alt: 'Event Photo 1',
            title: 'Event Photography',
            description: 'Live event branding implementation'
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-02.jpg',
            alt: 'Event Photo 2',
            title: 'Event Atmosphere',
            description: 'Brand presence at industry events'
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

const getExperienceImages = (slug: string) => {
    switch (slug) {
        case 'sonic-labs':
            return getSonicLabsImages();
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

const getExperienceFeatures = (slug: string) => {
    switch (slug) {
        case 'sonic-labs':
            return [
                { title: 'Brand Identity', key: 'brand' },
                { title: 'Website Design', key: 'website' },
                { title: 'Brand Guidelines', key: 'brandGuidelines' },
                { title: 'MySonic Dashboard', key: 'mySonic' },
                { title: 'FEEM Protocol', key: 'feem' },
                { title: 'Spawn Game', key: 'spawn' },
                { title: 'Early Concepts', key: 'howItStarted' }
            ];
        default:
            return [];
    }
};

const getFallbackImages = (slug: string) => {
    const images = [];
    // Generate 6 placeholder images
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

// Main Component - Now accepts slug as a prop
export default function ExperienceView({ slug }: { slug: string }) {
    const router = useRouter();
    
    // Theme state
    const [activeTheme] = useState(0);
    const [isDark] = useState(true);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState<Array<{ src: string; alt: string; title: string; description: string; embedUrl?: string }>>([]);
    const [modalIndex, setModalIndex] = useState(0);

    const experience = EXPERIENCE.find(exp => exp.slug === slug);
    const images = getExperienceImages(slug);
    const theme = getExperienceTheme(slug);
    const features = getExperienceFeatures(slug);
    const fallbackImages = getFallbackImages(slug);

    // Update CSS variables for the theme
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--theme-rgb', theme.rgb);
        root.style.setProperty('--theme-hex', theme.hex);

        return () => {
            // Cleanup styles when component unmounts
            root.style.removeProperty('--theme-rgb');
            root.style.removeProperty('--theme-hex');
        };
    }, [theme]);

    if (!experience) {
        return (
            <div className="min-h-screen flex items-center justify-center text-[var(--text-primary)]">
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
        <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-[var(--background)] text-[var(--text-primary)] transition-colors duration-500`}>
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                    <button
                        onClick={() => router.push('/')}
                        className="p-2 -ml-2 hover:bg-[var(--surface)] rounded-full transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                    </button>
                    
                    <div className="flex items-center gap-4">
                        <ThemeSelector activeTheme={activeTheme} onThemeChange={() => {}} />
                    </div>
                </div>
            </header>

            <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 sm:mb-16"
                >
                    <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight">
                            {experience.company}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-[var(--text-secondary)] text-sm sm:text-base">
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
                            const sectionImages = images[feature.key as keyof typeof images];
                            if (!sectionImages || sectionImages.length === 0) return null;

                            return (
                                <motion.section
                                    key={feature.key}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <h2 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 flex items-center gap-3 text-[var(--theme-hex)]">
                                        <span className="w-8 sm:w-12 h-[1px] bg-[var(--theme-hex)] opacity-50"></span>
                                        {feature.title}
                                    </h2>

                                    {feature.key === 'brandGuidelines' ? (
                                        <BrandGuidelinesCarousel
                                            images={sectionImages}
                                            onImageClick={(idx) => openModal(sectionImages, idx)}
                                        />
                                    ) : feature.key === 'howItStarted' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            {sectionImages.map((image, imgIndex) => (
                                                <ImageCard
                                                    key={imgIndex}
                                                    {...image}
                                                    onClick={() => openModal(sectionImages, imgIndex)}
                                                    aspectRatio="4/3"
                                                />
                                            ))}
                                        </div>
                                    ) : feature.key === 'website' || feature.key === 'mySonic' || feature.key === 'feem' ? (
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                            {sectionImages.map((image, imgIndex) => (
                                                <ImageCard
                                                    key={imgIndex}
                                                    {...image}
                                                    onClick={() => openModal(sectionImages, imgIndex)}
                                                    aspectRatio="16/9"
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
