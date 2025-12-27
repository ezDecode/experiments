"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { RegistryComponent } from "@/lib/types";
import { useMounted } from "@/hooks/use-mounted";

interface LabNavigationProps {
  components: RegistryComponent[];
  mobileOnly?: boolean;
}

export function LabNavigation({ components, mobileOnly }: LabNavigationProps) {
  /* ───────────── Hooks ───────────── */
  const pathname = usePathname();
  const mounted = useMounted();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const sortedComponents = React.useMemo(
    () => [...components].sort((a, b) => a.title.localeCompare(b.title)),
    [components]
  );

  if (!mounted) return null;

  // Mobile-only mode: render mobile trigger and drawer
  if (mobileOnly) {
    return (
      <>
        <div
          className={cn(
            "sticky top-0 z-30 border-b border-border mb-6",
            scrolled
              ? "bg-background/70 backdrop-blur-md"
              : "bg-background"
          )}
        >
          <button
            onClick={() => setOpen(true)}
            className="flex w-full items-center gap-3 h-12 text-sm font-medium text-foreground"
          >
            <HamburgerIcon />
            Components
          </button>
        </div>

        {/* ───────────── Mobile Left Drawer ───────────── */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />

              {/* Drawer */}
              <motion.aside
                className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-xs
                           bg-background/80 backdrop-blur-xl
                           border-r border-border"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              >
                <nav
                  onScroll={(e) =>
                    setScrolled(e.currentTarget.scrollTop > 4)
                  }
                  className="h-full overflow-y-auto px-4 pt-4 space-y-8"
                  style={{
                    paddingBottom:
                      "calc(6rem + env(safe-area-inset-bottom))",
                  }}
                >
                  <NavContent
                    pathname={pathname}
                    components={sortedComponents}
                    onNavigate={() => setOpen(false)}
                  />

                  {/* Bottom breathing space */}
                  <div className="h-24" aria-hidden />
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop mode: render sidebar navigation (used in Shell leftRail)
  return (
    <nav className="sticky top-24 space-y-8">
      <NavContent
        pathname={pathname}
        components={sortedComponents}
      />
    </nav>
  );
}

/* ───────────────── Shared Content ───────────────── */

function NavContent({
  pathname,
  components,
  onNavigate,
}: {
  pathname: string;
  components: RegistryComponent[];
  onNavigate?: () => void;
}) {
  return (
    <>
      <NavSection title="Getting started">
        <NavItem
          href="/lab"
          label="Introduction"
          active={pathname === "/lab"}
          onClick={onNavigate}
        />
      </NavSection>

      <NavSection title="Components">
        <ul className="space-y-0.5">
          {components.map((component) => (
            <li key={component.id}>
              <NavItem
                href={`/lab/${component.id}`}
                label={component.title}
                active={pathname === `/lab/${component.id}`}
                onClick={onNavigate}
              />
            </li>
          ))}
        </ul>
      </NavSection>
    </>
  );
}

/* ───────────────── Primitives ───────────────── */

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}

function NavItem({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "block text-sm leading-6 transition-colors",
        active
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

/* ───────────────── Icons ───────────────── */

function HamburgerIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 18 12" fill="none">
      <path d="M17 1H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 6H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 11H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
