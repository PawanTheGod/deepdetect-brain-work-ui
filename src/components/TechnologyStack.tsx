import { Brain, Cpu, Database, Network, Shield, Zap } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useRef, useEffect, useState } from "react";

// Animated number component with count-up effect
const AnimatedNumber = ({ 
  value, 
  suffix = "", 
  delay = 0 
}: { 
  value: number; 
  suffix?: string; 
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const timeout = setTimeout(() => {
      const duration = 1500; // 1.5 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuart)
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(value * eased));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  // Format number with commas
  const formatted = count.toLocaleString();

  return (
    <div ref={ref} className="text-3xl font-bold text-primary mb-1 tabular-nums">
      {formatted}{suffix}
    </div>
  );
};

const models = [
  {
    name: "XceptionNet",
    role: "Primary Identity Detector",
    description: "State-of-the-art deep learning architecture for detecting synthetic faces. Trained on FaceForensics++ and custom datasets.",
    accuracy: "96.4%",
    specialty: "GAN-generated faces, StyleGAN, Midjourney"
  },
  {
    name: "EfficientNet-B0",
    role: "Secondary Verification",
    description: "Efficient architecture for capturing global manipulation artifacts and image-level inconsistencies.",
    accuracy: "83.4%",
    specialty: "Compression artifacts, global features"
  },
  {
    name: "MesoNet",
    role: "Deepfake Specialist",
    description: "Mesoscopic feature analyzer designed specifically for face-swap detection in video frames.",
    accuracy: "78.2%",
    specialty: "Face-swaps, temporal artifacts"
  }
];

const forensicModules = [
  { name: "Frequency Analysis", description: "DCT/FFT domain analysis for GAN fingerprints" },
  { name: "Landmark Consistency", description: "Facial geometry and symmetry validation" },
  { name: "Patch Analysis", description: "Local texture coherence examination" },
  { name: "Skin Tone Analysis", description: "Color distribution consistency check" },
  { name: "RGB Channel Analysis", description: "Cross-channel correlation verification" }
];

const TechnologyStack = () => {
  return (
    <section id="technology" className="relative py-20 md:py-28 z-10 bg-gradient-to-b from-background to-secondary/20">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Technology</span>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Multi-Model AI Detection System
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A sophisticated ensemble of neural networks trained on millions of images, 
            combining deep learning with signal processing forensics for maximum accuracy.
          </motion.p>
        </div>

        {/* Neural Network Models with 3D Tilt */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Network className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Neural Network Ensemble</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt
                  tiltMaxAngleX={2}
                  tiltMaxAngleY={2}
                  perspective={1000}
                  transitionSpeed={400}
                  scale={1.01}
                  gyroscope={false}
                  className="h-full"
                >
                  <div 
                    className="relative h-full p-6 bg-card rounded-xl border border-border hover:border-primary/30 transition-all duration-300 group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="absolute top-4 right-4">
                      <span className="text-2xl font-bold text-primary/20">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-foreground mb-1">{model.name}</h4>
                    <p className="text-xs text-primary font-medium mb-3">{model.role}</p>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {model.description}
                    </p>
                    
                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-semibold text-success">{model.accuracy}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Specialty:</span> {model.specialty}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Forensic Modules */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Forensic Analysis Modules</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forensicModules.map((module, index) => (
              <motion.div 
                key={module.name}
                className="p-4 bg-card rounded-lg border border-border hover:bg-secondary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <h4 className="text-sm font-semibold text-foreground mb-1">{module.name}</h4>
                <p className="text-xs text-muted-foreground">{module.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Training Data Stats */}
        <motion.div 
          className="bg-card rounded-xl border border-border p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Database className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Training & Validation Data</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { value: 50000, label: "Total Images", suffix: "" },
              { value: 36000, label: "Training Set", suffix: "" },
              { value: 7000, label: "Validation Set", suffix: "" },
              { value: 7000, label: "Test Set", suffix: "" },
              { value: 25, label: "Frames Per Video", suffix: " FPV" }
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                className="text-center p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AnimatedNumber 
                  value={stat.value} 
                  suffix={stat.suffix}
                  delay={index * 100} 
                />
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Dataset</span>
              <span className="font-semibold">FaceForensics++ (FF++)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Compression</span>
              <span className="font-semibold">c23 (High Quality)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Classes</span>
              <span className="font-semibold">Real (25,000) + Fake (25,000)</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Data augmentation includes: Horizontal Flip, Brightness/Contrast, Scale/Rotate, 
              Gaussian Noise, and JPEG Compression simulation for robustness.
            </p>
          </div>
        </motion.div>

        {/* Two-Layer Architecture */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-8">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Two-Layer Trust Architecture</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                number: 1,
                title: "Layer 1: Identity Gate",
                subtitle: "Real Human vs Synthetic Face",
                description: "Primary analysis using XceptionNet and EfficientNet ensemble. Determines if the facial identity itself is biologically authentic or synthetically generated. Protects real humans from false accusations.",
                color: "primary"
              },
              {
                number: 2,
                title: "Layer 2: Forensic Analysis",
                subtitle: "Manipulation Classification",
                description: "Deep forensic examination triggered for suspicious faces. Combines neural network signals with signal processing forensics to classify manipulation type: Deepfake, AI-Generated, or authentic.",
                color: "destructive"
              }
            ].map((layer, index) => (
              <motion.div 
                key={layer.number}
                className="p-6 bg-card rounded-xl border border-border hover:border-primary/20 transition-colors duration-300"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full bg-${layer.color}/10 flex items-center justify-center`}>
                    <span className={`text-lg font-bold text-${layer.color}`}>{layer.number}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{layer.title}</h4>
                    <p className="text-xs text-muted-foreground">{layer.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyStack;
