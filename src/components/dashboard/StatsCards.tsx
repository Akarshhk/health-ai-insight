import { Activity, AlertTriangle, FileCheck, HeartPulse } from "lucide-react";
import type { HealthCheck } from "@/lib/healthStore";

interface Props {
  checks: HealthCheck[];
}

const StatsCards = ({ checks }: Props) => {
  const totalChecks = checks.length;
  const highRisk = checks.filter((c) => c.urgency === "High").length;
  const last = checks[0];
  const overallStatus = highRisk > totalChecks / 3 ? "Critical" : highRisk > 0 ? "Monitor" : "Stable";
  const statusColor = overallStatus === "Critical" ? "text-urgency-red" : overallStatus === "Monitor" ? "text-warning-yellow" : "text-health-green";
  const statusEmoji = overallStatus === "Critical" ? "🔴" : overallStatus === "Monitor" ? "🟡" : "🟢";

  const cards = [
    {
      label: "Total Checks",
      value: totalChecks.toString(),
      icon: FileCheck,
      accent: "text-primary",
    },
    {
      label: "High Risk Alerts",
      value: highRisk.toString(),
      icon: AlertTriangle,
      accent: "text-urgency-red",
    },
    {
      label: "Last Result",
      value: last ? `${last.condition}` : "—",
      sub: last ? last.urgency : undefined,
      icon: Activity,
      accent: "text-primary",
    },
    {
      label: "Health Status",
      value: `${statusEmoji} ${overallStatus}`,
      icon: HeartPulse,
      accent: statusColor,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          data-animate
          className="glass-panel rounded-xl p-4 md:p-5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {card.label}
            </span>
            <card.icon className={`h-4 w-4 ${card.accent}`} />
          </div>
          <p className={`font-display text-xl font-bold md:text-2xl ${card.accent}`}>
            {card.value}
          </p>
          {card.sub && (
            <span className={`text-xs mt-1 inline-block ${
              card.sub === "High" ? "text-urgency-red" : card.sub === "Medium" ? "text-warning-yellow" : "text-health-green"
            }`}>
              {card.sub} urgency
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
