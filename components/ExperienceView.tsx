'use client';

import { useRouter } from 'next/navigation'; // Removed useParams
import { ArrowLeft, Calendar, Building2 } from 'lucide-react';
import { EXPERIENCE, THEME_RGB_VALUES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ImageCard from '@/components/ImageCard';
import ImageModal from '@/components/ImageModal';
import BrandGuidelinesCarousel from '@/components/BrandGuidelinesCarousel';
import PinterestImageCard from '@/components/PinterestImageCard';

// ... (Keep getSonicLabsImages and getExperienceImages functions exactly as they are) ...
// PASTE THE HELPER FUNCTIONS HERE

// Update the component signature to accept slug as a prop
export default function ExperienceView({ slug }: { slug: string }) {
    const router = useRouter();
    // const params = useParams(); <--- DELETE THIS LINE
    // const slug = params.slug as string; <--- DELETE THIS LINE
    
    const [activeTheme] = useState(0);
    const [isDark] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    // ... rest of your state ...

    const experience = EXPERIENCE.find(exp => exp.slug === slug);

    // ... rest of your component logic exactly as it was ...
    
    // (Ensure you DO NOT export generateStaticParams from this file)
    return (
       // ... your JSX ...
       <div className="min-h-screen...">
          {/* ... */}
       </div>
    );
}
