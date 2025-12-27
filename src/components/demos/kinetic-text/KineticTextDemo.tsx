"use client";

import { KineticText } from "@experiments/components/kinetic-text";

export default function KineticTextDemo() {
  return (
    <KineticText
      words={["design", "motion", "systems"]}
      interval={1600}
    />
  );
}
