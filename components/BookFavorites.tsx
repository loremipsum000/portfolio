'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOK_FAVORITES } from '@/lib/constants';

export default function BookFavorites() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return;
        const scrollAmount = 200; // Scroll by 200px
        const currentScroll = scrollContainerRef.current.scrollLeft;
        const targetScroll = direction === 'right' 
            ? currentScroll + scrollAmount 
            : currentScroll - scrollAmount;
        
        scrollContainerRef.current.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    };

    return (
        <div className="w-full h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-[var(--text-muted)] flex items-center gap-2">
                    <BookOpen size={16} className="text-[rgb(var(--theme-rgb))]" />
                    Book Favorites
                </h3>
                {/* Arrows - always visible at top right */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        className="p-1.5 rounded-full bg-[var(--bg-main)]/50 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[rgb(var(--theme-rgb))] hover:border-[rgb(var(--theme-rgb))]/50 transition-all duration-300"
                        aria-label="Previous books"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="p-1.5 rounded-full bg-[var(--bg-main)]/50 border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[rgb(var(--theme-rgb))] hover:border-[rgb(var(--theme-rgb))]/50 transition-all duration-300"
                        aria-label="Next books"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
            
            {/* Horizontal Scrollable Container - All Screens */}
            <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-x-auto scrollbar-hide pb-2"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex gap-3 sm:gap-3 md:gap-3 lg:gap-4 xl:gap-6 min-w-max">
                    {BOOK_FAVORITES.map((book, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-24 sm:w-28 md:w-28 lg:w-32 xl:w-40 2xl:w-44 group cursor-pointer"
                        >
                            <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-all duration-300 mb-2">
                                <Image
                                    src={book.image}
                                    alt={`${book.title} by ${book.author}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 480px) 96px, (max-width: 720px) 112px, (max-width: 960px) 112px, (max-width: 1279px) 128px, (max-width: 1535px) 160px, 176px"
                                />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm font-medium text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] transition-colors line-clamp-2">
                                    {book.title}
                                </h4>
                                <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[10px] xl:text-xs text-[var(--text-muted)]">
                                    {book.author}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

