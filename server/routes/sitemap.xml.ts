import { SITE_URL, publicPaths, speakerPathsSlash } from '../../app/data/seo'

// Built from the festival data at prerender time; lastmod is the build date.
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = [...publicPaths, ...speakerPathsSlash]
  const body = urls
    .map(p => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
})
