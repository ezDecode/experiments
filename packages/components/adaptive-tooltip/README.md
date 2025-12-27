# Adaptive Tooltip

An intelligent tooltip system that adapts to user intent with confidence-based delays.

## Installation

```bash
npx shadcn add adaptive-tooltip
```

## Usage

```tsx
import { AdaptiveTooltip } from "@experiments/components/adaptive-tooltip";
import { Icon } from "@iconify/react";

export function Example() {
  return (
    <AdaptiveTooltip
      enablePinning
      items={[
        {
          icon: <Icon icon="solar:user-circle-linear" width={28} />,
          label: "Profile",
        },
        {
          icon: <Icon icon="solar:chat-round-dots-linear" width={28} />,
          label: "Messages",
          hasBadge: true,
        },
        {
          icon: <Icon icon="solar:settings-linear" width={28} />,
          label: "Settings",
          shortcut: ["⌘", "S"],
        },
      ]}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AdaptiveTooltipItem[]` | - | Array of tooltip items |
| `enablePinning` | `boolean` | `true` | Allow pinning with Cmd/Shift key |
| `className` | `string` | - | Optional CSS class for container |

### AdaptiveTooltipItem

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | Icon element to display |
| `label` | `string` | Tooltip label text |
| `shortcut` | `ReactNode[]` | Optional keyboard shortcut keys |
| `hasBadge` | `boolean` | Show notification badge |

## Features

- **Intent Detection**: Delay decreases as user shows intent
- **Keyboard Pinning**: Hold Cmd/Shift to pin tooltip open
- **Micro-Reveal**: Staggered animation for tooltip content
- **Shared Layout**: Smooth transitions between tooltips
