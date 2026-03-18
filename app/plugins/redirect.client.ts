export default defineNuxtPlugin(() => {
  const hostname = window.location.hostname
  if (['holosearthacademy.com', 'www.holosearthacademy.com', 'holos.earth', 'www.holos.earth'].includes(hostname)) {
    window.location.replace(`https://holosearthacademy.org${window.location.pathname}${window.location.search}`)
  }
})
