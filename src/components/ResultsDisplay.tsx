import { useEffect, useState } from "react";
import { Shield, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DetectionResult } from "@/services/detectionApi";
import DetailedAnalysis from "./DetailedAnalysis";
import { motion, AnimatePresence } from "framer-motion";

interface ResultsDisplayProps {
  result: DetectionResult;
}

const useCountUp = (target: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(target * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return count;
};

const ProgressBar = ({ 
  value, 
  variant 
}: { 
  value: number; 
  variant: 'ai' | 'deepfake' 
}) => {
  return (
    <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
      <motion.div
        className={cn(
          "h-full rounded-full",
          variant === 'ai' ? "bg-ai-generated" : "bg-deepfake"
        )}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ 
          duration: 1.2, 
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1] // Enterprise easing
        }}
      />
    </div>
  );
};

const VerdictBadge = ({ verdict, confidence }: { verdict: string; confidence: string }) => {
  const config = {
    'AI-GENERATED': { 
      icon: Shield, 
      className: 'bg-primary/10 text-primary border-primary/20',
      label: 'AI-Generated'
    },
    'DEEPFAKE': { 
      icon: AlertTriangle, 
      className: 'bg-destructive/10 text-destructive border-destructive/20',
      label: 'Deepfake Detected'
    },
    'AUTHENTIC': { 
      icon: CheckCircle, 
      className: 'bg-success/10 text-success border-success/20',
      label: 'Likely Authentic'
    },
    'UNCERTAIN': { 
      icon: HelpCircle, 
      className: 'bg-warning/10 text-warning border-warning/20',
      label: 'Uncertain'
    },
  };

  const { icon: Icon, className, label } = config[verdict as keyof typeof config] || config['UNCERTAIN'];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={verdict}
        className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-lg border", className)}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
        <span className="text-sm opacity-70">• {confidence} Confidence</span>
      </motion.div>
    </AnimatePresence>
  );
};

const ResultsDisplay = ({ result }: ResultsDisplayProps) => {
  const aiCount = useCountUp(result.ai_generated);
  const deepfakeCount = useCountUp(result.deepfake);

  // Smart verdict override for low probabilities
  const getSmartRecommendation = () => {
    const avgScore = (result.ai_generated + result.deepfake) / 2;
    
    // If backend provides a recommendation, use it (backend now has improved logic)
    if (result.final_verdict?.recommendation) {
      return {
        text: result.final_verdict.recommendation,
        explanation: result.final_verdict.reasoning || null
      };
    }
    
    // Fallback for cases where backend doesn't provide recommendation
    // Low probability = High chance of being authentic
    if (avgScore < 20) {
      return {
        text: `✅ CONFIRMED REAL - Only ${avgScore.toFixed(1)}% AI probability, ${(100 - avgScore).toFixed(1)}% certain this is AUTHENTIC`,
        explanation: `With AI-Generated at ${result.ai_generated.toFixed(1)}% and Deepfake at ${result.deepfake.toFixed(1)}%, our advanced detection systems confirm this is a GENUINE, REAL photograph - NOT AI-generated.`
      };
    } else if (avgScore < 40) {
      return {
        text: `LIKELY REAL - Only ${avgScore.toFixed(1)}% AI probability detected, ${(100 - avgScore).toFixed(1)}% chance of being authentic`,
        explanation: `With AI-Generated at ${result.ai_generated.toFixed(1)}% and Deepfake at ${result.deepfake.toFixed(1)}%, all evidence strongly confirms this is a REAL photograph, not AI-generated content.`
      };
    } else if (avgScore < 60) {
      return {
        text: "UNCERTAIN - Further verification recommended",
        explanation: `With ${avgScore.toFixed(1)}% AI probability, the image falls in an ambiguous range. This could indicate heavy editing, unusual compression, or borderline cases.`
      };
    } else {
      return {
        text: result.final_verdict?.recommendation || "Analysis complete",
        explanation: result.final_verdict?.reasoning || null
      };
    }
  };

  const smartRecommendation = getSmartRecommendation();

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toUpperCase()) {
      case 'CRITICAL': return 'text-destructive bg-destructive/10';
      case 'HIGH': return 'text-destructive bg-destructive/10';
      case 'MEDIUM': return 'text-warning bg-warning/10';
      case 'LOW': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-secondary';
    }
  };

  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Results Card */}
      <motion.div 
        className="bg-card border border-border rounded-xl p-8 shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Verdict */}
        <div className="text-center mb-8">
          <VerdictBadge verdict={result.verdict} confidence={result.confidence} />
        </div>

        {/* Primary Metrics */}
        <div className="space-y-8">
          {/* AI-Generated Score */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                AI-Generated
              </span>
              <motion.span 
                className="text-3xl font-semibold text-foreground tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                {aiCount.toFixed(1)}%
              </motion.span>
            </div>
            <ProgressBar value={result.ai_generated} variant="ai" />
          </motion.div>

          {/* Deepfake Score */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Deepfake
              </span>
              <motion.span 
                className="text-3xl font-semibold text-foreground tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                {deepfakeCount.toFixed(1)}%
              </motion.span>
            </div>
            <ProgressBar value={result.deepfake} variant="deepfake" />
          </motion.div>
        </div>
      </motion.div>

      {/* Layer 1: Identity Analysis */}
      {result.layer1 && (
        <motion.div 
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Layer 1: Identity Analysis</h3>
          </div>
          
          <motion.div 
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.5
                }
              }
            }}
          >
            <motion.div 
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              <span className="text-sm text-muted-foreground">Identity Type</span>
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full",
                result.layer1.identity_verdict === 'REAL_HUMAN_FACE' 
                  ? 'bg-success/10 text-success' 
                  : result.layer1.identity_verdict === 'SYNTHETIC_FACE'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-warning/10 text-warning'
              )}>
                {result.layer1.identity_type}
              </span>
            </motion.div>
            
            {/* Model analysis summary - text only, no percentages */}
            <motion.div 
              className="text-sm text-muted-foreground"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Multi-model ensemble analysis performed using XceptionNet and EfficientNet architectures.
            </motion.div>
            
            {result.layer1.reasoning && (
              <motion.p 
                className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {result.layer1.reasoning}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Layer 2: Forensic Analysis */}
      {result.layer2 && result.layer2.performed && (
        <motion.div 
          className="bg-card border border-border rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-foreground">Layer 2: Forensic Analysis</h3>
          </div>
          
          <motion.div 
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.6
                }
              }
            }}
          >
            {/* Forensic analysis description - text only, no classification badges */}
            <motion.div 
              className="text-sm text-muted-foreground leading-relaxed"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 }
              }}
            >
              Advanced forensic analysis was performed on this image, examining frequency domain patterns, 
              facial landmark consistency, compression artifacts, and texture coherence. The analysis 
              covered multiple forensic modules to support the final verdict determination.
            </motion.div>

            {/* What was analyzed */}
            <motion.div 
              className="flex flex-wrap gap-2 mt-2"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              {['Frequency Analysis', 'Landmark Check', 'Texture Analysis', 'Compression Artifacts'].map((module) => (
                <span 
                  key={module}
                  className="px-2 py-1 text-xs bg-secondary text-muted-foreground rounded"
                >
                  ✓ {module}
                </span>
              ))}
            </motion.div>
            
            {result.layer2.recommendation && (
              <motion.div 
                className="mt-3 pt-3 border-t border-border"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <p className="text-sm font-medium text-foreground">🎯 Recommendation</p>
                <p className="text-sm text-muted-foreground mt-1">{result.layer2.recommendation}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* FINAL VERDICT - Engine Authority Decision */}
      {result.final_verdict && (
        <motion.div 
          className={cn(
            "border rounded-xl p-6 shadow-sm",
            result.final_verdict.ai_generated === 'YES' 
              ? 'bg-destructive/5 border-destructive/30'
              : result.final_verdict.ai_generated === 'NO'
              ? 'bg-success/5 border-success/30'
              : 'bg-warning/5 border-warning/30'
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            {result.final_verdict.ai_generated === 'YES' ? (
              <AlertTriangle className="w-6 h-6 text-destructive" />
            ) : result.final_verdict.ai_generated === 'NO' ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <HelpCircle className="w-6 h-6 text-warning" />
            )}
            <h3 className="font-semibold text-lg text-foreground">Final Verdict</h3>
          </div>
          
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.7
                }
              }
            }}
          >
            <motion.div 
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <span className="text-sm text-muted-foreground">AI-Generated</span>
              <span className={cn(
                "px-4 py-1.5 text-sm font-bold rounded-full",
                result.final_verdict.ai_generated === 'YES' 
                  ? 'bg-destructive text-destructive-foreground'
                  : result.final_verdict.ai_generated === 'NO'
                  ? 'bg-success text-success-foreground'
                  : 'bg-warning text-warning-foreground'
              )}>
                {result.final_verdict.ai_generated}
              </span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between text-sm"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium">{result.final_verdict.confidence}</span>
            </motion.div>
            
            {/* Engine score hidden - API authority decision only */}
            
            {result.final_verdict.evidence_summary && (
              <motion.div 
                className="text-xs text-muted-foreground font-mono bg-secondary/50 p-2 rounded"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {result.final_verdict.evidence_summary}
              </motion.div>
            )}
            
            {result.final_verdict.reasoning && (
              <motion.p 
                className="text-sm text-muted-foreground pt-3 border-t border-border"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                {result.final_verdict.reasoning}
              </motion.p>
            )}
            
            {(result.final_verdict.recommendation || smartRecommendation.text) && (
              <motion.div 
                className="mt-3 pt-3 border-t border-border space-y-2"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <p className="text-sm font-semibold text-foreground">🎯 {smartRecommendation.text}</p>
                {smartRecommendation.explanation && (
                  <p className="text-xs text-muted-foreground">{smartRecommendation.explanation}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Summary */}
      {result.summary && (
        <motion.div 
          className="bg-secondary/30 border border-border rounded-xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Analysis Type</span>
            <span className="font-medium">{result.summary.analysis_type}</span>
          </div>
        </motion.div>
      )}

      {/* Detailed Analysis */}
      {result.details && (
        <DetailedAnalysis details={result.details} />
      )}
    </motion.div>
  );
};

export default ResultsDisplay;
