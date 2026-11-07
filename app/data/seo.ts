import { days, daysP2 } from './speakers'
import type { SpeakerEvent } from './speakers'

export const SITE_URL = 'https://holosearthacademy.org'

/** Public pages Amplify serves with a trailing slash (home is the bare origin + "/"). */
export const publicPaths = ['/', '/join/', '/register/', '/register-2/', '/phase-1/', '/alliance/']

/** Every talk and panel dialogue slug, straight from the festival data. */
export const speakerSlugs: string[] = [...new Set(
  [...days, ...daysP2].flatMap(d => [
    ...d.events.map(e => e.slug),
    ...(d.dialogueEvent?.slug ? [d.dialogueEvent.slug] : []),
  ]),
)]

/** Speaker page paths without a trailing slash (prerender routes). */
export const speakerRoutes: string[] = speakerSlugs.map(s => `/speaker/${s}`)

/** Speaker page paths in the canonical trailing-slash form. */
export const speakerPathsSlash: string[] = speakerSlugs.map(s => `/speaker/${s}/`)

/** Cut at a word boundary within `max` characters, adding an ellipsis when cut. */
export function truncateAtWord(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[,;:.\s]+$/, '')}…`
}

/** Europe/Berlin UTC offset ("+01:00" / "+02:00") on a given ISO date at a given hour. */
export function berlinOffset(date: string, hour: number, minute: number): string {
  const [y, m, d] = date.split('-').map(Number)
  const guess = new Date(Date.UTC(y, m - 1, d, hour, minute))
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Berlin', timeZoneName: 'shortOffset',
  }).formatToParts(guess)
  const name = parts.find(p => p.type === 'timeZoneName')?.value ?? 'GMT+1'
  const n = parseInt(name.replace('GMT', '') || '0', 10)
  return `${n < 0 ? '-' : '+'}${String(Math.abs(n)).padStart(2, '0')}:00`
}

/** ISO start like 2026-11-11T19:00:00+01:00, from a day date and a time such as '19h00 CET'. */
export function eventStartIso(date: string, time: string): string | null {
  const match = time.match(/(\d{1,2})h(\d{2})/)
  if (!match) return null
  const h = parseInt(match[1], 10)
  const mi = parseInt(match[2], 10)
  return `${date}T${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}:00${berlinOffset(date, h, mi)}`
}

export function eventEndIso(date: string, time: string, minutes = 90): string | null {
  const match = time.match(/(\d{1,2})h(\d{2})/)
  if (!match) return null
  const total = parseInt(match[1], 10) * 60 + parseInt(match[2], 10) + minutes
  const h = Math.floor(total / 60) % 24
  const mi = total % 60
  return `${date}T${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}:00${berlinOffset(date, h, mi)}`
}

/** Meta description for a speaker page. */
export function speakerDescription(event: SpeakerEvent | undefined, dayLabel?: string): string {
  const year = days[0]?.date.slice(0, 4) ?? ''
  if (!event) return `Speaker at the Centenary Festival of Holism & Evolution, ${year}.`
  if (event.recording) {
    return `Watch ${event.speaker}'s talk "${event.title}" and read the full transcript. Recorded ${dayLabel} at the Centenary Festival of Holism & Evolution.`
  }
  return `${truncateAtWord(event.description, 155)} Live online ${dayLabel}, ${event.time}.`
}
