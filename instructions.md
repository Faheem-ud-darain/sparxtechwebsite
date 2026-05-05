# System Prompt: SPARX Studioz Website Development

## 1. Project Context & Brand Identity
You are building a premium, highly interactive full stack website for "SPARX Studioz & Technologies"[cite: 1]. 
*   **Slogan:** Technology That Sparks Tomorrow[cite: 1].
*   **Vibe/Aesthetic:** Ultra-modern, dark mode, high-tech, spatial depth, and minimalist UI. The site should feel like a premium digital agency.
*   **Colors:** 
    *   Background: Pitch Black (Modernity & strength)[cite: 1].
    *   Accents/Glows: Green shades (Innovation) and Blue shades (Trust & technology)[cite: 1].
*   **Typography:** Clean, modern sans-serif fonts[cite: 1].
*   **Execution Rule:** Do NOT output truncated code or placeholders. Generate complete, production-ready files with all features fully implemented.

## 2. Tech Stack & Libraries
*   **Framework:** React with Vite.
*   **Styling:** Tailwind CSS. Use `border-white/10` and subtle dark gradients for glassmorphism effects.
*   **Components:** shadcn/ui for accessible, minimalist baseline components.
*   **Animations Engine:** Install and utilize components from `@react-bits` (reactbits.dev) to drive the visual identity. 
*   **Smooth Scroll:** Integrate Lenis (or similar) for frictionless smooth scrolling.

## 3. Global UI Mechanics & Data
*   **Custom Cursor:** Implement the `Blob Cursor` or `Target Cursor` from React Bits, customized to emit a soft Green or Blue glow[cite: 1].
*   **Data File:** Create a `constants.ts` file to hold all text data. Include:
    *   Services: UI/UX Designing, Web Development, WordPress Development, SEO, SMM, Product Photography, Graphics Designing, E-commerce Management, Content Writing, etc.[cite: 1].
    *   Contact: studiozsparx@gmail.com, +92 3095843733[cite: 4].
    *   Address: 2nd floor, Shammal News office, Plot: No 6-A, Small industry state, mandian, Abbottabad, KPK, Pakistan[cite: 4].

## 4. Component Architecture Breakdown

### A. The Header (Minimalist & Glassmorphic)
*   **Positioning:** Fixed at the top, full width. Starts transparent and transitions to heavily blurred frosted glass (`backdrop-blur-md bg-black/40`) upon scroll.
*   **Left Side:** Render the SPARX logo (use text "SPARX" with customized green 'X' if image asset is unavailable).
*   **Right Side:** Keep it ultra-clean. Display ONLY one primary Call-to-Action button (e.g., "Start a Project") and a sleek Hamburger Menu icon. 
*   **Menu Overlay:** The hamburger icon triggers a full-screen drawer containing the full navigation links. Hidden on `md` screens unless opened.

### B. The Hero Section (Above the Fold)
*   **Layout:** 100vh container with a pitch-black background[cite: 1].
*   **Visuals:** Use the `Antigravity` or `Metallic Paint` background components from React Bits to create a dark, glossy, subtly moving 3D environment. Apply high contrast and low brightness, tinted with the brand's Green and Blue[cite: 1].
*   **Typography:** The slogan "Technology That Sparks Tomorrow"[cite: 1] must be front and center.
*   **Interaction:** Ensure the UI text overlays the animated background with `pointer-events-none` where appropriate, allowing the user's cursor to interact with the React Bits canvas underneath.

### C. Services Section (The Sticky Stack)
*   **Layout:** A scroll-triggered "card stacking" layout for the Core Services[cite: 1].
*   **Mechanics:** Wrap the cards using the `Animated Content` component from React Bits. As the user scrolls, the cards should smoothly slide up and overlap.
*   **Styling:** Cards should feature dark glassmorphism styling.

### D. Portfolio / Case Studies Showcase
*   **Layout:** Asymmetrical grid or split-screen.
*   **Mechanics:** Implement the `Animated Content` from React Bits to trigger fade-ins and scale-ups as elements enter the viewport threshold.
*   **Tech Stack Ticker:** At the bottom of this section, implement the `Logo Loop` component from React Bits to create a seamless, infinitely scrolling marquee of the technologies used or client logos.

### E. Footer & Contact
*   **Layout:** Clean, expansive footer.
*   **Content:** Include a functional contact form on one side, and the physical address, email, and phone number[cite: 4] on the other. 
*   **Visuals:** End with a very subtle, glowing radial gradient at the bottom of the page combining the brand colors[cite: 1].

## 5. Headless CMS Integration (Sanity)

*   **Setup:** Initialize Sanity within the project to manage the Portfolio. 
*   **Dependencies:** Install `@sanity/client` and `@sanity/image-url` for the frontend to fetch data.
*   **Database Schema (`sanity/schemas/project.ts`):** Create a Sanity schema for a "Project" document. It must include:
    *   `title` (String): The name of the project.
    *   `slug` (Slug): For generating dynamic URLs (e.g., `/portfolio/my-project`).
    *   `coverImage` (Image): The high-res mockup for the grid.
    *   `category` (String): e.g., Web Dev, UI/UX, SEO.
    *   `challenge` (Block Content): Text describing the problem.
    *   `solution` (Block Content): Text describing the SPARX solution.
    *   `techStack` (Array of Strings): Tools used (e.g., "React", "Node.js").
*   **Frontend Connection (`src/config/sanityClient.ts`):** Create a setup file exporting the configured Sanity client so the React app can fetch data.
*   **Dynamic Routing:** Update `App.tsx` so that `Portfolio.tsx` fetches all projects from Sanity, and `CaseStudy.tsx` uses a dynamic route (`/portfolio/:slug`) to fetch and display the specific project data from Sanity.