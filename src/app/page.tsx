import { Currently } from "@/components/Currently";
import { Experiments } from "@/components/Experiments";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Illustrations } from "@/components/Illustrations";
import { SelectedWork } from "@/components/SelectedWork";
import { getCaseStudies } from "@/lib/case-studies";

export default function HomePage() {
  const projects = getCaseStudies();

  return (
    <main>
      <Hero />
      <Currently />
      <SelectedWork projects={projects} />
      <Illustrations />
      <Experiments />
      <Footer />
    </main>
  );
}
