import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-semibold text-foreground tracking-tight">
            Health AI
          </span>
        </div>
        <Button variant="pill-ghost" size="sm" className="rounded-full">
          Get Help
        </Button>
      </div>
    </header>
  );
};

export default Header;
