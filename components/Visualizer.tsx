'use client';

import { motion } from 'framer-motion';
import { Box } from 'lucide-react';

interface VisualizerProps {
    isDark: boolean;
}

export default function Visualizer({ isDark }: VisualizerProps) {
    return (
        <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden group border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 transition-colors duration-500 backdrop-blur-md bg-[var(--visualizer-bg)] min-h-full">
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Animated Circles */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-0 border border-dashed rounded-full transition-colors duration-500 ${isDark ? 'border-zinc-700' : 'border-zinc-300'} group-hover:border-[rgb(var(--theme-rgb))]/50`}
                    />
                    <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-2 border rounded-full transition-colors duration-500 ${isDark ? 'border-zinc-800' : 'border-zinc-200'} group-hover:border-[rgb(var(--theme-rgb))]/30`}
                    />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 m-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full blur-xl bg-[rgb(var(--theme-rgb))]/40 transition-colors duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Box size={20} className="sm:w-6 sm:h-6 opacity-80 transition-colors duration-500" style={{ color: isDark ? 'white' : '#18181b' }} />
                    </div>
                </div>
            </div>
            
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10">
                <div className="text-[10px] sm:text-xs font-mono text-[var(--text-muted)] mb-1">CURRENTLY BUILDING</div>
                <div className="text-xs sm:text-sm font-medium group-hover:text-[rgb(var(--theme-rgb))] transition-colors text-[var(--text-main)]">Website Refresh for Sonic Labs</div>
            </div>
        </div>
    );
}

