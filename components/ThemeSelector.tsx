'use client';

import { Sun, Moon } from 'lucide-react';
import { THEMES } from '@/lib/constants';

interface ThemeSelectorProps {
    currentTheme: number;
    setTheme: (i: number) => void;
    isDark: boolean;
    toggleDarkMode: () => void;
}

export default function ThemeSelector({ currentTheme, setTheme, isDark, toggleDarkMode }: ThemeSelectorProps) {
    return (
        <div className="w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 min-h-full">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-[10px] sm:text-xs font-mono text-[var(--text-muted)] mb-1 uppercase tracking-wider">Interface Theme</h3>
                    <p className="text-base sm:text-lg font-medium text-[var(--text-main)] transition-colors duration-300" style={{ color: THEMES[currentTheme].color }}>{THEMES[currentTheme].name} Mode</p>
                </div>
                <button 
                    onClick={toggleDarkMode}
                    className="p-1.5 sm:p-2 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                    {isDark ? <Moon size={14} className="sm:w-4 sm:h-4" /> : <Sun size={14} className="sm:w-4 sm:h-4" />}
                </button>
            </div>
            
            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                {THEMES.map((t, i) => (
                    <button 
                        key={t.name}
                        onClick={() => setTheme(i)}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${currentTheme === i ? 'scale-110 ring-2 ring-offset-2 ring-offset-[var(--bg-main)] border-transparent' : 'border-[var(--border-color)] hover:scale-105 opacity-60 hover:opacity-100'}`}
                        style={{ backgroundColor: t.color, borderColor: currentTheme === i ? t.color : undefined }}
                    >
                        {currentTheme === i && <div className="w-2 h-2 bg-black/50 rounded-full" />}
                    </button>
                ))}
            </div>
        </div>
    );
}

