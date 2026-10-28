"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import Swal from "sweetalert2";
import { services, type ServiceSlug } from "../lib/content";
import { sendDemoRequest } from "../lib/demo-request";
import { measure, preserveCampaign } from "../lib/measurement";
import { ContactLink } from "./actions";
import styles from "./landing.module.css";

const subscribe = () => () => {};
const isService = (value: unknown): value is ServiceSlug =>
  services.some((service) => service.slug === value);

function alerts() {
  return Swal.mixin({
    background: "#f6faf2",
    color: "#364e48",
    iconColor: "#364e48",
    confirmButtonText: "Entendido",
    buttonsStyling: false,
    heightAuto: false,
    customClass: {
      popup: "edukole-alert",
      confirmButton: "edukole-alert-button",
      loader: "edukole-alert-loader",
    },
    animation: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
}

export function DemoForm() {
  const [method, setMethod] = useState("email");
  const [service, setService] = useState<ServiceSlug | "">("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const locked = useRef(false);
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    preserveCampaign();
    const choose = (value: unknown) => {
      if (isService(value)) {
        setService(value);
        measure({ event: "service_interest_select", service_slug: value });
      }
    };
    choose(new URLSearchParams(window.location.search).get("servicio"));
    const onSelect = (event: Event) =>
      choose((event as CustomEvent<unknown>).detail);
    window.addEventListener("edukole:select-service", onSelect);
    return () =>
      window.removeEventListener("edukole:select-service", onSelect);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    const form = event.currentTarget;
    const dialog = alerts();
    try {
      const invalid = Array.from(form.elements).find(
        (element) =>
          (element instanceof HTMLInputElement ||
            element instanceof HTMLSelectElement) &&
          !element.validity.valid,
      ) as HTMLInputElement | HTMLSelectElement | undefined;
      if (invalid) {
        const label =
          invalid.labels?.[0]?.textContent?.replace(/\s*\*\s*$/, "").trim() ||
          "el campo señalado";
        await dialog.fire({
          icon: "info",
          titleText: "Revisa tus datos",
          text:
            invalid.type === "checkbox"
              ? "Necesitamos tu autorización para contactarte sobre la demo."
              : `Completa ${label} con un valor válido.${invalid.title ? ` ${invalid.title}` : ""}`,
          confirmButtonText: "Revisar campo",
          returnFocus: false,
        });
        invalid.focus();
        return;
      }
      const data = new FormData(form);
      if (String(data.get("_honey") || "")) return;
      const fields = Object.fromEntries(
        Array.from(data.entries(), ([key, value]) => [
          key,
          String(value).trim(),
        ]),
      );
      setBusy(true);
      setStatus("Enviando tu solicitud…");
      void dialog.fire({
        titleText: "Conectando con tu próxima demo",
        text: "Estamos enviando tu solicitud. Espera un momento.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading(),
      });
      await sendDemoRequest(fields);
      setBusy(false);
        setStatus("El servidor de correo aceptó tu solicitud.");
        form.reset();
        setService("");
        setMethod("email");
        setEmail("");
        setPhone("");
        await dialog.fire({
          icon: "success",
          titleText: "¡Un paso más cerca de tu demo!",
          text: "El servidor de correo aceptó tu solicitud. EduKole se pondrá en contacto contigo por el medio que elegiste.",
          confirmButtonText: "Volver a EduKole",
        });
    } catch {
      setBusy(false);
      setStatus(
        "No pudimos confirmar el envío. Tus datos siguen aquí para reintentar.",
      );
      await dialog.fire({
        icon: "error",
        titleText: "No pudimos confirmar el envío",
        text: "Revisa tu conexión y vuelve a intentarlo. Si el problema continúa, escribe a contacto@edukolea.com o usa WhatsApp. Conservamos tus datos en el formulario; si hubo un corte de conexión, comprueba antes si ya recibiste respuesta.",
        confirmButtonText: "Volver al formulario",
      });
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }

  return (
    <section
      id="demo"
      className={`${styles.container} ${styles.demo}`}
      aria-labelledby="demo-title"
    >
      <div className={styles.demoIntro} data-reveal>
        <p className={styles.eyebrow}>05 / CONVERSEMOS</p>
        <h2 id="demo-title">
          Tu próxima
          <br />
          <span className={styles.serif}>idea empieza aquí.</span>
        </h2>
        <p>
          Cuéntanos qué te interesa. Exploremos juntos cómo la inteligencia
          artificial puede acompañar tu trabajo educativo.
        </p>
        <div className={styles.contactOptions}>
          <ContactLink method="email">contacto@edukolea.com</ContactLink>
          <ContactLink method="whatsapp">Conversemos por WhatsApp</ContactLink>
        </div>
        <p className={styles.small}>
          ¿Prefieres conversar primero? Escríbenos directamente por el canal que
          te resulte más cómodo.
        </p>
      </div>
      <form
        className={styles.form}
        aria-label="Solicitar una demo"
        aria-describedby="form-status"
        onSubmit={submit}
        noValidate
        method="POST"
        aria-busy={busy}
        data-reveal
      >
        <div className={styles.formHeading}>
          <span className={styles.formMark} aria-hidden="true">
            ↗
          </span>
          <div>
            <h3>Conozcamos tu aula</h3>
            <p>Completa tus datos y coordinemos una demo.</p>
          </div>
        </div>
        <p className={styles.small}>
          Los campos con * son obligatorios. Envía tu solicitud sin salir de
          esta página.
        </p>
        <fieldset className={styles.formFields} disabled={!ready || busy}>
          <legend className="sr-only">Solicitud de demo</legend>
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            className={styles.honeypot}
            aria-hidden="true"
          />
          <div className={styles.field}>
            <label htmlFor="service">Servicio de interés *</label>
            <select
              id="service"
              name="service"
              required
              value={service}
              onChange={(event) => {
                const value = event.target.value;
                if (isService(value)) {
                  setService(value);
                  measure({
                    event: "service_interest_select",
                    service_slug: value,
                  });
                }
              }}
            >
              <option value="" disabled>
                Selecciona una línea educativa
              </option>
              {services.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="name">Nombre *</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                pattern=".*\S.*"
                placeholder="Tu nombre"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="profile">Perfil *</label>
              <select id="profile" name="profile" required defaultValue="">
                <option value="" disabled>
                  Selecciona tu perfil
                </option>
                <option value="docente">Docente</option>
                <option value="directivo">Directivo/a</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor="institution">
              Institución <span>(opcional)</span>
            </label>
            <input
              id="institution"
              name="institution"
              autoComplete="organization"
              maxLength={200}
              placeholder="Nombre de tu institución"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="contact-method">
              Medio de contacto preferido *
            </label>
            <select
              id="contact-method"
              name="contact_method"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              required
            >
              <option value="email">Correo electrónico</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="contact">
              {method === "email"
                ? "Correo electrónico"
                : "Teléfono de WhatsApp"}{" "}
              *
            </label>
            <input
              id="contact"
              name={method === "email" ? "email" : "phone"}
              type={method === "email" ? "email" : "tel"}
              autoComplete={method === "email" ? "email" : "tel"}
              value={method === "email" ? email : phone}
              onChange={(event) =>
                method === "email"
                  ? setEmail(event.target.value)
                  : setPhone(event.target.value)
              }
              required
              maxLength={method === "email" ? 254 : 30}
              pattern={
                method === "whatsapp"
                  ? "[+]?[0-9][0-9 \\(\\)\\-]{6,28}[0-9]"
                  : undefined
              }
              title={
                method === "whatsapp"
                  ? "Incluye el código de país, por ejemplo +51 906 815 008."
                  : undefined
              }
              placeholder={
                method === "email" ? "tu@correo.com" : "+51 906 815 008"
              }
            />
          </div>
          <label className={styles.consent}>
            <input
              type="checkbox"
              name="consent"
              value="accepted"
              required
            />
            <span>
              Autorizo a EduKole a usar estos datos para contactarme sobre mi
              demo. He leído el{" "}
              <a href="#aviso-privacidad">aviso de privacidad</a>. *
            </span>
          </label>
          <button
            type="submit"
            className={styles.button}
            disabled={!ready || busy}
          >
            {busy ? (
              <>
                <span className={styles.spinner} aria-hidden="true" /> Enviando
                solicitud…
              </>
            ) : (
              <>
                Solicitar una demo <span aria-hidden="true">↗</span>
              </>
            )}
          </button>
        </fieldset>
        <p
          id="form-status"
          className={styles.formStatus}
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <noscript>
          <p>
            Activa JavaScript para enviar sin salir de la página o utiliza los
            enlaces de correo y WhatsApp.
          </p>
        </noscript>
      </form>
    </section>
  );
}
