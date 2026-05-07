/* Home - Good vs. Great
   Brand Guidelines v2: Dark Editorial Intelligence
   Section order:
   01 Hero → 02 Problem → 03 Decision Layer → 04 Distinction → 05 Proof
   → 06 Pricing → 07 Mutual Fit → 08 Founder Story → 09 FAQ → 10 Booking
   → 11 Closing → Footer */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import GoodVsGreatBlock from "@/components/GoodVsGreatBlock";
import ProofSection from "@/components/ProofSection";
import PricingSection from "@/components/PricingSection";
import FitSection from "@/components/FitSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import BookingSection from "@/components/BookingSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#0D1117", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <GoodVsGreatBlock />
      <ProofSection />
      <PricingSection />
      <FitSection />
      <AboutSection />
      <FAQSection />
      <BookingSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
