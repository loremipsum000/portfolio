'use client';

import { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

interface CopyEmailButtonProps {
    email: string;
    showEmail?: boolean;
    className?: string;
    iconOnly?: boolean;
}

export default function CopyEmailButton({ email, showEmail = true, className = "", iconOnly = false }: CopyEmailButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button 
            onClick={handleCopy} 
            className={`flex items-center gap-2 transition-all duration-300 ${className}`}
            aria-label="Copy email address"
            title="Copy email address"
        >
            <div className="relative">
                <Mail 
                    size={18} // slightly larger to match previous size
                    className={`transition-all duration-300 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} 
                />
                <Check 
                    size={18} 
                    className={`absolute inset-0 text-green-500 transition-all duration-300 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                />
            </div>
            
            {!iconOnly && (
                <span className={`font-medium transition-colors duration-300 ${copied ? 'text-green-500' : ''}`}>
                    {showEmail ? email : (copied ? 'Copied!' : 'Get in touch')}
                </span>
            )}
        </button>
    );
}

