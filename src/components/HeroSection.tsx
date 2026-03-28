import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle } from "lucide-react";
import gsap from "gsap";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll("[data-animate]");
    gsap.set(elements, { opacity: 0, y: 40 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.3,
    });
  }, []);

  return (
    <section className="relative z-10 flex min-h-screen items-end pb-16 md:pb-24">
      {/* Bottom gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      <div
        ref={containerRef}
        className="container relative mx-auto px-6"
      >
        <div className="max-w-2xl">
          <p
            data-animate
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary"
          >
            AI-powered health awareness
          </p>

          <h1
            data-animate
            className="text-gradient-hero font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Understand your symptoms instantly
          </h1>

          <p
            data-animate
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Get quick insights, urgency level, and next steps in seconds
          </p>

          <div data-animate className="mt-8 flex flex-wrap gap-4">
            <Button variant="pill" size="lg" className="rounded-full gap-2 px-8 text-base">
              Start Health Check
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="pill-danger" size="lg" className="rounded-full gap-2 px-8 text-base">
              <AlertTriangle className="h-4 w-4" />
              Emergency Check
            </Button>
          </div>

          <p
            data-animate
            className="mt-6 text-xs text-muted-foreground/60"
          >
            Not a substitute for professional medical advice
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
