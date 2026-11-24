# Marlow notebook: Holos Earth Academy

Read this first on resume. One fact per line. Newest session at the top of the log.

## Where things stand (2026-09-10, end of session)

### Proven (witnessed by Marlow)
- Site live on holosearthacademy.org at commit b3f22f7 (Amplify job 73, SUCCEED 09:59 CEST).
  - Llewellyn van Wyk: Wednesday 23 September 2026, 20h00 CEST (was 19h00).
  - Jeremy Lent: Friday 16 October 2026, 18h00 CEST (was Wednesday 14 October, 20h00).
  - Every talk's downloadable .ics now carries a stable UID `holos-<speaker slug>@holosearthacademy.org`
    (never date or time based), SEQUENCE:0. Slug is threaded from app/data/speakers.ts into
    AddToCalendar.vue via ProgrammeCardPhase2, ProgrammeCard, SpeakerModal, both tickers.
- Schedule-change reminder emails SENT 2026-09-10 ~09:30 UTC via SES from a local script:
  - Llewellyn: 81 recipients, 81 SES MessageIds, 0 failures (log: session scratchpad send_llewellyn.log).
  - Jeremy Lent: 80 recipients, 80 SES MessageIds, 0 failures (send_jeremy_lent.log).
  - Recipient list per talk = anyone who clicked Add to Calendar / Email details for that speaker
    (any events row for the speaker) UNION all Phase 2 registrants, deduped on lower(email),
    minus unsubscribed/suppressed. Mark, Claudius (claudiusvanwyk@gmail.com) and Michelle
    (gmail) confirmed in both lists.
  - Invites used the new stable UIDs, so recipients who had added the OLD entry see a second
    entry; the copy tells them to delete the old one. Future sends will update in place.
  - Style: Georgia 17px serif, event card, multipart/alternative + text/calendar method=REQUEST,
    ATTENDEE personalised. Reply-To claudiusvanwyk@gmail.com. UTC equivalent NOT shown on the
    date line (Mark accepted the smoke as is; recommendation to add it stands for next time).
- Reusable sender now lives in the backend repo (survives reboots, unlike the old /tmp copy):
  ~/IdeaProjects/deepdigital-lambda/holos_broadcast/broadcast_reminder.py (+ README.md).
  Flags: --talk llewellyn|jeremy-lent, --dry-run, --only <email>, live needs --yes-send-to-everyone.
  Copy comes from markdown files with sections Subject/Lead/Card/Body/Invite line/Sign-off.
  Credentials are fetched at run time from the formToDb Lambda config (or DB_* env vars);
  NO password literal in the file (one was there briefly, removed, never committed).
- RDS is directly reachable from Mark's Mac on 5432 (the broadcast skill's "go via Lambda"
  workaround is obsolete). Use a read-only session for counting.

### Needs Mark's hand
1. DB tidy-up NOT yet applied: two `events` rows per rescheduled talk (Mark's own test clicks
   forked them). Dry run verified by Marlow. Run:
   `~/IdeaProjects/deepdigital-lambda/venv/bin/python3 ~/IdeaProjects/deepdigital-lambda/holos_broadcast/merge_rescheduled_events.py --apply`
   Expected: Llewellyn 19 signups on one row, Jeremy 8 on one row, both rows on the new schedule.
   Not urgent for emailing (recipient SQL unions all rows), but keeps counts honest.
2. Uncommitted in this repo: CLAUDE.md (writing-style + broadcast-pattern notes from 31 Aug) and
   this docs/marlow folder. Commit when Mark says.
3. Uncommitted in deepdigital-lambda: holos_broadcast/ (sender, merge script, README). Safe to
   commit; no secrets inside.
4. Password rotation is Mark's call: the RDS password sat in an untracked file for ~30 min and
   passed through this session's transcript. Nothing suggests it left the Mac.

### Owed / craft (not started)
- Lambda `handle_event_signup`: the events upsert never updates speaker/date/time, so any
  reschedule forks a row (event_key = speaker|date|time). Consider keying on speaker+phase and
  updating date/time on conflict.
- Lambda's "Email details" confirmation .ics (METHOD:PUBLISH) uses its own UID; align it to
  `holos-<slug>@holosearthacademy.org` (frontend could send the slug in the payload).
- Update the holos-broadcast-lambda skill: sender path moved, RDS reachable, stable UID scheme.
- Add the UTC equivalent back to the reminder date line next time.

## Log
- 2026-11-23: Book announcement, Cohort B ("Could reading a book change the way you see the world?") SENT LIVE on Mark's word ("Send to 123 users now."): 123 sent, 0 failed. Audience: book box ticked in the registration form (phase NULL/P1/P2, not unsubscribed/suppressed); left out the 9 newsletter-only people and the 7 whose only tick was the newsletter card default. Links carry campaign tags only (utm_content=cohort-b), no per-person token. Sender deepdigital-lambda holos_broadcast/broadcast_book.py (1cdcdb8) with --registration-tick-only; template claudius-book/build/email-cohort-b/cohort-b-hosted.html (git-ignored); log holos_broadcast/sendlog/book-cohort-b.jsonl. Five smokes to Mark first; one each to Claudius, Michelle, Tarryn (early layout). Parked: per-person click tracking (Nuxt main 97c0f93, lambda branch book-click-tracking), privacy draft (branch privacy-notice 6df10a2, controller entity unnamed). Cohort A build has the same Gmail layout faults (left-hugging card and dividers, swallow negative margin): belongs to the CLAUDIUS BOOK window.
- 2026-11-07: Berry Behr repeat mailer ("If you missed Rev. Berry Behr's talk, good news: she is giving it again live on Wednesday 11 November") was SENT TWICE BY MISTAKE, a few minutes apart: first by Wren, then by Mark. Each run printed "Sent 182, failed 1", so 182 people got the email twice. Each run had 183 recipients: 19 signed up for Rev. Berry Behr, 82 Phase 2 registrants not signed up, 82 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. Failed address both times, confirmed: claudiusvanwyk@gmail.org/ (SES InvalidParameterValue "Domain contains illegal character"). Also: ffairy11@gmail.comf (audience A) was accepted by SES but is a visibly malformed address. Sender: deepdigital-lambda commit add839e (message amended to record the double send).
- 2026-11-03: Dr Philip Mirkin announcement sent live to 208 recipients, 0 failures: 95 signed up for Dr Philip Mirkin, 113 Phase 2 registrants not signed up, 0 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. Log: session scratchpad send-logs/philip-mirkin-live.log.
- 2026-11-03: Berry Behr reminder sent live to 177 recipients, 176 sent, 1 failed: 15 signed up for Rev. Berry Behr, 81 Phase 2 registrants not signed up, 81 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. The failure was claudiusvanwyk@gmail.org/ (audience A), SES InvalidParameterValue "Domain contains illegal character": a mistyped address, not retried. Log: session scratchpad send-logs/berry-behr-live.log.
- 2026-10-13: Jeremy Lent reminder ("This Friday: Jeremy Lent, What Would a Truly Holistic Civilization Look Like?, 18h00 CEST") sent live to 166 recipients, 0 failures: 16 signed up for Jeremy Lent, 71 Phase 2 registrants not signed up, 79 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. Mark ran the live command himself after the permission classifier blocked the agent. Log: session scratchpad jeremy-live-2026-10-13.log.
- 2026-10-13: deepdigital-lambda holos_broadcast/copy/jeremy-lent.md was rewritten from the single-list schedule-change email to the four-audience reminder shape; still uncommitted.
- 2026-09-21: Llewellyn van Wyk reminder ("This Wednesday: Llewellyn van Wyk, Holism and Architecture, 20h00 CEST") sent live to 163 recipients, 0 failures: 18 signed up for Llewellyn, 66 Phase 2 registrants not signed up, 79 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. Log: session scratchpad llewellyn-live-2026-09-21.log.
- 2026-09-21: broadcast_reminder.py (deepdigital-lambda/holos_broadcast) now supports four priority-ordered audiences A/B/C/D with per-audience copy sections and `--as A|B|C|D` for single-address smoke; single-list copy files (jeremy-lent.md) still work. COPY_DIR now resolves to holos_broadcast/copy/ next to the script; the 10 September copy was recovered from that session's transcript after the scratchpad was lost.
- 2026-09-21: Owed: deepdigital-lambda repo has no commits; holos_broadcast/ (script, README, copy/) is untracked and should be committed. Also the "Register for Phase Two" button links to /register-2.
- 2026-09-21: Fact: every newsletter signup row carries phase_2 = TRUE, so newsletter-only people always land in the "ticked interest" audience; the D list will be empty unless that changes.
- 2026-09-10: Llewellyn +1h, Jeremy Lent to Fri 16 Oct 18h00 (per Claudius). Site deployed
  (a08468c), stable calendar UID (b3f22f7), counts tabulated (81/80), smoke to Mark, live send
  both talks, 0 failures. Sender rebuilt into deepdigital-lambda/holos_broadcast. Password
  literal caught and removed before commit. Internet outage ~20 min mid-session; all external
  results re-verified afterwards.

## BOOK MAILER window: questions to Mark (counter `bookmailer-Q<n>`, never reused)

| Id | Asked | Question | Default | Mark's ruling (verbatim) |
|---|---|---|---|---|
| bookmailer-Q1 | 2026-11-23 | Record (claudius-book STATUS.md, 21 Nov): "Leave Tarryn out of this"; book-window Q51 on sending her the smoke test is still open. Today Mark listed Tarryn for the Cohort B smoke test. Send her the smoke test? | Hold Tarryn; smoke goes to Mark, Claudius, Michelle | |
| bookmailer-Q2 | 2026-11-23 | No subject line is on record for the Cohort B book email (only smoke-test labels). What is the subject? | Michelle's headline: "What if reading a book could change the way you see the world?" | |
| bookmailer-Q3 | 2026-11-23 | 9 of the 139 came only through the newsletter card, which ticks the book box by default; they never registered, and B opens "When you registered to participate". Include them? | Leave the 9 out; send to the 130 who ticked in the registration form | |
| bookmailer-Q4 | 2026-11-23 | Record (claudius-book Q46, 21 Nov): "per person would be great" for click tracking. No per-person token exists on the site. Send B with campaign tags only, or hold until the token is built? | Send with campaign tags only | |
| bookmailer-Q5 | 2026-11-23 | "Available in Paperback or Kindle" under the button comes from the Cohort A build; Michelle's B mock-up has no such line. Keep it? | Keep | |

Mark's rulings, 2026-11-23 (verbatim):
- bookmailer-Q1: "Q1 no send it to her". Read as: send Tarryn the smoke test. Supersedes, for this smoke test only, the 21 Nov "Leave Tarryn out of this" (restated by Mark after hearing the record). Sent 2026-11-23.
- bookmailer-Q2: "Q2 Could reading a book change the way you see the world?" (the subject line)
- bookmailer-Q3: "Q3 No" (the 9 newsletter-only people are left out; audience is the 130 who ticked in the registration form)
- bookmailer-Q4: "Q4 Build it first. It's suppossed to be built." (per-person click token is built before the full send)
- bookmailer-Q5: "Q5 Yes" (keep "Available in Paperback or Kindle")

| Id | Asked | Question | Default | Mark's ruling (verbatim) |
|---|---|---|---|---|
| bookmailer-Q6 | 2026-11-23 | Record names a first-party `/go/<store>/<format>` redirect for store clicks. The site is static, so the build logs clicks by a background message to the Lambda and opens Amazon directly. Accept? | Accept | |
| bookmailer-Q7 | 2026-11-23 | 7 people registered but their only book tick came from the newsletter card (ticked by default). Include them in Cohort B? | Leave out; send to 123 | |
| bookmailer-Q8 | 2026-11-23 | Correction: book-window Q46 "per person would be great" was about OPENS, not clicks. Per-person opens are not built and were flagged as needing consent in UK/EU. Hold the send for them? | Send without per-person opens | |
| bookmailer-Q9 | 2026-11-23 | Book-window Q45 approved click tracking "with a plain line in the privacy notice". /privacy is 404. Hold the Cohort B send until the privacy page is live? | Hold; page drafted now for Mark's approval and shipped with the site deploy | |
| bookmailer-Q10 | 2026-11-23 | Approve production steps in order: (a) RDS migration adding two click-tracking tables, (b) formToDb Lambda deploy from branch book-click-tracking, (c) push main to deploy. | None: each needs Mark's word | |

Mark, 2026-11-23, on bookmailer-Q6 (verbatim): "Q6 So it seems like the question if we should build the task seemed like it could be a yes but because we have a static F/E and we need to ask consent in the UK, we shouldn't build it." Read as a proposal to drop per-person click tracking; not yet a ruling. Record quoted back and bookmailer-Q11 asked.

| Id | Asked | Question | Default | Mark's ruling (verbatim) |
|---|---|---|---|---|
| bookmailer-Q11 | 2026-11-23 | Drop per-person click tracking for the Cohort B send and send with campaign tags only (totals, no names)? Would supersede book-window Q45 "yes" (21 Nov) and bookmailer-Q4 "Build it first" (23 Nov) for this send. | Plan stands: tracking ships first | |
| bookmailer-Q12 | 2026-11-24 | The totals-only tracker is a new, separate Lambda. What is its function name? The record holds no name for it. Candidates drawn from existing keys: `holosEmailClick` (from the existing action `email_click`), `holosBookClick` (from the branch `book-click-tracking`). Existing Lambdas for pattern: `formToDb`, `holosFestivalBroadcast`, `holosBounceHandler`. | None. A name is Mark's to give. Build proceeds; deploy waits on the name. | |
| bookmailer-Q13 | 2026-11-24 | The drafted /privacy page has a section "The book email" describing per-person click tracking ("we record it against your email address"). That tracking is parked and not live. What happens to the section? | Remove it now. Add a short totals-only paragraph when the totals tracker goes live. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q14 | 2026-11-24 | The /privacy draft has a placeholder for the legal name and address of the organisation behind Holos Earth Academy. What are they? | Ship without a name or address, with the contact line info@holosearthacademy.org only. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q15 | 2026-11-24 | The /privacy draft has a placeholder for who else can open the database and how long data is kept. What should it say? | Leave both out. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q16 | 2026-11-24 | The /privacy draft asks whether Mark wants a consent banner for UK and EU visitors, since Google Analytics loads with no prompt. Banner, no banner, or remove Google Analytics? | No banner now. The page states plainly that Google Analytics runs, with the opt-out line. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q17 | 2026-11-24 | Main carries the parked per-person click log code (97c0f93), not live. Deploying main would ship it with the privacy page. What goes live? | The live build plus the privacy page, the footer link and the one-word book quote fix (ebd8942). The per-person click log stays out. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q18 | 2026-11-24 | The only shared footer (FooterCard) shows on the home page, /phase-1 and /alliance. The Privacy link sits there. Add a link on every other page too? That needs a new shared footer line. | Leave as is: footer link on those three pages only. | Mark, 2026-11-24: "Please accept defaults for all and deploy." Default taken. |
| bookmailer-Q19 | 2026-11-24 | formToDb connects to the database as the `postgres` superuser, under the role `lambda-write-to-rds`, which also carries SES and Secrets Manager access. Should the new public tracker Lambda reuse both, or get its own insert-only database user and a logging-only role? Its own would need two more names from Mark. | Reuse formToDb's role and database user, so the tracker ships now. Tighten later. | |

Mark's ruling, 2026-11-23 (verbatim): bookmailer-Q11: "Q11 yes, once I've looked at the smoke." So: per-person click tracking is dropped for the Cohort B send (dated supersession of book-window Q45 "yes" of 21 Nov and bookmailer-Q4 "Build it first" of 23 Nov, for this send only); campaign tags only. Full send waits for Mark to look at the smoke and say okay to send. bookmailer-Q6, Q8, Q9, Q10 closed for this send by Q11. bookmailer-Q7 still open. Built tracking stays parked (Nuxt main 97c0f93, lambda branch book-click-tracking, sender e925916); privacy draft parked on branch privacy-notice 6df10a2.
Mark's ruling, 2026-11-23 (verbatim): bookmailer-Q7: "Q7 no". The 7 whose only book tick came from the newsletter card are left out; Cohort B audience is 123.

Mark, 2026-11-24, after hearing the Q6 and Q11 record quoted back (verbatim): "Can we make a small lambda function that JavaScript calls when someone hits the book page and when someone clicks the go-to-marketplace?" This supersedes his Q6 reply of 23 Nov ("we shouldn't build it") for a totals-only tracker. No per-person token, no names, no email, no IP or user agent stored, nothing written to the browser. Per-person click tracking stays parked. Build is on branches only. The RDS migration, the Lambda deploy and the push to deploy each still need Mark's word.

Totals-only tracker build state, 2026-11-24 (branches only, nothing deployed).

Mark's design instruction, 2026-11-24 (verbatim): "The /book url and just call the lambda function with whatever tag it gets and pass it to the lambda. The lambda will know whether it's a valid tag or not. The spammers won't."

As built: the page sends campaign tags untouched and holds no list. The Lambda holds the list (`VALID_TAGS`, today `cohort-b`). Unknown tags are dropped with the same reply as stored ones.

Assumption by Claude, not Mark's words: visits with no tag are stored with an empty `utm_content`, for an overall page total. One switch, `STORE_UNTAGGED`, turns this off. Awaiting Mark's confirmation.

Stored per event: event_type (`landing` or `store_click`), store_key, edition, utm_source, utm_medium, utm_campaign, utm_content, page_path, created_at. No token, email, name, IP or user agent.

Build state:
- Frontend: branch `book-totals-tracking`, commit 1e73b5b. `nuxt build` completes.
- Backend: branch `book-totals-tracking` in deepdigital-lambda, commit 193bed7. Worktree at /Users/sparkyspider/IdeaProjects/deepdigital-lambda-wt-book-totals. 14 unit tests pass.
- Not verified: typecheck (tooling missing from the repo), and any end to end test (no endpoint exists yet).

Known limits:
- No per-IP rate limiting, by design.
- Anyone holding an emailed link knows the tag `cohort-b`. A determined sender can still inflate tagged counts.
- Changing the tag list needs a redeploy.

Hazard: the parked migration `2026-11-21-email-click-tracking.sql` defines the same table name, `holos_email_click_events`, in the per-person shape. Never run it alongside `2026-11-24-email-click-totals.sql`. The new migration aborts if the old shape exists.

Steps awaiting Mark's word, in order:
1. Retire the 2026-11-21 migration.
2. Run the 2026-11-24 migration.
3. Create the Lambda. Name per bookmailer-Q12, placeholder `LAMBDA_NAME_PENDING_Q12`.
4. Create its Function URL, with CORS limited to https://holosearthacademy.org.
5. Smoke test.
6. Set `ENDPOINT` in `useBookClickLog.ts`.
7. Merge and deploy the site. The /privacy page (branch `privacy-notice`) ships with it.

Deploy word, 2026-11-24. Mark gave his word to deploy with: "Please accept defaults for all and deploy."

Going live on that word:
- The live build (0ff7c1d), plus the privacy page.
- The "Privacy" link in FooterCard.
- The one-word book quote fix (ebd8942).
- The parked per-person click log (97c0f93) stays out.

Privacy page edits made under the defaults:
- The "book email" section is removed.
- The three drafting placeholders are removed.
- The unsubscribe wording is corrected. Registration and calendar confirmations carry no unsubscribe link.

Not deployed:
- The totals tracker (Lambda, migration, page change). It waits on the Lambda name (bookmailer-Q12) and Mark's word.

Found today:
- The SES account counts opens and clicks at account level on every send. This is the Virtual Deliverability Manager engagement metrics.
- Since the Cohort B send, to about 16:00 UTC on 24 Nov: 61 opens and 7 clicks across all Holos mail.
- Nothing was changed.

GA4 is now readable by API: property 528472619.
- Cohort B in GA so far: 3 book page views and 3 store clicks from 2 people.

Deploy outcome: deployed 2026-11-24.
- origin/deploy moved from 0ff7c1d to 018a996 by fast-forward push.
- Amplify job 89 succeeded at 18:16 +02:00.
- Live checks passed. /privacy/ returns 200 with no drafting notes. The home page links to /privacy. /book/ and /book/region/ return 200. The sitemap lists /privacy/.
- The totals tracker is still not live. It waits on bookmailer-Q12 (name), bookmailer-Q19 (credentials) and the database migration.
- The permission system blocked the migration for the agent, so Mark runs it.
- Backend tracker branch `book-totals-tracking` is at db9f667. The go-live runbook was written to the session scratchpad.

Remaining audiences send, 2026-11-24.

What worked: the sender's dry-run plan proved the numbers before anything went out. 77 sent, 0 failed, 0 duplicates.

Mark's request, 2026-11-24 (verbatim): "I think the pri is (1. Asked for the book, 2. Newsletter, 3. Phase 2 Registrants, 4. Claudius Recent Contacts, 5. Phase 1 Registrants. Each one below won't send to the same user as the one above." He also asked for it to be done without questions and fired off.

- This supersedes bookmailer-Q7 "no" (23 Nov) for newsletter subscribers: they are now included, as priority 2.
- Sent live on 2026-11-24, subject "Could reading a book change the way you see the world?"
- Counts: asked for the book 1, newsletter 15, Phase 2 registrants 26, Phase 1 registrants 35.
- Total: 77 sent, 0 failed.
- NOT sent: Claudius's contacts, 55 people, the "real-correspondence" tier only. Held by Claude because the record (claudius-book Q50, 21 Nov) gives them "a new opening written by Claudius", and Mark ruled "Q50 yes but not to send now." The opening now in the template was written by the agent. Claudius has not seen it. Waiting on Mark's word.
- Held out entirely: the "thin-or-calendar-only" contacts tier, with no record of approval to contact them.
- Held out: 19 second addresses of people already covered (one person, one email).
- Held out: 8 unsubscribed or suppressed.
- Held out: 1 do-not-contact.
- Held out: 1 team test address.

Plan proofs before sending: 132 planned, 132 distinct addresses.
- 0 overlap with the 123 Cohort B recipients.
- 0 same-person duplicates.
- Database: 306 addresses = 123 Cohort B + 132 planned + 51 unreached.

Found:
- Cohort A never went out live before today.
- The cohort-a traffic in GA was team smoke tests.
- Cohort B went to 4 people twice, on two addresses each.

Templates:
- Asked uses Michelle's Cohort B.
- Phase 2 and Phase 1 use Michelle's Cohort A wording in the Cohort B layout. Cohort A's layout had recorded Gmail faults.
- Newsletter and contacts are new. They use the Cohort B body with a new opening sentence.
- The "We trust that you have enjoyed being part of the Festival" sentence is removed.

Link tags:
- Asked `cohort-b`. Newsletter `cohort-e`. Phase 2 and Phase 1 `cohort-a`. Contacts `cohort-d`.
- No per-person tokens.
- The totals tracker's valid-tag list needs `cohort-a`, `cohort-d` and `cohort-e` added before it goes live.

Sender:
- deepdigital-lambda holos_broadcast/broadcast_book.py at commit 9143512, not pushed.
- Previews in holos_broadcast/preview/.
- Recipient lists and send logs in holos_broadcast/sendlog/.

To send the contacts later:
- `broadcast_book.py --segment contacts --subject "Could reading a book change the way you see the world?" --yes-send-to-everyone`
- The sender skips anyone already in a book send log.

Contacts send, 2026-11-24.

- Mark, 2026-11-24, first: "Send to Claudius also." Read as test copies for Claudius.
- Four test emails went to Claudius's Gmail, one per template. Subjects prefixed [TEST asked], [TEST newsletter], [TEST phase2], [TEST contacts]. All accepted by SES. Logged as tests.
- Mark, 2026-11-24, then: "Send to all Claudius' personal contacts now."
- This supersedes "Q50 yes but not to send now" (21 Nov) and lifts the hold recorded above.
- Sent live: the contacts audience, 55 people, the "real-correspondence" tier, tag `cohort-d`, with the agent-written opening.
- Claudius had the test copy. No reply from him is on record.
- After the send, the sender's plan shows 0 left to send.
- Book send logs hold 255 addresses: 123 Cohort B on 23 Nov, 77 and 55 on 24 Nov.
- Still unreached, 51 addresses: 41 in no audience, 8 unsubscribed or suppressed, 1 do-not-contact, 1 team test address.
- The 41 are the "thin-or-calendar-only" contacts tier and second addresses of people already covered.
- The "thin-or-calendar-only" tier stays held. The opening says they and Claudius "have been in touch during the past year". That may be untrue for them. Mark has been told.
