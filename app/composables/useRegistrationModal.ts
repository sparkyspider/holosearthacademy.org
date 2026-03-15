import { ref } from 'vue'

const isRegistered = ref(false)

export function useRegistrationModal() {
  const isOpen = useState('registrationModalOpen', () => false)
  return {
    isOpen,
    isRegistered,
    openModal: () => { isOpen.value = true },
    closeModal: () => { isOpen.value = false },
    markRegistered: () => { isRegistered.value = true },
  }
}
