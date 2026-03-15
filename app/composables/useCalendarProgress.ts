import { ref } from 'vue'

const hasAddedCalendar = ref(false)

export function useCalendarProgress() {
  return {
    hasAddedCalendar,
    markCalendarAdded: () => { hasAddedCalendar.value = true },
  }
}
