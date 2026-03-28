import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import type { HealthCheck } from "@/lib/healthStore";
import { formatTimeAgo } from "@/lib/healthStore";

interface Props {
  checks: HealthCheck[];
}

const urgencyStyles: Record<string, string> = {
  Low: "bg-health-green/20 text-health-green border-health-green/30",
  Medium: "bg-warning-yellow/20 text-warning-yellow border-warning-yellow/30",
  High: "bg-urgency-red/20 text-urgency-red border-urgency-red/30",
};

const HistoryList = ({ checks }: Props) => {
  const [selected, setSelected] = useState<HealthCheck | null>(null);

  return (
    <>
      <div data-animate className="glass-panel rounded-xl p-4 md:p-5">
        <h2 className="font-display text-lg font-semibold mb-4">History</h2>
        <ScrollArea className="h-[340px] md:h-[400px] pr-2">
          <div className="space-y-3">
            {checks.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No checks yet</p>
            )}
            {checks.map((check) => (
              <button
                key={check.id}
                onClick={() => setSelected(check)}
                className="w-full text-left glass-panel rounded-lg p-3 md:p-4 transition-all hover:bg-muted/40 hover:scale-[1.01] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {check.condition}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {check.symptoms.join(", ")}
                    </p>
                  </div>
                  <Badge className={`shrink-0 text-[10px] ${urgencyStyles[check.urgency]}`}>
                    {check.urgency}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground/60 mt-2">
                  {formatTimeAgo(check.timestamp)}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="glass-panel border-border">
          <DialogHeader>
            <DialogTitle className="font-display">{selected?.condition}</DialogTitle>
            <DialogDescription>
              {formatTimeAgo(selected?.timestamp ?? 0)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Symptoms</p>
              <div className="flex flex-wrap gap-1.5">
                {selected?.symptoms.map((s, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Urgency Level</p>
              <Badge className={urgencyStyles[selected?.urgency ?? "Low"]}>
                {selected?.urgency}
              </Badge>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistoryList;
