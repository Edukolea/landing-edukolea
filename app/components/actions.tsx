"use client";
import type { ReactNode } from "react";
import { contacts } from "../lib/content";
import { measure, type Placement } from "../lib/measurement";
import styles from "./landing.module.css";
export function DemoLink({ placement, children = "Solicitar una demo", quiet = false }: { placement: Placement; children?: ReactNode; quiet?: boolean }) {
  return <a className={quiet ? styles.textLink : styles.button} href="#demo" onClick={() => measure({ event: "demo_cta_click", placement })}>{children}<span aria-hidden="true">↗</span></a>;
}
export function ContactLink({ method, children }: { method: "email" | "whatsapp"; children: ReactNode }) {
  return <a href={contacts[method]} onClick={() => measure({ event: "contact_outbound_click", contact_method: method })}>{children}<span aria-hidden="true"> ↗</span></a>;
}
