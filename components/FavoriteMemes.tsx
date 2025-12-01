'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Smile } from 'lucide-react';
import Image from 'next/image';
import { MEMES } from '@/lib/constants';

export default function FavoriteMemes() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const container = scrollContainerRef.current;
            const newScrollLeft = direction === 'left' 
                ? container.scrollLeft - scrollAmount 
                : container.scrollLeft + scrollAmount;
            
            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-full h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-2">
                    <Smile size={16} className="text-[rgb(var(--theme-rgb))]" />
                    Favorite Memes
                </h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => scroll('left')}
                        className="p-1.5 rounded-full hover:bg-[var(--bg-main)] text-[var(--text-muted)] transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="p-1.5 rounded-full hover:bg-[var(--bg-main)] text-[var(--text-muted)] transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div 
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {MEMES.map((meme, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 snap-center"
                    >
                        <div className="relative h-48 rounded-xl overflow-hidden border border-[var(--border-color)] group">
                            {/* Use a regular img tag for better object-fit/aspect ratio handling in this specific carousel case */}
                            <img
                                src={meme}
                                alt={`Meme ${index + 1}`}
                                className="h-full w-auto object-contain bg-black/5 transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

