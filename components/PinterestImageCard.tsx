'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PinterestImageCardProps {
    src: string;
    alt: string;
    onClick: () => void;
    aspectRatio?: string;
}

export default function PinterestImageCard({ 
    src, 
    alt, 
    onClick,
    aspectRatio
}: PinterestImageCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-all duration-300 bg-[var(--panel-bg)] backdrop-blur-sm cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            <div className="relative w-full overflow-hidden">
                {!imageError ? (
                    <div className="relative w-full" style={{ lineHeight: 0 }}>
                        <Image
                            src={src}
                            alt={alt}
                            width={1200}
                            height={1600}
                            className="w-full h-auto object-contain"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            onError={() => setImageError(true)}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--theme-rgb))]/20 to-[rgb(var(--theme-rgb))]/5 flex items-center justify-center min-h-[200px]">
                        <span className="text-[var(--text-muted)] text-sm">Failed to load</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

