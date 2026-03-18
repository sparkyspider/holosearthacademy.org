export default defineNuxtPlugin(() => {
  const hostname = window.location.hostname
  if (hostname === 'holosearthacademy.com' || hostname === 'www.holosearthacademy.com') {
    window.location.replace(`https://holosearthacademy.org${window.location.pathname}${window.location.search}`)
  }
})
