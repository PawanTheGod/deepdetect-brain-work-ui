import { motion } from "framer-motion";
import { AlertTriangle, Smartphone, Image, Layers, Camera } from "lucide-react";

const Limitations = () => {
  const limitations = [
    {
      icon: Smartphone,
      title: "Modern Smartphone AI Processing",
      description: "Images heavily processed by smartphone AI features (portrait mode, beauty filters, HDR+) may trigger false positives as these enhancements can mimic deepfake artifacts.",
    },
    {
      icon: Layers,
      title: "Multiple Image Edits",
      description: "Photos that have been edited multiple times (cropped, filtered, compressed) may show inconsistencies that could be misinterpreted as manipulation indicators.",
    },
    {
      icon: Camera,
      title: "Low Quality or Blurry Images",
      description: "Low-resolution, heavily compressed, or motion-blurred images may not provide sufficient detail for accurate analysis, potentially leading to uncertain results.",
    },
    {
      icon: Image,
      title: "Artistic Filters & Effects",
      description: "Images with artistic filters, face swap apps for entertainment, or heavy makeup may be flagged as synthetic due to unusual facial features or textures.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/20 text-warning mb-4">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Important Information</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Known Limitations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              While our system achieves high accuracy, certain scenarios may affect detection results. 
              Please be aware of these edge cases when interpreting the analysis.
            </p>
          </motion.div>

          {/* Limitations Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {limitations.map((limitation, index) => (
              <motion.div
                key={limitation.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <limitation.icon className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {limitation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {limitation.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Best Practices */}
          <motion.div
            className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span>
              Best Practices for Accurate Results
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Use original, unedited images whenever possible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Ensure the face is clearly visible, well-lit, and in focus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Avoid images with heavy filters, beauty modes, or artistic effects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Higher resolution images (at least 512×512 pixels) provide better accuracy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>For critical verifications, analyze multiple images of the same subject</span>
              </li>
            </ul>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            className="mt-8 text-center text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>
              This system is a powerful tool for detecting AI-generated and manipulated images, 
              but should be used as part of a comprehensive verification process, not as the sole 
              basis for critical decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Limitations;
