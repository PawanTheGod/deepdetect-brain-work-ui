import { useState } from "react";
import UploadPanel from "./UploadPanel";
import ResultsDisplay from "./ResultsDisplay";
import { analyzeImage, DetectionResult } from "@/services/detectionApi";
import { AlertTriangle, Camera, ZoomIn, Focus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SpaceshipLoader from "@/components/ui/spaceship-loader";

interface AnalysisSectionProps {
  sectionRef: React.RefObject<HTMLElement>;
}

// Error message mapping for quality check failures
const getErrorDetails = (errorMessage: string) => {
  if (errorMessage.includes('FAIL_BLURRY')) {
    return {
      title: 'Image Too Blurry',
      description: 'The face in the image is too blurry for accurate analysis.',
      icon: Focus,
      tips: ['Use a sharper, in-focus image', 'Avoid motion blur', 'Try a higher quality photo']
    };
  }
  if (errorMessage.includes('FAIL_LOW_RESOLUTION')) {
    return {
      title: 'Resolution Too Low',
      description: 'The face in the image is too small or low resolution.',
      icon: ZoomIn,
      tips: ['Use an image with a larger face', 'Minimum face size: 64×64 pixels', 'Try cropping closer to the face']
    };
  }
  if (errorMessage.includes('No face detected') || errorMessage.includes('no face')) {
    return {
      title: 'No Face Detected',
      description: 'Could not detect a face in the uploaded image.',
      icon: Camera,
      tips: ['Upload an image containing a face', 'Ensure the face is visible and not obscured', 'Try a front-facing photo']
    };
  }
  if (errorMessage.includes('Cannot connect')) {
    return {
      title: 'Connection Error',
      description: 'Cannot connect to the detection server.',
      icon: AlertTriangle,
      tips: ['Ensure the backend server is running', 'Check your internet connection', 'Try again in a moment']
    };
  }
  return {
    title: 'Analysis Failed',
    description: errorMessage || 'An unexpected error occurred during analysis.',
    icon: HelpCircle,
    tips: ['Try uploading a different image', 'Ensure the image contains a clear face', 'Contact support if the issue persists']
  };
};

const AnalysisSection = ({ sectionRef }: AnalysisSectionProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    await runAnalysis(file);
  };

  const runAnalysis = async (input: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysisResult = await analyzeImage(input);
      setResult(analysisResult);
      
      // Dispatch event to update history
      const historyEvent = new CustomEvent('deepdetect-result', {
        detail: {
          filename: input.name,
          verdict: analysisResult.verdict,
          confidence: analysisResult.confidence
        }
      });
      window.dispatchEvent(historyEvent);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyzeNew = () => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
  };

  // Get error details if there's an error
  const errorDetails = error ? getErrorDetails(error) : null;

  return (
    <section 
      ref={sectionRef}
      className="py-16 md:py-24 scroll-mt-20"
    >
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Analyze an Image
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Upload an image to detect AI generation and deepfake manipulation.
          </p>
        </div>

        {/* Loading State */}
        {isAnalyzing && !result && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-xl overflow-hidden relative" style={{ height: '400px' }}>
              <SpaceshipLoader />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Analyzing Image
                </h3>
                <p className="text-sm text-muted-foreground">
                  Running multi-model detection and forensic analysis...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State - Enhanced */}
        {error && errorDetails && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <errorDetails.icon className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {errorDetails.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {errorDetails.description}
                </p>
                
                {/* Tips */}
                <div className="w-full bg-background rounded-lg p-4 mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">💡 Tips:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {errorDetails.tips.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
                
                <Button variant="outline" onClick={handleClear} className="hover-scale">
                  Try Another Image
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="space-y-6">
            <ResultsDisplay result={result} />
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleAnalyzeNew}
                className="hover-scale"
              >
                Analyze Another Image
              </Button>
            </div>
          </div>
        )}

        {/* Upload Panel */}
        {!result && !isAnalyzing && !error && (
          <UploadPanel
            onFileSelect={handleFileSelect}
            isAnalyzing={isAnalyzing}
            selectedFile={selectedFile}
            onClear={handleClear}
          />
        )}
      </div>
    </section>
  );
};

export default AnalysisSection;
