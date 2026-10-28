import Image from "next/image";
import { services, contactEmail } from "../lib/content";
import { ContactLink, DemoLink } from "./actions";
import styles from "./landing.module.css";

function Brand() {
  return (
    <a href="#inicio" className={styles.brand} aria-label="EduKolea, inicio">
      <Image
        src="/logo/logoEdukolea.webp"
        alt="Logo de EduKolea: koala y hoja verde"
        width={48}
        height={48}
        preload
      />
      <span>
        EduKolea<span className={styles.brandDot}>.</span>
      </span>
    </a>
  );
}
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.navInner}>
        <Brand />
        <nav aria-label="Navegación principal">
          <a href="#servicios" className={styles.navService}>
            Servicios
          </a>
          <a href="#nosotros" className={styles.navExtra}>
            Nosotros
          </a>
          <a href="#aliados" className={styles.navExtra}>
            Aliados
          </a>
          <DemoLink placement="nav">Pedir demo</DemoLink>
        </nav>
      </div>
    </header>
  );
}
export function Hero() {
  return (
    <section
      id="inicio"
      className={`${styles.container} ${styles.hero}`}
      aria-labelledby="hero-title"
    >
      <div className={styles.heroCopy} data-reveal>
        <p className={styles.eyebrow}>
          <span className={styles.dot} /> EDUCACIÓN CON MÁS POSIBILIDADES
        </p>
        <h1 id="hero-title">
          Crea sesiones de aprendizaje{" "}
          <span className={styles.serif}>con apoyo de IA</span>
        </h1>
        <p className={styles.heroDescription}>
          La inteligencia artificial abre posibilidades.{" "}
          <strong>Tu mirada docente les da sentido.</strong> Conoce AulaLista IA
          y descubre una nueva forma de preparar tus sesiones.
        </p>
        <div className={styles.heroActions}>
          <DemoLink placement="hero" service="aula_lista_ia">
            Conocer AulaLista IA
          </DemoLink>
          <a href="#servicios" className={styles.heroExplore}>
            Explorar servicios <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className={styles.support}>
          Para docentes y colegios · AulaLista IA disponible para demo
        </p>
      </div>
      <div className={styles.heroArt} data-reveal>
        <span className={styles.artLabel}>EL FUTURO SE APRENDE EN EL AULA</span>
        <div className={styles.artOrbit} aria-hidden="true" />
        <div className={styles.logoFrame}>
          <Image
            src="/logo/logomain.png"
            alt="Koala de EduKolea sobre una hoja verde"
            width={320}
            height={320}
            preload
          />
        </div>
        <span className={styles.spark} aria-hidden="true">
          ✳
        </span>
        <span className={`${styles.artChip} ${styles.chipTeacher}`}>
          ◎ Criterio docente
        </span>
        <span className={`${styles.artChip} ${styles.chipAI}`}>
          ✧ Inteligencia artificial
        </span>
        <div className={styles.artNote}>
          <span aria-hidden="true">↗</span>
          <p>
            La tecnología como apoyo.
            <br />
            <strong>Tu aula como punto de partida.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
const serviceDetails = [
  [
    "Parte de tu propósito de aprendizaje",
    "Explora cómo la IA puede apoyar la preparación de una sesión. Revisa en la demo el formato y las posibilidades de adaptación a tu aula.",
  ],
  [
    "Abre espacio al aprendizaje entre pares",
    "Una propuesta para desarrollar sesiones entre pares con agentes que pueden actuar como tutores. Conversemos sobre su alcance y disponibilidad antes de coordinar una demo.",
  ],
  [
    "Explora el apoyo a los reportes educativos",
    "Una línea orientada a reportes estandarizados y tareas relacionadas con SIAGIE. Su relación técnica con SIAGIE está por definir: no se ofrece integración ni sincronización automática.",
  ],
];
export function Services() {
  return (
    <section
      id="servicios"
      className={styles.services}
      aria-labelledby="services-title"
    >
      <div className={styles.container}>
        <div className={styles.sectionIntro} data-reveal>
          <div>
            <p className={styles.eyebrow}>01 / SERVICIOS</p>
            <h2 id="services-title">
              Más ideas para enseñar.
              <br />
              <span className={styles.serif}>Más espacio para crear.</span>
            </h2>
          </div>
          <p>
            Tres líneas educativas.
            <br />
            Un mismo punto de partida: tu aula.
          </p>
        </div>
        <div className={styles.serviceStack}>
          {services.map((service, index) => (
            <article
              key={service.slug}
              className={`${styles.servicePanel} ${styles[`panel${index}`]}`}
            >
              <div className={styles.serviceMeta}>
                <span>0{index + 1} / 03</span>
                <span>
                  {
                    [
                      "DISEÑAR · ADAPTAR · ENSEÑAR",
                      "EXPLORAR · COMPARTIR · APRENDER",
                      "ORGANIZAR · COMPRENDER · INFORMAR",
                    ][index]
                  }
                </span>
              </div>
              <div className={styles.serviceBody}>
                <div className={styles.serviceCopy}>
                  <p className={styles.provisional}>
                    Línea educativa · nombre provisional
                  </p>
                  <h3>{service.name}</h3>
                  <p className={styles.serviceTagline}>{service.title}</p>
                  <p>{service.description}</p>
                </div>
                <div className={styles.serviceArt} aria-hidden="true">
                  {index === 0 ? (
                    <>
                      <div className={styles.book}>
                        <div />
                        <div />
                      </div>
                      <span className={styles.serviceSpark}>✧</span>
                      <span className={styles.artFootnote}>
                        Una idea, muchas posibilidades
                      </span>
                    </>
                  ) : index === 1 ? (
                    <>
                      <div className={styles.peerArt}>
                        <span>◎</span>
                        <i>↔</i>
                        <span>✧</span>
                      </div>
                      <span className={styles.artFootnote}>
                        Aprender es conectar
                      </span>
                    </>
                  ) : (
                    <>
                      <div className={styles.reportArt}>
                        <span />
                        <span />
                        <span />
                        <span />
                        <i>↗</i>
                      </div>
                      <span className={styles.artFootnote}>
                        Otra mirada a la información
                      </span>
                    </>
                  )}
                </div>
              </div>
              <details className={styles.serviceDetails}>
                <summary>
                  Explorar {service.name}
                  <span aria-hidden="true">+</span>
                </summary>
                <div>
                  <h4>{serviceDetails[index][0]}</h4>
                  <p>{serviceDetails[index][1]}</p>
                </div>
              </details>
              <div className={styles.serviceBottom}>
                <span className={styles.availability}>
                  <span className={styles.dot} />
                  {service.status}
                </span>
                <DemoLink placement="service" service={service.slug}>
                  {index === 0 ? "Solicitar una demo" : "Consultar una demo"}
                </DemoLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section
      id="nosotros"
      className={`${styles.container} ${styles.about}`}
      aria-labelledby="about-title"
    >
      <div className={styles.aboutHeading} data-reveal>
        <p className={styles.eyebrow}>02 / NOSOTROS</p>
        <h2 id="about-title">
          La educación es humana.
          <br />
          <span className={styles.serif}>La tecnología la acompaña.</span>
        </h2>
        <p>
          Somos EduKolea. Desarrollamos propuestas educativas con tecnología e
          inteligencia artificial para apoyar a docentes y colegios en su día a
          día.
        </p>
      </div>
      <div className={styles.aboutGrid}>
        <div className={styles.purposeCanvas} data-reveal>
          <span className={styles.canvasLabel}>NUESTRA RAZÓN DE SER</span>
          <span className={styles.canvasSpark} aria-hidden="true">
            ✳
          </span>
          <p>
            IA con propósito.
            <br />
            <span className={styles.serif}>
              Educación
              <br />
              con criterio.
            </span>
          </p>
          <div className={styles.purposeEquation}>
            <span>Docentes</span>
            <span aria-hidden="true">+</span>
            <span>IA</span>
            <span aria-hidden="true">→</span>
            <span>Posibilidades</span>
          </div>
          <span className={styles.canvasFooter}>
            Las personas en el centro, siempre.
          </span>
        </div>
        <div className={styles.aboutValues} data-reveal>
          <p className={styles.aboutLead}>
            Creemos en una tecnología que parte de lo que pasa en el aula.
          </p>
          {[
            [
              "01",
              "Acompañar tu trabajo",
              "Buscamos que la IA sea un apoyo para preparar propuestas educativas, con espacio para tu revisión y adaptación.",
            ],
            [
              "02",
              "Conectar ideas y personas",
              "Exploramos formas de aprender entre pares y compartir nuevas perspectivas sobre la enseñanza.",
            ],
            [
              "03",
              "Construir con sentido",
              "Queremos acercar la tecnología a las necesidades de docentes y colegios, con claridad sobre lo que cada propuesta puede ofrecer.",
            ],
          ].map(([number, title, text]) => (
            <div className={styles.value} key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Allies() {
  return (
    <section
      id="aliados"
      className={styles.allies}
      aria-labelledby="allies-title"
    >
      <div className={styles.container}>
        <div className={styles.alliesHeading} data-reveal>
          <p className={styles.eyebrow}>03 / ALIADOS</p>
          <h2 id="allies-title">
            Las ideas crecen <span className={styles.serif}>en compañía.</span>
          </h2>
        </div>
        <ul className={styles.allyGrid} data-reveal>
          <li>
            <div className={styles.allyImage}>
              <Image
                src="/aliados/oea.png"
                alt="Organización de los Estados Americanos (OEA)"
                width={450}
                height={444}
              />
            </div>
            <p>
              Organización de los
              <br />
              Estados Americanos
            </p>
          </li>
          <li>
            <div className={styles.allyImage}>
              <Image
                src="/aliados/aws.png"
                alt="Amazon Web Services (AWS)"
                width={617}
                height={324}
              />
            </div>
            <p>Amazon Web Services</p>
          </li>
          <li>
            <div className={styles.allyImage}>
              <Image
                src="/aliados/incuba-centro.png"
                alt="Incuba Centro"
                width={447}
                height={447}
              />
            </div>
            <p>Incuba Centro</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
export function DemoSteps() {
  const steps = [
    [
      "Cuéntanos qué te interesa",
      "Elige la línea educativa que quieres conocer.",
    ],
    [
      "Elige cómo conversar",
      "Indica tu correo o teléfono de WhatsApp en el formulario.",
    ],
    [
      "Exploremos las posibilidades",
      "El equipo de EduKolea conversará contigo sobre la propuesta y su disponibilidad.",
    ],
  ];
  return (
    <section className={styles.stepsSection} aria-labelledby="steps-title">
      <div className={styles.container} data-reveal>
        <p className={styles.eyebrow}>04 / EL SIGUIENTE PASO</p>
        <h2 id="steps-title">
          De la curiosidad{" "}
          <span className={styles.serif}>a la conversación.</span>
        </h2>
        <ol className={styles.steps}>
          {steps.map(([title, text], i) => (
            <li key={title}>
              <span className={styles.stepNumber}>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <Brand />
            <p>
              Educación, tecnología y posibilidades.
              <br />
              Para docentes y colegios.
            </p>
          </div>
          <nav aria-label="Explorar EduKolea" className={styles.footerLinks}>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#aliados">Aliados</a>
          </nav>
          <div className={styles.footerContact}>
            <ContactLink method="email">{contactEmail}</ContactLink>
            <ContactLink method="whatsapp">
              WhatsApp +51 906 815 008
            </ContactLink>
            <DemoLink placement="footer" quiet />
          </div>
        </div>
        <details id="privacidad" className={styles.privacy}>
          <summary>Aviso de privacidad</summary>
          <div id="aviso-privacidad">
            <p>
              Al enviar una solicitud, compartes con EduKolea tu nombre, perfil,
              institución si la incluyes, servicio de interés y correo o
              teléfono de contacto. Usamos estos datos para responder a tu
              solicitud y coordinar la demo por el medio que elijas.
            </p>
            <p>
              El formulario se procesa en el servidor de EduKolea alojado en
              Vercel y se envía mediante nuestro proveedor de correo a {contactEmail}. También puedes
              contactarnos directamente por correo o WhatsApp, servicios con sus
              propias condiciones de privacidad.
            </p>
            <p>
              No se ha instalado Google Analytics. Los clics y la selección de
              servicio generan únicamente eventos locales sin datos personales.
              Los códigos de campaña permitidos se conservan en el
              almacenamiento de sesión de esta pestaña, cuando el navegador lo
              permite. Los datos del formulario no se guardan en el
              almacenamiento del navegador ni se incluyen en estos eventos.
            </p>
            <p>
              Para consultar sobre tus datos o solicitar su actualización o
              eliminación, escribe a{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </details>
        <div className={styles.footerBottom}>
          <span>© 2026 EduKolea</span>
          <span>Las personas en el centro. La educación por delante.</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
