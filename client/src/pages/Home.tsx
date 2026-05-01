/* Home — Good vs. Great
   Original site content + structure, GvG brand guidelines applied.
   Background: Off White (#F5F5F5) for light sections, Charcoal Dark (#2D2D2D) for dark sections.
   All headings: Space Mono 700. Body: IBM Plex Sans. Captions: IBM Plex Mono.
   Accent: Electric Blue (#2979FF) for CTAs, links, accents ONLY. */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import ProofSection from "@/components/ProofSection";
import ClientsSection from "@/components/ClientsSection";
import PricingSection from "@/components/PricingSection";
import WritingSection from "@/components/WritingSection";
import FitSection from "@/components/FitSection";
import AboutSection from "@/components/AboutSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <ProofSection />
      <ClientsSection />
      <PricingSection />
      <WritingSection />
      <FitSection />
      <AboutSection />
      <BookingSection />
      <Footer />
    </div>
  );
}
