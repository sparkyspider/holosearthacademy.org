/**
 * First-party click log for the book email.
 *
 * When the visitor arrived from an email link carrying a per-recipient token
 * (`r`, captured by the inline script in nuxt.config.ts and held on
 * window.__holosLanding), two kinds of event go to our own backend (the
 * formToDb Lambda, action `email_click`):
 *
 *   - `landing`      once per page load, on arrival at the book page
 *   - `store_click`  each time an Amazon store link is clicked
 *
 * Rules:
 *   - No `r`, nothing is sent.
 *   - `r` stays in memory only: no cookie, no localStorage, no sessionStorage.
 *   - This is separate from Google Analytics; `r` and the locale fields never
 *     go there (see useBookAnalytics.ts).
 *   - Sending never delays or blocks the visitor, and every failure is silent.
 *
 * The body is sent as a plain string, so the browser posts it as text/plain
 * with no CORS preflight. navigator.sendBeacon always sends credentialed
 * requests, and a preflight for those fails against the Lambda URL's
 * `Access-Control-Allow-Origin: *`. The Lambda parses the body as JSON
 * whatever its content type.
 */

import type { BookStoreLink } from '~/data/book-stores'

const ENDPOINT = 'https://576l7bs7a37yqrkc55h35jx4hu0wlftm.lambda-url.eu-west-1.on.aws/'
const MAX_TOKEN_LENGTH = 64

type EventType = 'landing' | 'store_click'

let landingSent = false

/** Browser locale. There is no country setting as such; this is the closest. */
function browserLocale(): Record<string, string | null> {
  const out: Record<string, string | null> = {
    language: null,
    locale_country: null,
    languages: null,
    time_zone: null,
  }
  try {
    const language = typeof navigator.language === 'string' ? navigator.language : ''
    if (language) {
      out.language = language.slice(0, 35)
      // "de-DE" -> "DE", "zh-Hans-CN" -> "CN", "en" or "es-419" -> null
      const region = language.split('-').slice(1).find(part => /^[A-Za-z]{2}$/.test(part))
      out.locale_country = region ? region.toUpperCase() : null
    }
    if (Array.isArray(navigator.languages) && navigator.languages.length) {
      out.languages = navigator.languages.join(',').slice(0, 200)
    }
  } catch {
    // keep what we have
  }
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timeZone) out.time_zone = timeZone.slice(0, 64)
  } catch {
    // no time zone available
  }
  return out
}

function post(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload)
    if (typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(ENDPOINT, body)) return
    fetch(ENDPOINT, {
      method: 'POST',
      body,
      keepalive: true,
      credentials: 'omit',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).catch(() => {})
  } catch {
    // blocked or offline: the visitor carries on
  }
}

export function useBookClickLog() {
  const { landing } = useBookAnalytics()

  function send(eventType: EventType, extra: Record<string, string> = {}) {
    if (typeof window === 'undefined') return
    const token = (landing.r ?? '').trim()
    if (!token) return
    try {
      post({
        action: 'email_click',
        event_type: eventType,
        token: token.slice(0, MAX_TOKEN_LENGTH),
        page_path: window.location.pathname.slice(0, 200),
        ...landing.utm,
        ...browserLocale(),
        ...extra,
      })
    } catch {
      // never surfaces to the visitor
    }
  }

  /** One `landing` event per page load, however often the page mounts. */
  function logLanding() {
    if (landingSent) return
    landingSent = true
    send('landing')
  }

  function logStoreClick(store: BookStoreLink) {
    send('store_click', {
      store: store.key,
      edition: store.format,
      destination_url: store.url,
    })
  }

  return { logLanding, logStoreClick }
}
