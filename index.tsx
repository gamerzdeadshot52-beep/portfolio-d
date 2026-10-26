import { createFileRoute } from "@tanstack/react-router";
import { About, Contact, Cursor, Hero, Nav, Process, Services, Work } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishal Singh — Horizon Designs | Graphic, Video & Web Designer" },
      { name: "description", content: "Immersive 3D portfolio of Vishal Singh: graphic design, video editing and web design with 4+ years and 100+ projects." },
      { property: "og:title", content: "Vishal Singh — Horizon Designs" },
      { property: "og:description", content: "I turn ideas into visual experiences. Graphic Designer • Video Editor • Web Designer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Process />
      <Contact />
    </main>
  );
}
