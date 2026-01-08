import { cn } from "@/lib/utils";
import { ConnectionStatus } from "@/hooks/useVoiceAgent";

interface VoiceOrbProps {
  status: ConnectionStatus;
  className?: string;
}

export const VoiceOrb = ({ status, className }: VoiceOrbProps) => {
  const isActive = status === "connected" || status === "speaking";
  const isSpeaking = status === "speaking";
  const isConnecting = status === "connecting";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
    >
      {/* Outer glow rings */}
      <div
        className={cn(
          "voice-orb-pulse",
          isActive && "voice-orb-active",
          isSpeaking && "voice-orb-speaking"
        )}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      {isActive && (
        <>
          <div
            className="voice-orb-pulse"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              animationDelay: "0.5s",
            }}
          />
          <div
            className="voice-orb-pulse"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              animationDelay: "1s",
            }}
          />
        </>
      )}

      {/* Main orb */}
      <div
        className={cn(
          "voice-orb w-48 h-48 md:w-64 md:h-64 flex items-center justify-center transition-all duration-500",
          isActive && "glow-primary-intense",
          isConnecting && "animate-pulse"
        )}
      >
        <div className="voice-orb-ring" />
        
        {/* Inner content */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Waveform visualization when speaking */}
          {isSpeaking ? (
            <div className="flex items-center gap-1 h-16">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar w-1.5 md:w-2"
                  style={{
                    height: "100%",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300",
                status === "idle" && "bg-muted-foreground/30",
                isConnecting && "bg-yellow-500/50 animate-pulse",
                status === "connected" && "bg-primary/50",
                status === "error" && "bg-destructive/50"
              )}
            />
          )}
        </div>
      </div>

      {/* Decorative rotating ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border border-dashed border-primary/20 animate-spin-slow",
          !isActive && "opacity-30"
        )}
        style={{ width: "calc(100% + 40px)", height: "calc(100% + 40px)", left: "-20px", top: "-20px" }}
      />
    </div>
  );
};
