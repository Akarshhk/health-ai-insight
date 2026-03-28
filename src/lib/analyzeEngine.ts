import { saveCheck, type HealthCheck } from "./healthStore";

interface AnalysisResult {
  condition: string;
  confidence: number;
  urgency: "Low" | "Medium" | "High";
  recommendation: string;
  topConditions: { name: string; confidence: number }[];
}

const CONDITIONS_MAP: Record<string, AnalysisResult> = {
  "chest pain": {
    condition: "Cardiac Risk",
    confidence: 85,
    urgency: "High",
    recommendation: "Seek immediate medical attention. Do not ignore chest pain.",
    topConditions: [
      { name: "Cardiac Risk", confidence: 85 },
      { name: "Anxiety Attack", confidence: 45 },
      { name: "Acid Reflux", confidence: 30 },
    ],
  },
  "shortness of breath": {
    condition: "Respiratory Distress",
    confidence: 80,
    urgency: "High",
    recommendation: "Consult a doctor immediately if breathing difficulty persists.",
    topConditions: [
      { name: "Respiratory Distress", confidence: 80 },
      { name: "Asthma", confidence: 60 },
      { name: "Anxiety", confidence: 35 },
    ],
  },
  fever: {
    condition: "Flu",
    confidence: 78,
    urgency: "Medium",
    recommendation: "Rest, stay hydrated, and consult a doctor if symptoms persist beyond 3 days.",
    topConditions: [
      { name: "Flu", confidence: 78 },
      { name: "Common Cold", confidence: 55 },
      { name: "Dengue", confidence: 30 },
    ],
  },
  headache: {
    condition: "Tension Headache",
    confidence: 72,
    urgency: "Low",
    recommendation: "Rest in a dark room, stay hydrated, and consider OTC pain relief.",
    topConditions: [
      { name: "Tension Headache", confidence: 72 },
      { name: "Migraine", confidence: 50 },
      { name: "Dehydration", confidence: 40 },
    ],
  },
  vomiting: {
    condition: "Gastroenteritis",
    confidence: 74,
    urgency: "Medium",
    recommendation: "Stay hydrated with oral rehydration salts. Seek help if vomiting persists.",
    topConditions: [
      { name: "Gastroenteritis", confidence: 74 },
      { name: "Food Poisoning", confidence: 60 },
      { name: "Migraine", confidence: 25 },
    ],
  },
};

const DEFAULT_RESULT: AnalysisResult = {
  condition: "General Discomfort",
  confidence: 55,
  urgency: "Low",
  recommendation: "Monitor symptoms and consult a healthcare provider if they worsen.",
  topConditions: [
    { name: "General Discomfort", confidence: 55 },
    { name: "Stress-Related", confidence: 40 },
    { name: "Mild Infection", confidence: 30 },
  ],
};

export function analyzeSymptoms(input: string): AnalysisResult {
  const symptoms = input.toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
  
  // Check for high-urgency keywords first
  for (const s of symptoms) {
    if (s.includes("chest pain") || s.includes("shortness of breath")) {
      return CONDITIONS_MAP[s] || CONDITIONS_MAP["chest pain"];
    }
  }

  // Find best match
  for (const s of symptoms) {
    for (const key of Object.keys(CONDITIONS_MAP)) {
      if (s.includes(key)) return CONDITIONS_MAP[key];
    }
  }

  // Combine fever + headache → Flu with higher confidence
  const hasFever = symptoms.some((s) => s.includes("fever"));
  const hasHeadache = symptoms.some((s) => s.includes("headache"));
  if (hasFever && hasHeadache) {
    return { ...CONDITIONS_MAP["fever"], confidence: 85 };
  }

  return DEFAULT_RESULT;
}

export function analyzeAndSave(input: string): AnalysisResult & { id: string } {
  const result = analyzeSymptoms(input);
  const symptoms = input.split(",").map((s) => s.trim()).filter(Boolean);
  const check: HealthCheck = {
    id: crypto.randomUUID(),
    symptoms,
    condition: `${result.condition} (${result.confidence}%)`,
    urgency: result.urgency,
    timestamp: Date.now(),
  };
  saveCheck(check);
  return { ...result, id: check.id };
}
