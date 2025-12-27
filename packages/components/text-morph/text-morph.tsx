"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export interface TextMorphProps {
  texts: string[];
  interval: number;
  className?: string;
}

/**
 * TextMorph
 *
 * Animates through an array of text strings with smooth morphing transitions.
 * - Vertical slide animation
 * - Blur effect during transitions
 * - Configurable timing
 */
export function TextMorph({
  texts,
  interval,
  className,
}: TextMorphProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          className={className}
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
