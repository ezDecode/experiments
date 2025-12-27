#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, "../../../packages/components");
const REGISTRY_PATH = path.join(__dirname, "registry.json");

interface ComponentMeta {
  name: string;
  title: string;
  description: string;
  dependencies?: string[];
}

interface RegistryComponent {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  tags: string[];
  date: string;
  featured: boolean;
  new: boolean;
  source: {
    type: string;
    path: string;
  };
  demo: {
    variants: string[];
    defaultProps: Record<string, unknown>;
  };
  design: {
    surface: string;
    motion: string;
  };
  dependencies: string[];
}

interface Registry {
  $schema: string;
  version: string;
  components: RegistryComponent[];
}

/**
 * Convert kebab-case to PascalCase
 */
function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

/**
 * Recursively find all meta.json files in a directory
 */
function findMetaFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentPath: string): void {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.name === "meta.json") {
          files.push(fullPath);
        }
      }
    } catch {
      console.warn(`Warning: Could not read directory ${currentPath}`);
    }
  }

  walk(dir);
  return files;
}

/**
 * Generate registry.json from component meta.json files
 */
function generateRegistry(): void {
  console.log("🔄 Generating registry.json from packages/components...\n");

  // Find all meta.json files
  const metaFiles = findMetaFiles(COMPONENTS_DIR);

  if (metaFiles.length === 0) {
    console.error("❌ No meta.json files found in packages/components/");
    process.exit(1);
  }

  const components: RegistryComponent[] = [];

  for (const metaFile of metaFiles) {
    try {
      const meta: ComponentMeta = JSON.parse(
        fs.readFileSync(metaFile, "utf8")
      );
      const componentDir = path.dirname(metaFile);
      const componentName = path.basename(componentDir);
      const pascalName = toPascalCase(componentName);

      // Build registry entry
      const component: RegistryComponent = {
        id: componentName,
        title: meta.title || pascalName,
        description: meta.description || "",
        category: "animation",
        status: "stable",
        tags: meta.dependencies || [],
        date: new Date().toISOString().split("T")[0],
        featured: false,
        new: false,
        source: {
          type: "local",
          path: `packages/components/${componentName}/${componentName}.tsx`,
        },
        demo: {
          variants: ["default"],
          defaultProps: {},
        },
        design: {
          surface: "flat",
          motion: "spring",
        },
        dependencies: meta.dependencies || [],
      };

      components.push(component);
      console.log(`✅ ${componentName}`);
    } catch (error) {
      console.error(
        `❌ Failed to process ${metaFile}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  // Sort by name for consistent output
  components.sort((a, b) => a.id.localeCompare(b.id));

  const registry: Registry = {
    $schema: "../../registry-schema.json",
    version: "1.0.0",
    components,
  };

  // Write registry.json
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + "\n");

  console.log(
    `\n✨ Generated registry.json with ${components.length} components`
  );
  console.log(`📍 ${REGISTRY_PATH}`);
}

// Run
try {
  generateRegistry();
} catch (error) {
  console.error("\n❌ Failed to generate registry:", error);
  process.exit(1);
}
