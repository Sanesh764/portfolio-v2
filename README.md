# Premium MERN Developer Portfolio — V2

[![Live Demo](https://img.shields.io/badge/Live_Demo-AWS_Amplify-FF9900?style=flat-square&logo=amazon-aws)](https://main.d3add5rrxtdy8u.amplifyapp.com/)
[![React Version](https://img.shields.io/badge/React-19.0.0-61dafb.svg?style=flat-facing&logo=react)](https://react.dev)
[![Vite Version](https://img.shields.io/badge/Vite-8.1.1-646cff.svg?style=flat-facing&logo=vite)](https://vite.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.2-ff0055.svg?style=flat-facing&logo=framer)](https://framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

🔗 **Live Preview:** [https://main.d3add5rrxtdy8u.amplifyapp.com/](https://main.d3add5rrxtdy8u.amplifyapp.com/)

A high-performance, dark/light theme MERN Stack developer portfolio designed to impress technical recruiters at top-tier product companies (Google, Microsoft, Amazon, Atlassian, NVIDIA). Built from scratch using **React 19**, **Vite**, **Framer Motion**, and **CSS Modules**.

---

## ✨ Key Features

- **🌓 Dynamic Theme System:** Built-in Light/Dark mode toggling that respects system settings and persists selections inside `localStorage`.
- **🚀 Ultra-fast Performance:** Optimized bundling via Vite, lazy-loaded components, and responsive image configurations.
- **✨ Micro-Animations:** Staggered physics-based scrolls, spring scales, floating particles, and rotating icon reveals powered by Framer Motion.
- **🛠️ Automated Credentials Gallery:** Scans the `src/assets/certificate` directory automatically using Vite's `import.meta.glob()`. Includes instant search, categorization count tabs, and full-screen lightbox previews.
- **📊 Detailed Project Cards:** Outlines tech stacks, live demonstration buttons, source code repositories, deployment targets, and bulleted project feature highlights.
- **🔍 SEO & Schema Structured Data:** Complete JSON-LD Person schema markup injected inside the HTML head, accompanied by pre-configured `robots.txt` and `sitemap.xml`.

---

## 📁 Folder Structure

```
portfolio-v2/
├── public/
│   ├── robots.txt           # Search Engine crawl directives
│   ├── sitemap.xml          # Site navigation maps
│   └── sanesh1.jpg          # Profile photography asset
├── src/
│   ├── assets/
│   │   └── certificate/     # Certificate repository (png, jpg, webp)
│   ├── components/          # Reusable layout sections
│   │   ├── About/           # Dynamic status badge, profile bio
│   │   ├── Certificates/    # Gallery controls & lightbox preview
│   │   ├── Contact/         # Client-side input validation form
│   │   ├── Experience/      # Interactive chronological timeline
│   │   ├── Footer/          # Quick navigation and copywright details
│   │   ├── Hero/            # Header, stats counter, call-to-actions
│   │   ├── Loader/          # Seamless intro transition preloader
│   │   ├── Navbar/          # Frosted scrolled header, hamburger toggles
│   │   ├── Projects/        # Project display grids & cards
│   │   ├── ScrollToTop/     # Floating to-top pointer
│   │   └── Skills/          # 8-tier categorized tech skills section
│   ├── context/
│   │   └── ThemeContext.jsx # Light/Dark state provider
│   ├── data/
│   │   └── portfolio.jsx    # Central configurations file
│   ├── App.css              # Custom overrides
│   ├── App.jsx              # Application manager
│   ├── index.css            # Stylesheets tokens & variables
│   └── main.jsx             # DOM mounting setup
├── index.html               # Head metadata, icons & structured data
├── package.json             # Core dependency management
└── vite.config.js           # Compilation configuration settings
```

---

## 🚀 Installation & Local Run

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 1. Setup project
```bash
git clone https://github.com/Sanesh764/portfolio-v2.git
cd portfolio-v2
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:5173` inside your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated inside the `dist/` directory.

---

## ⚙️ How to Customize

All textual content, projects, education details, statistics, and social links can be updated by modifying a single file:
👉 **`src/data/portfolio.jsx`**

### Adding New Certificates
1. Drop your certificate image (`.png`, `.jpg`, `.jpeg`, or `.webp`) into the `src/assets/certificate/` folder.
2. The portfolio will automatically parse, clean the filename into Title Case, categorize it, and add it to the gallery. No code changes needed!

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
