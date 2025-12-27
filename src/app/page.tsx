"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { Shell } from "@/components/layout/Shell";
import { MotionSurface } from "@experiments/components/motion-surface";
import { KineticText } from "@experiments/components/kinetic-text";
import { getAllComponentsMetadata } from "@/lib/registry/resolver";

export default function Home() {
  const components = getAllComponentsMetadata().slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Shell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-20"
      >
        <motion.section variants={itemVariants} className="flex flex-col gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold tracking-tight leading-none">
            Sharp design{" "}
            <span className="text-muted-foreground">
              and{" "}
              <span className="inline-grid min-w-[9ch] mt-1">
                <KineticText words={["Editable", "Animation", "Fun"]} interval={1600} />
              </span>
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            A minimalist laboratory exploring the space between utility and
            beauty — a living collection of refined UI components, motion
            studies, and small experiments in modern web technology, shared
            openly for inspiration and learning.
          </p>
        </motion.section>

        <motion.section variants={itemVariants} className="flex flex-col gap-6">
          <h2 className="text-xs font-medium tracking-normal text-muted-foreground">
            Lab
          </h2>

          <MotionSurface>
            {components.map((component) => (
              <Link
                key={component.id}
                href={`/lab/${component.id}`}
                className="group relative block w-full rounded-md py-3 transition-colors duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-medium text-foreground">
                      {component.title}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {component.category}
                    </span>

                    {component.description && (
                      <span className="line-clamp-2 text-sm text-muted-foreground">
                        {component.description}
                      </span>
                    )}
                  </div>

                  <Icon
                    icon="solar:arrow-right-linear"
                    className="h-4 w-4 text-muted-foreground/30 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </MotionSurface>
        </motion.section>

        <motion.section variants={itemVariants}>
          <Link
            href="/lab"
            className="group inline-flex items-center gap-2 rounded-xl bg-muted/40 px-3 py-1.5 font-mono text-xs font-medium text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
          >
            Explore the Lab
            <Icon
              icon="solar:arrow-right-linear"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.section>
      </motion.div>
    </Shell>
  );
}
