"use client";

import { AnimatedButton } from "@experiments/components/animated-button";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function AnimatedButtonDemo() {
  return (
    <AnimatedButton className="inline-flex">
      <Button
        className="
          group
          relative
          inline-flex
          items-center
          gap-2
          overflow-hidden
          rounded-full
          px-8
          py-5
          text-base
          font-medium
        "
      >
        <span className="transition-transform duration-200 group-hover:-translate-x-1">
          Get Started
        </span>

        <span
          aria-hidden
          className="
            absolute
            right-5
            flex
            items-center
            opacity-0
            transition-opacity
            group-hover:opacity-100
          "
        >
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </span>
      </Button>
    </AnimatedButton>
  );
}
