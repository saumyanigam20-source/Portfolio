import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies");

export type CaseStudyMeta = {
  title: string;
  slug: string;
  company: string;
  role?: string;
  platform?: string;
  tools?: string[];
  tags: string[];
  category: string;
  cover: string;
  source?: string;
  summary: string;
};

export type CaseStudy = CaseStudyMeta & {
  contentHtml: string;
};

export function getCaseStudySlugs(): string[] {
  return fs
    .readdirSync(caseStudiesDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

const preferredOrder = [
  "klearassist",
  "sso-configuration",
  "tracking-tool-redesign",
];

export function getCaseStudies(): CaseStudyMeta[] {
  return getCaseStudySlugs()
    .map((slug) => {
      const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return data as CaseStudyMeta;
    })
    .sort((a, b) => {
      const ai = preferredOrder.indexOf(a.slug);
      const bi = preferredOrder.indexOf(b.slug);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
}

export async function getCaseStudy(slug: string): Promise<CaseStudy> {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(remarkGfm).use(html).process(content);

  return {
    ...(data as CaseStudyMeta),
    contentHtml: processed.toString(),
  };
}
