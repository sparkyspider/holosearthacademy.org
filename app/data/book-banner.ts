/**
 * The announcement banner's wording, as one constant (working text, awaiting
 * approval). Parts are separated by " · ". The banner styles them in order:
 *   1st  the title, Cinzel spaced capitals
 *   2nd  the subtitle, Playfair Display italic in gold
 *   rest Libre Baskerville
 * On phones the first two parts sit on one line and the rest on a second line.
 */
export const BOOK_BANNER_TEXT = 'What Is Looking · Remembrance · Claudius van Wyk · Available in Paperback or Kindle'

export const BOOK_BANNER_PARTS: string[] = BOOK_BANNER_TEXT.split(' · ').map(s => s.trim()).filter(Boolean)
