export function useRegistrationModal() {
  const isOpen = useState('registrationModalOpen', () => false)
  return {
    isOpen,
    openModal: () => { isOpen.value = true },
    closeModal: () => { isOpen.value = false },
  }
}
