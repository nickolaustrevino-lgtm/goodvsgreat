/* =============================================================
   GOOD VS. GREAT — HOME PAGE
   Design: Dark Editorial Intelligence
   - Deep Navy (#1A1A2E) / Charcoal Dark (#2D2D2D) backgrounds
   - Electric Blue (#2979FF) accents only
   - Space Mono headings, IBM Plex Sans body, IBM Plex Mono labels
   ============================================================= */

import { useEffect, useRef, useState } from "react";
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
  // Intersection observer for fade-up animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".fade-up");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1A1A2E", color: "#FFFFFF" }}>
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
