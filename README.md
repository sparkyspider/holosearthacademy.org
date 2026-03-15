# Holos Earth Academy — Project Documentation

Website for **holosearthacademy.org**. Static site built with Nuxt 4 and Tailwind CSS 4, hosted on AWS Amplify.

---

## Tech Stack

- **Nuxt 4** (`^4.3.0`) — Vue meta-framework, SSG mode
- **Tailwind CSS 4** (`^4.1.18`) — via `@tailwindcss/vite` Vite plugin (not PostCSS)
- **Vue 3** (`^3.5.27`) / **TypeScript**
- **AWS Amplify** — static site hosting
- **AWS Lambda** (`formToDb`) — form processing backend
- **AWS RDS PostgreSQL** — registration data storage
- **AWS SES** — email notifications on registration

---

## Important: Client-Only Rendering

This is a **fully client-side app** (`ssr: false` in `nuxt.config.ts`). There is no server-side rendering.

- Vue components are **never executed server-side** — not during dev, not during build, not during prerender
- Prerendering (`npm run generate`) produces a static HTML shell with no component hydration on the server — the browser runs everything
- **Never set `ssr: true`** — doing so causes Vue components to execute in Node during prerender, where browser APIs (`window`, `document`, etc.) are unavailable and will throw 500 errors
- All browser API access (e.g. `window.gtag`, `document`) is safe to use directly in components without guards

---

## 1. How We Deploy

The site is a fully static Nuxt SSG build. Deployment is triggered automatically by pushing to the **`deploy`** branch on GitHub.

**Repository:** `git@github.com:sparkyspider/holosearthacademy.org.git`

**Amplify App ID:** `dfzxnlzjqomzc`  
**Amplify Region:** `eu-west-1`  
**Watched Branch:** `deploy` (not `main`)

### Deployment workflow

```bash
# 1. Commit changes to main as normal
git add .
git commit -m "Your message"
git push origin main

# 2. Push main → deploy to trigger Amplify build
git push origin main:deploy
```

Amplify runs `npm ci` then `npm run generate`, which produces a fully static site in `.output/public`. Build typically takes 2–3 minutes.

### Build spec (`amplify.yml`)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run generate
  artifacts:
    baseDirectory: .output/public
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### SPA routing

Amplify must have a custom redirect rule to support client-side routing:
```
Source:      </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target:      /index.html
Type:        200 (Rewrite)
```

---

## 2. AWS Access — Account & IAM

**AWS Account:** `680918384243`  
**Region:** `eu-west-1`  
**IAM User for CLI/agents:** `admin-user`

### AWS CLI profile

The project uses a named profile `holosearth` configured in `~/.aws/credentials` and `~/.aws/config`:

```ini
# ~/.aws/credentials
[holosearth]
aws_access_key_id = AKIAZ5CPF7ZZSYAXH4L5
aws_secret_access_key = <secret>

# ~/.aws/config
[profile holosearth]
region = eu-west-1
output = json
```

All AWS CLI commands for this project use `--profile holosearth`. Example:

```bash
aws --profile holosearth lambda list-functions --region eu-west-1
```

> **Note:** The default AWS CLI profile on this machine points to a different account (`746669193815`). Always specify `--profile holosearth` explicitly.

---

## 3. Registration Form & Anti-Spam

### Frontend form (`app/components/RegistrationModal.vue`)

The registration modal collects:
- **Name** (required)
- **Email** (required)
- **Follow-on Seminal Space** (optional checkbox)
- **Holistic Systems Practice Course** (optional checkbox)
- **Holism & Ethics Book by Claudius** (optional checkbox)

Validation is client-side: name and email are required before the form can be submitted.

The modal is triggered from two places:
- `RegistrationCta.vue` — Step 1 "Register" button
- `ProgrammeCard.vue` — "registered" inline link

The modal is also accessible at `/register` as a pre-rendered deep-link URL (mirrors the speaker modal pattern with `history.replaceState`).

### Anti-spam: the Happiness Token

The form uses a **proprietary time-based anti-spam token** shared across all sites on this Lambda (Deep Digital, FlyH2, Holos).

**Implementation** (`app/composables/secret.ts`):

```ts
export function generateHappiness(): string {
  const base = 1234
  const buildCode = (date: Date): number => {
    return base + date.getUTCFullYear() + (date.getUTCMonth() + 1)
         + date.getUTCDate() + date.getUTCHours() + date.getUTCMinutes()
  }
  const now = new Date()
  const oneMinuteLater = new Date(now.getTime() + 60000)
  return buildCode(now) + '|' + buildCode(oneMinuteLater)
}
```

The token is a pipe-separated string of two codes: one for the **current UTC minute** and one for **one minute later**. This gives a valid submission window of up to ~2 minutes.

The Lambda validates by computing the same formula server-side and checking both orderings (`code1|code2` or `code2|code1`). Any request with a non-matching token is rejected with HTTP 403.

---

## 4. Where the Form Posts & Payload Schema

**Lambda URL:**
```
https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/
```

**Method:** `POST`  
**Content-Type:** `application/json`

### Holos Academy payload

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "seminal_space": true,
  "practice_course": false,
  "holism_book": true,
  "source": "holosearthacademy.org",
  "happiness": "3308|3309"
}
```

### Database table: `holos_registrations`

| Column | Type | Notes |
|---|---|---|
| `id` | `UUID` | Primary key, generated by Lambda |
| `name` | `TEXT` | Registrant's name |
| `email` | `TEXT` | Registrant's email |
| `seminal_space` | `BOOLEAN` | Default `false` |
| `practice_course` | `BOOLEAN` | Default `false` |
| `holism_book` | `BOOLEAN` | Default `false` |
| `created_at` | `TIMESTAMP` | Default `CURRENT_TIMESTAMP` |

---

## 5. Lambda Function

**Function name:** `formToDb`  
**Runtime:** Python 3.x  
**Region:** `eu-west-1`  
**Source file:** `form_to_database.py`

The Lambda is a single-file Python handler shared by three websites: Deep Digital, FlyH2, and Holos Earth Academy.

### Processing flow

1. Parse JSON body from the HTTP event
2. **Validate the happiness token** — reject with 403 if invalid
3. Connect to RDS PostgreSQL via `psycopg2` using environment variables
4. **Route by `source` field:**
   - `flyh2.com` → `flyh2_form_submissions`, notify `info@flyh2.com`
   - `holosearthacademy.org` → `holos_registrations`, notify 3 recipients (see SES section)
   - *(default / empty)* → `deepdigital_form_submissions`, notify `hello@deepdigital.co.za`
5. `CREATE TABLE IF NOT EXISTS` for the target table (idempotent guard)
6. `INSERT` the record
7. Send SES notification email
8. Return HTTP 200

### Lambda environment variables

| Variable | Value |
|---|---|
| `DB_HOST` | `deepdigitalwebsite.cn82y2c2ayqs.eu-west-1.rds.amazonaws.com` |
| `DB_NAME` | `postgres` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | *(set in Lambda console — not stored here)* |

### Updating and deploying the Lambda

```bash
# Edit the source locally
nano /path/to/form_to_database.py

# Zip and deploy
zip formToDb_updated.zip form_to_database.py
aws --profile holosearth lambda update-function-code \
  --function-name formToDb \
  --region eu-west-1 \
  --zip-file fileb://formToDb_updated.zip
```

---

## 6. SES Configuration

**Region:** `eu-west-1`

### Verified identities

| Identity | Type | Used for |
|---|---|---|
| `holosearthacademy.org` | Domain | Holos registration notifications |
| `deepdigital.co.za` | Domain | Deep Digital contact form |
| `hello@deepdigital.co.za` | Email | Deep Digital sender |
| `info@flyh2.com` | Email | FlyH2 sender |
| `mark@flyh2.com` | Email | FlyH2 sender (alternate) |

### Holos notification email

- **From:** `Holos Earth Academy <info@holosearthacademy.org>`
- **To:** `mark@flyh2.com`, `claudiusvanwyk@gmail.com`, `michellelevieux2017@gmail.com`
- **Reply-To:** Registrant's email address
- **Subject:** `New Festival Registration`
- **Body:** Name, email, and selected upcoming event interests

### DNS records (Route 53 — hosted zone `Z0299662Q9HO2KQLKG43`)

The following records were added to `holosearthacademy.org` for SES domain verification and DKIM signing:

| Type | Name | Value |
|---|---|---|
| `TXT` | `_amazonses.holosearthacademy.org` | `5RQcJi7WXng0xkCVP6fidcdRXlnmRxh3KRA7indeFuE=` |
| `CNAME` | `4n55fqfyhfoozyslhomvmx56rb6gwfao._domainkey.holosearthacademy.org` | `4n55fqfyhfoozyslhomvmx56rb6gwfao.dkim.amazonses.com` |
| `CNAME` | `nbu4xck72v2btgzaoacealz4pywoucby._domainkey.holosearthacademy.org` | `nbu4xck72v2btgzaoacealz4pywoucby.dkim.amazonses.com` |
| `CNAME` | `yg56dabi6c4mtnakwm3wgyw264r6scfl._domainkey.holosearthacademy.org` | `yg56dabi6c4mtnakwm3wgyw264r6scfl.dkim.amazonses.com` |

> **Note:** `holosearthacademy.org` has no MX records — no email mailboxes are configured. SES only requires domain ownership verification (TXT) and DKIM (CNAME) for *sending*. MX records are only needed for receiving email.

---

## 7. Database Configuration

**Engine:** PostgreSQL  
**Host:** `deepdigitalwebsite.cn82y2c2ayqs.eu-west-1.rds.amazonaws.com`  
**Port:** `5432`  
**Database:** `postgres`  
**Owner/User:** `postgres`  
**SSL:** required (`sslmode=require`)  
**Provider:** AWS RDS (eu-west-1) — low-cost shared instance also used by Deep Digital and FlyH2

### Tables

#### `holos_registrations` (Holos Earth Academy)
Stores festival registrations with optional upcoming-event interest flags.

#### `flyh2_form_submissions` (FlyH2)
Stores contact form submissions from flyh2.com.

#### `deepdigital_form_submissions` (Deep Digital)
Stores contact form submissions from deepdigital.co.za.

All three contact-form tables (`flyh2_form_submissions`, `deepdigital_form_submissions`) share the schema:
`id uuid PK, name, email, mobile, subject, message, created_at`

### Connecting manually

```bash
PGPASSWORD='<password>' psql \
  -h deepdigitalwebsite.cn82y2c2ayqs.eu-west-1.rds.amazonaws.com \
  -U postgres \
  -d postgres
```

> The RDS instance must have its security group allowing inbound connections on port 5432 from your IP or the Lambda's VPC/security group.
