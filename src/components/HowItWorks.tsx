import { Fingerprint, Microscope, Scale } from "lucide-react";

const steps = [
  {
    icon: Fingerprint,
    number: "01",
    title: "Identity Verification",
    description: "Determines if the face is real or synthetic using multi-model ensemble analysis trained on millions of authentic and AI-generated images."
  },
  {
    icon: Microscope,
    number: "02", 
    title: "Forensic Analysis",
    description: "Detects manipulation artifacts and anomalies including frequency patterns, facial landmark inconsistencies, and GAN fingerprints."
  },
  {
    icon: Scale,
    number: "03",
    title: "Final Verdict",
    description: "Combines evidence from all detection models into a clear, confidence-weighted decision with full explainability."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our multi-stage detection pipeline ensures accurate, explainable results you can trust.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative p-8 bg-card rounded-xl border border-border shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
              
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-primary">{step.number}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
