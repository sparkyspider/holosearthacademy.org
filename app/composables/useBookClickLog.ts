/**
 * First-party totals for the book page.
 *
 * Two kinds of event go to our own small backend, action `email_click`:
 *
 *   - `landing`      once per page load, on arrival at the book page
 *   - `store_click`  each time an Amazon store link is clicked
 *
 * Totals only. Nothing identifies a visitor:
 *   - No token, locale, language, time zone or destination address is sent.
 *   - Nothing is written to cookies, localStorage or sessionStorage.
 *   - The campaign values (utm_*) are passed to the backend exactly as they
 *     arrive on the address. The backend decides whether a campaign tag is
 *     valid; this file holds no list of tags and does no checking.
 *   - Separate from Google Analytics (see useBookAnalytics.ts).
 *   - Sending never delays or blocks the visitor, and every failure is silent.
 *
 * The body is a plain string, so the browser posts it as text/plain with no
 * CORS preflight. The backend parses it as JSON whatever its content type.
 */

import type { BookStoreLink } from '~/data/book-stores'

/**
 * ENDPOINT NOT SET YET. Put the Function URL of the totals Lambda here once it
 * exists. While this is empty the composable does nothing at all.
 */
const ENDPOINT = ''

type EventType = 'landing' | 'store_click'

let landingSent = false

function post(payload: Record<string, unknown>) {
  if (!ENDPOINT) return
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
    if (typeof window === 'undefined' || !ENDPOINT) return
    try {
      post({
        action: 'email_click',
        event_type: eventType,
        page_path: window.location.pathname.slice(0, 200),
        ...landing.utm,
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
      store_key: store.key,
      edition: store.format,
    })
  }

  return { logLanding, logStoreClick }
}
