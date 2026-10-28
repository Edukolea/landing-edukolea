import Image from "next/image";
import { services } from "../lib/content";
import { ContactLink, DemoLink } from "./actions";
import styles from "./landing.module.css";
function Brand() {
  return <a href="#inicio" className={styles.brand} aria-label="EduKolea, inicio"><Image src="/logo/logoEdukolea.webp" alt="Logo de EduKolea: koala y hoja verde" width={48} height={48} preload /><span>EduKolea<span className={styles.brandDot}>.</span></span></a>;
}
export function Header() {
  return <header className={styles.header}><div className={styles.navInner}><Brand /><nav aria-label="Navegación principal"><a href="#servicios" className={styles.navService}>Servicios</a><DemoLink placement="nav" /></nav></div></header>;
}
export function Hero() {
  return <section id="inicio" className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-title">
    <div className={styles.heroCopy}><p className={styles.eyebrow}><span className={styles.dot} /> EduKolea para docentes y colegios</p>
      <h1 id="hero-title">Crea sesiones de aprendizaje <span className={styles.serif}>con apoyo de IA</span></h1>
      <p className={styles.heroDescription}>Conoce <strong>AulaLista IA</strong>, la propuesta de EduKolea para crear sesiones de aprendizaje con apoyo de inteligencia artificial. Descubre cómo funciona en una demo.</p>
      <DemoLink placement="hero" /><p className={styles.support}>AulaLista IA · nombre provisional · disponible para demo.</p></div>
    <div className={styles.heroArt}><span className={styles.artLabel}>EDUCACIÓN + INTELIGENCIA ARTIFICIAL</span><div className={styles.artOrbit} aria-hidden="true" />
      <div className={styles.logoFrame}><Image src="/logo/logoEdukolea.webp" alt="Koala de EduKolea sobre una hoja verde" width={320} height={320} preload /></div><span className={styles.spark} aria-hidden="true">✳</span>
      <div className={styles.artNote}><span aria-hidden="true">↗</span><p>La tecnología como apoyo.<br /><strong>Tu aula como punto de partida.</strong></p></div></div>
  </section>;
}
function ServiceCard({ index }: { index: 1 | 2 }) {
  const service = services[index];
  return <article className={styles.serviceCard}><div className={styles.cardTop}><span className={styles.serviceNumber}>0{index + 1}</span><span className={styles.lineIcon} aria-hidden="true">{index === 1 ? "◎" : "▤"}</span></div>
    <p className={styles.provisional}>Nombre provisional</p><h3>{service.name}</h3><p className={styles.cardSubtitle}>{service.title}</p><p>{service.description}</p><p className={styles.pending}>{service.status}</p></article>;
}
export function Services() {
  return <section id="servicios" className={`${styles.container} ${styles.services}`} aria-labelledby="services-title">
    <div className={styles.sectionIntro}><p className={styles.eyebrow}>01 / NUESTRAS LÍNEAS EDUCATIVAS</p><p>Ideas para acompañar<br />el trabajo docente.</p></div>
    <article className={styles.featured}><div className={styles.featuredVisual} aria-hidden="true"><span className={styles.visualCaption}>EL PUNTO DE PARTIDA</span><div className={styles.book}><div /><div /></div><span className={styles.bookSpark}>✳</span><p>Una sesión.<br /><span>Muchas posibilidades.</span></p></div>
      <div className={styles.featuredCopy}><span className={styles.pill}><span className={styles.dot} />{services[0].status}</span><h2 id="services-title">Empieza por la sesión de aprendizaje</h2><p className={styles.serviceName}>AulaLista IA <span>· nombre provisional</span></p><p>{services[0].description}</p><p className={styles.small}>Conoce en la demo el formato y el alcance de la propuesta.</p><DemoLink placement="service" /></div></article>
    <div className={styles.otherIntro}><h2>Conoce las otras<br className={styles.desktopBreak} /> líneas educativas</h2><p>Una propuesta educativa que acompaña más momentos del trabajo docente. Estas líneas tienen su alcance y disponibilidad por confirmar.</p></div>
    <div className={styles.cards}><ServiceCard index={1} /><ServiceCard index={2} /></div>
  </section>;
}
export function DemoSteps() {
  const steps = [["Cuéntanos qué te interesa", "Elige la línea educativa que quieres conocer."], ["Elige cómo conversar", "Puedes contactarnos por correo o WhatsApp."], ["Coordinemos la demo", "El equipo de EduKolea coordinará contigo una demostración."]];
  return <section className={styles.stepsSection} aria-labelledby="steps-title"><div className={styles.container}><p className={styles.eyebrow}>02 / EL SIGUIENTE PASO</p><h2 id="steps-title">Conoce la propuesta <span className={styles.serif}>en una demo</span></h2><ol className={styles.steps}>{steps.map(([title, text], i) => <li key={title}><span className={styles.stepNumber}>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>;
}
export function Footer() {
  return <footer className={styles.footer}><div className={styles.container}><div className={styles.footerTop}><div><Brand /><p>Soluciones educativas para<br />docentes y colegios.</p></div><div className={styles.footerContact}><ContactLink method="email">contacto@edukolea.com</ContactLink><ContactLink method="whatsapp">WhatsApp +51 906 815 008</ContactLink><DemoLink placement="footer" quiet /></div></div>
    <details id="privacidad" className={styles.privacy}><summary>Aviso de privacidad</summary><div id="aviso-privacidad"><p>Al enviar una solicitud, compartes con EduKolea tu nombre, perfil, institución si la incluyes, servicio de interés y correo o teléfono de contacto. Usamos estos datos para responder a tu solicitud y coordinar la demo por el medio que elijas.</p><p>El formulario se envía a FormSubmit, un proveedor externo que procesa el envío y lo dirige a contacto@edukolea.com. También puedes contactarnos directamente por correo o WhatsApp, servicios con sus propias condiciones de privacidad.</p><p>No se ha instalado Google Analytics. Los clics y la selección de servicio generan únicamente eventos locales sin datos personales. Los códigos de campaña permitidos se conservan en el almacenamiento de sesión de esta pestaña, cuando el navegador lo permite. Los datos del formulario no se guardan en el almacenamiento del navegador ni se incluyen en estos eventos.</p><p>Para consultar sobre tus datos o solicitar su actualización o eliminación, escribe a <a href="mailto:contacto@edukolea.com">contacto@edukolea.com</a>.</p></div></details>
    <div className={styles.footerBottom}><span>© 2026 EduKolea</span><span>Educación con nuevas posibilidades.</span><a href="#inicio">Volver arriba ↑</a></div></div></footer>;
}
