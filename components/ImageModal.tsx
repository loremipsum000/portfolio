'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: Array<{ src: string; alt: string; title: string; description?: string; isVideo?: boolean; embedUrl?: string }>;
    initialIndex: number;
}

export default function ImageModal({ isOpen, onClose, images, initialIndex }: ImageModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    // Removed magnifying effect state

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, images.length, onClose]);

    const currentImage = images[currentIndex];

    if (!isOpen || !currentImage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Navigation buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                            }}
                            className="absolute left-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                            }}
                            className="absolute right-4 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}

                {/* Image container with magnifying glass effect */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {currentImage.embedUrl ? (
                            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] bg-white rounded-lg overflow-hidden">
                                <iframe
                                    src={currentImage.embedUrl}
                                    className="w-full h-full border-0"
                                    style={{ 
                                        width: '100%', 
                                        height: '100%',
                                        minHeight: '600px',
                                        border: '1px solid rgba(0, 0, 0, 0.1)'
                                    }}
                                    allowFullScreen
                                />
                            </div>
                        ) : currentImage.isVideo ? (
                            <video
                                src={currentImage.src}
                                className="max-w-full max-h-full object-contain"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                            />
                        ) : (
                            <div 
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                {/* Main image container - fill available VH */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <Image
                                        src={currentImage.src}
                                        alt={currentImage.alt}
                                        width={1920}
                                        height={1080}
                                        className="w-auto h-auto object-contain"
                                        style={{ maxHeight: '95vh', maxWidth: '95vw' }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image counter only */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                            <p className="text-white/80 text-xs">
                                {currentIndex + 1} / {images.length}
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

