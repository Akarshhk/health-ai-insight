import { TrendingUp, Zap, BarChart3 } from "lucide-react";
import type { HealthCheck } from "@/lib/healthStore";
import { getInsights } from "@/lib/healthStore";

interface Props {
  checks: HealthCheck[];
}

const urgencyDot: Record<string, string> = {
  Low: "🟢",
  Medium: "🟡",
  High: "🔴",
};

const InsightsPanel = ({ checks }: Props) => {
  const { mostFrequent, trend, recent3 } = getInsights(checks);

  const insights = [
    {
      icon: Zap,
      label: "Most Frequent Symptom",
      value: mostFrequent.charAt(0).toUpperCase() + mostFrequent.slice(1),
    },
    {
      icon: TrendingUp,
      label: "Risk Trend",
      value: trend,
      accent: trend === "Increasing" ? "text-urgency-red" : "text-health-green",
    },
    {
      icon: BarChart3,
      label: "Last 3 Results",
      value: recent3.map((u) => urgencyDot[u]).join("  ") || "—",
    },
  ];

  return (
    <div data-animate className="glass-panel rounded-xl p-4 md:p-5 space-y-4">
      <h2 className="font-display text-lg font-semibold">AI Insights</h2>
      {insights.map((item, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-muted p-2">
            <item.icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className={`text-sm font-semibold ${item.accent ?? "text-foreground"}`}>
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsPanel;
