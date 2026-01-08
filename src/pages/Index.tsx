import { VoiceAgentInterface } from "@/components/VoiceAgentInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-glow-secondary/10 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold text-lg">L</span>
          </div>
          <span className="font-semibold text-lg">David's Tea</span>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-glow text-primary">Voice</span> Agent
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Experience natural conversation with AI-powered voice interaction
          </p>
        </div>

        <VoiceAgentInterface />
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 text-center">
        <p className="text-xs text-muted-foreground/50">
          Powered by Lyzr AI
        </p>
      </footer>
    </div>
  );
};

export default Index;
