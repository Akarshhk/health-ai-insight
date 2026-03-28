export interface HealthCheck {
  id: string;
  symptoms: string[];
  condition: string;
  urgency: "Low" | "Medium" | "High";
  timestamp: number;
}

const STORAGE_KEY = "health-checks";

export function getChecks(): HealthCheck[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCheck(check: HealthCheck) {
  const checks = getChecks();
  checks.unshift(check);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checks));
}

export function seedDemoData() {
  if (getChecks().length > 0) return;
  const now = Date.now();
  const demo: HealthCheck[] = [
    { id: "1", symptoms: ["fever", "headache", "fatigue"], condition: "Flu", urgency: "Medium", timestamp: now - 2 * 3600000 },
    { id: "2", symptoms: ["chest pain", "shortness of breath"], condition: "Cardiac Risk", urgency: "High", timestamp: now - 8 * 3600000 },
    { id: "3", symptoms: ["runny nose", "sneezing"], condition: "Common Cold", urgency: "Low", timestamp: now - 24 * 3600000 },
    { id: "4", symptoms: ["fever", "rash", "joint pain"], condition: "Dengue", urgency: "High", timestamp: now - 48 * 3600000 },
    { id: "5", symptoms: ["sore throat", "cough"], condition: "Pharyngitis", urgency: "Low", timestamp: now - 72 * 3600000 },
    { id: "6", symptoms: ["fever", "nausea", "abdominal pain"], condition: "Gastroenteritis", urgency: "Medium", timestamp: now - 96 * 3600000 },
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
}

export function getInsights(checks: HealthCheck[]) {
  const symptomCount: Record<string, number> = {};
  checks.forEach((c) => c.symptoms.forEach((s) => { symptomCount[s] = (symptomCount[s] || 0) + 1; }));
  const sorted = Object.entries(symptomCount).sort((a, b) => b[1] - a[1]);
  const mostFrequent = sorted[0]?.[0] || "N/A";

  const recent3 = checks.slice(0, 3).map((c) => c.urgency);
  const highCount = checks.filter((c) => c.urgency === "High").length;
  const trend = highCount > checks.length / 3 ? "Increasing" : "Stable";

  return { mostFrequent, trend, recent3 };
}

export function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}
