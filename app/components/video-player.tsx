"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

function Player() {
  return <iframe
    src="https://www.youtube-nocookie.com/embed/OoY5uN0cuL0?playsinline=1&rel=0"
    title="AulaLista IA: presentación de nuestro MVP"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />;
}

export function VideoPlayer() {
  const frame = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Native iframe lazy loading may fetch far below the viewport. Load only
    // when the player is actually visible, without interrupting playback later.
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={frame} className={styles.videoFrame}>
    {visible ? <Player /> : <button type="button" className={styles.videoLoad} onClick={() => setVisible(true)}>
      <span aria-hidden="true">▶</span>
      <strong>Ver AulaLista IA en acción</strong>
      <span>Cargar el reproductor de video</span>
    </button>}
    <noscript><Player /></noscript>
  </div>;
}
