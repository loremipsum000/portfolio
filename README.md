# Portfolio - Next.js

A modern, interactive portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Multiple theme options (Fantom, Sonic, Growth, Creative)
- 🌓 Dark/Light mode toggle
- ✨ Smooth animations with Framer Motion
- 🎯 Interactive mouse spotlight effect
- 📱 Fully responsive design
- ⚡ Optimized with Next.js 14

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Portfolio/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles and Tailwind imports
├── components/
│   ├── MouseSpotlight.tsx
│   ├── SystemStatus.tsx
│   ├── ThemeSelector.tsx
│   └── Visualizer.tsx
├── lib/
│   └── constants.ts    # Data constants (experience, skills, etc.)
└── public/             # Static assets
```

## Build for Production

```bash
npm run build
npm start
```

## Technologies

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## License

© 2025 Dardan Berisha

