import { ref } from 'vue'

const isJoined = ref(false)

export function useAllianceModal() {
  const isOpen = useState('allianceModalOpen', () => false)
  return {
    isOpen,
    isJoined,
    openModal: () => { isOpen.value = true },
    closeModal: () => { isOpen.value = false },
    markJoined: () => { isJoined.value = true },
  }
}
