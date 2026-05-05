# SPARX Studioz Codebase Architecture & File Structure

## 1. Directory Blueprint
You must strictly adhere to the following file structure when generating the application. Create separate, complete files for every item listed below. Do not use placeholders.

📦 sparx-studioz-web
├── 📂 public
│   └── 📂 assets
├── 📂 src
│   ├── 📂 config
│   │   ├── 📄 constants.ts      # Centralized text data (Services, USPs, Contact info)
│   │   └── 📄 theme.ts          # GLOBAL THEME: Tailwind classes for buttons, glassmorphism, gradients
│   ├── 📂 styles
│   │   └── 📄 globals.css       # Tailwind base and root CSS variables
│   ├── 📂 components
│   │   ├── 📂 ui                # Reusable primitive components
│   │   │   ├── 📄 Button.tsx    # MUST import styling from theme.ts
│   │   │   ├── 📄 Card.tsx      # MUST use glassmorphism styling
│   │   │   └── 📄 Input.tsx     
│   │   ├── 📂 layout            # Global layout components
│   │   │   ├── 📄 Header.tsx    # Glassmorphism navbar with hidden hamburger menu on md+
│   │   │   ├── 📄 Footer.tsx    
│   │   │   └── 📄 SmoothScrollLayout.tsx # Lenis wrapper
│   │   ├── 📂 animations        # @react-bits animation wrappers
│   │   │   ├── 📄 CustomCursor.tsx 
│   │   │   ├── 📄 AnimatedHeroBackground.tsx
│   │   │   └── 📄 LogoLoopTicker.tsx
│   │   └── 📂 sections          # Page-specific sections built from UI components
│   │       ├── 📄 HeroSection.tsx
│   │       ├── 📄 ServicesStack.tsx
│   │       ├── 📄 PortfolioShowcase.tsx
│   │       └── 📄 ContactFormSection.tsx
│   ├── 📂 pages                 # Distinct route views composing multiple sections
│   │   ├── 📄 Home.tsx          
│   │   ├── 📄 About.tsx
│   │   ├── 📄 Services.tsx      
│   │   ├── 📄 Portfolio.tsx     
│   │   ├── 📄 CaseStudy.tsx     
│   │   └── 📄 Contact.tsx
│   ├── 📄 App.tsx               # React Router DOM configuration
│   └── 📄 main.tsx              # React DOM entry point
├── 📄 tailwind.config.js        # Configured with SPARX colors (Black, Green, Blue)
└── 📄 package.json              # Include react, react-router-dom, tailwindcss, @react-bits, lenis

## 2. Architecture & Theming Rules

1.  **Global Theme Enforcement:** You MUST create `src/config/theme.ts` first. Define JavaScript objects containing standard Tailwind class strings for `buttons` (primary glow, secondary outline), `cards` (dark glassmorphism, 1px white/10 borders), and `text` (gradient text). 
2.  **Component Usage:** When building UI components like `src/components/ui/Button.tsx`, it MUST import its styling classes from `theme.ts`. Do not hardcode Tailwind color strings directly into the UI component files.
3.  **Page Composition:** Inside the `src/pages/` directory, files like `Home.tsx` must remain clean and act strictly as wrappers that import block components from `src/components/sections/`. 
4.  **Routing:** Implement `react-router-dom` in `App.tsx` to ensure seamless navigation between the six main pages (`Home`, `About`, `Services`, `Portfolio`, `CaseStudy`, `Contact`).

