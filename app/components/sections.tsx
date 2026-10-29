import Image from "next/image";
import { services, contactEmail } from "../lib/content";
import { ContactLink, DemoLink } from "./actions";
import { VideoPlayer } from "./video-player";
import styles from "./landing.module.css";

function Brand() {
  return (
    <a href="#inicio" className={styles.brand} aria-label="EduKole, inicio">
      <Image
        src="/logo/brand-mark.webp"
        alt="Logo de EduKole: koala y hoja verde"
        width={48}
        height={48}
      />
      <span>
        EduKole<span className={styles.brandDot}>.</span>
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
      <div className={styles.heroCopy}>
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
      <div className={styles.heroArt}>
        <span className={styles.artLabel}>EL FUTURO SE APRENDE EN EL AULA</span>
        <div className={styles.artOrbit} aria-hidden="true" />
        <div className={styles.logoFrame}>
          <picture>
            <source
              srcSet="/logo/hero-classroom-320.webp 320w, /logo/hero-classroom.webp 640w"
              sizes="(max-width: 760px) 145px, (max-width: 1000px) 225px, 250px"
            />
          <Image
            src="/logo/hero-classroom.webp"
            alt="Docente preparando una sesión de aprendizaje junto al koala de EduKole"
            width={320}
            height={320}
            loading="eager"
            fetchPriority="high"
          />
          </picture>
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
export function MvpVideo() {
  return (
    <section id="mvp" className={`${styles.container} ${styles.videoSection}`} aria-labelledby="mvp-title">
      <div className={styles.videoIntro} data-reveal>
        <div>
          <p className={styles.eyebrow}>CONOCE NUESTRO MVP</p>
          <h2 id="mvp-title">De la idea <span className={styles.serif}>a tu aula.</span></h2>
        </div>
        <p>Así se ve AulaLista IA en acción. Dale play y conoce nuestra propuesta.</p>
      </div>
      <VideoPlayer />
      <a className={styles.videoFallback} href="https://www.youtube.com/watch?v=OoY5uN0cuL0" target="_blank" rel="noopener noreferrer">También puedes verlo en YouTube ↗</a>
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
            Tres líneas educativas.{" "}
            <br />
            Un mismo punto de partida: tu aula.
          </p>
        </div>
        <div className={styles.serviceStack}>
          {services.map((service, index) => (
            <article
              key={service.slug}
              data-service-motion
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
              {index === 0 && (
                <a
                  className={styles.mvpPreview}
                  href="#mvp"
                >
                  <span className={styles.playIcon} aria-hidden="true">▶</span>
                  <span><small>DEL PROPÓSITO A LA PRÁCTICA</small><strong>Mira AulaLista IA en acción</strong><span>Reproduce el video de nuestro MVP</span></span>
                  <span className={styles.videoArrow} aria-hidden="true">↗</span>
                </a>
              )}
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
          Somos EduKole. Desarrollamos propuestas educativas con tecnología e
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
                src="/aliados/oea.webp"
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
          <li>
            <div className={styles.allyImage}>
              <Image
                src="/aliados/minedu.png"
                alt="Ministerio de Educación del Perú (MINEDU)"
                width={482}
                height={104}
              />
            </div>
            <p>Ministerio de Educación</p>
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
      "El equipo de EduKole conversará contigo sobre la propuesta y su disponibilidad.",
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
          <nav aria-label="Explorar EduKole" className={styles.footerLinks}>
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
            <h3>Tu información, con un propósito claro</h3>
            <p>
              En EduKole usamos los datos que nos compartes para responder a tu
              consulta y coordinar una demo por el medio que elijas. El formulario
              solicita tu nombre, perfil, servicio de interés y correo electrónico
              o número de WhatsApp. El nombre de tu institución es opcional.
            </p>
            <h4>Cómo recibimos tu solicitud</h4>
            <p>
              Tu solicitud se procesa en nuestra infraestructura alojada en Vercel
              y se envía mediante nuestro proveedor de correo a {contactEmail}.
              Si nos escribes directamente por correo o WhatsApp, esos servicios
              también procesan información según sus propias políticas de privacidad.
            </p>
            <h4>Medición y almacenamiento en tu navegador</h4>
            <p>
              Solo si aceptas las cookies analíticas, usamos Google Analytics 4 para
              medir visitas y navegación. Google puede procesar identificadores de
              cookies e información técnica de tu dispositivo. Puedes rechazar o
              retirar el permiso desde «Cookies analíticas»; al retirarlo detenemos
              la medición y eliminamos las cookies de GA accesibles para este sitio.
              Guardamos tu elección en este navegador. Las interacciones,
              como los clics y la selección de servicio, generan eventos locales que
              no incluyen los datos personales del formulario. Para identificar
              desde qué campaña llegaste, podemos conservar códigos de campaña
              permitidos durante la sesión de esta pestaña, si tu navegador lo permite.
              No guardamos los datos del formulario en el almacenamiento del navegador.
            </p>
            <h4>Video de YouTube</h4>
            <p>
              El video de AulaLista IA utiliza el reproductor de YouTube en modo
              de privacidad mejorada. Al cargar el reproductor o reproducir el video,
              tu navegador se conecta con servicios de Google y YouTube, que pueden
              procesar información técnica y de reproducción conforme a su{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacidad</a>.
            </p>
            <h4>Consultas y solicitudes sobre tus datos</h4>
            <p>
              Puedes consultar sobre el uso de tu información, solicitar su
              actualización o eliminación, o retirar tu autorización para futuros
              contactos relacionados con la demo escribiendo a{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>
        </details>
        <div className={styles.footerBottom}>
          <span>© 2026 EduKole</span>
          <span>Las personas en el centro. La educación por delante.</span>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
      </div>
    </footer>
  );
}
