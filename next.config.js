/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing setting
  reactStrictMode: true, 

  // --- Static Export only for production builds (GitHub Actions) ---
  // Disable static export in development mode to allow local dev server to work
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  
  images: {
    // This is crucial for static hosting like GitHub Pages, as it disables
    // the server-side image optimization
    unoptimized: true, 
  },
  // --------------------------------------------------------
};

module.exports = nextConfig;
