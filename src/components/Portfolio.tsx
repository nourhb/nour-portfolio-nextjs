"use client";

import { useEffect } from "react";
import { markup } from "@/content/markup";
import { startPortfolio } from "@/lib/experience";

export function Portfolio() {
  useEffect(() => {
    return startPortfolio();
  }, []);

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />
  );
}
