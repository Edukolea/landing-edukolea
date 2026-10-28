"use client";
import type { ReactNode } from "react";
import { contacts, type ServiceSlug } from "../lib/content";
import { measure, type Placement } from "../lib/measurement";
import styles from "./landing.module.css";
export function DemoLink({
  placement,
  children = "Solicitar una demo",
  quiet = false,
  service,
}: {
  placement: Placement;
  children?: ReactNode;
  quiet?: boolean;
  service?: ServiceSlug;
}) {
  return (
    <a
      className={quiet ? styles.textLink : styles.button}
      href={service ? `?servicio=${service}#demo` : "#demo"}
      onClick={(event) => {
        measure({ event: "demo_cta_click", placement });
        if (service) {
          event.preventDefault();
          window.dispatchEvent(
            new CustomEvent("edukolea:select-service", { detail: service }),
          );
          document
            .getElementById("demo")
            ?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            });
          document.getElementById("service")?.focus({ preventScroll: true });
        }
      }}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
export function ContactLink({
  method,
  children,
}: {
  method: "email" | "whatsapp";
  children: ReactNode;
}) {
  return (
    <a
      href={contacts[method]}
      onClick={() =>
        measure({ event: "contact_outbound_click", contact_method: method })
      }
    >
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}
