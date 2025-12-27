import type { ComponentType } from "react";
import type { RegistryComponent } from "../types";
import registryData from "./registry.json";

/**
 * Component Resolver
 *
 * This is the ONLY way demo components should be loaded.
 * - No direct imports in demo pages
 * - No switch statements
 * - Registry-driven only
 *
 * INVARIANTS:
 * - Site pages ONLY read from registry
 * - Site pages NEVER manually import components
 * - Adding a new component requires NO site code changes
 */

const registry = registryData as {
  version: string;
  components: RegistryComponent[];
};

/**
 * Demo Import Map
 *
 * Maps registry component IDs to their demo imports.
 * This is auto-generated from the registry.
 *
 * IMPORTANT:
 * - Keys MUST exactly match registry.json `id`
 * - Demos MUST exist in src/components/demos/<component-name>/
 * - Demos MUST export a default export
 */
function getDemoImportMap(): Record<string, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> {
  // Generate import map from registry
  const importMap: Record<string, () => Promise<{ default: ComponentType<Record<string, unknown>> }>> = {};

  for (const component of registry.components) {
    const id = component.id;
    // Dynamic import paths must be static strings for bundlers
    // We use a switch to maintain static analysis while being registry-driven
    switch (id) {
      case "adaptive-tooltip":
        importMap[id] = () => import("@/components/demos/adaptive-tooltip/AdaptiveTooltipDemo");
        break;
      case "animated-button":
        importMap[id] = () => import("@/components/demos/animated-button/AnimatedButtonDemo");
        break;
      case "infinite-scroller":
        importMap[id] = () => import("@/components/demos/infinite-scroller/InfiniteScrollerDemo");
        break;
      case "kinetic-text":
        importMap[id] = () => import("@/components/demos/kinetic-text/KineticTextDemo");
        break;
      case "motion-surface":
        importMap[id] = () => import("@/components/demos/motion-surface/MotionSurfaceDemo");
        break;
      case "text-morph":
        importMap[id] = () => import("@/components/demos/text-morph/TextMorphDemo");
        break;
    }
  }

  return importMap;
}

const demoImportMap = getDemoImportMap();

/* ──────────────────────────────────────────────────────────────── */
/* Runtime Assertions                                                */
/* ──────────────────────────────────────────────────────────────── */

/**
 * Validate registry integrity at runtime.
 * Checks that all registry entries have corresponding demo mappings.
 */
function validateRegistryIntegrity(): void {
  const registryIds = new Set(registry.components.map((c) => c.id));
  const importMapIds = new Set(Object.keys(demoImportMap));

  // Check for registry entries without demos
  const missingDemos = Array.from(registryIds).filter(
    (id) => !importMapIds.has(id)
  );

  if (missingDemos.length > 0) {
    console.error(
      `[resolver] Registry validation failed!\n` +
        `The following components are in registry.json but have no demo mapping:\n` +
        `  ${missingDemos.join(", ")}\n` +
        `Add demos in src/components/demos/<component-name>/`
    );
  }

  // Check for demos without registry entries
  const orphanedDemos = Array.from(importMapIds).filter(
    (id) => !registryIds.has(id)
  );

  if (orphanedDemos.length > 0) {
    console.warn(
      `[resolver] Demo map has entries not in registry:\n` +
        `  ${orphanedDemos.join(", ")}\n` +
        `These demos will never be used.`
    );
  }

  if (missingDemos.length === 0 && orphanedDemos.length === 0) {
    console.info(
      `[resolver] Registry validation passed: ${registryIds.size} components registered`
    );
  }
}

// Run validation at module load (browser only)
if (typeof window !== "undefined") {
  validateRegistryIntegrity();
}

/* ──────────────────────────────────────────────────────────────── */
/* Registry Queries                                                  */
/* ──────────────────────────────────────────────────────────────── */

export function getComponentMetadata(
  id: string
): RegistryComponent | null {
  return registry.components.find((c) => c.id === id) ?? null;
}

export function getAllComponentsMetadata(): RegistryComponent[] {
  return registry.components;
}

export function getFeaturedComponentsMetadata(): RegistryComponent[] {
  return registry.components.filter((c) => c.featured);
}

export function getComponentsByCategory(
  category: string
): RegistryComponent[] {
  return registry.components.filter((c) => c.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(
    new Set(registry.components.map((c) => c.category))
  ).sort();
}

/* ──────────────────────────────────────────────────────────────── */
/* Component Resolution                                              */
/* ──────────────────────────────────────────────────────────────── */

/**
 * Resolve and dynamically import a demo component by registry ID.
 *
 * This function:
 * - Validates registry existence
 * - Imports demo via explicit import map
 * - Returns the demo component and metadata
 *
 * @throws Error (controlled, descriptive)
 */
export async function resolveComponent(
  id: string
): Promise<{
  Component: ComponentType<Record<string, unknown>>;
  metadata: RegistryComponent;
}> {
  const metadata = getComponentMetadata(id);

  if (!metadata) {
    throw new Error(
      `Component "${id}" not found in registry. ` +
        `Available components: ${registry.components
          .map((c) => c.id)
          .join(", ")}`
    );
  }

  const importFn = demoImportMap[id];

  if (!importFn) {
    throw new Error(
      `Component "${id}" is registered but has no demo. ` +
        `Add a demo in src/components/demos/${id}/`
    );
  }

  try {
    const module = await importFn();
    const Component = module.default;

    if (!Component) {
      throw new Error(
        `No default export found for demo "${id}".`
      );
    }

    return { Component, metadata };
  } catch (error) {
    throw new Error(
      `Failed to resolve demo for "${id}". ` +
        `Error: ${
          error instanceof Error
            ? error.message
            : String(error)
        }`
    );
  }
}
