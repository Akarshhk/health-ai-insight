const SplineBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* 
        Replace the URL below with your actual Spline scene URL.
        Using spline-viewer web component via script tag in index.html,
        or the @splinetool/react-spline package.
      */}
      <iframe
        src="https://my.spline.design/healthai3dscene-placeholder"
        className="h-full w-full border-none"
        style={{ pointerEvents: "none" }}
        title="3D Background"
        loading="lazy"
      />
      {/* Fallback animated gradient background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute right-1/4 bottom-1/3 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[80px] animate-pulse-glow" style={{ animationDelay: "0.8s" }} />
        </div>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
    </div>
  );
};

export default SplineBackground;
