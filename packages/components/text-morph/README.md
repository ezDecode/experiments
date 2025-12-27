# Text Morph

Animates through an array of text strings with smooth morphing transitions.

## Installation

```bash
npx shadcn add text-morph
```

## Usage

```tsx
import { TextMorph } from "@experiments/components/text-morph";

export function Example() {
  return (
    <TextMorph
      texts={["Design", "Code", "Animate", "Create"]}
      interval={2000}
      className="text-4xl font-bold"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `texts` | `string[]` | - | Array of text strings to cycle through |
| `interval` | `number` | - | Time between transitions in milliseconds |
| `className` | `string` | - | Optional CSS class for text |

## Features

- **Vertical Slide**: Text slides up/down during transitions
- **Blur Effect**: Smooth blur in/out during transitions
- **Configurable Timing**: Set your own interval between text changes
