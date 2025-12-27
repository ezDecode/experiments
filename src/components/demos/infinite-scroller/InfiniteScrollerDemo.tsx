"use client";

import { InfiniteScroller } from "@experiments/components/infinite-scroller";

export default function InfiniteScrollerDemo() {
  const items = [
    "React",
    "Next.js",
    "Framer Motion",
    "Tailwind CSS",
    "TypeScript",
    "Radix UI",
    "Lucide",
    "Shadcn UI",
    "PostgreSQL",
    "Supabase",
  ];

  return <InfiniteScroller items={items} duration={25} />;
}
