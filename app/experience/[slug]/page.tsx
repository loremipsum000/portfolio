import { EXPERIENCE } from '@/lib/constants';
import ExperienceView from '@/components/ExperienceView';

// This function tells Next.js which pages to build at export time
// It runs ONLY on the server during build
export async function generateStaticParams() {
  return EXPERIENCE.map((experience) => ({
    slug: experience.slug,
  }));
}

// This component passes the data to the client component
export default function Page({ params }: { params: { slug: string } }) {
  return <ExperienceView slug={params.slug} />;
}
