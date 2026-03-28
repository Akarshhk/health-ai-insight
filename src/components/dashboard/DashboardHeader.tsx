import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="font-display text-lg font-semibold text-foreground tracking-tight">
          Health Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="pill-ghost"
            size="sm"
            className="rounded-full gap-1.5"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Check
          </Button>
          <Button variant="pill-ghost" size="sm" className="rounded-full">
            Get Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
