'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Waves, Activity, Circle, Music, Camera } from 'lucide-react';
import { PERSONAL_INTERESTS } from '@/lib/constants';

const iconMap: Record<string, any> = {
    Waves,
    Activity,
    Circle,
    Music,
    Camera
};

export default function PersonalInterests() {
    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpanded(expanded === index ? null : index);
    };

    return (
        <div className="w-full h-full rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-full">
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-4 flex items-center gap-2">
                <span className="text-[rgb(var(--theme-rgb))]">•</span>
                Personal Interests
            </h3>
            <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-1 md:max-h-[360px]">
                {PERSONAL_INTERESTS.map((interest, index) => (
                    <div
                        key={index}
                        className="group border border-[var(--border-color)] rounded-lg overflow-hidden hover:border-[rgb(var(--theme-rgb))]/30 transition-colors duration-300"
                    >
                        <button
                            onClick={() => toggleExpand(index)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-[rgb(var(--theme-rgb))]/10 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-2">
                                {iconMap[interest.icon] && (() => {
                                    const IconComponent = iconMap[interest.icon];
                                    return <IconComponent size={16} className="text-[rgb(var(--theme-rgb))] flex-shrink-0" />;
                                })()}
                                <span className="text-xs sm:text-sm font-medium text-[var(--text-main)] group-hover:text-[rgb(var(--theme-rgb))] transition-colors">
                                    {interest.name}
                                </span>
                            </div>
                            {expanded === index ? (
                                <ChevronUp size={16} className="text-[var(--text-muted)] flex-shrink-0" />
                            ) : (
                                <ChevronDown size={16} className="text-[var(--text-muted)] flex-shrink-0" />
                            )}
                        </button>
                        {expanded === index && (
                            <div className="px-3 pb-3">
                                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                    {interest.description}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

