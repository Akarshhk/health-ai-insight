import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SplineBackground from "@/components/SplineBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SplineBackground />
      <Header />
      <HeroSection />
    </div>
  );
};

export default Index;
