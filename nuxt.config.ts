// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      siteUrl: '',
      registrationUrl: '',
      zoomWebinarUrl: '',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/holos-logo.svg' },
      ],
    },
  },
  modules: ['@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'Roboto Condensed', weights: [300, 400, 700] },
{ name: 'Roboto', weights: [300, 700] }
    ]
  },
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/speaker/kobus-du-pisani',
        '/speaker/jeff-blumberg',
        '/speaker/marcus-link',
        '/speaker/jude-currivan',
        '/speaker/david-lorimer',
        '/speaker/rhett-gayle',
        '/speaker/claudius-van-wyk',
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
