export function useAnalytics() {
  function track(event: string, params?: Record<string, unknown>) {
    if (typeof window === 'undefined' || !(window as any).gtag) return
    ;(window as any).gtag('event', event, params)
  }
  return { track }
}
