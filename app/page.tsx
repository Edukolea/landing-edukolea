import {
  Header,
  Hero,
  Services,
  DemoSteps,
  Footer,
} from "./components/sections";
import { DemoForm } from "./components/demo-form";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Services />
        <DemoSteps />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
