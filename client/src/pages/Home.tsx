/* Home — Good vs. Great
   Brand Guidelines v2: Dark Editorial Intelligence
   Background: oklch(16% 0.005 285) — cool near-black charcoal
   All headings: Space Mono 700. Body: IBM Plex Sans. Captions: IBM Plex Mono.
   Accent: Electric Blue (#2979FF) for CTAs, links, accents ONLY. */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import GoodVsGreatBlock from "@/components/GoodVsGreatBlock";
import ProofSection from "@/components/ProofSection";
import PricingSection from "@/components/PricingSection";
import WritingSection from "@/components/WritingSection";
import FitSection from "@/components/FitSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "oklch(16% 0.005 285)", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <GoodVsGreatBlock />
      <ProofSection />
      <PricingSection />
      <WritingSection />
      <FitSection />
      <AboutSection />
      <BookingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
