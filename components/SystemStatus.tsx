'use client';

import { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';

interface SystemStatusProps {
    isDark: boolean;
}

export default function SystemStatus({ isDark }: SystemStatusProps) {
    const [time, setTime] = useState("");
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }) + ":" + Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0'));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between group bg-[var(--panel-bg)] backdrop-blur-md border border-[var(--border-color)] hover:border-[rgb(var(--theme-rgb))]/50 hover:bg-[rgb(var(--theme-rgb))]/5 transition-all duration-500 relative overflow-hidden min-h-full">
            <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono text-[var(--text-muted)] tracking-wider">NODE_STATUS: ONLINE</span>
                </div>
                <Cpu size={14} className="sm:w-4 sm:h-4 text-[var(--text-muted)] group-hover:text-[rgb(var(--theme-rgb))] transition-colors" />
            </div>

            <div className="space-y-3 sm:space-y-4 font-mono text-[10px] sm:text-xs text-[var(--text-muted)] mt-3 sm:mt-4 z-10">
                <div className="flex justify-between border-b border-[var(--border-color)] pb-2 group-hover:border-[rgb(var(--theme-rgb))]/20 transition-colors">
                    <span>UPTIME</span>
                    <span className="text-[var(--text-main)]">99.9%</span>
                </div>
                <div className="flex justify-between border-b border-[var(--border-color)] pb-2 group-hover:border-[rgb(var(--theme-rgb))]/20 transition-colors">
                    <span>LOCATION</span>
                    <span className="text-[var(--text-main)]">ZAGREB, HR</span>
                </div>
                <div className="flex justify-between">
                    <span>LOCAL_TIME</span>
                    <span className="text-[rgb(var(--theme-rgb))]">{time}</span>
                </div>
            </div>
        </div>
    );
}

