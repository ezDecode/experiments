# Infinite Scroller

A horizontal infinite scrolling marquee component with seamless looping.

## Installation

```bash
npx shadcn add infinite-scroller
```

## Usage

```tsx
import { InfiniteScroller } from "@experiments/components/infinite-scroller";

export function Example() {
  return (
    <InfiniteScroller
      items={["React", "Next.js", "Framer Motion", "Tailwind CSS"]}
      duration={25}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `string[]` | - | Array of text items to scroll |
| `duration` | `number` | `25` | Animation duration in seconds |
| `itemClassName` | `string` | - | Optional CSS class for items |

## Features

- **Seamless Loop**: Items scroll infinitely with no visible restart
- **Fade Edges**: CSS mask creates smooth fade-in/out at edges
- **Configurable Speed**: Adjust duration for faster/slower scrolling
