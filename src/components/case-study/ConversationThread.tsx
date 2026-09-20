"use client";

import { useEffect, useState } from "react";
type DialogueMessage = {
  id: string;
  speaker: string;
  label: string;
  text: string;
};

export function ConversationThread({
  title,
  messages,
  continueLabel = "Continue",
}: {
  title: string;
  messages: DialogueMessage[];
  continueLabel?: string;
}) {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);
  }, [messages]);

  const shown = messages.slice(0, visibleCount);
  const hasMore = visibleCount < messages.length;

  return (
    <section className="space-y-5">
      <p className="text-xs font-medium tracking-[0.22em] text-faint uppercase">
        {title}
      </p>
      <ul className="space-y-3">
        {shown.map((message) => (
          <li
            key={message.id}
            className={`animate-rise flex ${
              message.speaker === "saumya" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[92%] rounded-2xl px-4 py-3 sm:max-w-[80%] ${
                message.speaker === "saumya"
                  ? "rounded-br-md bg-accent-soft text-ink"
                  : message.speaker === "system"
                    ? "w-full border border-dashed border-line bg-transparent text-muted"
                    : "rounded-bl-md border border-line bg-canvas-elevated text-ink"
              }`}
            >
              <p className="mb-1 text-[11px] tracking-[0.16em] text-faint uppercase">
                {message.label}
              </p>
              <p className="text-[0.95rem] leading-relaxed">{message.text}</p>
            </div>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => Math.min(count + 1, messages.length))}
          className="rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
        >
          {continueLabel}
        </button>
      ) : null}
    </section>
  );
}
