import { useState, useRef, useCallback } from "react";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadPanelProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  selectedFile: File | null;
  onClear: () => void;
}

const UploadPanel = ({ 
  onFileSelect, 
  isAnalyzing, 
  selectedFile,
  onClear 
}: UploadPanelProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClear();
  };

  return (
    <div id="analyze" className="w-full max-w-2xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        {!preview ? (
          <>
            {/* Drop zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 cursor-pointer",
                isDragging 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInput}
                className="hidden"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Upload className="w-7 h-7 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg font-medium text-foreground">
                    Drag & drop image here
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    or click to browse files
                  </p>
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="hover-scale"
              >
                <FileImage className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
            </div>

            {/* Supported formats */}
            <p className="text-center text-xs text-muted-foreground mt-6">
              Supported: JPG, PNG, WebP | Max 10MB
            </p>
          </>
        ) : (
          /* Preview with image */
          <div className="space-y-6">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full max-h-64 object-contain rounded-lg bg-secondary"
              />
              {!isAnalyzing && (
                <button
                  onClick={handleClear}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background border border-border transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {selectedFile && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate max-w-xs">
                  {selectedFile.name}
                </span>
                <span className="text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            )}

            <Button 
              className="w-full hover-scale py-6 text-base"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Image"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPanel;
