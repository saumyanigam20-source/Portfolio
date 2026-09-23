"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { asideNotes, asideRules } from "@/content/aside";
import { profile } from "@/lib/profile";
import { LivingPortrait } from "@/components/aside/LivingPortrait";
import { ChapterRail, ProjectCards, StepRail } from "@/components/aside/Sketches";

const avatar = "/images/aside/avatar.png";

type Scene = "idle" | "me" | "work" | "think" | "aside" | "lost";
type Follow = "place" | "study" | "rule" | "another" | null;

const intents: { id: Exclude<Scene, "idle" | "lost">; label: string }[] = [
  { id: "me", label: "Who is Saumya?" },
  { id: "work", label: "What has she shipped?" },
  { id: "think", label: "How does she think?" },
  { id: "aside", label: "Something irrelevant" },
];

const followUps: Record<Exclude<Scene, "idle" | "lost">, { id: Follow; label: string }[]> = {
  me: [
    { id: "place", label: "Where is she now?" },
    { id: "study", label: "What did she study?" },
  ],
  work: [],
  think: [{ id: "rule", label: "A rule she keeps" }],
  aside: [{ id: "another", label: "Another aside" }],
};

export function AsideBot() {
  const [open, setOpen] = useState(false);
  const [scene, setScene] = useState<Scene>("idle");
  const [asked, setAsked] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [aborted, setAborted] = useState(false);
  const [followUp, setFollowUp] = useState<Follow>(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [note, setNote] = useState(0);
  const [rule, setRule] = useState(0);
  const [highlight, setHighlight] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) launcherRef.current?.focus();
      return;
    }
    wasOpen.current = true;
    const focus = window.setTimeout(() => inputRef.current?.focus(), 240);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focus);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [scene, loading, followUp, followLoading, note, rule, aborted]);

  function clearTimer() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function goIdle() {
    clearTimer();
    setScene("idle");
    setAsked("");
    setDraft("");
    setLoading(false);
    setAborted(false);
    setFollowUp(null);
    setFollowLoading(false);
    setNote(0);
    setRule(0);
    setHighlight(null);
  }

  function ask(next: Scene, question?: string, fromDraft = false) {
    if (loading) return;
    clearTimer();
    const text =
      question?.trim() ||
      intents.find((item) => item.id === next)?.label ||
      "";
    setScene(next);
    setAsked(text);
    setFollowUp(null);
    setFollowLoading(false);
    setAborted(false);
    setDraft("");
    setNote(0);
    setRule(0);
    setHighlight(fromDraft ? projectHint(text) : null);
    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, 720);
  }

  function sendDraft(event?: FormEvent) {
    event?.preventDefault();
    const text = draft.trim();
    if (loading || !text) return;
    const next = resolveScene(text);
    ask(next, text, true);
  }

  function stopReply() {
    clearTimer();
    setLoading(false);
    setFollowLoading(false);
    setAborted(true);
  }

  function pickFollowUp(id: Follow) {
    if (!id || loading || followLoading) return;
    if (id === "another") {
      setNote((current) => (current + 1) % asideNotes.length);
      return;
    }
    if (id === "rule") {
      setRule((current) => (followUp === "rule" ? (current + 1) % asideRules.length : 0));
    }
    setFollowUp(id);
    setAborted(false);
    setFollowLoading(true);
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setFollowLoading(false);
      timerRef.current = null;
    }, 560);
  }

  const thinking = loading || followLoading;
  const inThread = scene !== "idle";

  return (
    <div className="aside-root fixed right-4 bottom-4 z-[45] flex flex-col items-end sm:right-6 sm:bottom-6">
      {open ? (
        <section
          id="aside-panel"
          role="dialog"
          aria-label="Aside, a portfolio companion"
          className="aside-panel mb-3 flex h-[min(72vh,540px)] w-[min(100vw-2rem,380px)] flex-col overflow-hidden rounded-[1.25rem] border border-line bg-[#121513] text-ink shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              {inThread ? (
                <button
                  type="button"
                  aria-label="Back to greeting"
                  onClick={goIdle}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-ink"
                >
                  <BackIcon />
                </button>
              ) : (
                <Avatar />
              )}
              <div>
                <p className="font-display text-[15px] leading-none font-semibold tracking-[-0.03em]">
                  Aside
                </p>
                <p className="mt-1 text-[10px] tracking-[0.16em] text-faint uppercase">
                  Portfolio margin
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close Aside"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-white/5 hover:text-ink"
            >
              <CloseIcon />
            </button>
          </header>

          <div ref={scrollerRef} className="aside-scroll min-h-0 flex-1 px-4 py-4">
            {scene === "idle" ? (
              <Idle onPick={(id) => ask(id)} />
            ) : (
              <Thread
                scene={scene}
                asked={asked}
                loading={loading}
                aborted={aborted}
                followUp={followUp}
                followLoading={followLoading}
                note={note}
                rule={rule}
                highlight={highlight}
                onFollowUp={pickFollowUp}
                onPick={(id) => ask(id)}
              />
            )}
          </div>

          <form onSubmit={sendDraft} className="flex items-center gap-2 border-t border-line px-3 py-3">
            <input
              ref={inputRef}
              aria-label="Ask Aside"
              value={draft}
              disabled={thinking}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask something, even if it's irrelevant…"
              className="h-10 min-w-0 flex-1 rounded-xl border border-line bg-white/[0.03] px-3 text-[13px] text-ink outline-none placeholder:text-faint focus:border-accent disabled:opacity-60"
            />
            {thinking ? (
              <button
                type="button"
                aria-label="Stop"
                onClick={stopReply}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-accent"
              >
                <StopIcon />
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Send"
                disabled={!draft.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-[#0e100f] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon />
              </button>
            )}
          </form>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        aria-controls="aside-panel"
        onClick={() => setOpen((value) => !value)}
        className="aside-launcher flex items-center gap-2 rounded-full border border-line bg-[#161a17]/90 py-1.5 pr-4 pl-1.5 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <span
          className={`aside-launcher-mark grid h-9 w-9 place-items-center overflow-hidden rounded-full ${
            open ? "bg-accent text-[#0e100f]" : "bg-[#e3ebe0]"
          }`}
        >
          {open ? <CloseIcon /> : <Avatar cover />}
        </span>
        <span className="font-display text-sm font-semibold tracking-[-0.02em]">
          {open ? "Close" : "Aside"}
        </span>
      </button>
    </div>
  );
}

function Idle({ onPick }: { onPick: (id: Exclude<Scene, "idle" | "lost">) => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="aside-rise">
        <LivingPortrait />
        <p className="mt-3 font-display text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]">
          hey.
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Ask about Saumya, the work, how she thinks, or something that does not
          belong in a case study.
        </p>
      </div>
      <div className="mt-5 space-y-2">
        {intents.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            style={{ animationDelay: `${120 + index * 70}ms` }}
            className="aside-rise flex w-full items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-3 py-2.5 text-left text-[13px] text-ink hover:border-accent/60 hover:bg-accent-soft"
          >
            <IntentMark index={index} />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Thread({
  scene,
  asked,
  loading,
  aborted,
  followUp,
  followLoading,
  note,
  rule,
  highlight,
  onFollowUp,
  onPick,
}: {
  scene: Exclude<Scene, "idle">;
  asked: string;
  loading: boolean;
  aborted: boolean;
  followUp: Follow;
  followLoading: boolean;
  note: number;
  rule: number;
  highlight: string | null;
  onFollowUp: (id: Follow) => void;
  onPick: (id: Exclude<Scene, "idle" | "lost">) => void;
}) {
  const chips = scene === "lost" ? [] : followUps[scene];
  const showReply = !loading && !aborted;

  return (
    <div className="space-y-3" aria-live="polite">
      <UserLine>{asked}</UserLine>
      {loading ? <Typing /> : null}
      {showReply ? (
        <>
          {scene === "me" ? <MeReply /> : null}
          {scene === "work" ? <WorkReply highlight={highlight} /> : null}
          {scene === "think" ? <ThinkReply /> : null}
          {scene === "aside" ? (
            <AsideReply note={note} onShuffle={() => onFollowUp("another")} />
          ) : null}
          {scene === "lost" ? <LostReply onPick={onPick} /> : null}
          {chips.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onFollowUp(chip.id)}
                  className={`rounded-full border px-3 py-1.5 text-[11px] transition ${
                    followUp === chip.id
                      ? "border-accent bg-accent text-[#0e100f]"
                      : "border-line text-muted hover:border-accent hover:text-ink"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          ) : null}
          {followUp ? (
            <UserLine>
              {chips.find((chip) => chip.id === followUp)?.label ?? ""}
            </UserLine>
          ) : null}
          {followLoading ? <Typing /> : null}
          {!followLoading && followUp ? (
            <FollowReply id={followUp} rule={rule} note={note} />
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function MeReply() {
  const [chapter, setChapter] = useState(0);

  return (
    <BotCard>
      <p>
        Saumya Nigam. UX designer in Gurgaon, thirteen years in. Fabric and brand
        first, then operations software. The craft changed. The instinct did not:
        find the pattern, then make it easier to follow.
      </p>
      <ChapterRail active={chapter} onPick={setChapter} />
    </BotCard>
  );
}

function WorkReply({ highlight }: { highlight: string | null }) {
  return (
    <BotCard>
      <p>
        Three pieces live on this site. Each one is a dense system made easier to
        run. Open any card — the case study is the long version.
      </p>
      <ProjectCards highlight={highlight} />
    </BotCard>
  );
}

function ThinkReply() {
  const [step, setStep] = useState(0);

  return (
    <BotCard>
      <p>
        She does not start in Figma. She starts with the operation: who owns the
        step, and where the work currently breaks. Tap a station.
      </p>
      <StepRail active={step} onPick={setStep} />
    </BotCard>
  );
}

function AsideReply({ note, onShuffle }: { note: number; onShuffle: () => void }) {
  const item = asideNotes[note];

  return (
    <BotCard>
      <p>Case studies leave the odd bits out. These are the odd bits.</p>
      <button
        type="button"
        aria-label="Show another aside"
        onClick={onShuffle}
        className="w-full rounded-xl border border-dashed border-line bg-white/[0.02] px-3 py-2 text-left"
      >
        <p key={item.kicker} className="aside-rise text-[10px] tracking-[0.16em] text-accent uppercase">
          {item.kicker}
        </p>
        <p key={item.text} className="aside-rise mt-1 text-[12px] leading-relaxed text-muted">
          {item.text}
        </p>
      </button>
    </BotCard>
  );
}

function LostReply({
  onPick,
}: {
  onPick: (id: Exclude<Scene, "idle" | "lost">) => void;
}) {
  return (
    <BotCard>
      <p>That one is not in the margin yet. I can still talk about these.</p>
      <div className="flex flex-wrap gap-1.5">
        {intents.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted hover:border-accent hover:text-ink"
          >
            {item.label}
          </button>
        ))}
      </div>
    </BotCard>
  );
}

function FollowReply({
  id,
  rule,
  note,
}: {
  id: Exclude<Follow, null>;
  rule: number;
  note: number;
}) {
  if (id === "place") {
    return (
      <BotCard>
        <p>
          UX Designer III at KlearNow, Gurgaon. Enterprise product for customs and
          logistics — research, flows, and conversational UX. She is open to
          product design conversations.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex rounded-full bg-accent px-3 py-1.5 text-[12px] font-medium text-[#0e100f]"
        >
          {profile.email}
        </a>
      </BotCard>
    );
  }
  if (id === "study") {
    return (
      <BotCard>
        <p>
          B.Des, NIFT Bhopal, plus the Google UX Design certificate. The school
          part still shows up as a dislike of colours and layouts that do not
          belong together.
        </p>
      </BotCard>
    );
  }
  if (id === "rule") {
    const item = asideRules[rule];
    return (
      <BotCard>
        <p key={item.title} className="aside-stamp font-display text-[15px] font-semibold tracking-[-0.03em] text-accent">
          {item.title}
        </p>
        <p key={item.body} className="aside-rise text-[12px] leading-relaxed text-muted">
          {item.body}
        </p>
      </BotCard>
    );
  }

  const item = asideNotes[note];
  return (
    <BotCard>
      <p className="text-[10px] tracking-[0.16em] text-accent uppercase">{item.kicker}</p>
      <p className="text-[12px] leading-relaxed text-muted">{item.text}</p>
    </BotCard>
  );
}

function BotCard({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <Avatar />
      <div className="aside-rise min-w-0 flex-1 space-y-2.5 rounded-2xl rounded-tl-md border border-line bg-[#1a1f1b] px-3 py-3 text-[13px] leading-relaxed text-ink">
        {children}
      </div>
    </div>
  );
}

function UserLine({ children }: { children: string }) {
  return (
    <div className="aside-rise ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-accent-soft px-3 py-2.5 text-[13px] leading-relaxed text-ink">
      {children}
    </div>
  );
}

function Avatar({ cover = false }: { cover?: boolean }) {
  if (!cover) {
    return <img src={avatar} alt="" className="aside-avatar" />;
  }
  return (
    <span className="aside-avatar-live">
      <img src={avatar} alt="" className="h-full w-full object-cover" />
      <span className="aside-lid aside-lid-mini aside-lid-mini-left" />
      <span className="aside-lid aside-lid-mini aside-lid-mini-right" />
    </span>
  );
}

function Typing() {
  return (
    <div className="flex items-end gap-2" aria-label="Aside is thinking">
      <Avatar />
      <div className="inline-flex items-center gap-1 rounded-2xl rounded-tl-md border border-line bg-[#1a1f1b] px-3 py-3">
        <span className="aside-typing flex items-center gap-1">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}

function IntentMark({ index }: { index: number }) {
  const paths = [
    "M8 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM3 18c1.2-2.4 2.9-3.5 5-3.5s3.8 1.1 5 3.5",
    "M3 5h6v6H3zM11 5h6v6h-6zM3 13h6v6H3zM11 13h6v6h-6z",
    "M4 16c3-7 9-10 12-10s5 2 6 5",
    "M10 3.5 11.2 8 16 9.2 11.2 10.4 10 15 8.8 10.4 4 9.2 8.8 8Z",
  ];
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-accent">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d={paths[index]} stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function resolveScene(text: string): Scene {
  const value = text.toLowerCase();
  const has = (words: string[]) =>
    words.some((word) => new RegExp(`\\b${word}\\b`).test(value));

  if (has(["irrelevant", "random", "fun", "aside", "doodle", "textile", "fabric", "colour", "color", "odd"])) {
    return "aside";
  }
  if (has(["think", "thinking", "process", "approach", "method", "journey", "figma"])) return "think";
  if (has(["work", "project", "projects", "case", "klear", "track", "assist", "shipment", "redesign"])) {
    return "work";
  }
  if (has(["who", "about", "saumya", "you", "bio", "where", "nift", "study", "studied", "background", "designer", "email", "hello"])) {
    return "me";
  }
  return "lost";
}

function projectHint(text: string): string | null {
  const value = text.toLowerCase();
  if (value.includes("assist") || value.includes("chat") || value.includes("convers")) return "assist";
  if (value.includes("redesign") || value.includes("desktop") || value.includes("tool")) return "redesign";
  if (value.includes("mobile") || value.includes("trace") || value.includes("phone")) return "track";
  return null;
}
