'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Building2 } from 'lucide-react';
import { EXPERIENCE, THEME_RGB_VALUES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import ImageModal from '@/components/ImageModal';
import BrandGuidelinesCarousel from '@/components/BrandGuidelinesCarousel';
import PinterestImageCard from '@/components/PinterestImageCard';

// ... imports
import { EXPERIENCE } from '@/lib/constants'; // Ensure this import exists

// Tell Next.js which pages to build
export async function generateStaticParams() {
  return EXPERIENCE.map((experience) => ({
    slug: experience.slug,
  }));
}


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
            embedUrl: 'https://embed.figma.com/proto/upcsVVc11ILysX2wI5WzFL/Untitled?page-id=0%3A1&node-id=1-4218&p=f&viewport=520%2C289%2C0.15&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4218&show-proto-sidebar=0&embed-host=share'
        },
        {
            src: '/media/sonic-labs/website/token.jpg',
            alt: 'The Token',
            title: 'The Token',
            description: 'Token interface design',
            embedUrl: 'https://embed.figma.com/proto/upcsVVc11ILysX2wI5WzFL/Untitled?page-id=0%3A1&node-id=1-3624&p=f&viewport=520%2C289%2C0.15&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A3624&show-proto-sidebar=0&embed-host=share'
        },
        {
            src: '/media/sonic-labs/website/Wallet.jpg',
            alt: 'Wallets',
            title: 'Wallets',
            description: 'Wallet interface design',
            embedUrl: 'https://embed.figma.com/proto/upcsVVc11ILysX2wI5WzFL/Untitled?page-id=0%3A1&node-id=1-3890&p=f&viewport=520%2C289%2C0.15&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A3890&show-proto-sidebar=0&embed-host=share'
        }
    ];

    const brandGuidelines = Array.from({ length: 17 }, (_, i) => ({
        src: `/media/sonic-labs/brand-guidelines/${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `Brand Guidelines Page ${i + 1}`,
        title: `Brand Guidelines - Page ${i + 1}`,
        description: `Comprehensive brand guidelines documentation page ${i + 1}`
    }));

    const mysonic = Array.from({ length: 6 }, (_, i) => ({
        src: `/media/sonic-labs/mysonic/mysonic-${String(i + 1).padStart(2, '0')}.jpg`,
        alt: `MySonic ${i + 1}`,
        title: `MySonic ${i + 1}`,
        description: `MySonic interface design ${i + 1}`
    }));

    // Random aspect ratios for Pinterest-style layout
    const mysonicAspectRatios = ['3/4', '4/5', '2/3', '5/4', '3/5', '4/3'];

    const feem = [
        {
            src: '/media/sonic-labs/feem/feem-proto-thumbnail.jpg',
            alt: 'Fee Monetization Dashboard Prototype',
            title: 'Fee Monetization Dashboard Prototype',
            description: 'Interactive prototype for the Fee Monetization Dashboard',
            embedUrl: 'https://embed.figma.com/proto/upcsVVc11ILysX2wI5WzFL/Untitled?page-id=0%3A1&node-id=1-4218&p=f&viewport=520%2C289%2C0.15&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4218&show-proto-sidebar=0&embed-host=share'
        },
        {
            src: '/media/sonic-labs/feem/feem11.jpg',
            alt: 'Fee Monetization Dashboard',
            title: 'Fee Monetization Dashboard',
            description: 'Fee Monetization Dashboard interface design'
        }
    ];

    const spawn = [
        {
            src: '/media/sonic-labs/spawn/What-is-Spawn-16x9.jpg',
            alt: 'What is Spawn',
            title: 'What is Spawn',
            description: 'Spawn introduction'
        },
        {
            src: '/media/sonic-labs/spawn/Spawn-UI.jpg',
            alt: 'Spawn UI',
            title: 'Spawn UI',
            description: 'Spawn user interface'
        },
        {
            src: '/media/sonic-labs/spawn/spawn-ui2.jpg',
            alt: 'Spawn UI 2',
            title: 'Spawn UI 2',
            description: 'Spawn user interface variation'
        }
    ];

    const brand = [
        {
            src: '/media/sonic-labs/brand/sonicxgasly22.jpg',
            alt: 'Sonic x Gasly',
            title: 'Sonic x Gasly',
            description: 'Brand collaboration'
        },
        {
            src: '/media/sonic-labs/brand/1banner012.jpg',
            alt: 'Banner 01',
            title: 'Banner 01',
            description: 'Brand banner'
        },
        {
            src: '/media/sonic-labs/brand/EcoMap22.jpg',
            alt: 'Ecosystem Map',
            title: 'Ecosystem Map',
            description: 'Ecosystem visualization'
        },
        {
            src: '/media/sonic-labs/brand/stickers.jpg',
            alt: 'Stickers',
            title: 'Stickers',
            description: 'Brand stickers'
        },
        {
            src: '/media/sonic-labs/brand/sonicdb.jpg',
            alt: 'Sonic Database',
            title: 'Sonic Database',
            description: 'Database design'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-speakers.jpg',
            alt: 'Sonic Summit Speakers',
            title: 'Sonic Summit Speakers',
            description: 'Event speakers'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-inviite.jpg',
            alt: 'Sonic Summit Invite',
            title: 'Sonic Summit Invite',
            description: 'Event invitation'
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-02.jpg',
            alt: 'Sonic Event 02',
            title: 'Sonic Event 02',
            description: 'Event design'
        },
        {
            src: '/media/sonic-labs/brand/sonic-summit-banner.jpg',
            alt: 'Sonic Summit Banner',
            title: 'Sonic Summit Banner',
            description: 'Event banner'
        },
        {
            src: '/media/sonic-labs/brand/sonic-event-01.jpg',
            alt: 'Sonic Event 01',
            title: 'Sonic Event 01',
            description: 'Event design'
        },
        {
            src: '/media/sonic-labs/brand/sonic-defi.jpg',
            alt: 'Sonic DeFi',
            title: 'Sonic DeFi',
            description: 'DeFi branding'
        },
        {
            src: '/media/sonic-labs/brand/sonic-banner.jpg',
            alt: 'Sonic Banner',
            title: 'Sonic Banner',
            description: 'Brand banner'
        }
    ];

    return { howItStarted, website, brandGuidelines, mysonic, mysonicAspectRatios, feem, spawn, brand };
};

// Helper function for other experiences (fallback)
const getExperienceImages = (slug: string): string[] => {
    const imageCounts: Record<string, number> = {
        'fantom-foundation': 5,
        'mueshi': 4,
        'helio': 5,
        'porsche-digital': 7,
        'afilio': 4,
        'pontes-salutis': 6
    };
    
    const count = imageCounts[slug] || 4;
    return Array.from({ length: count }, (_, i) => `/media/${slug}/image-${i + 1}.jpg`);
};

export default function ExperienceDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [activeTheme] = useState(0);
    const [isDark] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImages, setModalImages] = useState<Array<{ src: string; alt: string; title: string; description?: string; isVideo?: boolean }>>([]);
    const [modalIndex, setModalIndex] = useState(0);
    
    const experience = EXPERIENCE.find(exp => exp.slug === slug);
    
    useEffect(() => {
        document.documentElement.style.setProperty(
            '--scrollbar-thumb',
            isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        );
        document.documentElement.style.setProperty(
            '--scrollbar-thumb-hover',
            isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
        );
    }, [isDark]);
    
    if (!experience) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#09090b', color: '#e4e4e7' }}>
                <p>Experience not found</p>
            </div>
        );
    }

    const openModal = (images: Array<{ src: string; alt: string; title: string; description?: string; isVideo?: boolean }>, index: number) => {
        setModalImages(images);
        setModalIndex(index);
        setModalOpen(true);
    };

    // Special handling for sonic-labs
    if (slug === 'sonic-labs') {
        const { howItStarted, website, brandGuidelines, mysonic, mysonicAspectRatios, feem, spawn, brand } = getSonicLabsImages();
     

        return (
            <div className="min-h-screen font-sans selection:bg-[rgb(var(--theme-rgb))]/30 selection:text-[var(--text-main)] overflow-x-hidden transition-colors duration-500 relative"
                style={{ 
                    "--theme-rgb": THEME_RGB_VALUES[activeTheme],
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

                <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-12 relative z-10">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[rgb(var(--theme-rgb))] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Portfolio
                    </motion.button>

                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
                            {experience.role}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-[var(--text-muted)] mb-6">
                            <div className="flex items-center gap-2">
                                <Building2 size={18} />
                                <span className="text-lg">{experience.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span className="text-lg">{experience.period}</span>
                            </div>
                        </div>
                        <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed">
                            {experience.description}
                        </p>
                    </motion.div>

                    {/* How It Started Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            Where it started
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            Early conceptual sketches and initial explorations that laid the foundation for the Sonic Labs brand identity. These initial designs capture the creative process and evolution of the visual language.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {howItStarted.map((image, index) => (
                                <ImageCard
                                    key={index}
                                    src={image.src}
                                    alt={image.alt}
                                    title={image.title}
                                    description={image.description}
                                    onClick={() => openModal(howItStarted, index)}
                                    aspectRatio="4/3"
                                />
                            ))}
                        </div>
                    </motion.section>

                    {/* Brand Section - Now "Where it's now" with Pinterest style */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            Where it's now
                        </h2>
                        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
                            {brand.map((image, index) => (
                                <div key={index} className="break-inside-avoid mb-3 sm:mb-4">
                                    <PinterestImageCard
                                        src={image.src}
                                        alt={image.alt}
                                        onClick={() => openModal(brand, index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Brand Guidelines Carousel - Moved below */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="mb-12"
                    >
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            Comprehensive brand guidelines documenting the visual identity system for Sonic Labs. This includes logo usage, color palettes, typography, spacing systems, and application examples across various touchpoints.
                        </p>
                        <BrandGuidelinesCarousel images={brandGuidelines} />
                    </motion.section>

                    {/* Website Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            Website & Interfaces
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            Interactive prototypes and interface designs for the main Sonic Labs website. These designs showcase the user experience, navigation patterns, and visual design system applied across different sections of the platform.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {website.map((item, index) => (
                                <ImageCard
                                    key={index}
                                    src={item.src}
                                    alt={item.alt}
                                    title={item.title}
                                    description={item.description}
                                    onClick={() => openModal(website, index)}
                                    aspectRatio="16/9"
                                    embedUrl={item.embedUrl}
                                />
                            ))}
                        </div>
                    </motion.section>

                    {/* MySonic Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            MySonic
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            MySonic is a comprehensive user dashboard that provides access to staking, governance, bridging, and ecosystem features. The interface design focuses on clarity, ease of use, and seamless navigation across different DeFi functionalities.
                        </p>
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
                            {mysonic.map((image, index) => (
                                <div key={index} className="break-inside-avoid mb-3 sm:mb-4">
                                    <PinterestImageCard
                                        src={image.src}
                                        alt={image.alt}
                                        onClick={() => openModal(mysonic, index)}
                                        aspectRatio={mysonicAspectRatios[index % mysonicAspectRatios.length]}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Fee Monetization Dashboard Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            Fee Monetization Dashboard
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            The Fee Monetization Dashboard provides users with comprehensive tools to manage and track fee-related activities. The design emphasizes data visualization, transaction history, and real-time analytics for fee management.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {feem.map((item, index) => (
                                <div key={index} className="h-full flex">
                                    {item.embedUrl ? (
                                        <ImageCard
                                            src={item.src}
                                            alt={item.alt}
                                            title={item.title}
                                            description={item.description}
                                            onClick={() => openModal(feem, index)}
                                            aspectRatio="16/9"
                                            embedUrl={item.embedUrl}
                                        />
                                    ) : (
                                        <ImageCard
                                            src={item.src}
                                            alt={item.alt}
                                            title={item.title}
                                            description={item.description}
                                            onClick={() => openModal(feem, index)}
                                            aspectRatio="16/9"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Spawn Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-main)] mb-3">
                            Spawn
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed max-w-3xl">
                            Spawn is a key feature of the Sonic ecosystem, designed to facilitate seamless interactions and operations. The interface design focuses on intuitive user flows and clear information architecture.
                        </p>
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4">
                            {spawn.map((image, index) => (
                                <div key={index} className="break-inside-avoid mb-3 sm:mb-4">
                                    <PinterestImageCard
                                        src={image.src}
                                        alt={image.alt}
                                        onClick={() => openModal(spawn, index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.section>
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

    // Fallback for other experiences
    const images = getExperienceImages(slug);
    const fallbackImages = images.map((src, index) => ({
        src,
        alt: `${experience.company} - Image ${index + 1}`,
        title: `Image ${index + 1}`,
        description: `${experience.company} project image ${index + 1}`,
        isVideo: false
    }));

    return (
        <div className="min-h-screen font-sans selection:bg-[rgb(var(--theme-rgb))]/30 selection:text-[var(--text-main)] overflow-x-hidden transition-colors duration-500 relative"
            style={{ 
                "--theme-rgb": THEME_RGB_VALUES[activeTheme],
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

            <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-12 pb-12 relative z-10">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[rgb(var(--theme-rgb))] transition-colors mb-8 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </motion.button>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[var(--text-main)] mb-4">
                        {experience.role}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-[var(--text-muted)] mb-6">
                        <div className="flex items-center gap-2">
                            <Building2 size={18} />
                            <span className="text-lg">{experience.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={18} />
                            <span className="text-lg">{experience.period}</span>
                        </div>
                    </div>
                    <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed">
                        {experience.description}
                    </p>
                </motion.div>

                {/* Image Grid */}
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
