import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AssistStory } from "@/components/case-study/AssistStory";
import { ChatPrototype } from "@/components/case-study/ChatPrototype";
import { klearassistContent } from "@/content/klearassist";

export const metadata: Metadata = {
  title: `${klearassistContent.meta.title} · Saumya Nigam`,
  description: klearassistContent.meta.summary,
};

export default function KlearAssistPage() {
  const { meta, snapshot } = klearassistContent;

  return (
    <main className="pt-24">
      <article className="mx-auto max-w-5xl px-6 pb-24 sm:px-10">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
        >
          ← Selected work
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
              {meta.company} · {meta.role}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.04] font-semibold tracking-[-0.045em]">
              {meta.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {meta.summary}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 text-xs tracking-wide text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            {snapshot.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] tracking-[0.16em] text-faint uppercase">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <div className="relative mt-12 overflow-hidden rounded-[1.8rem] border border-line">
          <Image
            src={meta.cover}
            alt=""
            width={1600}
            height={1000}
            priority
            unoptimized
            className="h-auto w-full"
          />
        </div>

        <div className="mt-20">
          <AssistStory />
        </div>

        <div className="mt-24">
          <ChatPrototype />
        </div>
      </article>
      <Footer />
    </main>
  );
}
