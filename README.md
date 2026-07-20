# Siril Portfolio - YouTuber & Content Creator

A modern, responsive portfolio website built for **Sanu Siril**, a YouTube vlogger and content creator. This portfolio showcases his vlogging work, engages visitors with interactive elements, and provides easy access to his YouTube channel.

**Live Demo:** [https://temp-amber-three.vercel.app/](https://temp-amber-three.vercel.app/)

---

## About the Project

This is a professional portfolio website created for Sanu Siril, a YouTube content creator specializing in cinematic vlogging and visual storytelling. The portfolio serves as the official digital presence where visitors can learn more about Siril's work and subscribe to his channel.

---

## Tech Stack

### **Frontend Framework**
- **Next.js 14+** - React-based framework for building fast, production-ready web applications with built-in optimization and SSR capabilities

### **Programming Languages**
- **TypeScript (87.6%)** - Primary language for type-safe, scalable frontend development
- **CSS (9.9%)** - Styling and layout design
- **JavaScript (1.0%)** - Utility scripts and configuration
- **Python (1.5%)** - Build automation and asset processing scripts

### **Styling & Design**
- **PostCSS** - CSS transformation and optimization tool (configured via `postcss.config.mjs`)
- **Modern CSS** - Responsive design patterns and animations

### **Development Tools**
- **TypeScript** - Static type checking for robust code quality
- **ESLint** - Code linting and quality assurance (configured via `eslint.config.mjs`)
- **Node.js** - JavaScript runtime for development and build processes

### **Deployment**
- **Vercel** - Optimized hosting platform for Next.js applications with automatic deployments

---

## Project Structure

```
siril/
├── src/                        # Source code directory
│   └── components/             # React components
│   └── pages/                  # Next.js pages
├── public/                     # Static assets (images, favicon, etc.)
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
├── README.md                  # Original project documentation
├── CLAUDE.md                  # Claude AI documentation
├── AGENTS.md                  # Agents documentation
├── check-icons.js             # Icon validation script
├── modify_hero.py             # Python script for hero section modifications
└── .gitignore                 # Git ignore rules
```

---

## Key Features

- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Fast Performance** - Next.js optimization with automatic code splitting and image optimization
- **SEO Optimized** - Meta tags and proper semantic HTML for search engine visibility
- **Interactive UI** - Smooth animations and transitions for enhanced user experience
- **Mobile Friendly** - Progressive web app capabilities with responsive layouts
- **Dark/Light Theme** - Professional color scheme with theme support
- **Social Integration** - Direct links to YouTube channel and social media profiles

---

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/code-by-adi7/siril.git
   cd siril
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running

---

## Development Scripts

```bash
# Run development server with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint to check code quality
npm run lint

# Fix ESLint issues automatically
npm run lint:fix
```

---

## Build & Deployment

### Development Build
The project uses Next.js App Router for optimal performance and modern React patterns.

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
This project is optimized for [Vercel](https://vercel.com/) deployment:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel automatically detects Next.js and applies optimal settings
4. Each push triggers automatic deployment

**Current Deployment:** [https://temp-amber-three.vercel.app/](https://temp-amber-three.vercel.app/)

---

## Configuration Files

### `next.config.ts`
Next.js configuration for custom webpack, build optimization, and runtime settings.

### `tsconfig.json`
TypeScript compiler options and path aliases for strict type checking.

### `postcss.config.mjs`
PostCSS configuration for CSS processing and optimization.

### `eslint.config.mjs`
Code quality rules and linting standards for the project.

---

## Technologies Deep Dive

### Next.js 14+
- **File-based Routing** - Automatic routing based on file structure
- **API Routes** - Built-in backend API capabilities
- **Image Optimization** - Automatic image compression and responsive sizing
- **Code Splitting** - Automatic optimization of bundle sizes
- **Static Generation** - Pre-rendered pages for optimal performance

### TypeScript Benefits
- Type safety across the entire codebase
- Better IDE support and auto-completion
- Catch errors at compile time rather than runtime
- Improved code documentation

### Vercel Deployment
- Automatic HTTPS
- Global CDN for fast content delivery
- Serverless functions for dynamic content
- Built-in analytics and monitoring

---

## Additional Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Claude AI integration documentation
- **[AGENTS.md](./AGENTS.md)** - Automated agents configuration
- **[Next.js Documentation](https://nextjs.org/docs)** - Official Next.js docs
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - TypeScript reference

---

## Links & Resources

- **YouTube Channel:** [@sanusiril](https://youtube.com/@sanusiril)
- **Live Portfolio:** [temp-amber-three.vercel.app](https://temp-amber-three.vercel.app/)
- **GitHub Repository:** [code-by-adi7/siril](https://github.com/code-by-adi7/siril)
- **Developer:** [Aditya](https://github.com/code-by-adi7)

---

## Customization

### Modifying Hero Section
Use the provided Python script to customize the hero section:
```bash
python modify_hero.py
```

### Checking Icons
Validate icon assets using:
```bash
node check-icons.js
```

---

## License

This project is part of a portfolio creation and may have specific licensing terms. Check the repository for more details.

---

## Future Enhancements

Potential features for future versions:
- Blog integration for content articles
- Video showcase gallery with filtering
- Interactive contact form
- YouTube video integration
- Social media feeds
- Newsletter subscription
- Analytics dashboard

---

## Credits

**Portfolio Created By:** Aditya ([@code-by-adi7](https://github.com/code-by-adi7))  
**Portfolio For:** Sanu Siril - YouTube Creator & Vlogger  
**Framework:** Next.js + React + TypeScript  
**Hosting:** Vercel

---

## Notes

This portfolio showcases:
- Modern web development practices
- TypeScript for type safety
- Next.js optimization techniques
- Responsive design principles
- Professional portfolio standards

Built with passion for creating engaging digital experiences!

---

**Last Updated:** July 2026  
**Next.js Version:** 14+  
**Node Version:** 16+
