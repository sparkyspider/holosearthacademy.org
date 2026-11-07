import { useState, computed } from '#imports'
import { onMounted } from 'vue'

/**
 * "Today" in Europe/Berlin (festival time zone), decided in the visitor's
 * browser so a talk switches to "Session concluded" without a deploy.
 *
 * todayISO is null on the server and during the first client paint, so the
 * prerendered markup and hydration match. It is set in onMounted. While it is
 * null, isPast() is false and `ready` is false so callers can render a neutral state.
 */
export function useFestivalToday() {
  const todayISO = useState<string | null>('festival-today', () => null)
  onMounted(() => {
    todayISO.value = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/Berlin' })
  })
  const ready = computed(() => todayISO.value !== null)
  function isPast(date?: string) {
    return !!date && todayISO.value !== null && date < todayISO.value
  }
  return { todayISO, ready, isPast, formatDayMonth }
}

export function formatDayMonth(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' })
}
