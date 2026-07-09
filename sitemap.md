# 🗺️ Project Sitemap & Beginner's Guide

Welcome to the **Subscription Manager**! If you're a beginner trying to understand how this project is built, this guide will serve as your map. It explains how the folders are organized, where to find specific code, and how everything connects.

---

## 🏗️ Folder Structure Overview

This is a "Full-Stack" application, meaning it has two main parts:
1. **Frontend (Client)**: The visual part the user interacts with (built with React + Vite).
2. **Backend (Server)**: The brain behind the scenes that talks to the database (built with Node.js + Express).

```text
Subscription Manager/
│
├── client/                 <-- The Frontend (React UI)
│   ├── index.html          <-- The main HTML file that loads React
│   ├── package.json        <-- Lists all frontend dependencies (like react, tailwindcss)
│   └── src/                <-- All of our React code lives here!
│
├── server/                 <-- The Backend (API & Database)
│   ├── package.json        <-- Lists all backend dependencies (like express, nodemon)
│   ├── server.js           <-- The main entry point that starts the server
│   └── app.js              <-- Where the API routes are configured
│
├── README.md               <-- General instructions on how to run the project
└── each day work track.md  <-- A developer log of daily progress
```

---

## 🎨 Inside the Frontend (`client/src/`)

This is where all the UI magic happens. We use **React**, **Tailwind CSS**, and **Framer Motion** for animations.

### 1. The Entry Point
- **`main.jsx`**: This is the very first file that runs. It takes our React code and injects it into the browser. It also sets up `<BrowserRouter>` which allows us to have different pages (like `/login` and `/dashboard`).
- **`App.jsx`**: This is our router. It looks at the URL (e.g., if you go to `/login`) and decides which page component to show you on the screen.
- **`index.css`**: Our main stylesheet. It loads Tailwind CSS, sets up our custom color theme (using CSS variables like `--accent`), and creates reusable utility classes (like `.glass-card`).

### 2. Pages (`src/pages/`)
Pages are the main "screens" of the app.
- **`landing/Landing.jsx`**: The home page you see when logged out. It acts as a wrapper that stacks the Navbar, Hero, Features, CTA, and Footer on top of each other.
- **`landing/Background.jsx`**: A special component that just renders the cool blurry orange blobs and grid pattern behind the landing page.

### 3. Components (`src/components/`)
Components are reusable building blocks. We break pages down into components so our code stays clean and easy to read.
- **`landing/`**: Pieces specific to the Landing Page.
  - `Hero.jsx`: The big title and "Start Tracking" buttons at the top of the page.
  - `Features.jsx`: The grid of 6 cards explaining what the app does.
  - `CTA.jsx`: The "Call to Action" section at the bottom asking users to sign up.
  - `Footer.jsx`: The bottom bar with social links and copyright.
- **`layout/`**: Pieces that wrap around other content.
  - `navbar/LandingNavbar.jsx`: The top navigation bar with the logo and "Get Started" button.
- **`ui/`**: Tiny, highly reusable pieces (like buttons or inputs).
  - `Button.jsx`: Our custom button component that we use everywhere. It has different styles (primary, secondary, ghost) built-in.
- **`common/`**: Pieces shared across different parts of the app.
  - `cards/WalletCard.jsx`: The cool 3D tilted card showing Netflix and Spotify subscriptions in the Hero section.

---

## 🧠 How to Read the Code (For Beginners)

1. **Start at `App.jsx`**: Look at the routes. See how the path `/` points to `<Landing />`.
2. **Go to `Landing.jsx`**: See how the page is just a stack of components (`<Hero />`, `<Features />`, etc.).
3. **Dive into a Component**: Open `Hero.jsx`. You'll see standard HTML tags (like `<div>` and `<h1>`), mixed with React components (like `<Button>`), mixed with animation tags (like `<motion.div>`).
4. **Look at the CSS Classes**: We use Tailwind CSS, so instead of writing custom CSS for every element, we use classes like `flex`, `items-center`, `text-white`. If you don't know what a class does, hover over it (if using VS Code) or look it up in the Tailwind documentation!
5. **Check `index.css`**: If you see a class that isn't Tailwind (like `glass-card` or `bg-[var(--bg-primary)]`), you will find how it is built in `index.css`.

Happy coding! 🚀
