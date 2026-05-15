import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Vision from "@/components/sections/Vision";
import Features from "@/components/sections/Features";
import Story from "@/components/sections/Story";
import Challenges from "@/components/sections/Challenges";
import GrowthModel from "@/components/sections/GrowthModel";
import Comparison from "@/components/sections/Comparison";
import Calculator from "@/components/sections/Calculator";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyChoose from "@/components/sections/WhyChoose";
import PartnershipForm from "@/components/sections/PartnershipForm";
import Disclosure from "@/components/sections/Disclosure";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <Features />
      <Story />
      <Challenges />
      <GrowthModel />
      <Comparison />
      <Calculator />
      <HowItWorks />
      <WhyChoose />
      <PartnershipForm />
      <Disclosure />
      <Footer />
    </main>
  );
}