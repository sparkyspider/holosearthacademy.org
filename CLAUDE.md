# Holos Earth Academy — project notes

This is the Nuxt 4 frontend for **holosearthacademy.org**, deployed via AWS Amplify (the `deploy` branch — see project memory). Backend lives in `~/IdeaProjects/deepdigital-lambda/`.

## Where to look first

| If you're doing… | Read this skill |
|---|---|
| Anything visual / styling / hero / cards | `holos-earth-academy-design-system` |
| Anything touching the registration form, Lambda, RDS schema, or v1/v2 contract | `holos-earth-academy-backend` |
| Any broadcast email — urgent "starting now" OR calmer "next week's session" reminders with calendar invite | `holos-broadcast-lambda` |
| AWS CLI (Route 53, SES, Lambda, S3) | `deepdigital-aws-access` |

## Email infrastructure (current state — 2026-05-22)

| Direction | Provider | Notes |
|---|---|---|
| **Outbound** | AWS SES (eu-west-1) | Domain verified. SPF `include:amazonses.com -all`, DKIM `_amazonses` TXT, DMARC `p=none rua=mark@flyh2.com`. `formToDb` Lambda and any throwaway broadcaster sends via SES. |
| **Inbound** | ImprovMX (free tier) | MX → `mx1.improvmx.com` / `mx2.improvmx.com`. Aliases: `claudius@` and `info@` → `claudiusvanwyk@gmail.com`. **SPF deliberately not changed** — ImprovMX uses SRS so the inbound path doesn't need our SPF to list them. |

Inbound was previously a black hole — sending mail used `From: info@holosearthacademy.org` / `Reply-To: claudius@holosearthacademy.org`, but no MX record existed, so any reply bounced. Fixed on 2026-05-22.

## Working model (Mark, 2026-08-31)

Always use a subagent for the work; keep the main thread clear. On Fable, orchestrate from the main thread and hand the work to cheaper models. Use Sonnet for storytelling, narrative, and copywriting.

## Writing style (Mark, 2026-08-31 — applies to all copy written for this project, emails especially)

- **No em dashes** unless one really makes sense. Use a comma, colon, semicolon, or a new sentence instead.
- **No "not only … but"**, no "didn't just", no negative-first comparisons. State the positive framing directly (e.g. "shaped as much by the future as by the past", never "shaped not only by the past, but by the future").

## Broadcast email patterns

Two distinct styles — pick by how time-sensitive the broadcast is. Full recipe for both in the `holos-broadcast-lambda` skill.

**1. Urgent "talk starts in X minutes" broadcast.** Disposable code re-deployed onto the permanent `holosFestivalBroadcast` Lambda. Plain-text body, single CTA, indented bare Zoom URL. Phase-aware recipient filter:

```sql
SELECT DISTINCT ON (lower(email)) name, email
FROM holos_registrations
WHERE email IS NOT NULL AND email <> ''
  AND (phase = 'P1' OR phase IS NULL)   -- swap for 'P2' on Phase 2 nights
ORDER BY lower(email), created_at
```

Legacy v1 contact-form rows have `phase IS NULL` and are treated as Phase 1 (Phase 1 was the only phase before v2 register shipped).

**2. Calmer "next week's session" reminder with a calendar invite.** Per Mark's standing preference (see `[[feedback-broadcast-styling]]`), default to this for anything that isn't time-of-broadcast urgent — even single-CTA sends. Local Python script via `boto3`+SES, Georgia 17px serif body, `multipart/alternative` HTML + plain text, plus a `text/calendar; method=REQUEST` `.ics` attachment with the recipient personalised as ATTENDEE so Gmail surfaces the "Add to calendar" prompt above the email. Reusable script lives at `/tmp/holosQuery/broadcast_three_lists.py`; SQL supports up to three priority-ordered mutually-exclusive lists (e.g. "asked-for-speaker" → "registered-for-phase" → "expressed-interest").
