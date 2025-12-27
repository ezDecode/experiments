"use client";

import { MotionSurface } from "@experiments/components/motion-surface";

export default function MotionSurfaceDemo() {
  return (
    <MotionSurface
      enableHover={true}
      activeClassName="bg-muted"
      hoverClassName="bg-muted/60"
    >
      <div className="group relative block w-full rounded-md py-3 transition-colors duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base font-medium text-foreground">
              First Item
            </span>
            <span className="text-sm text-muted-foreground">
              Hover to see the shared layout animation
            </span>
          </div>
        </div>
      </div>
      <div className="group relative block w-full rounded-md py-3 transition-colors duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base font-medium text-foreground">
              Second Item
            </span>
            <span className="text-sm text-muted-foreground">
              Notice the smooth transition
            </span>
          </div>
        </div>
      </div>
      <div className="group relative block w-full rounded-md py-3 transition-colors duration-300">
        <div className="flex items-center justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base font-medium text-foreground">
              Third Item
            </span>
            <span className="text-sm text-muted-foreground">
              Try hovering between items
            </span>
          </div>
        </div>
      </div>
    </MotionSurface>
  );
}
