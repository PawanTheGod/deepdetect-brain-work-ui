import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AnalysisSection from "@/components/AnalysisSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import TechnologyStack from "@/components/TechnologyStack";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import Limitations from "@/components/Limitations";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import InteractiveBackground from "@/components/InteractiveBackground";

const Index = () => {
  const analysisSectionRef = useRef<HTMLElement>(null);

  const scrollToAnalysis = () => {
    analysisSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <GridBackground />
      <InteractiveBackground />
      <Header />
      <main>
        <Hero onAnalyzeClick={scrollToAnalysis} />
        <AnalysisSection sectionRef={analysisSectionRef} />
        <HowItWorks />
        <TechnologyStack />
        <ProcessingPipeline />
        <Limitations />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
