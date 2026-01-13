import { motion } from "framer-motion";

type AnimationStyle = 
  | "smooth-blur"      // Current - blur + fade + translate
  | "mask-wipe"        // Left-to-right reveal
  | "scale-fade"       // Zoom in + fade
  | "fade-only"        // Pure opacity fade
  | "letter-cascade";  // Character by character

interface HeadlineAnimationProps {
  style?: AnimationStyle;
}

export const HeadlineAnimation = ({ style = "smooth-blur" }: HeadlineAnimationProps) => {
  // Animation configurations
  const animations = {
    "smooth-blur": {
      line1: {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
      },
      line2: {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }
      },
      line3: {
        initial: { opacity: 0, y: 12, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }
      }
    },
    
    "mask-wipe": {
      line1: {
        initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        animate: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
        transition: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
      },
      line2: {
        initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        animate: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
        transition: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
      },
      line3: {
        initial: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        animate: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
        transition: { duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    },
    
    "scale-fade": {
      line1: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
      },
      line2: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
      },
      line3: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    },
    
    "fade-only": {
      line1: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }
      },
      line2: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }
      },
      line3: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }
      }
    },
    
    "letter-cascade": {
      line1: {
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.2
            }
          }
        }
      },
      line2: {
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.5
            }
          }
        }
      },
      line3: {
        initial: "hidden",
        animate: "visible",
        variants: {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.03,
              delayChildren: 0.8
            }
          }
        }
      }
    }
  };

  const config = animations[style];

  // Letter animation variant for cascade effect
  const letterVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const renderLine = (text: string, lineConfig: any, isHighlight = false) => {
    if (style === "letter-cascade") {
      return (
        <motion.div
          className={isHighlight ? "text-primary" : ""}
          {...lineConfig}
        >
          {text.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariant}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    return (
      <motion.div
        className={isHighlight ? "text-primary" : ""}
        {...lineConfig}
      >
        {text}
      </motion.div>
    );
  };

  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-relaxed">
      <div className="space-y-1 md:space-y-2">
        {renderLine("Verify Images.", config.line1)}
        {renderLine("Detect Deepfakes.", config.line2)}
        <motion.span style={{ display: "inline-block" }}>
          {renderLine("Trust the Result.", config.line3, true)}
        </motion.span>
      </div>
    </h1>
  );
};
