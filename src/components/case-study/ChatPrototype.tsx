"use client";

import { useState } from "react";

type Scene = "idle" | "users" | "invoices" | "shipments" | "error";

const captions: Record<Scene, { title: string; body: string }> = {
  idle: {
    title: "Hi Brooke — what would you like to know?",
    body: "Same jobs as Figma: track a shipment, upcoming ETAs, delays. Suggested intents sit first so nobody has to invent the sentence.",
  },
  users: {
    title: "Records as a table",
    body: "“Show me all users” returns a searchable list with actions. Administration → User Management becomes one turn.",
  },
  invoices: {
    title: "Risk, then a next step",
    body: "Overdue rows highlight. The count is a card. Make payment stays in the same conversation.",
  },
  shipments: {
    title: "Upcoming ETAs as a table",
    body: "Same pattern as Figma: shipment ID, route, status. Lists are for scanning — not a paragraph of ETAs.",
  },
  error: {
    title: "Trust when it fails",
    body: "Session and permission failures speak in next steps. No stack traces, no dead ends.",
  },
};

const prompts: { id: Scene; label: string }[] = [
  { id: "shipments", label: "Show upcoming ETAs" },
  { id: "users", label: "Show me all users" },
  { id: "invoices", label: "Any overdue invoices?" },
  { id: "error", label: "Export the billing ledger" },
];

export function ChatPrototype() {
  const [scene, setScene] = useState<Scene>("idle");
  const caption = captions[scene];

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
          Enterprise chat, quiet color, short motion. Tap a prompt — the reply changes
          shape: table, risk card, or a recoverable error.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-12">
        <div className="proto-device w-full max-w-[400px]">
          <div
            className="rounded-[1.4rem] p-[1px]"
            style={{
              background:
                "linear-gradient(145deg, rgba(61,92,86,0.8), rgba(26,36,34,0.95) 50%, #0a0c0b)",
            }}
          >
            <div className="overflow-hidden rounded-[1.32rem] bg-[#f4f6f5] text-[#1c211e]">
              <div
                className="flex items-center justify-between px-3 py-2.5 text-[#d5e0dc]"
                style={{
                  background: "linear-gradient(90deg, #2f4a45, #243a36)",
                }}
              >
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase">
                  KlearNow · Assist
                </p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">Live</span>
              </div>

              <div className="flex h-[540px] flex-col">
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3">
                  <BotLine>
                    Hi there, Brooke. What would you like to know? I can track a
                    shipment, list upcoming ETAs, or show delays.
                  </BotLine>
                  {scene !== "idle" ? (
                    <UserLine>
                      {prompts.find((item) => item.id === scene)?.label ?? ""}
                    </UserLine>
                  ) : null}
                  {scene === "users" ? <UsersReply /> : null}
                  {scene === "invoices" ? <InvoicesReply /> : null}
                  {scene === "shipments" ? <ShipmentsReply /> : null}
                  {scene === "error" ? <ErrorReply /> : null}
                </div>

                <div className="border-t border-[#e4e8e5] bg-white/80 px-3 py-3 backdrop-blur-sm">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {prompts.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setScene(item.id)}
                        className={`rounded-full px-2.5 py-1 text-[10px] transition duration-150 ${
                          scene === item.id
                            ? "bg-[#2f4a45] text-[#e8f0e6]"
                            : "bg-[#eef1ef] text-[#3d4540] hover:bg-[#e4efe3]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-xl border border-[#e4e8e5] bg-[#f7f8f7] px-3 py-2 text-[11px] text-[#8a918a]">
                    Ask KlearAssist…
                    <span className="ml-auto text-[#2f4a45]">↵</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm space-y-4 pt-1">
          <p className="text-xs tracking-[0.18em] text-faint uppercase">This turn</p>
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">
            {caption.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted">{caption.body}</p>
          <button
            type="button"
            onClick={() => setScene("idle")}
            className="rounded-full border border-line px-4 py-2 text-sm text-muted transition duration-150 hover:border-accent hover:text-accent"
          >
            Restart flow
          </button>
          <ol className="space-y-2 pt-1 text-xs leading-relaxed text-faint">
            <li>1. Upcoming ETAs — a table, like the Figma panel.</li>
            <li>2. Users or overdue invoices — other modules, same voice.</li>
            <li>3. A blocked export — a human error, then a next step.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function BotLine({ children }: { children: string }) {
  return (
    <div className="proto-screen max-w-[92%] rounded-2xl rounded-tl-md bg-white px-3 py-2.5 text-[12px] leading-relaxed text-[#3d4540] shadow-[0_0_0_1px_rgba(28,33,30,0.06)]">
      <p className="mb-1 text-[9px] tracking-[0.16em] text-[#8a918a] uppercase">KlearAssist</p>
      {children}
    </div>
  );
}

function UserLine({ children }: { children: string }) {
  return (
    <div
      className="proto-screen ml-auto max-w-[85%] rounded-2xl rounded-tr-md px-3 py-2.5 text-[12px] leading-relaxed text-[#1f3d2f]"
      style={{
        background: "linear-gradient(145deg, #e8f0e6, #dce8d9)",
      }}
    >
      {children}
    </div>
  );
}

function UsersReply() {
  return (
    <div className="proto-sheet space-y-2">
      <BotLine>
        12 users in this tenant. Here’s the active set — you can edit or deactivate from
        here.
      </BotLine>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(28,33,30,0.06)]">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-[#f4f6f5] text-[#6b726c]">
            <tr>
              <th className="px-2.5 py-1.5 font-medium">Name</th>
              <th className="px-2.5 py-1.5 font-medium">Role</th>
              <th className="px-2.5 py-1.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="text-[#1c211e]">
            {[
              ["A. Mehta", "Super admin", "Active"],
              ["J. Cole", "Finance", "Active"],
              ["R. Singh", "Ops", "Invited"],
            ].map(([name, role, status]) => (
              <tr key={name} className="border-t border-[#eef1ef]">
                <td className="px-2.5 py-1.5">{name}</td>
                <td className="px-2.5 py-1.5 text-[#6b726c]">{role}</td>
                <td className="px-2.5 py-1.5">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InvoicesReply() {
  return (
    <div className="proto-sheet space-y-2">
      <div
        className="rounded-xl px-3 py-2.5"
        style={{ background: "linear-gradient(145deg, #f8ece8, #f4e4dc)" }}
      >
        <p className="text-[9px] tracking-[0.14em] text-[#8a4a3a] uppercase">At risk</p>
        <p className="text-[13px] font-semibold">3 overdue · $48,210</p>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(28,33,30,0.06)]">
        <table className="w-full text-left text-[10px]">
          <thead className="bg-[#f4f6f5] text-[#6b726c]">
            <tr>
              <th className="px-2.5 py-1.5 font-medium">Invoice</th>
              <th className="px-2.5 py-1.5 font-medium">Due</th>
              <th className="px-2.5 py-1.5 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["KN-10492", "12 days", "$18,400"],
              ["KN-10501", "5 days", "$21,110"],
              ["KN-10518", "2 days", "$8,700"],
            ].map(([id, due, amount]) => (
              <tr key={id} className="border-t border-[#f0d9d2] bg-[#fdf6f4]">
                <td className="px-2.5 py-1.5">{id}</td>
                <td className="px-2.5 py-1.5 text-[#8a3e2c]">{due}</td>
                <td className="px-2.5 py-1.5">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="w-full rounded-xl bg-[#2f4a45] py-2 text-[11px] font-medium text-[#e8f0e6]"
      >
        Make payment
      </button>
    </div>
  );
}

function ShipmentsReply() {
  return (
    <div className="proto-sheet space-y-2">
      <BotLine>4 ocean shipments with ETA through Friday. Two need a last-free-day check.</BotLine>
      <div className="space-y-1.5">
        {[
          ["KX-A7J4-73", "Hamburg · Fri", "LFD risk"],
          ["KX-U1C6-8389", "Genoa · delayed", "Watch"],
        ].map(([id, meta, tag]) => (
          <div
            key={id}
            className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-[11px] shadow-[0_0_0_1px_rgba(28,33,30,0.06)]"
          >
            <span>
              <span className="block font-medium">{id}</span>
              <span className="text-[#6b726c]">{meta}</span>
            </span>
            <span className="rounded-full bg-[#f8ece8] px-2 py-0.5 text-[10px] text-[#8a3e2c]">
              {tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorReply() {
  return (
    <div className="proto-sheet space-y-2">
      <div className="rounded-xl border border-dashed border-[#d4b8ae] bg-[#fdf8f6] px-3 py-3 text-[12px] leading-relaxed text-[#5c4038]">
        Your session expired, so I can’t export billing data. Log in again and I’ll retry
        this request — nothing was sent.
      </div>
    </div>
  );
}
