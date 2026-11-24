// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { speakerRoutes } from './app/data/seo'

// Speaker prerender routes come from the festival data (app/data/seo.ts), so no
// talk page is ever missed and left to 404 on the static host.

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
          // The landing URL is read here, before Google Analytics or the router
          // see it. The query string is kept on window.__holosLanding. Any
          // old per-recipient `r` parameter is taken off the address and not
          // kept, so it is never sent to Google Analytics. Prerendered pages
          // have no query string, so this is the one reliable place to read it.
          innerHTML: `(function(){try{var s=window.location.search;var p=new URLSearchParams(s);window.__holosLanding={search:s};if(p.has('r')){p.delete('r');var q=p.toString();window.history.replaceState(window.history.state,'',window.location.pathname+(q?'?'+q:'')+window.location.hash);}}catch(e){}})();
  window.dataLayer = window.dataLayer || [];
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
{ name: 'Roboto', weights: [300, 700] },
      // Book accent fonts (What Is Looking), self-hosted like the rest
      { name: 'Cinzel', weights: [400, 500, 600] },
      { name: 'Playfair Display', weights: [700], styles: ['normal', 'italic'] },
      { name: 'Libre Baskerville', weights: [400, 700], styles: ['normal', 'italic'] },
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
        '/book',
        '/book/region',
        '/sitemap.xml',
        '/llms.txt',
        ...speakerRoutes,
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
