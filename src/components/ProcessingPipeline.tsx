import { Camera, Crop, Image, ScanFace, Sparkles, FileCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const pipelineSteps = [
  {
    icon: Camera,
    title: "Image Upload",
    description: "Upload any face image (JPEG, PNG, WebP)",
    detail: "Accepts images up to 10MB"
  },
  {
    icon: ScanFace,
    title: "Face Detection",
    description: "MTCNN-based face localization",
    detail: "Multi-face support with bounding boxes"
  },
  {
    icon: Crop,
    title: "Face Extraction",
    description: "160×160 aligned face crops",
    detail: "Normalized for model input"
  },
  {
    icon: Image,
    title: "Quality Check",
    description: "Resolution & clarity validation",
    detail: "Minimum 64×64 face size required"
  },
  {
    icon: Sparkles,
    title: "Neural Analysis",
    description: "3-model ensemble inference",
    detail: "XceptionNet + EfficientNet + MesoNet"
  },
  {
    icon: FileCheck,
    title: "Verdict Generation",
    description: "Confidence-weighted decision",
    detail: "Final authority verdict with reasoning"
  }
];

const ProcessingPipeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Scroll-linked progress for the line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"] // Track from when section enters to when it leaves
  });

  // Transform scroll progress to line width (0% to 100%)
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);
  
  // Transform for each step's opacity based on scroll
  const getStepOpacity = (stepIndex: number) => {
    const start = 0.1 + (stepIndex * 0.08);
    const end = start + 0.1;
    return useTransform(scrollYProgress, [start, end], [0.3, 1]);
  };

  // Transform for each step's scale based on scroll
  const getStepScale = (stepIndex: number) => {
    const start = 0.1 + (stepIndex * 0.08);
    const end = start + 0.1;
    return useTransform(scrollYProgress, [start, end], [0.9, 1]);
  };

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 z-10 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-14">
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-foreground mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Image Processing Pipeline
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every uploaded image goes through our sophisticated multi-stage processing pipeline 
            before analysis.
          </motion.p>
        </div>

        {/* Desktop Pipeline - Horizontal with Scroll-Linked Line */}
        <div className="hidden lg:block max-w-6xl mx-auto relative">
          {/* Background line track */}
          <div className="absolute top-[40px] left-[80px] right-[80px] h-1 bg-border rounded-full overflow-hidden">
            {/* Animated progress line - linked to scroll */}
            <motion.div 
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/50 rounded-full"
              style={{ width: useTransform(lineProgress, v => `${v}%`) }}
            />
          </div>

          <div className="flex items-start justify-between">
            {pipelineSteps.map((step, index) => {
              const opacity = getStepOpacity(index);
              const scale = getStepScale(index);
              
              return (
                <motion.div 
                  key={step.title} 
                  className="flex flex-col items-center text-center w-[140px] group"
                  style={{ opacity, scale }}
                >
                  {/* Icon container */}
                  <motion.div 
                    className="relative mb-4 z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-20 h-20 rounded-2xl bg-card border-2 border-border flex items-center justify-center
                                   group-hover:border-primary group-hover:bg-primary/5 group-hover:shadow-lg 
                                   group-hover:shadow-primary/10 transition-all duration-300">
                      <step.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground 
                                    text-xs font-bold flex items-center justify-center shadow-sm">
                      {index + 1}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-snug">
                    {step.description}
                  </p>

                  {/* Detail on hover */}
                  <div className="mt-2 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {step.detail}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Pipeline - Vertical Timeline with Scroll Progress */}
        <div className="lg:hidden max-w-md mx-auto">
          <div className="relative pl-8">
            {/* Vertical line track */}
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-border rounded-full overflow-hidden">
              {/* Animated progress line */}
              <motion.div 
                className="w-full bg-gradient-to-b from-primary to-primary/50 rounded-full"
                style={{ height: useTransform(lineProgress, v => `${v}%`) }}
              />
            </div>

            <div className="space-y-8">
              {pipelineSteps.map((step, index) => {
                const opacity = getStepOpacity(index);
                const scale = getStepScale(index);
                
                return (
                  <motion.div 
                    key={step.title} 
                    className="flex items-start gap-4 relative"
                    style={{ opacity }}
                  >
                    {/* Icon */}
                    <motion.div 
                      className="absolute -left-8 w-10 h-10 rounded-xl bg-card border-2 border-border flex items-center justify-center z-10"
                      style={{ scale }}
                    >
                      <step.icon className="w-5 h-5 text-primary" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 bg-card rounded-lg border border-border p-4 ml-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-foreground">{step.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                      <p className="text-xs text-primary/70 mt-1">{step.detail}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <motion.div 
          className="mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "MTCNN", detail: "Face Detection", desc: "Industry-standard face localization" },
              { label: "PyTorch", detail: "Deep Learning", desc: "GPU-accelerated inference" },
              { label: "Flask", detail: "API Backend", desc: "RESTful API architecture" }
            ].map((tech, index) => (
              <motion.div 
                key={tech.label}
                className="p-5 bg-card rounded-xl border border-border text-center group hover:border-primary/30 hover:shadow-sm transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="text-2xl font-bold text-primary mb-1">{tech.label}</div>
                <div className="text-sm font-medium text-foreground mb-1">{tech.detail}</div>
                <div className="text-xs text-muted-foreground">{tech.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessingPipeline;
