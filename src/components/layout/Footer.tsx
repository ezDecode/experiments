"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-border pt-10 pb-24 md:pt-12 md:pb-8 mt-20">
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Want to get in touch?
          </p>
          <Link
            href="mailto:ezdecode@gmail.com"
            className="text-base md:text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
          >
            ezdecode@gmail.com
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Based in IND</span>
            <span>·</span>
            <span className="tabular-nums">{time || "00:00:00"}</span>
          </div>

          <span className="hidden md:inline">·</span>

          <Link
            href="https://github.com/ezDecode"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            @ezDecode
          </Link>

          <span className="hidden md:inline">·</span>

          <span>©2025</span>
        </div>
      </div>
    </footer>
  );
}
