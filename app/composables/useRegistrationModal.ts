import { ref } from 'vue'

const isRegistered = ref(false)

/**
 * Optional callback to run after the user registers successfully.
 * Used by "Add to Calendar" to defer the calendar action until after
 * the user has registered (when they had no attendee in localStorage).
 */
const pendingAfterRegister = ref<(() => void) | null>(null)

export function useRegistrationModal() {
  const isOpen = useState('registrationModalOpen', () => false)
  return {
    isOpen,
    isRegistered,
    openModal: () => { isOpen.value = true },
    closeModal: () => { isOpen.value = false },
    markRegistered: () => {
      isRegistered.value = true
      if (pendingAfterRegister.value) {
        const cb = pendingAfterRegister.value
        pendingAfterRegister.value = null
        // Small delay so the user sees the "Registered!" state briefly
        // before the calendar opens.
        setTimeout(cb, 600)
      }
    },
    setPendingAfterRegister: (cb: () => void) => { pendingAfterRegister.value = cb },
    clearPendingAfterRegister: () => { pendingAfterRegister.value = null },
  }
}
