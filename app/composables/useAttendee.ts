import { computed, onMounted, ref } from 'vue'

/**
 * Persistent identity for the current visitor.
 *
 * Stored in localStorage (NOT cookies) so the site doesn't need a cookie
 * consent banner. The shape is set by the v2 Lambda's register response:
 *   { id, name, email }
 *
 * On returning visits we read this to pre-fill the registration form and
 * to identify the user when they click "Add to Calendar".
 */

export type Phase = 'P1' | 'P2'

export type Attendee = {
  id: string
  name: string
  email: string
  /** Phases the visitor has registered for. Empty = no registration yet. */
  phases: Phase[]
  /** Whether this visitor has joined the Holos Earth Alliance. */
  isAllianceMember?: boolean
}

const STORAGE_KEY = 'holos_attendee'

// Module-singleton so every component sees the same value.
const attendee = ref<Attendee | null>(null)
let hydrated = false

function normalisePhases(value: unknown): Phase[] {
  if (!Array.isArray(value)) return []
  const out: Phase[] = []
  for (const v of value) {
    if (v === 'P1' || v === 'P2') out.push(v)
  }
  return out
}

function readFromStorage(): Attendee | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.id && parsed.email) {
      return {
        id: String(parsed.id),
        name: String(parsed.name || ''),
        email: String(parsed.email),
        phases: normalisePhases(parsed.phases),
        isAllianceMember: Boolean(parsed.isAllianceMember),
      }
    }
  } catch {
    /* malformed — treat as no attendee */
  }
  return null
}

function writeToStorage(value: Attendee | null) {
  if (typeof window === 'undefined') return
  if (value) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  else window.localStorage.removeItem(STORAGE_KEY)
}

export function useAttendee() {
  // Hydrate once on first client-side mount. SSR returns null.
  onMounted(() => {
    if (hydrated) return
    hydrated = true
    attendee.value = readFromStorage()
  })

  function setAttendee(value: Attendee) {
    attendee.value = value
    writeToStorage(value)
  }

  function clearAttendee() {
    attendee.value = null
    writeToStorage(null)
  }

  /**
   * Mark the current attendee as registered for `phase`. If no attendee
   * exists or the phase is already recorded, this is a no-op.
   */
  function recordPhaseRegistration(phase: Phase) {
    const current = attendee.value
    if (!current) return
    if (current.phases.includes(phase)) return
    const next: Attendee = { ...current, phases: [...current.phases, phase] }
    attendee.value = next
    writeToStorage(next)
  }

  /** Has this visitor registered for the given phase? Reactive. */
  function hasRegisteredFor(phase: Phase) {
    return computed(() => attendee.value?.phases.includes(phase) ?? false)
  }

  function markAllianceMember() {
    const current = attendee.value
    if (!current || current.isAllianceMember) return
    const next: Attendee = { ...current, isAllianceMember: true }
    attendee.value = next
    writeToStorage(next)
  }

  return {
    attendee: computed(() => attendee.value),
    isKnown: computed(() => attendee.value !== null),
    setAttendee,
    clearAttendee,
    recordPhaseRegistration,
    hasRegisteredFor,
    markAllianceMember,
  }
}
