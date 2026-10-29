"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useState, useSyncExternalStore } from "react";
import styles from "./analytics-consent.module.css";

const storageKey = "edukole:analytics-consent:v1";
type Choice = "accepted" | "rejected";

function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === storageKey || event.key === null) {
      // A fresh document also stops already-loaded tags after cross-tab revocation.
      window.location.reload();
    } else {
      callback();
    }
  }
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}

function readChoice(): Choice | null {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "accepted" || saved === "rejected" ? saved : null;
  } catch {
    return null;
  }
}

const serverChoice = () => undefined;

export function AnalyticsConsent({ gaId }: { gaId?: string }) {
  const savedChoice = useSyncExternalStore(subscribe, readChoice, serverChoice);
  const [visitChoice, setChoice] = useState<Choice>();
  const choice = visitChoice ?? savedChoice;
  const [editing, setEditing] = useState(false);
  const validId = gaId && /^G-[A-Z0-9]+$/.test(gaId) ? gaId : null;

  function choose(next: Choice) {
    if (!validId) return;
    // Disable collection immediately, including scripts already loaded this visit.
    (window as unknown as Record<string, unknown>)[`ga-disable-${validId}`] = next !== "accepted";
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // The current visit still respects the choice.
    }
    setChoice(next);
    setEditing(false);
    if (next === "rejected") {
      // Remove GA cookies for host-only and parent-domain configurations.
      const parts = location.hostname.split(".");
      for (const item of document.cookie.split(";")) {
        const name = item.trim().split("=")[0];
        if (name !== "_ga" && !name.startsWith("_ga_")) continue;
        const expired = `${name}=; Max-Age=0; Path=/`;
        document.cookie = expired;
        for (let i = 0; i < parts.length; i++) {
          document.cookie = `${expired}; Domain=${parts.slice(i).join(".")}`;
        }
      }
    }
  }

  if (!validId || choice === undefined) return null;

  return (
    <>
      {choice === "accepted" ? <GoogleAnalytics gaId={validId} /> : null}
      {choice === null || editing ? (
        <section className={styles.notice} aria-label="Cookies analíticas">
          <p>Con tu permiso usamos Google Analytics para conocer las visitas y mejorar el sitio. Puedes rechazar las cookies analíticas y seguir usando todas las funciones. <a href="#aviso-privacidad">Aviso de privacidad</a>.</p>
          <div className={styles.actions}>
            <button type="button" onClick={() => choose("rejected")}>Rechazar</button>
            <button type="button" onClick={() => choose("accepted")}>Aceptar analítica</button>
          </div>
        </section>
      ) : (
        <button className={styles.preferences} type="button" onClick={() => setEditing(true)}>Cookies analíticas</button>
      )}
    </>
  );
}
