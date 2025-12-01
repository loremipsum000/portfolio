/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your existing setting
  reactStrictMode: true, 

  // --- Add these lines for Static Export (GitHub Pages) ---
  output: 'export',
  images: {
    // This is crucial for static hosting like GitHub Pages, as it disables
    // the server-side image optimization
    unoptimized: true, 
  },
  // --------------------------------------------------------
};

module.exports = nextConfig;
