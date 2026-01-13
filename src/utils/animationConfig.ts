// Animation Configuration - Enterprise-Grade Motion Design
// All animations follow strict performance and aesthetic guidelines

export const animationConfig = {
    // Easing curves - no bounce, no elastic
    easing: {
        smooth: [0.25, 0.1, 0.25, 1],
        easeOut: [0.16, 1, 0.3, 1],
        easeInOut: [0.45, 0, 0.55, 1],
        subtle: [0.33, 1, 0.68, 1],
    },

    // Duration presets (in seconds)
    duration: {
        fast: 0.3,
        medium: 0.5,
        slow: 0.8,
        crawl: 1.2,
    },

    // Stagger timing
    stagger: {
        tight: 0.05,
        normal: 0.1,
        relaxed: 0.15,
    },

    // Scroll trigger defaults
    scrollTrigger: {
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
    },

    // Transform limits (for enterprise restraint)
    limits: {
        maxTilt: 2, // degrees
        maxMagneticMove: 4, // pixels
        maxScale: 1.02,
        maxTranslateY: 20, // pixels
    },
};

// Framer Motion variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: custom * 0.1,
            ease: animationConfig.easing.smooth,
        },
    }),
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: custom * 0.1,
        },
    }),
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom: number = 0) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: custom * 0.1,
            ease: animationConfig.easing.smooth,
        },
    }),
};
