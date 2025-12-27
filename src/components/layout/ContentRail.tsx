import * as React from "react";

interface ContentRailProps {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}

/**
 * ContentRail - Content Width Boundary
 * 
 * Provides two width modes:
 * - Default (wide=false): max-w-prose for home page (~65ch)
 * - Wide (wide=true): max-w-4xl for lab pages (~896px)
 * 
 * Grid-aware component that centers and constrains content.
 */
export function ContentRail({ children, className = "", wide = false }: ContentRailProps) {
  return (
    <div className={`w-full ${wide ? 'max-w-4xl' : 'max-w-prose'} ${className}`.trim()}>
      {children}
    </div>
  );
}
