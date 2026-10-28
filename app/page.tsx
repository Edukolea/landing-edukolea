import {
  Header,
  Hero,
  Services,
  About,
  Allies,
  DemoSteps,
  Footer,
} from "./components/sections";
import { DemoForm } from "./components/demo-form";
import { Motion } from "./components/motion";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Motion><Hero />
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
