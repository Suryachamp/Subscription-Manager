import LandingNavbar from "../../components/layout/navbar/LandingNavbar";
import Hero from "../../components/landing/Hero";
import Features from "../../components/landing/Features";
import Stats from "../../components/landing/Stats";
import CTA from "../../components/landing/CTA";
import Footer from "../../components/landing/Footer";

function Landing() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)]">
      <LandingNavbar />
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}

export default Landing;