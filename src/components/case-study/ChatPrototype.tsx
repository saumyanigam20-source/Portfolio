"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

type Scene = "idle" | "users" | "role" | "status";
type FollowUp = "edit" | "invite" | "create-role" | "deactivate" | null;

const captions: Record<Scene, { title: string; body: string }> = {
  idle: {
    title: "Hi Brooke — what would you like to know?",
    body: "Jobs sit first, in her language. Add a user, add a role, or manage status — she does not have to invent the prompt.",
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
  id: Scene;
  label: string;
  icon: "user-plus" | "shield" | "user";
  threadTitle: string;
}[] = [
  {
    id: "users",
    label: "How to add a new user?",
    icon: "user-plus",
    threadTitle: "Add a new user",
  },
  {
    id: "role",
    label: "How to add a new role?",
    icon: "shield",
    threadTitle: "Add a new role",
  },
  {
    id: "status",
    label: "How to manage User Status (Active/ Inactive)?",
    icon: "user",
    threadTitle: "Manage user status",
  },
];

const followUps: Record<Exclude<Scene, "idle">, { id: FollowUp; label: string }[]> = {
  users: [
    { id: "edit", label: "Edit A. Mehta" },
    { id: "invite", label: "Invite a user" },
  ],
  role: [{ id: "create-role", label: "Create an Ops role" }],
  status: [{ id: "deactivate", label: "Deactivate J. Cole" }],
};

export function ChatPrototype() {
  const [scene, setScene] = useState<Scene>("idle");
  const [asked, setAsked] = useState("");
  const [askedAt, setAskedAt] = useState("9:13 PM");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [aborted, setAborted] = useState(false);
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
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
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

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
          Prototype
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Walk the assistant
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          The compact panel keeps jobs close. Expand it for the workspace — suggested
          prompts in the center, then a thread with history once a chat starts.
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
              />
            ) : (
              <div className="flex h-[480px] flex-col bg-[#fbfcfd]">
                <div ref={scrollerRef} className="proto-scroll min-h-0 flex-1 px-5 py-6">
                  {scene === "idle" ? (
                    <IdlePanel onPick={ask} layout="dock" />
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
    </section>
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
            <IdlePanel onPick={onPick} layout="workspace" />
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

function resolveScene(text: string): Scene {
  const value = text.toLowerCase();
  if (value.includes("role")) return "role";
  if (value.includes("status") || value.includes("inactive") || value.includes("active")) {
    return "status";
  }
  return "users";
}

function IdlePanel({
  onPick,
  layout,
}: {
  onPick: (id: Scene) => void;
  layout: "dock" | "workspace";
}) {
  const workspace = layout === "workspace";

  return (
    <div
      className={
        workspace
          ? "flex h-full flex-col items-center justify-center"
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
            className={`proto-sheet flex w-full items-center gap-3 border border-[#d8e0e6] bg-white text-left leading-snug text-[#3d4d5c] ${
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
          {scene === "users" ? <UsersReply /> : null}
          {scene === "role" ? <RoleReply /> : null}
          {scene === "status" ? <StatusReply /> : null}
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
  if (id === "edit") {
    return (
      <BotLine>
        Editing A. Mehta. Role is Super admin, status Active. Change either field and
        I’ll save it here — no trip back to Administration.
      </BotLine>
    );
  }
  if (id === "invite") {
    return (
      <BotLine>
        Send an invite with name, email, and role. They’ll land in this table as Invited
        until they accept.
      </BotLine>
    );
  }
  if (id === "create-role") {
    return (
      <BotLine>
        New Ops role: access to KlearHub, no billing. Six people already have it — I can
        attach this role to a user next.
      </BotLine>
    );
  }
  return (
    <BotLine>
      J. Cole is now Inactive. They keep their Finance role, but they can’t sign in until
      you turn them back on.
    </BotLine>
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

function UsersReply() {
  return (
    <div className="proto-sheet max-w-[92%] space-y-2">
      <BotLine>
        12 users in this tenant. Here’s the active set — you can edit or deactivate from
        here.
      </BotLine>
      <DataTable
        headers={["Name", "Role", "Status"]}
        rows={[
          ["A. Mehta", "Super admin", "Active"],
          ["J. Cole", "Finance", "Active"],
          ["R. Singh", "Ops", "Invited"],
        ]}
      />
    </div>
  );
}

function RoleReply() {
  return (
    <div className="proto-sheet max-w-[92%] space-y-2">
      <BotLine>
        Let’s add a new role. Select the type — Super admin, Finance, or Ops — then I’ll
        show who already has it.
      </BotLine>
      <DataTable
        headers={["Role", "People", "Access"]}
        rows={[
          ["Super admin", "2", "Full"],
          ["Finance", "4", "Billing"],
          ["Ops", "6", "KlearHub"],
        ]}
      />
    </div>
  );
}

function StatusReply() {
  return (
    <div className="proto-sheet max-w-[92%] space-y-2">
      <BotLine>
        User status is Active or Inactive. Here’s the current set — you can toggle from
        this list.
      </BotLine>
      <DataTable
        headers={["Name", "Role", "Status"]}
        rows={[
          ["A. Mehta", "Super admin", "Active"],
          ["J. Cole", "Finance", "Active"],
          ["P. Rao", "Ops", "Inactive"],
        ]}
      />
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
              {row.map((cell) => (
                <td key={cell} className="px-2.5 py-1.5">
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

function IntentIcon({
  name,
  size = 18,
}: {
  name: "user-plus" | "shield" | "user";
  size?: number;
}) {
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
