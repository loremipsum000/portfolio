'use client';

import { useEffect } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

interface MouseSpotlightProps {
    themeRgb: string;
    isDark: boolean;
}

export default function MouseSpotlight({ themeRgb, isDark }: MouseSpotlightProps) {
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const opacity = isDark ? 0.15 : 0.08;
    const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(${themeRgb}, ${opacity}), transparent 80%)`;

    return (
        <motion.div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background }}
        />
    );
}

