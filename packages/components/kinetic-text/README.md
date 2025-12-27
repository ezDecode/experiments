# Kinetic Text

Animated text component that cycles through words with spring physics.

## Installation

```bash
npx shadcn add kinetic-text
```

## Usage

```tsx
import { KineticText } from "@experiments/components/kinetic-text";

export function Example() {
  return (
    <p className="text-2xl">
      I build <KineticText words={["design", "motion", "systems"]} interval={1600} />
    </p>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `words` | `string[]` | - | Array of words to cycle through |
| `interval` | `number` | - | Time between word changes in milliseconds |

## Features

- **Spring Animation**: Natural, physics-based transitions
- **Blur Effect**: Words blur in/out during transitions
- **Inline Display**: Works seamlessly within text content
