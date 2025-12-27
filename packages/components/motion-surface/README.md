# Motion Surface

A shared layout animation container for list items with smooth background transitions.

## Installation

```bash
npx shadcn add motion-surface
```

## Usage

```tsx
import { MotionSurface } from "@experiments/components/motion-surface";

export function Example() {
  return (
    <MotionSurface enableHover activeClassName="bg-muted">
      <div className="py-3">First Item</div>
      <div className="py-3">Second Item</div>
      <div className="py-3">Third Item</div>
    </MotionSurface>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | List items to wrap |
| `activeIndex` | `number \| null` | `null` | Explicitly active item index |
| `enableHover` | `boolean` | `true` | Enable hover-based activation |
| `activeClassName` | `string` | `"bg-muted"` | Class for active state |
| `hoverClassName` | `string` | `"bg-muted/60"` | Class for hover state |

## Features

- **Shared Layout**: Smooth animated background transitions between items
- **Hover Support**: Background follows mouse position
- **Active State**: Support for explicitly active items
- **Spring Physics**: Natural, physics-based animations
