"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export interface InfiniteScrollerProps {
  items: string[];
  duration?: number;
  itemClassName?: string;
}

/**
 * InfiniteScroller
 *
 * A horizontal infinite scrolling marquee component.
 * - Seamless looping animation
 * - Fade edges for smooth visual effect
 * - Configurable speed and item styling
 */
export function InfiniteScroller({
  items,
  duration = 25,
  itemClassName = "text-xl md:text-2xl font-medium tracking-tight text-muted-foreground hover:text-foreground transition-colors",
}: InfiniteScrollerProps) {
  // Duplicate once for seamless looping
  const content = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* mask */}
      <div className="w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {content.map((item, i) => (
            <span key={i} className={itemClassName}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
