"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { RegistryComponent } from "@/lib/types";

interface LabGridProps {
  components: RegistryComponent[];
}

/**
 * LabGrid - Registry-Driven Component Grid
 * 
 * This component renders cards from registry metadata only.
 * No component imports. No duplicated lists.
 * 
 * Adding a new component requires ONLY:
 * 1. Creating the component file
 * 2. Adding a single registry entry
 */
export function LabGrid({ components }: LabGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  // Extract unique categories from registry
  const categories = useMemo(() => {
    const cats = new Set(components.map((c) => c.category));
    return ["all", ...Array.from(cats).sort()];
  }, [components]);

  const filteredComponents = useMemo(() => {
    return components.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      return matchesCategory;
    });
  }, [components, activeCategory]);

  return (
    <div className="flex flex-col space-y-section">
      {/* Category Filter - Registry-Driven */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-tooltip font-bold   tracking-tight transition-all border ${
              activeCategory === cat 
              ? "bg-primary text-primary-foreground border-primary" 
              : "bg-background text-muted-foreground border-border/50 hover:border-primary/50 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Components Grid - Metadata Only */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredComponents.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={`/lab/${item.id}`} className="group flex flex-col space-y-component">
                <div className="aspect-16/10 w-full relative overflow-hidden rounded-2xl border-2 border-border/40 bg-muted/5 transition-all duration-300 ease-out group-hover:border-primary/30 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5">
                  {/* Placeholder for component preview - no direct rendering */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12 transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                    <div className="text-center text-muted-foreground/30 text-sm">
                      {item.title}
                    </div>
                  </div>
                  {item.new && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-primary-foreground text-tooltip   tracking-[0.2em] font-bold px-3 py-1 rounded-full border-none shadow-lg">New</Badge>
                    </div>
                  )}
                  {item.status === "experimental" && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="text-tooltip   tracking-[0.2em] font-bold px-3 py-1 rounded-full">
                        Experimental
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-section-title tracking-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-tooltip font-bold   tracking-[0.2em] text-muted-foreground/30">{item.category}</span>
                  </div>
                  <p className="text-caption text-muted-foreground leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredComponents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 space-y-content">
          <p className="text-muted-foreground">No components found matching your search.</p>
          <button 
            onClick={() => setActiveCategory("all")}
            className="text-tooltip font-bold   tracking-tight text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
