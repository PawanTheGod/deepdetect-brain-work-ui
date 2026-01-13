import { Shield, History, CheckCircle, AlertTriangle, HelpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Smooth scroll handler
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const navItems = [
  { label: "How It Works", href: "how-it-works" },
  { label: "Features", href: "features" },
  { label: "Analyze", href: "analyze" },
];

// History item type
interface HistoryItem {
  id: string;
  filename: string;
  verdict: string;
  confidence: string;
  timestamp: Date;
}

// Get verdict icon and color
const getVerdictStyle = (verdict: string) => {
  switch (verdict) {
    case 'AUTHENTIC':
      return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/10' };
    case 'AI-GENERATED':
    case 'DEEPFAKE':
      return { icon: AlertTriangle, color: 'text-destructive', bg: 'bg-destructive/10' };
    default:
      return { icon: HelpCircle, color: 'text-warning', bg: 'bg-warning/10' };
  }
};

const Header = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('deepdetect-history');
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        })));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

  // Listen for new analysis results
  useEffect(() => {
    const handleNewResult = (event: CustomEvent) => {
      const { filename, verdict, confidence } = event.detail;
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        filename,
        verdict,
        confidence,
        timestamp: new Date()
      };
      
      setHistory(prev => {
        const updated = [newItem, ...prev].slice(0, 10); // Keep last 10
        localStorage.setItem('deepdetect-history', JSON.stringify(updated));
        return updated;
      });
    };

    window.addEventListener('deepdetect-result' as any, handleNewResult);
    return () => window.removeEventListener('deepdetect-result' as any, handleNewResult);
  }, []);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('deepdetect-history');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            DeepDetect<span className="text-primary">Brain</span>
          </span>
        </motion.div>
        
        {/* Navigation with smooth scroll */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a 
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => scrollToSection(e, item.href)}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -1 }}
            >
              {item.label}
              {/* Hover underline */}
              <motion.span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Right side - History & CTA */}
        <div className="flex items-center gap-2">
          {/* History Button */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
              onClick={() => setShowHistory(!showHistory)}
            >
              <History className="h-5 w-5" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              )}
            </Button>

            {/* History Dropdown */}
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  className="absolute right-0 top-12 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold text-foreground">Recent Activity</h3>
                    {history.length > 0 && (
                      <button 
                        onClick={clearHistory}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* History List */}
                  <div className="max-h-80 overflow-y-auto">
                    {history.length === 0 ? (
                      <div className="p-6 text-center">
                        <History className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No recent analyses</p>
                        <p className="text-xs text-muted-foreground mt-1">Your analysis history will appear here</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {history.map((item, index) => {
                          const { icon: Icon, color, bg } = getVerdictStyle(item.verdict);
                          return (
                            <motion.div
                              key={item.id}
                              className="p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                                  <Icon className={`w-4 h-4 ${color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground truncate">
                                    {item.filename}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-xs font-medium ${color}`}>
                                      {item.verdict}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      • {item.confidence}
                                    </span>
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                  {formatTime(item.timestamp)}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Documentation Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden sm:inline-flex"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              Documentation
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Overlay to close history */}
      {showHistory && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowHistory(false)}
        />
      )}
    </motion.header>
  );
};

export default Header;
