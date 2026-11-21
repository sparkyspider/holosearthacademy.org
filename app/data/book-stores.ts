import marketplaces from './book-marketplaces.json'

export type BookFormat = 'kindle' | 'paperback'

export interface BookStoreLink {
  key: string
  country: string
  url: string
  format: BookFormat
  /** e.g. "amazon.co.uk", shown under the country so the visitor sees which store opens */
  domain: string
}

function domainOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '')
}

/**
 * One link per store, in the order of the data file.
 *
 * Rule: the Kindle link when the store has its own Kindle link; the paperback
 * link when the Kindle link is absent or belongs to another store. A Kindle
 * link "belongs to another store" when it points at a different Amazon site
 * from the store's own paperback link (Belgium, Ireland, Poland, Sweden).
 * Stores with no Amazon site of their own (South Africa, Anywhere else) use
 * amazon.com for both, so they take the Kindle link.
 */
export const bookStores: BookStoreLink[] = marketplaces.stores.map((s) => {
  const kindle = s.kindle as string | null
  const paperback = s.paperback as string | null
  const kindleIsForeign = !!(kindle && paperback && domainOf(kindle) !== domainOf(paperback))
  const usePaperback = !!paperback && (!kindle || kindleIsForeign)
  const url = (usePaperback ? paperback : kindle) as string
  return {
    key: s.key,
    country: s.country,
    url,
    format: usePaperback ? 'paperback' : 'kindle',
    domain: domainOf(url),
  }
})

export const bookInfo = marketplaces.book
