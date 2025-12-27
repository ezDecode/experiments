"use client";

import { Icon } from "@iconify/react";
import { AdaptiveTooltip } from "@experiments/components/adaptive-tooltip";

export default function AdaptiveTooltipDemo() {
  return (
    <div className="flex items-center justify-center py-28">
      {/* Toolbar surface */}
      <div className="rounded-xl p-2 backdrop-blur">
        <AdaptiveTooltip
          enablePinning
          items={[
            {
              icon: (
                <div className="rounded-xl bg-neutral-800 p-2 text-neutral-100">
                  <Icon icon="solar:user-circle-linear" width={28} />
                </div>
              ),
              label: "Profile",
            },
            {
              icon: (
                <div className="rounded-xl bg-neutral-800 p-2 text-neutral-100">
                  <Icon icon="solar:chat-round-dots-linear" width={28} />
                </div>
              ),
              label: "Messages",
              hasBadge: true,
            },
            {
              icon: (
                <div className="rounded-xl bg-neutral-800 p-2 text-neutral-100">
                  <Icon icon="solar:calendar-linear" width={28} />
                </div>
              ),
              label: "Schedule",
            },
            {
              icon: (
                <div className="rounded-xl bg-neutral-800 p-2 text-neutral-100">
                  <Icon icon="solar:settings-linear" width={28} />
                </div>
              ),
              label: "Preferences",
            },
          ]}
        />
      </div>
    </div>
  );
}
