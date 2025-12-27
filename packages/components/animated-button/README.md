# Animated Button

A motion wrapper that adds spring-based scale animations to any button content.

## Installation

```bash
npx shadcn add animated-button
```

## Usage

```tsx
import { AnimatedButton } from "@experiments/components/animated-button";

export function Example() {
  return (
    <AnimatedButton onClick={() => console.log("clicked")}>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        Click Me
      </button>
    </AnimatedButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button content to wrap |
| `onClick` | `() => void` | - | Optional click handler |
| `className` | `string` | - | Optional CSS class for wrapper |

## Features

- **Hover Scale**: Scales up slightly on hover (1.02x)
- **Press Scale**: Scales down slightly on press (0.98x)
- **Spring Physics**: Smooth, natural-feeling animations
