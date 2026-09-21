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
- 2026-09-21: Llewellyn van Wyk reminder ("This Wednesday: Llewellyn van Wyk, Holism and Architecture, 20h00 CEST") sent live to 163 recipients, 0 failures: 18 signed up for Llewellyn, 66 Phase 2 registrants not signed up, 79 Phase 1/legacy with Phase 2 interest, 0 newsletter-only. Log: session scratchpad llewellyn-live-2026-09-21.log.
- 2026-09-21: broadcast_reminder.py (deepdigital-lambda/holos_broadcast) now supports four priority-ordered audiences A/B/C/D with per-audience copy sections and `--as A|B|C|D` for single-address smoke; single-list copy files (jeremy-lent.md) still work. COPY_DIR now resolves to holos_broadcast/copy/ next to the script; the 10 September copy was recovered from that session's transcript after the scratchpad was lost.
- 2026-09-21: Owed: deepdigital-lambda repo has no commits; holos_broadcast/ (script, README, copy/) is untracked and should be committed. Also the "Register for Phase Two" button links to /register-2.
- 2026-09-21: Fact: every newsletter signup row carries phase_2 = TRUE, so newsletter-only people always land in the "ticked interest" audience; the D list will be empty unless that changes.
- 2026-09-10: Llewellyn +1h, Jeremy Lent to Fri 16 Oct 18h00 (per Claudius). Site deployed
  (a08468c), stable calendar UID (b3f22f7), counts tabulated (81/80), smoke to Mark, live send
  both talks, 0 failures. Sender rebuilt into deepdigital-lambda/holos_broadcast. Password
  literal caught and removed before commit. Internet outage ~20 min mid-session; all external
  results re-verified afterwards.
