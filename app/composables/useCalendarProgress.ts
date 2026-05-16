import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'holos_calendar_added'

const hasAddedCalendar = ref(false)
let hydrated = false

export function useCalendarProgress() {
  onMounted(() => {
    if (hydrated) return
    hydrated = true
    if (typeof window !== 'undefined') {
      hasAddedCalendar.value = window.localStorage.getItem(STORAGE_KEY) === 'true'
    }
  })

  return {
    hasAddedCalendar,
    markCalendarAdded: () => {
      hasAddedCalendar.value = true
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, 'true')
      }
    },
  }
}
