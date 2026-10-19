import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AssistStory } from "@/components/case-study/AssistStory";
import { Placeholder } from "@/components/case-study/Placeholder";
import { klearassistContent, klearassistLead } from "@/content/klearassist";

export const metadata: Metadata = {
  title: "KlearAssist · Saumya Nigam",
  description: klearassistLead,
};

export default function KlearAssistPage() {
  const { meta, snapshot } = klearassistContent;

  return (
    <main className="pt-24">
      <article className="case-study mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Selected work
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            {meta.company} · {meta.role}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.04] font-semibold tracking-[-0.045em]">
            KlearAssist
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{klearassistLead}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5 sm:grid-cols-4">
            {snapshot.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">{item.label}</dt>
                <dd className="mt-1 text-sm leading-snug text-ink">
                  {item.value.startsWith("[ADD") ? <Placeholder>{item.value}</Placeholder> : item.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="mt-12">
          <AssistStory />
        </div>
      </article>
      <Footer />
    </main>
  );
}
