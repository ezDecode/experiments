/**
 * DemoFactory
 *
 * Provides a standardized wrapper for demo components with sensible defaults.
 * Reduces boilerplate and ensures consistent demo presentation.
 *
 * Usage in demo components:
 * ```tsx
 * export default function MyComponentDemo() {
 *   return (
 *     <DemoFactory>
 *       <MyComponent />
 *     </DemoFactory>
 *   );
 * }
 * ```
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface DemoFactoryProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Layout preset for common demo patterns
   * - "center": Vertically and horizontally centered (default)
   * - "stack": Vertical stack with gap
   * - "grid": Auto-fit grid for multiple items
   * - "full": No centering, full width/height
   */
  layout?: "center" | "stack" | "grid" | "full";
  /**
   * Minimum height for the demo container
   * @default "400px"
   */
  minHeight?: string;
  /**
   * Background style
   * - "default": Transparent (inherits from DemoContainer)
   * - "grid": Subtle grid pattern
   * - "dots": Dot pattern
   */
  background?: "default" | "grid" | "dots";
}

export function DemoFactory({
  children,
  className,
  layout = "center",
  minHeight = "400px",
  background = "default",
}: DemoFactoryProps) {
  const layoutStyles = {
    center: "flex items-center justify-center",
    stack: "flex flex-col items-center justify-center gap-6",
    grid: "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-center",
    full: "flex",
  };

  const backgroundStyles = {
    default: "",
    grid: "bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:24px_24px]",
    dots: "bg-[radial-gradient(hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:16px_16px]",
  };

  return (
    <div
      className={cn(
        "w-full",
        layoutStyles[layout],
        backgroundStyles[background],
        className
      )}
      style={{
        minHeight,
      }}
    >
      {children}
    </div>
  );
}

/**
 * DemoSection
 *
 * Sub-component for organizing multiple variants within a single demo.
 *
 * Usage:
 * ```tsx
 * <DemoFactory layout="stack">
 *   <DemoSection title="Variant A">
 *     <ComponentA />
 *   </DemoSection>
 *   <DemoSection title="Variant B">
 *     <ComponentB />
 *   </DemoSection>
 * </DemoFactory>
 * ```
 */
interface DemoSectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function DemoSection({
  children,
  title,
  description,
  className,
}: DemoSectionProps) {
  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      {(title || description) && (
        <div className="text-center space-y-1">
          {title && (
            <h3 className="text-sm font-medium text-foreground/90">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
