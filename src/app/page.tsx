import { Currently } from "@/components/Currently";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { getCaseStudies } from "@/lib/case-studies";

export default function HomePage() {
  const projects = getCaseStudies();

  return (
    <main>
      <Hero />
      <Currently />
      <SelectedWork projects={projects} />
      <Footer />
    </main>
  );
}
