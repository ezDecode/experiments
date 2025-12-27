"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

const NAV_ITEMS = [
  { title: "Home", href: "/", iconSrc: "/dockIcons/home.svg" },
  // { title: "About", href: "https://creativesky.me", iconSrc: "/dockIcons/about.svg" },
  { title: "Vault", href: "/vault", iconSrc: "/dockIcons/Vault.svg" },
  { title: "Component", href: "/lab", iconSrc: "/dockIcons/Code.svg" },
];

// ✅ TS-safe spring
const SPRING = {
  type: "spring",
  stiffness: 240,
  damping: 26,
  mass: 0.9,
} as const;

export function Dock() {
  const pathname = usePathname();
  const mounted = useMounted();

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [socialOpen, setSocialOpen] = React.useState(false);

  React.useEffect(() => {
    const idx = NAV_ITEMS.findIndex(
      (item) =>
        pathname === item.href ||
        (item.href !== "/" && pathname.startsWith(item.href))
    );
    if (idx !== -1) setActiveIndex(idx);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-10 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={cn(
            "relative flex items-center px-2 py-1.5",
            "rounded-2xl backdrop-blur-xl shadow-xl",
            "bg-white/80 dark:bg-muted/60"
          )}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <LayoutGroup id="dock">

            {/* ACTIVE INDICATOR */}
            {activeIndex !== null && (
              <motion.div
                layoutId="dock-active-bg"
                className="absolute top-1.5 bottom-1.5 w-12 rounded-xl bg-black/10 dark:bg-white/10"
                style={{
                  left: `calc(${activeIndex} * 48px + 8px)`,
                }}
                transition={SPRING}
              />
            )}

            {/* NAV ITEMS */}
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveIndex(index);
                  setSocialOpen(false);
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl"
              >
                <img
                  src={item.iconSrc}
                  alt=""
                  className={cn(
                    "w-7 h-7 transition-opacity",
                    "opacity-80 dark:brightness-0 dark:invert",
                    activeIndex === index && "opacity-100"
                  )}
                />

                {/* TOOLTIP */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -46 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs bg-black/80 text-white pointer-events-none hidden md:block"
                    >
                      {item.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            ))}

            {/* SOCIAL */}
            <button
              onClick={() => {
                setActiveIndex(NAV_ITEMS.length);
                setSocialOpen((v) => !v);
              }}
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl"
            >
              <img
                src="/dockIcons/Mention.svg"
                alt=""
                className="w-7 h-7 opacity-80 dark:brightness-0 dark:invert"
              />

              <AnimatePresence>
                {socialOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: -56, scale: 1 }}
                    exit={{ opacity: 0, y: 14, scale: 0.97 }}
                    transition={SPRING}
                    className="absolute inset-x-0 flex justify-center pointer-events-auto"
                  >
                    <div className="relative">
                      {/* Arrow nub */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/90 dark:bg-muted" />

                      {/* Email pill */}
                      <div className="rounded-xl bg-white/90 dark:bg-muted shadow-xl backdrop-blur-xl px-4 py-2">
                        <Link
                          href="mailto:ezdecode@gmail.com"
                          className="flex items-center gap-2 text-xs rounded-md px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                        >
                          <img
                            src="/dockIcons/Mail.svg"
                            alt=""
                            className="w-4 h-4 dark:brightness-0 dark:invert"
                          />
                          <span>Email</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

          </LayoutGroup>
        </motion.div>
      </div>
    </div>
  );
}
