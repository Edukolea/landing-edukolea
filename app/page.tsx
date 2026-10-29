import {
  Header,
  Hero,
  MvpVideo,
  Services,
  About,
  Allies,
  DemoSteps,
  Footer,
} from "./components/sections";
import { DemoForm } from "./components/demo-form";
import { Motion } from "./components/motion";
import { structuredData } from "./lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Motion><Hero />
        <MvpVideo />
        <Services />
        <About />
        <Allies />
        <DemoSteps />
        <DemoForm /></Motion>
      </main>
      <Footer />
    </>
  );
}
