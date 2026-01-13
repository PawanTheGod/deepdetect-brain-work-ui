import { 
  Layers, 
  Microscope, 
  MessageSquare, 
  Zap, 
  Award,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Layers,
    title: "Multi-Model Detection",
    description: "Ensemble of state-of-the-art models including Xception, EfficientNet, and MesoNet for maximum accuracy."
  },
  {
    icon: Microscope,
    title: "Forensic Analysis",
    description: "Deep forensic examination of frequency patterns, facial landmarks, and compression artifacts."
  },
  {
    icon: MessageSquare,
    title: "Explainable AI",
    description: "Transparent results with detailed breakdowns of each model's contribution to the final verdict."
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Sub-2-second analysis time for real-time verification workflows and high-volume applications."
  },
  {
    icon: Award,
    title: "Research-Grade Accuracy",
    description: "Validated against academic benchmarks with 99%+ accuracy on standard deepfake datasets."
  },
  {
    icon: Shield,
    title: "Two-Layer Architecture",
    description: "Advanced dual-layer system combining identity verification with forensic analysis for comprehensive authenticity checks."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative py-20 md:py-28 z-10 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Enterprise Features
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Built for professionals who need reliable, explainable AI detection at scale.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
