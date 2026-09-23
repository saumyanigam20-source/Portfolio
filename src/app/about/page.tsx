import type { Metadata } from "next";
import { AboutStory } from "@/components/about/AboutStory";
import { Footer } from "@/components/Footer";
import { aboutContent } from "@/content/about";

export const metadata: Metadata = {
  title: `About · Saumya Nigam`,
  description: aboutContent.lede,
};

export default function AboutPage() {
  return (
    <main className="about-theme pt-24">
      <AboutStory />
      <Footer />
    </main>
  );
}
