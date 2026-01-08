import { cn } from "@/lib/utils";
import { ConnectionStatus } from "@/hooks/useVoiceAgent";

interface StatusIndicatorProps {
  status: ConnectionStatus;
  sessionId?: string | null;
}

const statusConfig: Record<
  ConnectionStatus,
  { label: string; dotClass: string }
> = {
  idle: { label: "Ready to connect", dotClass: "status-dot-idle" },
  connecting: { label: "Connecting...", dotClass: "status-dot-connecting" },
  connected: { label: "Connected - Listening", dotClass: "status-dot-connected" },
  speaking: { label: "AI Speaking", dotClass: "status-dot-connected" },
  error: { label: "Connection error", dotClass: "status-dot-error" },
};

export const StatusIndicator = ({
  status,
  sessionId,
}: StatusIndicatorProps) => {
  const config = statusConfig[status];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <div className={cn("status-dot", config.dotClass)} />
        <span className="text-sm text-muted-foreground font-medium">
          {config.label}
        </span>
      </div>
      {sessionId && (
        <span className="text-xs text-muted-foreground/60 font-mono">
          Session: {sessionId.slice(0, 20)}...
        </span>
      )}
    </div>
  );
};
