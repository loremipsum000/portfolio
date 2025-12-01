'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BrandGuidelinesCarouselProps {
    images: Array<{ src: string; alt: string; title: string; description?: string }>;
    onImageClick?: (index: number) => void;
}

export default function BrandGuidelinesCarousel({ images, onImageClick }: BrandGuidelinesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const hasDragged = useRef(false);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    useEffect(() => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            const scrollAmount = container.clientWidth;
            container.scrollTo({
                left: currentIndex * scrollAmount,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return;
        setIsDragging(true);
        hasDragged.current = false;
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
        e.preventDefault();
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !carouselRef.current) return;
        e.preventDefault();
        hasDragged.current = true;
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (!carouselRef.current) return;
        
        // Snap to nearest slide
        const container = carouselRef.current;
        const slideWidth = container.clientWidth;
        const newIndex = Math.round(container.scrollLeft / slideWidth);
        setCurrentIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

    // Touch events for trackpad/touch devices
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!carouselRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !carouselRef.current) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        handleMouseUp();
    };

    return (
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--panel-bg)] backdrop-blur-md">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between">
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-main)] mb-1">
                        Brand Guidelines
                    </h3>
                    <p className="text-sm text-[var(--text-muted)]">
                        {images.length} pages of comprehensive brand guidelines
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevious}
                        className="p-2 rounded-lg bg-[var(--bg-main)]/50 hover:bg-[rgb(var(--theme-rgb))]/20 border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={20} className="text-[var(--text-main)]" />
                    </button>
                    <span className="text-xs text-[var(--text-muted)] px-2 hidden sm:inline">
                        {currentIndex + 1} / {images.length}
                    </span>
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-lg bg-[var(--bg-main)]/50 hover:bg-[rgb(var(--theme-rgb))]/20 border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={20} className="text-[var(--text-main)]" />
                    </button>
                </div>
            </div>

            {/* Carousel - draggable */}
            <div 
                ref={carouselRef}
                className="brand-carousel relative w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y pinch-zoom', padding: 0, margin: 0, display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full relative"
                        style={{ padding: 0, margin: 0, width: '100%', alignSelf: 'flex-start', height: 'auto' }}
                        onClick={() => {
                            if (!hasDragged.current && onImageClick) {
                                onImageClick(index);
                            }
                        }}
                    >
                        <div className="relative w-full" style={{ padding: 0, margin: 0, lineHeight: 0, fontSize: 0, display: 'block' }}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={1920}
                                height={1080}
                                className="w-full h-auto"
                                sizes="100vw"
                                style={{ 
                                    padding: 0, 
                                    margin: 0, 
                                    display: 'block',
                                    maxHeight: 'none',
                                    verticalAlign: 'top'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Thumbnail navigation */}
            <div className="p-4 sm:p-6 border-t border-[var(--border-color)]">
                <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                currentIndex === index
                                    ? 'border-[rgb(var(--theme-rgb))] scale-105'
                                    : 'border-[var(--border-color)] opacity-60 hover:opacity-100'
                            }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
