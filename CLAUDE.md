# Holos Earth Academy — project notes

This is the Nuxt 4 frontend for **holosearthacademy.org**, deployed via AWS Amplify (the `deploy` branch — see project memory). Backend lives in `~/IdeaProjects/deepdigital-lambda/`.

## Where to look first

| If you're doing… | Read this skill |
|---|---|
| Anything visual / styling / hero / cards | `holos-earth-academy-design-system` |
| Anything touching the registration form, Lambda, RDS schema, or v1/v2 contract | `holos-earth-academy-backend` |
| A one-off "the talk is starting now" broadcast email | `holos-broadcast-lambda` |
| AWS CLI (Route 53, SES, Lambda, S3) | `deepdigital-aws-access` |

## Email infrastructure (current state — 2026-05-22)

| Direction | Provider | Notes |
|---|---|---|
| **Outbound** | AWS SES (eu-west-1) | Domain verified. SPF `include:amazonses.com -all`, DKIM `_amazonses` TXT, DMARC `p=none rua=mark@flyh2.com`. `formToDb` Lambda and any throwaway broadcaster sends via SES. |
| **Inbound** | ImprovMX (free tier) | MX → `mx1.improvmx.com` / `mx2.improvmx.com`. Aliases: `claudius@` and `info@` → `claudiusvanwyk@gmail.com`. **SPF deliberately not changed** — ImprovMX uses SRS so the inbound path doesn't need our SPF to list them. |

Inbound was previously a black hole — sending mail used `From: info@holosearthacademy.org` / `Reply-To: claudius@holosearthacademy.org`, but no MX record existed, so any reply bounced. Fixed on 2026-05-22.

## Phase event broadcast pattern

The "talk is starting in a few minutes" reminder email is sent via a disposable Lambda named `holosFestivalBroadcast`. Stand it up, dry-run, smoke to Mark, broadcast, tear down. The full recipe — including the P1/P2 SQL filter, the email body shape Claudius uses, the Zoom URL, and the psycopg2-layer architecture footgun — lives in the `holos-broadcast-lambda` skill.

The phase-aware recipient filter is:

```sql
SELECT DISTINCT ON (lower(email)) name, email
FROM holos_registrations
WHERE email IS NOT NULL AND email <> ''
  AND (phase = 'P1' OR phase IS NULL)   -- swap for 'P2' on Phase 2 nights
ORDER BY lower(email), created_at
```

Legacy v1 contact-form rows have `phase IS NULL` and are treated as Phase 1 (Phase 1 was the only phase before v2 register shipped).
