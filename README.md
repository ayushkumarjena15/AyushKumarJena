<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=My%20Digital%20Universe&fontSize=90&animation=fadeIn&fontAlignY=38&desc=Ayush%20Kumar%20Jena's%20Portfolio&descAlignY=51&descAlign=62" alt="Header Graphic" />
  
  <h1 align="center">Hi, I'm Ayush Kumar Jena 👋</h1>
  <p align="center">
    <a href="https://ayushkumarjena.in"><strong>🌐 Live Portfolio: ayushkumarjena.in</strong></a>
  </p>
  <p align="center">
    <strong>A breathtakingly beautiful, high-performance portfolio crafted with React & Vite.</strong>
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#uiux-highlights">UI/UX Highlights</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#connect-with-me">Connect</a>
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  </p>
</div>

<br />

Welcome to my digital presence! This repository houses the source code for my personal portfolio. It's more than just a resume—it's an interactive web experience featuring beautiful animations, a minimalist command palette, a living guestbook, and my creative labs.

<br />

## ✨ Features

- 🌌 **Immersive Interactions:** Advanced animations using `framer-motion` for a smooth, premium feel.
- ⌨️ **Command Palette:** Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to bring up an omni-search palette to quickly navigate pages.
- 📓 **Live Guestbook:** OAuth-powered guestbook authenticated via Supabase where visitors can log their visits.
- 📞 **Book a Call:** Native integration with `@calcom/embed-react` to schedule meetings directly from the portfolio.
- 💻 **Uses Page:** A specialized layout showcasing my hardware and software stack.
- 📝 **Blog Integration:** A beautifully designed reading experience for deep dives and technical writing.
- 🎨 **Digital Presence (Spotify):** An interactive `Socials` component with embedded Spotify soundscapes.
- 📊 **GitHub Activity Graph:** Real-time GitHub contributions rendered with `react-github-calendar`.
- 🔮 **Glassmorphism & Grids:** A premium dark UI built with stunning Tailwind utility classes.
- 📈 **Analytics:** Tracked automatically using Vercel Analytics.

---

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | React 18 & Vite |
| **Styling** | Tailwind CSS & PostCSS |
| **Animations** | Framer Motion & CSS keyframes |
| **Icons** | Lucide React & React Icons |
| **Routing** | React Router DOM |
| **Backend/Auth** | Supabase (PostgreSQL & OAuth) |
| **Analytics** | @vercel/analytics |

---

## 🎨 UI/UX Highlights

This project was built with **Aesthetics & Performance** at its core. 
- **Typography & Colors:** High-contrast accent colors blended with deep dark background hues to create an immersive, futuristic reading experience.
- **Micro-Animations:** Buttons, cards, and links feature subtle scale and color transitions upon hover/focus (`hover:scale`, `hover:translate-y`).
- **Responsive Design:** 100% mobile, tablet, and desktop friendly using Tailwind's robust grid and flexbox utilities.
- **Smart Loading States:** Beautiful pre-loaders and skeleton screens to mask content fetching.
- **Scroll Effects:** Parallax, entry animations, and scroll indicators that guide the user journey effortlessly.

---

## 🚀 Getting Started

Want to run this project locally to explore the architecture or spin up something similar? Follow these steps:

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayushkumarjena15/AyushKumarJena.git
   cd AyushKumarJena
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory. Add the following config keys (you'll need a Supabase project for the guestbook feature to work):
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *(Note: Never commit your actual API keys. The app will fallback gracefully if these are not provided, simply masking auth-only features).*

4. **Spin up the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**  
   Navigate to `http://localhost:5173` to experience the portfolio!

---

## 📁 Directory Structure Overview

```text
📦 src
 ┣ 📂 assets           # Static images, fonts, and SVGs
 ┣ 📂 components       # Reusable React components (Navbar, Footer, BentoGrid, Hero, etc.)
 ┣ 📂 data             # Local JSON/JS static config data files
 ┣ 📂 pages            # Top-level Page components (Home, About, Projects, Guestbook, etc.)
 ┣ 📜 App.jsx          # Main App shell featuring Routing & Auth State management
 ┣ 📜 index.css        # Global CSS & Tailwind imports
 ┣ 📜 main.jsx         # React DOM entry point
 ┗ 📜 supabaseClient.js# Supabase configuration & initialization
```

---

## 🤝 Connect With Me

I am always **happy to collaborate and connect with you!** Whether you have a project idea, want to talk tech, or just say hi, my inbox is open.

<div align="center">
  <a href="https://www.linkedin.com/in/ayush-kumar-jena-b19151321/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://x.com/AyushJena1504">
    <img src="https://img.shields.io/badge/Twitter/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" />
  </a>
  <a href="https://www.instagram.com/ig_ayush099/">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" />
  </a>
  <a href="mailto:ahalyajena28@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
</div>

<br />

<div align="center">
  <a href="#">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&pause=1000&color=38B2AC&center=true&vCenter=true&width=435&lines=Building+experiences..;Crafting+code..;Solving+problems.." alt="Typing SVG" />
  </a>
</div>

<p align="center">
  <i>Designed and built by Ayush Kumar Jena.</i>
</p>
