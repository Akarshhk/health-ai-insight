import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplineBackground from "@/components/SplineBackground";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCards from "@/components/dashboard/StatsCards";
import HistoryList from "@/components/dashboard/HistoryList";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import { getChecks, seedDemoData, type HealthCheck } from "@/lib/healthStore";

const Dashboard = () => {
  const [checks, setChecks] = useState<HealthCheck[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    seedDemoData();
    setChecks(getChecks());
  }, []);

  useEffect(() => {
    if (!contentRef.current || checks.length === 0) return;
    const els = contentRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.2,
    });
  }, [checks]);

  return (
    <div className="relative min-h-screen bg-background">
      <SplineBackground />
      <DashboardHeader />
      <main ref={contentRef} className="relative z-10 container mx-auto px-4 md:px-6 pt-24 pb-12">
        <StatsCards checks={checks} />
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_320px]">
          <HistoryList checks={checks} />
          <InsightsPanel checks={checks} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
