"use client";
import { useEffect, useState } from "react";
import { demoFormAction, services, type ServiceSlug } from "../lib/content";
import { measure, preserveCampaign } from "../lib/measurement";
import { ContactLink } from "./actions";
import styles from "./landing.module.css";
export function DemoForm() {
  const [method, setMethod] = useState("email");
  useEffect(() => { preserveCampaign(); }, []);
  return <section id="demo" className={`${styles.container} ${styles.demo}`} aria-labelledby="demo-title">
    <div className={styles.demoIntro}><p className={styles.eyebrow}>03 / CONVERSEMOS</p><h2 id="demo-title">Solicita<br />una <span className={styles.serif}>demo.</span></h2><p>Cuéntanos quién eres y qué te interesa. Te contactaremos por el medio que elijas.</p><div className={styles.contactOptions}><ContactLink method="email">Escríbenos por correo</ContactLink><ContactLink method="whatsapp">Conversemos por WhatsApp</ContactLink></div><p className={styles.small}>También puedes escribirnos directamente para coordinar tu demo.</p></div>
    <form className={styles.form} action={demoFormAction} method="POST" aria-label="Solicitar una demo" aria-describedby="form-status">
      <input type="hidden" name="_subject" value="Nueva solicitud de demo · EduKolea" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_url" value="https://edukolea.com/" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className={styles.honeypot} aria-hidden="true" />
      <div id="form-status" className={styles.formNotice}><strong>Recibe información sobre tu demo</strong><p>Al enviar, irás a FormSubmit para completar la verificación de seguridad y consultar el resultado del envío. Si no puedes completarlo, escríbenos por correo o WhatsApp.</p></div>
      <p className={styles.small}>Los campos con * son obligatorios.</p>
      <div className={styles.field}><label htmlFor="service">Servicio de interés *</label><select id="service" name="service" required defaultValue="" onChange={(event) => { if (event.target.value) measure({ event: "service_interest_select", service_slug: event.target.value as ServiceSlug }); }}><option value="" disabled>Selecciona una línea educativa</option>{services.map(service => <option key={service.slug} value={service.slug}>{service.name} · nombre provisional</option>)}</select></div>
      <div className={styles.field}><label htmlFor="contact-method">Medio de contacto preferido *</label><select id="contact-method" name="contact_method" value={method} onChange={event => setMethod(event.target.value)} required><option value="email">Correo electrónico</option><option value="whatsapp">WhatsApp</option></select></div>
      <fieldset className={styles.personalFields}><legend>Datos de contacto</legend><div className={styles.fieldRow}><div className={styles.field}><label htmlFor="name">Nombre *</label><input id="name" name="name" autoComplete="name" required maxLength={120} pattern=".*\S.*" placeholder="Tu nombre" /></div><div className={styles.field}><label htmlFor="profile">Perfil *</label><select id="profile" name="profile" required defaultValue=""><option value="" disabled>Selecciona tu perfil</option><option value="docente">Docente</option><option value="directivo">Directivo/a</option><option value="otro">Otro</option></select></div></div><div className={styles.field}><label htmlFor="institution">Institución <span>(opcional)</span></label><input id="institution" name="institution" autoComplete="organization" maxLength={200} placeholder="Nombre de tu institución" /></div><div className={styles.field}><label htmlFor="contact">{method === "email" ? "Correo electrónico" : "Teléfono de WhatsApp"} *</label><input key={method} id="contact" name={method === "email" ? "email" : "phone"} type={method === "email" ? "email" : "tel"} autoComplete={method === "email" ? "email" : "tel"} required maxLength={method === "email" ? 254 : 30} pattern={method === "whatsapp" ? "[+]?[0-9][0-9 \\(\\)\\-]{6,28}[0-9]" : undefined} title={method === "whatsapp" ? "Incluye el código de país y entre 8 y 30 caracteres, por ejemplo +51 906 815 008." : undefined} placeholder={method === "email" ? "tu@correo.com" : "+51 906 815 008"} /></div></fieldset>
      <label className={styles.consent}><input type="checkbox" name="consent" value="Autorizo el uso de mis datos para coordinar la demo" required /><span>Autorizo a EduKolea a usar estos datos para contactarme sobre mi demo. El envío se procesa mediante FormSubmit. He leído el <a href="#aviso-privacidad">aviso de privacidad</a>. *</span></label>
      <button type="submit" className={styles.button} aria-describedby="form-status">Solicitar una demo <span aria-hidden="true">↗</span></button><noscript><p>Puedes enviar tu solicitud con correo electrónico. Para WhatsApp, usa el enlace de contacto directo.</p></noscript>
    </form></section>;
}
