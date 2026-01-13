import { Shield, Github, FileText, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div 
              className="flex items-center gap-2 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">
                DeepDetect<span className="text-primary">Brain</span>
              </span>
            </motion.div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              AI-powered deepfake detection system using multi-model ensemble architecture with 
              XceptionNet, EfficientNet, and MesoNet neural networks.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ as a college research project
            </p>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Documentation
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Technology Stack
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Features
                </a>
              </li>
              <li>
                <a href="#analyze" className="hover:text-foreground transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  Try Analysis
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Links */}
          <div>
            <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Research & Resources
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://arxiv.org/abs/1901.08971" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  FaceForensics++ Dataset
                </a>
              </li>
              <li>
                <a 
                  href="https://arxiv.org/abs/1610.02357" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  XceptionNet Paper
                </a>
              </li>
              <li>
                <a 
                  href="https://arxiv.org/abs/1809.00888" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  MesoNet Paper
                </a>
              </li>
              <li>
                <a 
                  href="https://pytorch.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  PyTorch Framework
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} DeepDetect Brain. Academic Research Project.
            </p>
            
            <div className="flex items-center gap-4">
              {/* Tech Stack Badges */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-secondary rounded">React</span>
                <span className="px-2 py-1 bg-secondary rounded">PyTorch</span>
                <span className="px-2 py-1 bg-secondary rounded">Flask</span>
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/60 mt-4 text-center md:text-left">
            This system is designed for research and educational purposes. Results should be validated 
            by domain experts before making critical decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
