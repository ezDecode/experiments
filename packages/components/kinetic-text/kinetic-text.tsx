"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export interface KineticTextProps {
  words: string[];
  interval: number;
}

/**
 * KineticText
 *
 * Animated text component that cycles through words with spring physics.
 * - Vertical slide with blur effect
 * - Spring-based animation
 * - Inline display for embedding in sentences
 */
export function KineticText({
  words,
  interval,
}: KineticTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);

    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className="relative inline-flex overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 18, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            stiffness: 420,
            damping: 30,
            mass: 0.6,
          }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
