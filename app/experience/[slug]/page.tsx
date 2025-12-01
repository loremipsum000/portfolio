import { EXPERIENCE } from '@/lib/constants';
import ExperienceView from '@/components/ExperienceView';

// This function tells Next.js which pages to build at export time
export async function generateStaticParams() {
  return EXPERIENCE.map((experience) => ({
    slug: experience.slug,
  }));
}

// This is a Server Component (no 'use client')
export default function Page({ params }: { params: { slug: string } }) {
  return <ExperienceView slug={params.slug} />;
}
