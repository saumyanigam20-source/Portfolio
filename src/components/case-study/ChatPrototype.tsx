"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

type Scene =
  | "idle"
  | "track"
  | "etas"
  | "delays"
  | "customs"
  | "pol"
  | "docs"
  | "invoices"
  | "missing"
  | "contract"
  | "entity"
  | "users"
  | "role"
  | "status";

type FollowUp =
  | "preview-docs"
  | "preview-bol"
  | "preview-missing"
  | "request-drayage"
  | "accept-eta"
  | "pay-ok"
  | "pay-blocked"
  | "edit"
  | "invite"
  | "create-role"
  | "deactivate"
  | null;

type FollowResult =
  | { kind: "note" | "done"; text: string }
  | { kind: "error"; text: string }
  | { kind: "preview"; intro: string; docs: { title: string; lines: string[] }[] };

type IconName = "box" | "calendar" | "alert" | "file" | "pin" | "card" | "building" | "user-plus" | "shield" | "user";

const captions: Record<Scene, { title: string; body: string }> = {
  idle: {
    title: "Hi Brooke — what would you like to know?",
    body: "The first turn is a few questions from the case study. A real answer can open a document or take the next action. A miss comes back as an error she can act on.",
  },
  track: {
    title: "One shipment, one detail",
    body: "What’s the ETA returns where it is, the date, and the last free day. Documents and drayage stay on this turn.",
  },
  etas: {
    title: "Upcoming ETAs, as a list",
    body: "Arrivals come back as a short list. Documents on the shipment open from the same turn.",
  },
  delays: {
    title: "What is slipping",
    body: "Delays are called out on their own. She can accept the new ETA here.",
  },
  customs: {
    title: "What is held, and why",
    body: "Customs status is the hold, the container, and the place. Not a paragraph.",
  },
  pol: {
    title: "Port of lading, across shipments",
    body: "The question that started this. Lading and unlading for the open shipments, then the bill of lading opens here.",
  },
  docs: {
    title: "Documents, in the chat",
    body: "If the file is on the shipment, she previews it here. If it isn’t ready, the chat says so.",
  },
  missing: {
    title: "Nothing to show",
    body: "A bad id doesn’t invent a shipment. The error names what to try next.",
  },
  invoices: {
    title: "Overdue, then pay",
    body: "Finance answers with the overdue set and a payment step in the panel.",
  },
  contract: {
    title: "One date",
    body: "A contract expiry is a single line. No table for one fact.",
  },
  entity: {
    title: "Add a sub-customer here",
    body: "Entity asks for the company, then files it. She does not walk the menu.",
  },
  users: {
    title: "Add a user, in one turn",
    body: "Administration → User Management becomes a question and a table. Edit or deactivate stays in the panel.",
  },
  role: {
    title: "A role is a next step",
    body: "The assistant does not dump a permissions tree. It asks for the type, then shows who already has it.",
  },
  status: {
    title: "Active and inactive, as a list",
    body: "Status is a column she can scan — not a paragraph. Toggle stays on the same turn.",
  },
};

const intents: {
  id: Exclude<Scene, "idle">;
  label: string;
  icon: IconName;
  threadTitle: string;
}[] = [
  { id: "track", label: "What's the ETA?", icon: "calendar", threadTitle: "ETA" },
  { id: "pol", label: "What's the port of lading?", icon: "pin", threadTitle: "Port of lading" },
  { id: "delays", label: "What's delayed?", icon: "alert", threadTitle: "Delayed shipments" },
  { id: "docs", label: "Any documents to check?", icon: "file", threadTitle: "Documents" },
  { id: "invoices", label: "Which invoices are overdue?", icon: "card", threadTitle: "Overdue invoices" },
  { id: "missing", label: "Where is shipment KX-0000?", icon: "box", threadTitle: "Shipment not found" },
];

const followUps: Record<Exclude<Scene, "idle">, { id: Exclude<FollowUp, null>; label: string }[]> = {
  track: [
    { id: "preview-docs", label: "Preview documents" },
    { id: "request-drayage", label: "Request drayage" },
  ],
  etas: [{ id: "preview-docs", label: "Preview documents" }],
  delays: [
    { id: "accept-eta", label: "Accept new ETA" },
    { id: "preview-docs", label: "Preview documents" },
  ],
  customs: [{ id: "preview-missing", label: "Preview hold notice" }],
  pol: [{ id: "preview-bol", label: "Preview bill of lading" }],
  docs: [
    { id: "preview-bol", label: "Preview bill of lading" },
    { id: "preview-missing", label: "Preview delivery order" },
  ],
  invoices: [
    { id: "pay-ok", label: "Pay INV-1042" },
    { id: "pay-blocked", label: "Pay INV-1130" },
  ],
  missing: [],
  contract: [],
  entity: [],
  users: [
    { id: "edit", label: "Edit A. Mehta" },
    { id: "invite", label: "Invite a user" },
  ],
  role: [{ id: "create-role", label: "Create an Ops role" }],
  status: [{ id: "deactivate", label: "Deactivate J. Cole" }],
};

const replies: Record<
  Exclude<Scene, "idle">,
  { text: string; tone?: "error"; table?: { headers: string[]; rows: string[][] } }
> = {
  track: {
    text: "KX-A7J4-73 is at Charleston. ETA Hamburg is Sep 22. Last free day is in 2 days.",
  },
  etas: {
    text: "Three shipments are arriving. Here’s the ETA for each.",
    table: {
      headers: ["Shipment", "ETA", "Destination"],
      rows: [
        ["KX-A7J4-73", "Sep 22", "Hamburg"],
        ["KX-UIC8-900", "Sep 28", "Rotterdam"],
        ["KX-U1C6-8389", "Oct 10", "Genoa"],
      ],
    },
  },
  delays: {
    text: "One shipment is delayed. The new ETA is on the row.",
    table: {
      headers: ["Shipment", "Status", "ETA"],
      rows: [["KX-U1C6-8389", "Delayed", "Oct 10"]],
    },
  },
  customs: {
    text: "Three containers are held. Here’s why, and where.",
    table: {
      headers: ["Container", "Hold", "Where"],
      rows: [
        ["MSKU7654321", "Exam hold", "Los Angeles"],
        ["TCLU4567890", "Document review", "Long Beach"],
        ["GESU9876543", "Agriculture inspection", "Long Beach"],
      ],
    },
  },
  pol: {
    text: "Port of lading and unlading, across the open shipments. The bill of lading is on the file.",
    table: {
      headers: ["Shipment", "Lading", "Unlading"],
      rows: [
        ["KX-A7J4-73", "Charleston", "Hamburg"],
        ["KX-U1C6-8389", "Houston", "Genoa"],
        ["KX-UIC8-900", "Los Angeles", "Rotterdam"],
      ],
    },
  },
  docs: {
    text: "KX-A7J4-73 has three files ready to preview. A delivery order is not on this shipment.",
    table: {
      headers: ["Document", "Ingested", "Status"],
      rows: [
        ["Bill of Lading", "Sep 18", "Ready"],
        ["Commercial Invoice", "Sep 19", "Ready"],
        ["Packing List", "Sep 18", "Ready"],
      ],
    },
  },
  invoices: {
    text: "Two invoices are overdue. INV-1130 is on hold — you can try the payment from here.",
    table: {
      headers: ["Invoice", "Due", "Status"],
      rows: [
        ["INV-1042", "Sep 2", "Overdue"],
        ["INV-1108", "Sep 9", "Overdue"],
        ["INV-1130", "Sep 18", "On hold"],
      ],
    },
  },
  missing: {
    tone: "error",
    text: "I can’t find shipment KX-0000. Check the id, or ask about KX-A7J4-73.",
  },
  contract: {
    text: "This contract expires 12 Nov.",
  },
  entity: {
    text: "Add a sub-customer on this account. Send the company name and I’ll file it under Entity.",
  },
  users: {
    text: "12 users in this tenant. Here’s the active set — you can edit or deactivate from here.",
    table: {
      headers: ["Name", "Role", "Status"],
      rows: [
        ["A. Mehta", "Super admin", "Active"],
        ["J. Cole", "Finance", "Active"],
        ["R. Singh", "Ops", "Invited"],
      ],
    },
  },
  role: {
    text: "Let’s add a new role. Select the type — Super admin, Finance, or Ops — then I’ll show who already has it.",
    table: {
      headers: ["Role", "People", "Access"],
      rows: [
        ["Super admin", "2", "Full"],
        ["Finance", "4", "Billing"],
        ["Ops", "6", "KlearHub"],
      ],
    },
  },
  status: {
    text: "User status is Active or Inactive. Here’s the current set — you can toggle from this list.",
    table: {
      headers: ["Name", "Role", "Status"],
      rows: [
        ["A. Mehta", "Super admin", "Active"],
        ["J. Cole", "Finance", "Active"],
        ["P. Rao", "Ops", "Inactive"],
      ],
    },
  },
};

const shipmentDocs: { title: string; lines: string[] }[] = [
  {
    title: "Bill of Lading",
    lines: ["KX-A7J4-73 · HLCUOS1250801516", "Charleston → Hamburg", "Container HLBU8168248", "Ingested Sep 18, 2025"],
  },
  {
    title: "Commercial Invoice",
    lines: ["KX-A7J4-73 · PO 4514710485", "Ingested Sep 19, 2025"],
  },
  {
    title: "Packing List",
    lines: ["KX-A7J4-73 · container HLBU8168248", "Ingested Sep 18, 2025"],
  },
];

const followResults: Record<Exclude<FollowUp, null>, FollowResult> = {
  "preview-docs": {
    kind: "preview",
    intro: "Three files are on KX-A7J4-73. The preview stays in this chat.",
    docs: shipmentDocs,
  },
  "preview-bol": {
    kind: "preview",
    intro: "Bill of lading for KX-A7J4-73.",
    docs: [shipmentDocs[0]],
  },
  "preview-missing": {
    kind: "error",
    text: "This file isn’t ready to preview yet. It isn’t on the shipment.",
  },
  "request-drayage": {
    kind: "done",
    text: "Drayage requested for KX-A7J4-73. Last free day is in 2 days. The request stays in this chat.",
  },
  "accept-eta": {
    kind: "done",
    text: "New ETA Oct 10 is saved on KX-U1C6-8389.",
  },
  "pay-ok": {
    kind: "done",
    text: "Payment started for INV-1042. You’ll confirm it here.",
  },
  "pay-blocked": {
    kind: "error",
    text: "INV-1130 can’t be paid yet. Billing has to release the hold first.",
  },
  edit: {
    kind: "note",
    text: "Editing A. Mehta. Role is Super admin, status Active. Change either field and I’ll save it here.",
  },
  invite: {
    kind: "note",
    text: "Send an invite with name, email, and role. They’ll land in this table as Invited until they accept.",
  },
  "create-role": {
    kind: "done",
    text: "New Ops role saved: access to KlearHub, no billing.",
  },
  deactivate: {
    kind: "done",
    text: "J. Cole is now Inactive. They keep their Finance role, but they can’t sign in until you turn them back on.",
  },
};

export function ChatPrototype({ embedded = false }: { embedded?: boolean }) {
  const [scene, setScene] = useState<Scene>("idle");
  const [asked, setAsked] = useState("");
  const [askedAt, setAskedAt] = useState("9:13 PM");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [aborted, setAborted] = useState(false);
  const [started, setStarted] = useState(false);
  const [followUp, setFollowUp] = useState<FollowUp>(null);
  const [followLoading, setFollowLoading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const caption = captions[scene];
  const inThread = scene !== "idle";
  const threadTitle =
    intents.find((item) => item.id === scene)?.threadTitle ?? "Conversation";

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollTo({ top: node.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [scene, loading, followUp, followLoading, expanded, aborted]);

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
  }

  function ask(next: Scene, question?: string) {
    if (loading) return;
    clearTimer();
    setScene(next);
    setAsked(
      question?.trim() ||
        intents.find((item) => item.id === next)?.label ||
        "",
    );
    setAskedAt("9:13 PM");
    setFollowUp(null);
    setFollowLoading(false);
    setAborted(false);
    setDraft("");
    setLoading(true);
    setStarted(true);
    timerRef.current = window.setTimeout(() => {
      setLoading(false);
      timerRef.current = null;
    }, expanded ? 1400 : 780);
  }

  function sendDraft(event?: FormEvent) {
    event?.preventDefault();
    if (loading || !draft.trim()) return;
    ask(resolveScene(draft), draft);
  }

  function stopReply() {
    clearTimer();
    setLoading(false);
    setFollowLoading(false);
    setAborted(true);
  }

  function pickFollowUp(id: FollowUp) {
    if (!id || loading || followLoading) return;
    setFollowUp(id);
    setFollowLoading(true);
    setAborted(false);
    clearTimer();
    timerRef.current = window.setTimeout(() => {
      setFollowLoading(false);
      timerRef.current = null;
    }, 640);
  }

  const thinking = loading || followLoading;

  const Shell = embedded ? "div" : "section";

  return (
    <Shell
      data-guide={embedded ? undefined : "try"}
      className="max-w-full space-y-6 scroll-mt-60"
    >
      {embedded ? null : (
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
            Prototype
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            Try the prototype
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Ask it a question the way you&apos;d ask a coworker.
          </p>
        </div>
      )}
      <div>
        <p className="max-w-xl rounded-2xl border border-dashed border-accent/40 bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink">
          {scene === "idle"
            ? "Tip — start with a suggested question. A real answer can open a document or take an action. A miss comes back as an error."
            : expanded
              ? "You are in the workspace. Preview a document or take the next action from the chips under the answer."
              : "The answer stayed in the panel. Preview a document or take the next action from the chips."}
        </p>
      </div>

      <div
        className={`flex flex-col gap-8 ${
          expanded
            ? "items-stretch"
            : "items-center lg:flex-row lg:items-start lg:justify-center lg:gap-12"
        }`}
      >
        <div
          className={`proto-device w-full transition-[max-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            expanded ? "max-w-none" : "max-w-[360px]"
          }`}
        >
          <div className="overflow-hidden rounded-[1.15rem] bg-white text-[#465161] shadow-[0_18px_40px_rgba(15,40,55,0.18)]">
            <div className="flex items-center justify-between bg-[#33657c] px-4 py-2.5 text-white">
              <div className="flex min-w-0 items-center gap-2">
                {inThread && !expanded ? (
                  <button
                    type="button"
                    aria-label="Back"
                    onClick={goIdle}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-white"
                  >
                    <BackIcon />
                  </button>
                ) : null}
                <p className="text-[13px] font-medium">KlearAssist</p>
              </div>
              <div className="flex items-center gap-1 text-white/90">
                <button
                  type="button"
                  aria-label={expanded ? "Collapse chat" : "Expand chat"}
                  aria-pressed={expanded}
                  onClick={() => setExpanded((open) => !open)}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-white"
                >
                  {expanded ? <RestoreIcon /> : <MaximizeIcon />}
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                    setExpanded(false);
                    goIdle();
                  }}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-white"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {expanded ? (
              <WorkspaceBody
                scene={scene}
                asked={asked}
                askedAt={askedAt}
                threadTitle={threadTitle}
                loading={loading}
                followLoading={followLoading}
                aborted={aborted}
                followUp={followUp}
                draft={draft}
                thinking={thinking}
                scrollerRef={scrollerRef}
                onPick={ask}
                onNewChat={goIdle}
                onFollowUp={pickFollowUp}
                onDraft={setDraft}
                onSend={sendDraft}
                onStop={stopReply}
                nudge={!started}
              />
            ) : (
              <div className="flex h-[480px] flex-col bg-[#fbfcfd]">
                <div ref={scrollerRef} className="proto-scroll min-h-0 flex-1 px-5 py-6">
                  {scene === "idle" ? (
                    <IdlePanel onPick={ask} layout="dock" nudge={!started} />
                  ) : (
                    <Thread
                      scene={scene}
                      asked={asked}
                      loading={loading}
                      aborted={aborted}
                      followUp={followUp}
                      followLoading={followLoading}
                      onFollowUp={pickFollowUp}
                      layout="dock"
                      askedAt={askedAt}
                    />
                  )}
                </div>
                <Composer
                  draft={draft}
                  thinking={thinking}
                  expanded={false}
                  onDraft={setDraft}
                  onSend={sendDraft}
                  onStop={stopReply}
                />
              </div>
            )}
          </div>
        </div>

        <div className={`w-full space-y-4 pt-1 ${expanded ? "max-w-xl" : "max-w-sm"}`}>
          <p className="text-xs tracking-[0.18em] text-faint uppercase">This turn</p>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {caption.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{caption.body}</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={goIdle}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition duration-150 hover:border-accent hover:text-accent"
            >
              Back to greeting
            </button>
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition duration-150 hover:border-accent hover:text-accent"
            >
              {expanded ? "Collapse panel" : "Expand chat"}
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function WorkspaceBody({
  scene,
  asked,
  askedAt,
  threadTitle,
  loading,
  followLoading,
  aborted,
  followUp,
  draft,
  thinking,
  scrollerRef,
  onPick,
  onNewChat,
  onFollowUp,
  onDraft,
  onSend,
  onStop,
  nudge,
}: {
  scene: Scene;
  asked: string;
  askedAt: string;
  threadTitle: string;
  loading: boolean;
  followLoading: boolean;
  aborted: boolean;
  followUp: FollowUp;
  draft: string;
  thinking: boolean;
  scrollerRef: RefObject<HTMLDivElement | null>;
  onPick: (id: Scene) => void;
  onNewChat: () => void;
  onFollowUp: (id: FollowUp) => void;
  onDraft: (value: string) => void;
  onSend: (event?: FormEvent) => void;
  onStop: () => void;
  nudge: boolean;
}) {
  const inThread = scene !== "idle";

  return (
    <div className="flex h-[460px] bg-[#f7f9fa] sm:h-[500px]">
      {inThread ? (
        <aside className="relative hidden w-[200px] shrink-0 border-r border-[#e6ebef] bg-white sm:block">
          <div className="px-4 pt-4">
            <p className="text-[12px] text-[#5b6773]">Conversations (1)</p>
            <button
              type="button"
              className="mt-3 w-full rounded-lg bg-[#e4eef2] px-3 py-2.5 text-left text-[13px] text-[#33657c]"
            >
              {threadTitle}
            </button>
          </div>
          <button
            type="button"
            aria-label="New chat"
            onClick={onNewChat}
            className="absolute right-0 bottom-5 z-10 flex h-11 w-11 translate-x-1/2 items-center justify-center rounded-full bg-[#33657c] text-xl text-white shadow-[0_8px_18px_rgba(51,101,124,0.28)]"
          >
            +
          </button>
        </aside>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div
          ref={scrollerRef}
          className={`proto-scroll min-h-0 flex-1 ${
            inThread ? "px-5 py-4" : "px-6"
          }`}
        >
          {scene === "idle" ? (
            <IdlePanel onPick={onPick} layout="workspace" nudge={nudge} />
          ) : (
            <Thread
              scene={scene}
              asked={asked}
              askedAt={askedAt}
              loading={loading}
              aborted={aborted}
              followUp={followUp}
              followLoading={followLoading}
              onFollowUp={onFollowUp}
              layout="workspace"
            />
          )}
        </div>
        <Composer
          draft={draft}
          thinking={thinking}
          expanded
          onDraft={onDraft}
          onSend={onSend}
          onStop={onStop}
        />
      </div>
    </div>
  );
}

function Composer({
  draft,
  thinking,
  expanded,
  onDraft,
  onSend,
  onStop,
}: {
  draft: string;
  thinking: boolean;
  expanded: boolean;
  onDraft: (value: string) => void;
  onSend: (event?: FormEvent) => void;
  onStop: () => void;
}) {
  return (
    <form
      onSubmit={onSend}
      className={`flex items-center gap-2 bg-white ${
        expanded
          ? "border-t border-[#e6ebef] px-4 py-3"
          : "px-4 pb-4 pt-2"
      }`}
    >
      <div className="proto-composer flex min-h-[40px] flex-1 items-center rounded-xl border border-[#d5dee6] bg-white px-3">
        <input
          aria-label="Ask a question"
          value={draft}
          disabled={thinking}
          onChange={(event) => onDraft(event.target.value)}
          placeholder="Ask a question..."
          className="h-10 w-full bg-transparent text-[12px] text-[#465161] outline-none placeholder:text-[#9aa3b0] disabled:opacity-60"
        />
      </div>
      {thinking && expanded ? (
        <button
          type="button"
          aria-label="Stop generating"
          onClick={onStop}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#c5d3db] bg-white text-[#33657c]"
        >
          <StopIcon />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Send"
          disabled={thinking || !draft.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#33657c] text-white disabled:cursor-not-allowed disabled:opacity-55"
        >
          {thinking ? <SpinnerIcon /> : <SendIcon />}
        </button>
      )}
    </form>
  );
}

function resolveScene(text: string): Exclude<Scene, "idle"> {
  const value = text.toLowerCase();
  if (value.includes("kx-0000") || value.includes("not found") || value.includes("can't find") || value.includes("cant find")) {
    return "missing";
  }
  if (value.includes("document") || value.includes("preview") || value.includes("bill of lading") || value.includes("packing")) {
    return "docs";
  }
  if (value.includes("port") || value.includes("lading") || value.includes("unlading") || value.includes("pol")) {
    return "pol";
  }
  if (value.includes("customs") || value.includes("clearance") || value.includes("hold")) return "customs";
  if (value.includes("delay")) return "delays";
  if (value.includes("eta") || value.includes("upcoming") || value.includes("arriving")) return "etas";
  if (value.includes("invoice") || value.includes("overdue") || value.includes("pay")) return "invoices";
  if (value.includes("contract") || value.includes("expir")) return "contract";
  if (value.includes("sub-customer") || value.includes("entity") || value.includes("customer")) return "entity";
  if (value.includes("role")) return "role";
  if (value.includes("status") || value.includes("inactive") || value.includes("active")) return "status";
  if (value.includes("user")) return "users";
  return "track";
}

function IdlePanel({
  onPick,
  layout,
  nudge,
}: {
  onPick: (id: Scene) => void;
  layout: "dock" | "workspace";
  nudge: boolean;
}) {
  const workspace = layout === "workspace";

  return (
    <div
      className={
        workspace
          ? "flex h-full flex-col items-center justify-start py-4"
          : "flex h-full flex-col"
      }
    >
      <div className={workspace ? "text-center" : "mt-4 text-center"}>
        <p className={`leading-snug text-[#465161] ${workspace ? "text-[18px]" : "text-[17px]"}`}>
          Hi there, <span className="text-[#33657c]">Brooke</span>
        </p>
        <p className={`mt-1 leading-snug ${workspace ? "text-[18px]" : "text-[17px]"}`}>
          What would you <span className="text-[#33657c]">like</span> to know?
        </p>
      </div>
      <div
        className={
          workspace ? "mt-6 w-full max-w-[340px] space-y-2.5" : "mt-8 space-y-3"
        }
      >
        {intents.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            style={{ animationDelay: `${index * 70}ms` }}
            className={`proto-sheet flex w-full items-center gap-3 border bg-white text-left leading-snug text-[#3d4d5c] ${
              nudge && index === 0
                ? "border-[#33657c] ring-2 ring-[#33657c]/30"
                : "border-[#d8e0e6]"
            } ${
              workspace
                ? "rounded-2xl px-3 py-2.5 text-[13px]"
                : "rounded-xl px-3 py-3 text-[13px] shadow-[0_0_0_1px_rgba(51,101,124,0.02)]"
            }`}
          >
            <span
              className={`flex shrink-0 items-center justify-center bg-[#eef2f5] text-[#5b6b78] ${
                workspace ? "h-7 w-7 rounded-full" : "h-9 w-9 rounded-lg"
              }`}
            >
              <IntentIcon name={item.icon} size={workspace ? 14 : 18} />
            </span>
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
  askedAt,
  loading,
  aborted,
  followUp,
  followLoading,
  onFollowUp,
  layout,
}: {
  scene: Exclude<Scene, "idle">;
  asked: string;
  askedAt: string;
  loading: boolean;
  aborted: boolean;
  followUp: FollowUp;
  followLoading: boolean;
  onFollowUp: (id: FollowUp) => void;
  layout: "dock" | "workspace";
}) {
  const chips = followUps[scene];
  const workspace = layout === "workspace";
  const showReply = !loading && !aborted;

  return (
    <div
      className={
        workspace
          ? "flex min-h-full flex-col justify-end gap-3"
          : "space-y-3"
      }
    >
      <UserLine askedAt={workspace ? askedAt : undefined}>{asked}</UserLine>
      {loading ? (
        workspace ? <ThinkingBubble /> : <TypingBubble />
      ) : null}
      {showReply ? (
        <>
          <SceneReply scene={scene} />
          <div className="flex flex-wrap gap-2 pt-1">
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => onFollowUp(chip.id)}
                className={`rounded-full border px-3 py-1.5 text-[11px] ${
                  followUp === chip.id
                    ? "border-[#33657c] bg-[#33657c] text-white"
                    : "border-[#d5dee6] bg-white text-[#3d4d5c]"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
          {followUp ? (
            <UserLine askedAt={workspace ? askedAt : undefined}>
              {chips.find((chip) => chip.id === followUp)?.label ?? ""}
            </UserLine>
          ) : null}
          {followLoading ? (workspace ? <ThinkingBubble /> : <TypingBubble />) : null}
          {!followLoading && followUp ? <FollowUpReply id={followUp} /> : null}
        </>
      ) : null}
    </div>
  );
}

function FollowUpReply({ id }: { id: Exclude<FollowUp, null> }) {
  const result = followResults[id];
  if (result.kind === "error") return <ErrorLine>{result.text}</ErrorLine>;
  if (result.kind === "preview") {
    return (
      <div className="proto-sheet max-w-[94%] space-y-2">
        <BotLine>{result.intro}</BotLine>
        {result.docs.map((doc) => (
          <DocCard key={doc.title} title={doc.title} lines={doc.lines} />
        ))}
      </div>
    );
  }
  if (result.kind === "done") {
    return (
      <BotLine>
        <span className="mb-1 block text-[10px] font-medium tracking-[0.12em] text-[#33657c] uppercase">
          Done
        </span>
        {result.text}
      </BotLine>
    );
  }
  return <BotLine>{result.text}</BotLine>;
}

function SceneReply({ scene }: { scene: Exclude<Scene, "idle"> }) {
  const reply = replies[scene];
  if (reply.tone === "error") return <ErrorLine>{reply.text}</ErrorLine>;
  return (
    <div className="proto-sheet max-w-[92%] space-y-2">
      <BotLine>{reply.text}</BotLine>
      {reply.table ? <DataTable headers={reply.table.headers} rows={reply.table.rows} /> : null}
    </div>
  );
}

function ErrorLine({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="proto-screen max-w-[94%] rounded-2xl rounded-tl-md border border-[#e7c4c0] bg-[#fdf6f5] px-3 py-2.5 text-[12px] leading-relaxed text-[#7a3b34]"
    >
      <span className="mb-1 block text-[10px] font-medium tracking-[0.12em] uppercase">Error</span>
      {children}
    </div>
  );
}

function DocCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="rounded-xl bg-white px-3 py-2.5 shadow-[0_0_0_1px_rgba(51,101,124,0.1)]">
      <p className="text-[10px] tracking-[0.14em] text-[#8a93a0] uppercase">Preview</p>
      <p className="mt-1 text-[12px] font-medium text-[#2c3b46]">{title}</p>
      {lines.map((line) => (
        <p key={line} className="mt-1 text-[11px] leading-relaxed text-[#465161]">
          {line}
        </p>
      ))}
    </div>
  );
}

function UserLine({
  children,
  askedAt,
}: {
  children: string;
  askedAt?: string;
}) {
  return (
    <div className="proto-screen ml-auto max-w-[78%]">
      <div className="rounded-2xl rounded-tr-md bg-[#e7eef2] px-3 py-2.5 text-[12px] leading-relaxed text-[#2c3b46]">
        {children}
      </div>
      {askedAt ? (
        <p className="mt-1 flex items-center justify-end gap-1 text-[10px] text-[#8a93a0]">
          <ClockIcon />
          {askedAt}
        </p>
      ) : null}
    </div>
  );
}

function BotLine({ children }: { children: ReactNode }) {
  return (
    <div className="proto-screen max-w-[94%] rounded-2xl rounded-tl-md bg-white px-3 py-2.5 text-[12px] leading-relaxed text-[#465161] shadow-[0_0_0_1px_rgba(51,101,124,0.08)]">
      {children}
    </div>
  );
}

function TypingBubble() {
  return (
    <div
      className="proto-screen inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-white px-3 py-3 shadow-[0_0_0_1px_rgba(51,101,124,0.08)]"
      aria-label="Assistant is typing"
    >
      <span className="proto-typing flex items-center gap-1">
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div
      className="proto-screen inline-flex items-center gap-2 self-start rounded-xl border border-[#e4e8ec] bg-white px-3 py-2 text-[11px] text-[#8a93a0]"
      aria-label="Thinking"
    >
      <span className="proto-typing flex items-center gap-1">
        <span />
        <span />
        <span />
      </span>
      Thinking...
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(51,101,124,0.1)]">
      <table className="w-full text-left text-[10px]">
        <thead className="bg-[#f4f7f8] text-[#6b7680]">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-2.5 py-1.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[#1c2a32]">
          {rows.map((row) => (
            <tr key={row.join("-")} className="border-t border-[#eef1f3]">
              {row.map((cell, index) => (
                <td key={`${index}-${cell}`} className="px-2.5 py-1.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Glyph({ name, size }: { name: Exclude<IconName, "user-plus" | "shield" | "user">; size: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true as const };
  if (name === "box") {
    return (
      <svg {...common}>
        <path d="M4 8.5 12 4.5l8 4v9L12 21.5 4 17.5v-9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 12.5V21M4.5 8.8 12 12.5l7.5-3.7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 3.5v4M16 3.5v4M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "alert") {
    return (
      <svg {...common}>
        <path d="M12 4.5 20.5 19H3.5L12 4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 10v4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="16.6" r="0.8" fill="currentColor" />
      </svg>
    );
  }
  if (name === "file") {
    return (
      <svg {...common}>
        <path d="M7 3.5h7l4 4V20.5H7v-17Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M14 3.5V8h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "pin") {
    return (
      <svg {...common}>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (name === "card") {
    return (
      <svg {...common}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M5 20.5V9.5L12 5l7 4.5v11" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10 20.5v-6h4v6" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function IntentIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  if (name === "box" || name === "calendar" || name === "alert" || name === "file" || name === "pin" || name === "card" || name === "building") {
    return <Glyph name={name} size={size} />;
  }
  if (name === "shield") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3.5 5.5 6.2v5.3c0 4.1 2.7 7.9 6.5 9 3.8-1.1 6.5-4.9 6.5-9V6.2L12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M5.8 18.5c.8-2.8 3.2-4.4 6.2-4.4s5.4 1.6 6.2 4.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.6 18.2c.7-2.5 2.8-4 5.4-4 1.2 0 2.3.3 3.2.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M17.5 12.5v6M14.5 15.5h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2 11 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2 15 22l-4-9-9-4 20-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="proto-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
      <path
        d="M20 12a8 8 0 0 0-8-8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 5 8 12l7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="8" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M10 4h10v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 4 12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RestoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="8" y="4" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="4" y="8" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
