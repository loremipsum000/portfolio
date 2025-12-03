'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageCardProps {
    src: string;
    alt: string;
    title: string;
    description?: string;
    onClick: () => void;
    aspectRatio?: string;
    isVideo?: boolean;
    embedUrl?: string;
}

export default function ImageCard({ 
    src, 
    alt, 
    title, 
    description, 
    onClick,
    aspectRatio = '4/3',
    isVideo = false,
    embedUrl
}: ImageCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isTall, setIsTall] = useState(false);

    // Calculate if image is tall (height > width * 1.2)
    useEffect(() => {
        if (aspectRatio && !isVideo) {
            const parts = aspectRatio.split('/');
            if (parts.length === 2) {
                const width = parseFloat(parts[0]);
                const height = parseFloat(parts[1]);
                if (width > 0 && height > 0) {
                    const ratio = height / width;
                    setIsTall(ratio > 1.2);
                }
            }
        }
    }, [aspectRatio, isVideo]);

    return (
        <motion.div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-all duration-300 bg-[var(--panel-bg)] backdrop-blur-sm cursor-pointer group w-full h-full flex flex-col"
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full overflow-hidden flex flex-col" style={{ aspectRatio }}>
                {embedUrl ? (
                    <div className="relative w-full flex-1 overflow-hidden">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                ) : isVideo ? (
                    <video
                        src={src}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                ) : (
                    <>
                        {!imageError && (
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover"
                                    style={{ 
                                        objectPosition: isTall ? 'center top' : 'center center',
                                        objectFit: 'cover'
                                    }}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    onLoad={() => setImageLoaded(true)}
                                    onError={() => setImageError(true)}
                                />
                            </div>
                        )}
                        {imageError && (
                            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--theme-rgb))]/20 to-[rgb(var(--theme-rgb))]/5 flex items-center justify-center">
                                <span className="text-[var(--text-muted)] text-sm">Failed to load</span>
                            </div>
                        )}
                    </>
                )}
            </div>
            
            {/* Title and description below image (like latest project card) */}
            {(title || description) && (
                <div className="p-4 sm:p-5 lg:p-6 relative z-10 flex flex-col gap-2 flex-shrink-0 bg-[var(--panel-bg)]">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                            {title && (
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-mono font-semibold text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] transition-colors mb-1">
                                    {title}
                                </h3>
                            )}
                            {description && (
                                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

