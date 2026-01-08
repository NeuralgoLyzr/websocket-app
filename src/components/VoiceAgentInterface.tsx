import { useVoiceAgent } from "@/hooks/useVoiceAgent";
import { VoiceOrb } from "./VoiceOrb";
import { StatusIndicator } from "./StatusIndicator";
import { Button } from "@/components/ui/button";
import { Mic, Phone, PhoneOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const VoiceAgentInterface = () => {
  const { status, error, sessionId, transcripts, startSession, disconnect, isConnected } =
    useVoiceAgent();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Auto-scroll to latest transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcripts]);

  const handleStart = async () => {
    try {
      // Request microphone permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await startSession();
      toast({
        title: "Connected",
        description: "Voice agent is now active",
      });
    } catch (err) {
      toast({
        title: "Permission Required",
        description: "Please allow microphone access to use the voice agent",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Disconnected",
      description: "Voice session ended",
    });
  };

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Voice Orb */}
      <div className="relative">
        <VoiceOrb status={status} />
      </div>

      {/* Status */}
      <StatusIndicator status={status} sessionId={sessionId} />

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!isConnected ? (
          <Button
            variant="glow"
            size="xl"
            onClick={handleStart}
            disabled={status === "connecting"}
            className="min-w-[180px]"
          >
            {status === "connecting" ? (
              <>
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Start Call
              </>
            )}
          </Button>
        ) : (
          <>
            <Button
              variant="glass"
              size="icon-lg"
              className="rounded-full"
              disabled
            >
              {status === "speaking" ? (
                <Mic className="w-6 h-6 text-primary" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>

            <Button
              variant="destructive"
              size="xl"
              onClick={handleDisconnect}
              className="min-w-[180px]"
            >
              <PhoneOff className="w-5 h-5" />
              End Call
            </Button>
          </>
        )}
      </div>

      {/* Transcript Display */}
      {isConnected && (
        <div className="glass rounded-xl p-6 w-full max-w-[1400px] gradient-border">
          <h3 className="text-base font-semibold text-foreground mb-4">Conversation</h3>
          <ScrollArea className="h-72" ref={scrollRef}>
            <div className="space-y-4 pr-4">
              {transcripts.length === 0 ? (
                <p className="text-sm text-muted-foreground/60 text-center py-8">
                  Start speaking to see the transcript...
                </p>
              ) : (
                transcripts.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-primary/20 text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <span className="text-xs font-medium text-muted-foreground block mb-1.5">
                        {msg.role === "user" ? "You" : "Agent"}
                      </span>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Instructions */}
      {!isConnected && (
        <div className="glass rounded-xl p-6 max-w-md text-center gradient-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Click 'Start Call' to connect with the AI voice agent. Make sure to allow microphone access when prompted.
          </p>
        </div>
      )}
    </div>
  );
};
