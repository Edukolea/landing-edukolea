"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Motion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !("IntersectionObserver" in window)) return;
    const elements =
      root.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealState = "visible";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((element) => {
      element.dataset.revealState = "waiting";
      observer.observe(element);
    });
    // Touch screens have no hover: play the same illustration transitions on entry.
    const services = root.current?.querySelectorAll<HTMLElement>("[data-service-motion]") ?? [];
    const serviceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          (entry.target as HTMLElement).dataset.serviceActive = String(entry.isIntersecting);
        });
      },
      { threshold: 0.25 },
    );
    services.forEach((element) => serviceObserver.observe(element));
    const showAll = () => {
      if (preference.matches) {
        elements.forEach((element) => {
          element.dataset.revealState = "visible";
        });
        observer.disconnect();
        serviceObserver.disconnect();
        services.forEach((element) => delete element.dataset.serviceActive);
      }
    };
    preference.addEventListener("change", showAll);
    return () => {
      observer.disconnect();
      serviceObserver.disconnect();
      preference.removeEventListener("change", showAll);
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
