/**
 * Book (What Is Looking) analytics, first cut: Google Analytics events only.
 *
 * The landing URL is captured once per page load by the inline script in
 * nuxt.config.ts (window.__holosLanding), before the router or Google
 * Analytics run: prerendered pages carry no query string, and the router
 * briefly strips it while hydrating (see app/pages/unsubscribe.vue).
 *
 * `r` (the per-recipient token on email links) is held in memory only, for a
 * later first-party click log. It is never sent to Google Analytics.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const
type UtmKey = typeof UTM_KEYS[number]

export interface BookLanding {
  utm: Partial<Record<UtmKey, string>>
  /** Per-recipient token from the email link. In memory only; never sent to Google Analytics. */
  r: string | null
}

let landing: BookLanding | null = null

function readLanding(): BookLanding {
  if (landing) return landing
  const result: BookLanding = { utm: {}, r: null }
  if (typeof window === 'undefined') return result
  try {
    const stored = (window as any).__holosLanding as { search?: string, r?: string | null } | undefined
    const params = new URLSearchParams(stored?.search ?? window.location.search)
    for (const k of UTM_KEYS) {
      const v = params.get(k)
      if (v) result.utm[k] = v.slice(0, 100)
    }
    result.r = stored?.r ?? params.get('r')
  } catch {
    // keep the empty result
  }
  landing = result
  return result
}

export function useBookAnalytics() {
  const landingInfo = readLanding()

  /** Campaign fields sent with every book event. `r` is deliberately left out. */
  function campaignParams(): Record<string, string> {
    const { utm } = readLanding()
    const fromEmail = utm.utm_medium === 'email' || utm.utm_source === 'email'
    return {
      from_email: fromEmail ? 'yes' : 'no',
      ...utm,
    }
  }

  function track(event: string, params: Record<string, string> = {}) {
    if (typeof window === 'undefined') return
    try {
      const gtag = (window as any).gtag
      if (typeof gtag !== 'function') return
      gtag('event', event, { ...campaignParams(), ...params })
    } catch {
      // analytics blocked or broken: the page carries on
    }
  }

  return { track, landing: landingInfo }
}
