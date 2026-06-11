import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import ScrollPattern from "@/components/ScrollPattern";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Preloader />
      <Cursor />
      <ScrollPattern />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}
