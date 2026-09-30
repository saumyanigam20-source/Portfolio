# Delivery Orders — Product Requirements

**Product:** Delivery Orders, inside KlearNow  
**Author:** Saumya Nigam, product owner and product designer  
**Status:** Working PRD for the portfolio case study. Decisions below are the product as designed. Correct any that do not match the real build.  
**Surface:** Desktop, for the person who issues the order. The trucker receives email plus a live link. No driver app in this version.

---

## 1. Summary

A delivery order is the instruction that lets a truck pick up a container and take it to the right door. Today that instruction is assembled by hand: an arrival notice, a bill of lading, a customs status, and a terminal page, retyped into a PDF and emailed. The container number is usually right. The delivery address, the release, and the last free day are where it goes wrong.

Delivery Orders drafts that instruction from shipment data already in KlearNow, and issues it only when three things are true: customs has released the cargo, freight has been released, and the terminal has the container available. A person confirms the delivery door and the trucker. Repeat lanes can send on their own. First-time doors, conflicts, and anything hazardous wait for a yes.

The product stops at the issued order. It does not book the terminal appointment, assign a chassis, or dispatch a driver. Those belong to the carrier and the terminal.

## 2. Problem

Import coordinators at a freight forwarder already have the facts inside KlearNow. They still leave the product to make the one document the trucker needs.

What goes wrong:

- The order is typed late, often the morning the container becomes available, with demurrage already close.
- The consignee address on the bill is an office, a broker, or a billing address. The truck goes there.
- Customs is released and freight is not, or the terminal has not discharged the box. The trucker arrives and is turned away.
- A correction is a second email. The driver is holding the first PDF.
- Nobody can say which version is current.

The cost is failed pickups, detention, demurrage, and a day of the coordinator’s time spent on documents instead of exceptions.

## 3. Who it is for

### Primary — Import coordinator

Issues delivery orders for ocean import containers. Works a queue of arrivals, not one shipment at a time. Knows the customer’s warehouses, the house truckers, and which accounts always have a special instruction. Does not want a new place to type the bill of lading.

**Job:** Get a correct order to the right trucker before last free day, without rebuilding it from four tabs.

### Secondary — Motor carrier dispatcher

Receives the order and assigns a driver. Lives in email. Will not log into KlearNow. Needs container, terminal, delivery address, hours, contact, and last free day on one page. Needs to know when those change.

**Job:** Dispatch from a current order, not from a thread of PDFs.

### Informed, not a user in v1

- The warehouse receiving the container. They appear as the delivery location and a contact.
- The terminal. Availability, firm code, and last free day are data, not a login.
- The importer’s broker, when they are not the forwarder issuing the order.

## 4. Product principles

1. **The order is born early and sent late.** A draft exists as soon as the shipment file is usable. It cannot be issued until the three gates are open.
2. **The bill of lading is not the delivery address.** Cargo facts can be trusted. The door the truck drives to cannot.
3. **One yes, not a form.** Review is for conflicts and first-time decisions. A clean repeat lane does not ask the coordinator to re-read twenty fields.
4. **The trucker sees one current order.** Amendments replace the previous version in the same link. Email announces the change. It does not become the system of record.
5. **Stop at the instruction.** Pickup appointment, chassis, and driver assignment are out of scope. Promising them would make a dispatch product.

## 5. The three gates

An order can be **issued** only when all three are true. Any one of them failing keeps the order in draft.

| Gate | Meaning | Source in KlearNow | If it is not true |
| --- | --- | --- | --- |
| Customs released | Entry is cleared. No hold, no exam blocking release. | Customs / entry status | Draft stays. Reason shown: customs hold or pending entry. |
| Freight released | Ocean freight is released to the forwarder or consignee. Express release or original bill surrendered, charges settled. | Shipment release status | Draft stays. Reason shown: freight not released. |
| Terminal available | Container is discharged and available for pickup. Not on vessel, not in a closed area. | Tracking milestone | Draft stays. Reason shown: not yet available. Last free day is shown once the terminal publishes it. |

Last free day is not a fourth gate. It is a clock on an issuable order. The queue sorts by it.

## 6. Goals and non-goals

### Goals for this version

- Draft a delivery order from the shipment without retyping cargo facts.
- Block issue until customs, freight, and terminal availability all pass.
- Make the coordinator confirm delivery location and carrier when they are not already verified for that lane.
- Issue to the carrier by email and a live link.
- Show conflicts in plain language before send.
- Version the order when a material field changes after issue.
- Give the coordinator a queue ordered by urgency, not by arrival date alone.

### Non-goals

- Drayage dispatch, driver assignment, or a driver mobile app.
- Terminal appointment booking.
- Chassis, per diem, or accessorial rating.
- Quoting or buying the truck move.
- A customer portal where the importer builds their own order.
- A general rules engine or SOP configurator. Lane memory in this version is specific: this customer, this delivery door, this carrier.
- Air shipments. Ocean import containers only.
- Export.

## 7. Success

| Metric | What it means | Target for the first customers |
| --- | --- | --- |
| Time to issue | From the moment all three gates open to the moment the carrier receives the order | Under 30 minutes on a staffed business day, including auto-issue |
| Issued without a cargo edit | Coordinator does not change container, terminal, weight, or bill numbers | 90% of orders |
| Correction after issue | A material field changes after the carrier was notified | Under 8% |
| Failed pickup attributed to the order | Wrong door, wrong terminal, pickup attempted while not released | Track the reason. Drive it down from the baseline the team states in interviews. |
| Auto-issued share | Orders sent with no click, because the lane was already verified | Rising over the first quarter. Not a launch target. Safety beats automation rate. |

## 8. Scope of an order

### Trusted fields

Copied from the shipment. Locked on the order. If tracking or the bill later disagrees with the draft, the field unlocks, the order is pulled back to review, and the difference is shown.

- Master bill and house bill
- Container number, size, and type
- Seal number
- Pieces, weight, and a short cargo description
- Vessel, voyage, and port of discharge
- Terminal name and firm code
- Last free day, once published
- Customs release and freight release, as status, not as editable text

### Confirmed fields

Never silently taken from the consignee line on the bill.

- Delivery location: name, street, city, receiving hours
- Location contact: name and phone
- Motor carrier who will pick up
- Service: live unload or drop
- Special instructions: appointment required, liftgate, hazmat, residential, inside
- Bill-to for the drayage charge, when the forwarder is not the default

### Material changes

These create a new version and notify the carrier if the order was already issued:

- Delivery address or hours
- Carrier
- Terminal or firm code
- Container number
- Last free day brought forward
- Any gate that re-closes (a hold placed after release)

Cosmetic notes do not create a carrier alert.

## 9. States

```text
Draft
  → Needs review      a gate is closed, a field conflicts, or the lane is unverified
  → Ready             all gates open, lane verified, no conflicts
Ready
  → Issued            auto-send, or coordinator confirms
Needs review
  → Ready             the blocker is resolved
  → Issued            coordinator confirms and sends
Issued
  → Amended           a material field changed; carrier notified; same link, new version
  → Void              pickup will not happen on this order
Amended
  → Issued            the new version is the current one
```

Void is explicit. Deleting an email is not void.

Completed (picked up and delivered) is visible if tracking already knows it. This version does not ask the coordinator to close the order by hand.

## 10. Flows

### 10.1 Draft appears

1. A shipment file has a container, a bill, and a port.
2. KlearNow creates a draft delivery order linked to that container.
3. Trusted fields fill in. Confirmed fields fill only from a saved lane. Otherwise they stay empty.
4. The draft shows which gates are open and which are waiting.
5. The coordinator is not emailed for every draft. The order waits on the queue.

### 10.2 Queue

The coordinator opens Delivery Orders and sees containers that need an order, not every shipment in the system.

Default sort: last free day soonest, then orders that became issuable today.

Filters: needs review, ready, issued, customer, port.

Each row shows customer, container, terminal, delivery city if known, gate summary, and the next action in one line. Examples: “Waiting on freight release.” “Confirm delivery door.” “Ready — will auto-send.”

### 10.3 Review and issue

1. Coordinator opens the order.
2. Cargo facts are readable and locked.
3. Gates sit at the top. A closed gate says why, in operational language.
4. Delivery and carrier sit in the confirmation block.
5. If the lane is saved, both are filled and marked verified. The coordinator can issue in one action, or the system issues when the last gate opens.
6. If the lane is new, those fields are empty or suggested and unmarked. Issue stays disabled until both are set.
7. Issue asks for nothing else. One button: Issue to carrier.
8. Carrier receives email. The link opens the current order. The coordinator sees Issued, with time and version.

### 10.4 Conflict

A trusted field on the draft does not match a newer milestone or bill update.

1. The order leaves Ready or, if already issued, becomes Amended and returns to review.
2. The screen shows the old value and the new value.
3. The coordinator accepts the new value or records an exception if the source is wrong.
4. Accepting a material change notifies the carrier when a previous version was already sent.

### 10.5 Amend and void

From an issued order the coordinator can amend confirmed fields or void.

Amend saves a version, updates the live link, and emails the carrier with what changed, not a full reprint buried in a paragraph.

Void tells the carrier the order is cancelled and keeps the record.

## 11. Auto-issue rules

Auto-issue runs only when every line below is true.

- All three gates are open.
- Delivery location is a saved location for this customer, used successfully before.
- Carrier is the saved carrier for that location.
- No trusted-field conflict is open.
- Cargo is not hazardous.
- Service is not a split delivery and not a multi-stop order.
- Last free day is at least one business day away, or last free day is unknown and the coordinator’s account allows send without it. Default is: do not auto-issue when last free day is missing.
- The account has auto-issue turned on. Default for a new account is off.

If any line fails, the order stops in Needs review with one sentence explaining the stop. It does not fail silently.

Turning auto-issue on is an account setting owned by the coordinator’s lead, not a per-order toggle hidden in the form.

## 12. What the carrier receives

Email subject: Delivery order · container number · delivery city · version.

Body, short:

- Container, size, terminal
- Delivery name and address
- Receiving hours and contact
- Last free day
- One line if this replaces a previous version: what changed
- Link to the live order

The live page repeats those facts and shows version history in one list. It does not show KlearNow navigation, pricing, or other containers.

A PDF download exists on that page for the dispatcher who must attach a file. The PDF is generated from the current version at the moment of download. It is stamped with version and time so a printed copy can be recognized as old.

## 13. Permissions

| Person | Can |
| --- | --- |
| Import coordinator | See their accounts, edit confirmed fields, issue, amend, void |
| Team lead | All of that, plus turn auto-issue on or off for an account |
| Carrier, via the link | View the current order and history. Cannot edit. Link is unguessable and expires when the order is void or delivered. |
| Everyone else in the forwarder’s company | No access unless they are on the account |

The carrier link is the only external access. There is no carrier login in this version.

## 14. Notifications

| Event | Coordinator | Carrier |
| --- | --- | --- |
| Draft created | No | No |
| All gates open, waiting on a human | Yes, if last free day is inside two days. Otherwise it waits on the queue. | No |
| Issued | Yes, in the product. Email optional. | Yes |
| Amended | Yes | Yes, with the change |
| A gate re-closes after issue | Yes | Yes. The live page shows the order paused. |
| Void | Yes | Yes |

No daily digest in v1. Urgency is the queue sort plus the two-day warning.

## 15. Edge cases

- **More than one container on a bill.** One delivery order per container. They can share a delivery location. They issue separately because availability and last free day differ.
- **Delivery address is on the bill and looks complete.** Still untrusted until someone confirms it once for that customer. A suggestion can be shown. It cannot auto-issue.
- **Hold after the truck is already dispatched.** Order pauses. Carrier is told. This product does not recall the driver. The dispatcher does.
- **Coordinator issues to the wrong carrier.** Amend the carrier. The first carrier is notified that the order is no longer theirs. The new carrier receives the current version.
- **Last free day moves earlier.** Treated as material. If the order is issued, the carrier is notified the same day.
- **Hazmat, overweight, or out-of-gauge.** Never auto-issue. Special instruction is required before Issue enables.
- **Shipment cancelled.** Draft is voided. Issued orders notify the carrier.

## 16. Requirements checklist

The build is done for this version when:

1. A draft is created for each ocean import container that has a bill and a port.
2. Trusted fields fill from the shipment and stay locked until a conflict.
3. The three gates display with a plain reason when closed.
4. Issue is impossible while any gate is closed.
5. Delivery location and carrier must be confirmed before the first issue on a lane.
6. A verified lane can auto-issue when the account allows it and the safety rules pass.
7. The queue sorts by last free day and can be filtered by state.
8. Issue sends carrier email and opens a live link.
9. Material changes create a version and notify the carrier.
10. Void notifies the carrier and kills the link’s usefulness.
11. Conflicts show both values and block auto-issue.
12. Hazardous and split deliveries cannot auto-issue.

## 17. Rollout

1. **Shadow.** Drafts appear for one forwarder team. Issue is manual only. Compare drafts to the PDFs they still send. Fix field mapping before anyone trusts it.
2. **Manual issue.** That team sends real orders from the product. Measure time to issue and corrections.
3. **Auto-issue.** Turn it on for lanes that have been issued correctly at least three times, for accounts whose lead opts in.

Do not launch all three on day one.

## 18. Risks

| Risk | What we do |
| --- | --- |
| A trusted source is wrong and we lock it | Conflicts reopen the field. The coordinator can accept or flag. |
| Auto-issue sends a bad door | Doors are untrusted until a successful lane exists. New accounts default to manual. |
| Carriers ignore the live link and keep the first PDF | Email on every material change, version stamped on the PDF, subject line includes the version. |
| Coordinators distrust locked fields and copy into email anyway | Shadow period is mandatory. If they still bypass after mapping is fixed, the locked fields are wrong and we change the mapping, not the rule. |
| Scope creeps into dispatch | Appointment, chassis, and driver stay on the non-goal list. Requests for them become a later product. |

## 19. Later, not this PRD

- SOP configuration: a broader rules layer for customers who want different gates or different auto-issue policies per account. This version has one policy.
- Drayage execution: appointment, chassis, driver, and status back from the truck. A different product, used after the order exists.
- Importer-facing request: “deliver to this warehouse” as a structured reply instead of an email the coordinator retypes.

## 20. Decisions to correct

These are assumed. Change them if the real product differed.

1. Ocean import containers only.
2. Three gates: customs released, freight released, terminal available.
3. Delivery address is never trusted from the bill of lading.
4. One order per container.
5. Carrier has no login. Email plus a live link.
6. Auto-issue is off until a lead enables it, and only on lanes issued correctly three times.
7. The product does not book the pickup or assign the driver.
