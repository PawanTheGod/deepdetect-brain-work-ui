import { useState } from "react";
import { ChevronDown, ChevronUp, Activity, Microscope, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DetectionResult } from "@/services/detectionApi";

interface DetailedAnalysisProps {
  details: NonNullable<DetectionResult['details']>;
}

const DetailedAnalysis = ({ details }: DetailedAnalysisProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'positive': return 'text-destructive';
      case 'negative': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'detected':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-destructive/10 text-destructive">Detected</span>;
      case 'not_detected':
        return <span className="px-2 py-0.5 text-xs rounded-full bg-success/10 text-success">Not Detected</span>;
      default:
        return <span className="px-2 py-0.5 text-xs rounded-full bg-warning/10 text-warning">Inconclusive</span>;
    }
  };

  const getRiskBadge = (level: string) => {
    const config = {
      critical: 'bg-destructive/10 text-destructive border-destructive/20',
      high: 'bg-destructive/10 text-destructive border-destructive/20',
      medium: 'bg-warning/10 text-warning border-warning/20',
      low: 'bg-success/10 text-success border-success/20',
    };
    return config[level as keyof typeof config] || config.medium;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors"
      >
        <span className="text-sm font-medium text-muted-foreground">
          View Detailed Analysis
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Expandable Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="p-6 pt-2 space-y-6 border-t border-border bg-secondary/30">
          {/* Risk Level */}
          <div className="flex items-center gap-3">
            <AlertCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Risk Level:</span>
            <span className={cn(
              "px-3 py-1 text-xs font-medium rounded-full border capitalize",
              getRiskBadge(details.riskLevel)
            )}>
              {details.riskLevel}
            </span>
          </div>

          {/* Model Signals */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Activity className="w-4 h-4" />
              Model Signals
            </div>
            <div className="grid gap-2">
              {details.models.map((model) => (
                <div 
                  key={model.name}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-foreground">{model.name}</span>
                    {'interpretation' in model && model.interpretation && (
                      <span className="text-xs text-muted-foreground">{model.interpretation}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground tabular-nums">
                      {model.score.toFixed(1)}%
                    </span>
                    <span className={cn("text-xs capitalize", getSignalColor(model.signal))}>
                      {model.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Forensic Checks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Microscope className="w-4 h-4" />
                Forensic Checks
              </div>
              {'forensic_summary' in details && details.forensic_summary && (
                <span className="text-xs text-muted-foreground">
                  {details.forensic_summary.anomalies_detected}/{details.forensic_summary.total_tests} anomalies
                </span>
              )}
            </div>
            <div className="grid gap-2">
              {details.forensics.map((check) => (
                <div 
                  key={check.name}
                  className="p-3 bg-background rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{check.name}</span>
                    {getStatusBadge(check.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">{check.description}</p>
                  {'details' in check && check.details && (
                    <p className="text-xs text-muted-foreground/70 mt-1 italic">{check.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalysis;
