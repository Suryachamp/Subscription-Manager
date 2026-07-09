import LandingNavbar from "../../components/layout/navbar/LandingNavbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

/**
 * Landing Page Wrapper Component
 * 
 * Think of this as the main "container" for the home page. It imports all the individual
 * sections (Navbar, Hero, Features, CTA, Footer) and stacks them on top of each other
 * to create the full scrolling page.
 */
function Landing() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;