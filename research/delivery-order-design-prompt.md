# Design prompt — Delivery Orders

Paste the prompt below into the design tool as one brief.

---

Design a desktop product called **Delivery Orders** for KlearNow, at 1440px wide. It is the screen an import coordinator uses to issue the instruction that lets a truck pick up one ocean container and deliver it to the right door. A motor carrier dispatcher sees only a public page, never the logged-in app.

Visual language, taken from the attached references:

- Light, airy, almost white. Page background is a very pale cool gray. Surfaces are white cards with a large radius, a soft diffuse shadow, and generous inner padding.
- One calm sans serif. Page titles are large and dark. Labels are small, muted, and never shout.
- Top navigation, slim, white, with the product name at the left and the signed-in coordinator at the right. No heavy left rail.
- One blue is the only primary action color. Use it for the single main button on a screen and for the active nav item.
- Status is a small pill: green when a gate is open or an order is issued, amber when a person must act, red only when something is blocked or paused.
- Icons are thin, small, and secondary to the words.
- Density is comfortable, closer to the reference cards than to a spreadsheet. Operational facts are still complete. Do not hide container, terminal, or last free day to make a screen look empty.
- Do not copy the reference products. No route builder, no map as the main canvas, no fleet dashboard, no KPI charts, no “create route,” no driver search, no cost per mile. Those references are only for finish, spacing, shadow, and type.

Motion is minimal and functional. 150–200ms, ease-out, no bounce, no parallax, no loading theater.

- Filters and state chips crossfade the queue; rows do not fly in.
- Opening an order slides a detail surface in from the right, over a dimmed queue, or replaces the queue in place. Pick one pattern and keep it.
- A gate flipping from closed to open changes the pill color and the reason line fading out. Nothing else moves.
- A conflict reveals the old value and the new value with a short fade. The new value is the one in blue.
- Issue presses into a quiet confirmation on the same card: “Issued to Pacific Drayage · version 1.” The button does not turn into a celebration.
- Amend updates the version number in place and shows one line: what changed.
- The carrier page swaps to the new version without a full reload flicker.

Every screen uses realistic sample data. Customer: Northline Home. Container: MSCU4451290, 40' HC. Bills: MBL MSCUMA441902, HBL NL-22841. Vessel: MSC IRINA, voyage 214E. Port: Los Angeles. Terminal: TraPac, firm code Y258. Seal: SL229184. Weight: 18,420 kg. Cargo: furniture. Last free day: Thursday, 26 Sep, 17:00. Delivery, once confirmed: Northline DC, 4100 Alameda Street, Los Angeles, receiving 08:00–15:00, contact Priya Shah. Carrier: Pacific Drayage. Coordinator: Asha Menon.

Design every use case below as its own frame. Label each frame with the use-case name.

## Coordinator — queue

**Queue, mixed urgency.** Default view. Rows are containers that need an order, sorted by last free day soonest, then by orders that became issuable today. Columns or card lines: customer, container, terminal, delivery city if known, a one-line gate summary, and the next action. Include these rows together:

- Waiting on freight release. Customs open, terminal open, freight closed. LFD in 1 day.
- Confirm delivery door. All gates open, lane not verified. LFD in 2 days.
- Ready — will auto-send. All gates open, lane verified, auto-issue on.
- Customs hold. Pending exam. Not issuable.
- Not yet available. Container still on vessel.
- Issued this morning. Version 1. Pacific Drayage.
- Paused after issue. A hold landed after the carrier was notified.

Filters as chips: Needs review, Ready, Issued, plus customer and port. Active chip is blue. Empty filter result is a single quiet line, “Nothing in this view,” and a way back to all.

**Two-day warning.** Same queue, with the freight-release row carrying a small amber note: “Last free day inside two days.” This is the only extra nudge. No digest, no badge explosion.

**Several containers, one bill.** Three rows share HBL NL-22841 and the same delivery city, with different container numbers and different last free days. They are separate orders. Nothing on screen offers “issue all.”

## Coordinator — the order

**Draft, gates closed.** Order surface. Three gates in a row at the top: Customs released (open), Freight released (closed, reason “Freight not released”), Terminal available (open, “Not yet available” on a different variant frame if you need it — make this frame the freight one). Trusted cargo block is readable and locked: bills, container, size, seal, pieces, weight, cargo, vessel, voyage, port, terminal, firm code. Last free day is visible. Confirmed block shows delivery and carrier empty. Primary button “Issue to carrier” is present and disabled. A one-line reason sits with it: “Freight is not released.”

**New lane, person must confirm.** All three gates open. Delivery and carrier are empty. A suggestion under delivery reads “Bill of lading shows 200 Commerce Blvd — unconfirmed.” It is clearly a suggestion, not a filled field. Issue stays disabled until delivery location, hours, contact, and carrier are set. Secondary fields in this block: live unload or drop, special instructions, bill-to. Keep them quiet until the door and carrier exist.

**Suggestion accepted, still not trusted.** The coordinator has used the bill address, but the lane is marked unconfirmed. Issue can now be pressed because a person set it. A short line says this door will not auto-send until the lane has been issued correctly three times.

**Verified lane, one yes.** Delivery and carrier are filled and marked verified. Gates open. No conflicts. One primary button: Issue to carrier. No other calls to action compete with it.

**Verified lane, auto-send.** Same as the previous frame, but the account has auto-issue on and every safety rule passes. The primary button is replaced by a calm status: “Will send to Pacific Drayage when you leave this order,” or “Sent automatically at 09:14.” Do not show a countdown animation.

**Hazmat, cannot auto-send.** Gates open, lane verified, cargo marked hazardous. Auto-issue is refused. A required special instruction field is empty, and Issue stays disabled until it is filled. One sentence: “Hazardous cargo is never sent automatically.”

**Split delivery, cannot auto-send.** Same refusal, for a two-stop delivery. Issue is manual only. Do not design the second stop as a route on a map. It is a second address on the order.

**Conflict on a trusted field.** Terminal firm code changed. Show the locked field opened: previous Y258, new Y124, new value emphasized. The order is back in review. Two actions only: Accept new value, Flag source as wrong. Auto-issue is off while this is open. If the order was already issued, the header says it will notify the carrier when the new value is accepted.

**Last free day brought forward.** Same conflict pattern. Previous Thursday 17:00, new Wednesday 17:00. Treat it as material.

**Issue confirmation.** The verified-lane screen a moment after the click. Button is gone. In its place: “Issued to Pacific Drayage · version 1 · 09:14.” A text link: view the carrier page. Email is mentioned in one muted line, not illustrated as a toast stack.

**Issued order.** Read-only current version. Gates open. Version 1 in the header. Actions: Amend, Void. History is a short list, not a timeline graphic.

**Amend the door.** Confirmed fields editable, trusted fields still locked. Save creates version 2 on the same order. After save, one line: “Version 2 · delivery hours changed to 07:00–14:00 · carrier notified.”

**Amend the carrier.** The order was issued to the wrong carrier. Carrier field changes from Pacific Drayage to Harbor Cartage. After save: “Version 2 · Pacific Drayage was told this order is no longer theirs · Harbor Cartage received the current version.”

**Void.** A confirm step on the order, not a new page. Copy: “Void this order. Pacific Drayage will be told the pickup is cancelled.” After confirm, the order is visibly void and the carrier link is described as ended.

**Paused after a hold.** Order was issued. Customs gate has re-closed: “Hold placed after release.” The page says the order is paused. The carrier was notified. Do not design a “recall driver” action.

**Shipment cancelled.** Draft voided, with the reason “Shipment cancelled.” If it had been issued, the same frame notes that the carrier was notified.

## Team lead

**Auto-issue for an account.** A small settings surface for Northline Home, not a rules builder. One switch: auto-issue, off by default. Helper text: “Sends only on lanes issued correctly three times, with all three gates open, a known door, and a known carrier. Never sends hazardous, split, or conflicting orders. Stays manual when last free day is missing.” Show a lane list with a simple count, “2 of 3 correct issues,” so the lead can see why a lane is not eligible yet. No condition builder, no SOP editor.

## Carrier — no login

**Email, first issue.** A single email frame, not a client chrome. Subject: “Delivery order · MSCU4451290 · Los Angeles · version 1.” Body is short: container and size, terminal, delivery name and address, hours and contact, last free day, and one link, “Open current order.” No KlearNow marketing.

**Email, amendment.** Subject ends in version 2. First line states the change: “Delivery hours are now 07:00–14:00.” Same link. Do not attach a story about the rest of the order.

**Email, paused.** “This order is paused. Customs hold after release. Open the current order before dispatching.”

**Email, void.** “This order is cancelled. Do not pick up MSCU4451290 on this instruction.”

**Carrier page, current.** A single public page, no app navigation, no other containers, no prices. Same facts as the email, plus version and time, a one-list version history, and “Download PDF.” The PDF note on the page says the file is stamped with version and time and is only current at the moment of download.

**Carrier page, after amendment.** History shows version 1 and version 2. The change is one sentence at the top. The link is the same page.

**Carrier page, paused.** Facts remain visible. A clear paused state tells the dispatcher not to use it until the hold clears.

**Carrier page, ended.** Void, or the container is already delivered. The page says the link has ended and shows the last version for reference, not as an instruction to drive.

## Empty and quiet states

**Queue, nothing waiting.** “No orders need you. Drafts still waiting on a gate are under Needs review.” Do not illustrate an illustration-style empty desert. One sentence and the filter chips are enough.

**Order, last free day unknown.** Terminal available, other gates open, last free day not published. It can be issued by a person. It cannot auto-send. Say that in one line.

## Consistency

Use the same card, pill, gate row, and button across every frame. The only primary button in the product is Issue to carrier, and it appears only when issue is allowed. Amend, Void, Accept, and Flag are secondary. The carrier page does not look like the logged-in product; it looks like a clean document with the same type and the same blue link.

Produce the full set of frames in one file, in the order listed above, each labeled with its use-case name.
