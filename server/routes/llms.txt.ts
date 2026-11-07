import { days, daysP2 } from '../../app/data/speakers'
import { SITE_URL } from '../../app/data/seo'

// llmstxt.org format, generated from the festival data at prerender time.
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  const talk = (d: typeof days[number], e: typeof days[number]['events'][number]) =>
    `- [${e.speaker}: ${e.title}](${SITE_URL}/speaker/${e.slug}/)${e.recording ? ': recording and transcript' : `: ${d.label}, ${e.time}`}`
  const dialogues = [...days, ...daysP2]
    .filter(d => d.dialogueEvent?.slug)
    .map(d => `- [The Phase One Presenters: ${d.dialogueEvent!.title}](${SITE_URL}/speaker/${d.dialogueEvent!.slug}/): recording and transcript`)
  return [
    '# Holos Earth Academy',
    '',
    '> Holos Earth Academy hosts the Centenary Festival of Holism & Evolution, a living continuation of the inquiry initiated by Jan Smuts. Phase One (talks on the origins and meaning of holism) has concluded and can be watched on demand with transcripts. Phase Two: Liminal Space runs 10 June to 23 December 2026, a time for reflection, integration, and deepening the inquiry.',
    '',
    '## Key pages',
    '',
    `- [Home (Phase Two: Liminal Space)](${SITE_URL}/)`,
    `- [Phase One: watch the talks](${SITE_URL}/phase-1/)`,
    `- [Phase Two: register](${SITE_URL}/register-2/)`,
    `- [Holos Earth Alliance: become a member](${SITE_URL}/alliance/)`,
    '',
    '## Phase One talks',
    '',
    ...days.flatMap(d => d.events.map(e => talk(d, e))),
    ...dialogues,
    '',
    '## Phase Two talks',
    '',
    ...daysP2.flatMap(d => d.events.map(e => talk(d, e))),
    '',
  ].join('\n')
})
