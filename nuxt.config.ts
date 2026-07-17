// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { days, daysP2 } from './app/data/speakers'

// Generate a /speaker/<slug> prerender route for every talk AND every panel
// dialogue, straight from the festival data. Driving this off the data (rather
// than a hand-maintained list) guarantees no speaker page is ever missed and
// left to 404 on the static host when a new speaker is added.
const speakerRoutes: string[] = [...new Set(
  [...days, ...daysP2].flatMap(d => [
    ...d.events.map(e => `/speaker/${e.slug}`),
    ...(d.dialogueEvent?.slug ? [`/speaker/${d.dialogueEvent.slug}`] : []),
  ]),
)]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { host: '0.0.0.0' },
  ssr: true,
  runtimeConfig: {
    public: {
      siteUrl: 'https://holosearthacademy.org',
      zoomWebinarUrl: 'https://zoom.us/j/85661408197?pwd=Holos2026',
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      htmlAttrs: { lang: 'en' },
      link: [
{ rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-X5VJNP98TL',
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-X5VJNP98TL');`,
        },
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
        '/register',
        '/register-2',
        '/phase-1',
        '/phase-2',
        '/alliance',
        '/join',
        '/unsubscribe',
        ...speakerRoutes,
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
