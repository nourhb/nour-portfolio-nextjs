"use client";

import { useEffect } from "react";
import { markup } from "@/content/markup";
import { startPortfolio } from "@/lib/experience";
import projects from "@/data/projects.json";

declare global {
  interface Window {
    __PORTFOLIO_PROJECTS?: typeof projects;
  }
}

export function Portfolio() {
  useEffect(() => {
    window.__PORTFOLIO_PROJECTS = projects;
    return startPortfolio();
  }, []);

  return (
    <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: markup }} />
  );
}
