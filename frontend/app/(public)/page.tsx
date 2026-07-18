import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedPlaylists from "@/components/landing/FeaturedPlaylists";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <HowItWorks />

      <FeaturedPlaylists />

      <Testimonials />

      <CTA />

      <Footer />
    </>
  );
}