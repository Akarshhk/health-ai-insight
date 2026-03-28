import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Activity, ArrowRight, BarChart3, Loader2, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import SplineBackground from "@/components/SplineBackground";
import { analyzeAndSave } from "@/lib/analyzeEngine";

const QUICK_SYMPTOMS = ["Fever", "Headache", "Chest Pain", "Vomiting", "Fatigue", "Cough"];

type AnalysisState = "idle" | "loading" | "done";

const Analyze = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [state, setState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<ReturnType<typeof analyzeAndSave> | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formRef.current) return;
    const els = formRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0, y: 30 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.2 });
  }, []);

  useEffect(() => {
    if (state !== "done" || !resultRef.current) return;
    const els = resultRef.current.querySelectorAll("[data-animate]");
    gsap.set(els, { opacity: 0, y: 20 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, delay: 0.1 });
  }, [state]);

  const addQuickSymptom = (symptom: string) => {
    const current = input.split(",").map((s) => s.trim()).filter(Boolean);
    if (!current.some((s) => s.toLowerCase() === symptom.toLowerCase())) {
      setInput(current.length > 0 ? `${input}, ${symptom.toLowerCase()}` : symptom.toLowerCase());
    }
  };

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setState("loading");
    setResult(null);
    setTimeout(() => {
      const res = analyzeAndSave(input);
      setResult(res);
      setState("done");
    }, 1800);
  };

  const handleReset = () => {
    setState("idle");
    setResult(null);
    setInput("");
  };

  const urgencyConfig = {
    Low: { color: "text-health-green", bg: "bg-health-green/10 border-health-green/30", glow: "glow-green", icon: CheckCircle },
    Medium: { color: "text-warning-yellow", bg: "bg-warning-yellow/10 border-warning-yellow/30", glow: "", icon: AlertTriangle },
    High: { color: "text-urgency-red", bg: "bg-urgency-red/10 border-urgency-red/30", glow: "glow-red", icon: AlertTriangle },
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SplineBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-semibold text-foreground tracking-tight">Health AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="pill-ghost" size="sm" className="rounded-full gap-1.5" onClick={() => navigate("/dashboard")}>
              <BarChart3 className="h-3.5 w-3.5" />
              Dashboard
            </Button>
            <Button variant="pill-ghost" size="sm" className="rounded-full">Get Help</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20 pb-12">
        <div className="w-full max-w-xl">

          {/* Input Card */}
          {state !== "done" && (
            <div ref={formRef} className="glass-panel rounded-2xl p-6 md:p-8">
              <div data-animate className="mb-6 text-center">
                <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">Symptom Analyzer</h1>
                <p className="mt-2 text-sm text-muted-foreground">Describe what you're feeling for an instant AI analysis</p>
              </div>

              <div data-animate>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter symptoms (e.g. fever, headache, fatigue)"
                  className="min-h-[100px] resize-none border-border/50 bg-background/40 text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  disabled={state === "loading"}
                />
              </div>

              <div data-animate className="mt-4 flex flex-wrap gap-2">
                {QUICK_SYMPTOMS.map((s) => (
                  <button
                    key={s}
                    onClick={() => addQuickSymptom(s)}
                    disabled={state === "loading"}
                    className="rounded-full border border-border/50 bg-secondary/50 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div data-animate className="mt-6">
                <Button
                  variant="pill"
                  size="lg"
                  className="w-full rounded-full gap-2 text-base"
                  onClick={handleAnalyze}
                  disabled={!input.trim() || state === "loading"}
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing symptoms…
                    </>
                  ) : (
                    <>
                      Analyze Symptoms
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Result Card */}
          {state === "done" && result && (
            <div ref={resultRef} className="space-y-4">
              {/* Urgency Badge */}
              <div data-animate className={`glass-panel rounded-2xl p-6 text-center border ${urgencyConfig[result.urgency].bg} ${urgencyConfig[result.urgency].glow}`}>
                {(() => {
                  const Icon = urgencyConfig[result.urgency].icon;
                  return <Icon className={`mx-auto h-10 w-10 ${urgencyConfig[result.urgency].color} ${result.urgency === "High" ? "animate-pulse" : ""}`} />;
                })()}
                <p className={`mt-3 font-display text-2xl font-bold ${urgencyConfig[result.urgency].color}`}>
                  {result.urgency} Urgency
                </p>
              </div>

              {/* Condition */}
              <div data-animate className="glass-panel rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Detected Condition</p>
                <p className="mt-1 font-display text-xl font-semibold text-foreground">
                  {result.condition} ({result.confidence}%)
                </p>
              </div>

              {/* Recommendation */}
              <div data-animate className="glass-panel rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Recommendation</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">{result.recommendation}</p>
              </div>

              {/* Top Conditions */}
              <div data-animate className="glass-panel rounded-2xl p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Possible Conditions</p>
                <div className="space-y-2">
                  {result.topConditions.map((c) => (
                    <div key={c.name} className="flex items-center justify-between">
                      <span className="text-sm text-foreground/80">{c.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${c.confidence}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{c.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div data-animate className="flex items-start gap-2 rounded-xl bg-secondary/30 px-4 py-3">
                <Info className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">This is not a medical diagnosis. Always consult a qualified healthcare professional.</p>
              </div>

              {/* Actions */}
              <div data-animate className="flex gap-3">
                <Button variant="pill-ghost" size="lg" className="flex-1 rounded-full" onClick={handleReset}>
                  New Check
                </Button>
                <Button variant="pill" size="lg" className="flex-1 rounded-full gap-1.5" onClick={() => navigate("/dashboard")}>
                  <BarChart3 className="h-4 w-4" />
                  View Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Analyze;
