import fs from "fs";
import path from "path";
import { getComponentMetadata } from "./registry/resolver";

interface CodeSource {
  code: string;
  filename: string;
}

/**
 * Get component source code for Lab display
 * Returns demo code and component code with proper filenames
 */
export function getComponentSourceCode(slug: string): {
  demo: CodeSource | null;
  primitive: CodeSource | null;
} {
  const metadata = getComponentMetadata(slug);
  if (!metadata) {
    return { demo: null, primitive: null };
  }

  try {
    // Get demo code
    const componentName = slug; // e.g., "animated-button"
    const pascalName = componentName
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
    const demoPath = path.join(
      process.cwd(),
      `src/components/demos/${componentName}/${pascalName}Demo.tsx`
    );
    const demoCode = fs.readFileSync(demoPath, "utf8");
    const demoFilename = `${pascalName}Demo.tsx`;

    // Get component code from packages/components
    const componentPath = `packages/components/${componentName}/${componentName}.tsx`;

    let componentCode = "";
    let componentFilename = "";

    // Try to read component code
    try {
      const componentFullPath = path.join(process.cwd(), componentPath);
      componentCode = fs.readFileSync(componentFullPath, "utf8");
      componentFilename = path.basename(componentPath);
    } catch {
      // Component doesn't exist - that's okay
      componentCode = "";
    }

    return {
      demo: { code: demoCode, filename: demoFilename },
      primitive: componentCode
        ? { code: componentCode, filename: componentFilename }
        : null,
    };
  } catch (error) {
    console.error(`Error reading source code for ${slug}:`, error);
    return { demo: null, primitive: null };
  }
}
