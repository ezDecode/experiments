"use client";

import { TextMorph } from "@experiments/components/text-morph";

export default function TextMorphDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium tracking-tight text-muted-foreground">
        I love to
      </span>
      <TextMorph
        texts={["Design", "Code", "Animate", "Create", "Iterate"]}
        interval={2000}
        className="text-4xl font-bold tracking-tighter leading-none"
      />
    </div>
  );
}
