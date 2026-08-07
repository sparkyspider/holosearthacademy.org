import type { RouterConfig } from '@nuxt/schema'

/**
 * The site sets `scroll-smooth` on <html> so that in-page anchor links (e.g.
 * "Jump to: More about the Festival") glide rather than snap.
 *
 * That is the wrong behaviour when you ARRIVE on a page at a hash — coming
 * back from /speaker/:slug to /#event-:slug, say. There the page renders at
 * the top and then animates thousands of pixels down through the whole
 * programme, which reads as the page scrolling around on its own rather than
 * as a normal page load.
 *
 * So: animate only when the hash is on the page we are already on, and land
 * instantly when it belongs to a page we are navigating to.
 */
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Browser back/forward — put them back exactly where they were.
    if (savedPosition) return savedPosition

    if (to.hash) {
      const samePage = to.path === from.path
      return {
        el: to.hash,
        // `top` leaves a gap above the target so it clears the viewport edge
        // and, on mobile, the avatar that floats above each card.
        top: 96,
        behavior: samePage ? 'smooth' : 'instant',
      }
    }

    // Going to a different page: start at the top, and get there WITHOUT
    // animating. `scroll-smooth` on <html> would otherwise glide the old page
    // all the way up before the new one paints, so following "Watch now" from
    // a card far down the programme looks like the page scrolling itself to
    // the top rather than like opening a new page.
    return { left: 0, top: 0, behavior: 'instant' }
  },
}
