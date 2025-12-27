"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

export interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

/**
 * AnimatedButton
 *
 * A motion wrapper that adds spring-based scale animations to any button content.
 * - Scales up slightly on hover
 * - Scales down slightly on press
 * - Uses smooth spring physics
 */
export function AnimatedButton({
  children,
  onClick,
  className,
}: AnimatedButtonProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
