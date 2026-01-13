import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/animations/TextReveal";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";

interface HeroProps {
  onAnalyzeClick: () => void;
}

const Hero = ({ onAnalyzeClick }: HeroProps) => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Parallax background gradient layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background pointer-events-none" 
        style={{ willChange: 'transform' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Trust badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Enterprise-grade AI detection
          </motion.div>

          {/* Two-Line Split Headline with scale-fade animation */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Verify Images. Detect Deepfakes.
            </motion.div>
            <motion.div
              className="flex justify-center pt-2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <ContainerTextFlip 
                words={["Trust the Result", "Verify the Truth", "Detect the Fake", "See the Reality"]} 
                className="text-4xl md:text-5xl lg:text-6xl" 
                animationDuration={2000} 
                interval={4000}
                highlightPrefix
              />
            </motion.div>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Enterprise-grade AI detection for AI-generated and manipulated images. 
            Trusted by journalists, researchers, and verification teams worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <MagneticButton 
              className="inline-block"
              onClick={onAnalyzeClick}
              maxMove={4}
            >
              <Button 
                size="lg" 
                className="text-base px-8 py-6 shadow-lg shadow-primary/20"
              >
                Analyze Image
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </MagneticButton>
            
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 py-6"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2 h-4 w-4" />
                How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-8 pt-12 border-t border-border/50 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              { value: '96.4%', label: 'XceptionNet Accuracy' },
              { value: '<2s', label: 'Analysis Time' },
              { value: '50K', label: 'Training Images' },
              { value: '3', label: 'Neural Networks' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <motion.div
              className="flex flex-col items-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-xs mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
