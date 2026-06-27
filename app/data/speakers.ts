/**
 * A published recording for a concluded talk. When present on a Phase 1 event,
 * the programme card links through to the speaker page (/speaker/:slug) instead
 * of offering "Add to Calendar" / "Email me the details".
 */
export interface SpeakerRecording {
  /** YouTube video ID for the talk recording (the bit after `watch?v=`) */
  youtubeId: string
  /** Public path to the downloadable transcript PDF, under /public */
  pdfUrl: string
  /**
   * Whether a readable transcript markdown file exists at
   * app/data/transcripts/<slug>.md. The speaker page renders it inline.
   */
  hasTranscript?: boolean
}

/**
 * A single annotated slide from a talk where no clean video recording is
 * available. The narrative is the *idea* of the slide expressed in the site's
 * voice, not a transcription of what the speaker said.
 */
export interface SlideNarrativeSlide {
  /** Public path under /public, e.g. /images/speakers/glen-martin-slides/01-title.png */
  image: string
  /** Short slide title (renders as the card heading) */
  title: string
  /** 1-3 sentence prose explaining the slide. Plain text; HTML allowed for emphasis. */
  narrative: string
}

/**
 * Replaces the standard "Watch the recording" + transcript cards when set.
 * Used when the source recording is unusable / unavailable but slides exist
 * and we want to do justice to the talk's content.
 */
export interface SlideNarrative {
  /** 2-4 sentence framing of the talk, shown above the slide flow */
  abstract: string
  /** The slides in talk order */
  slides: SlideNarrativeSlide[]
}

export interface SpeakerEvent {
  speaker: string
  slug: string
  title: string
  subtitle?: string
  description: string
  time: string
  image: string
  bio: string
  /** Override the default 90-minute duration for this event */
  durationMinutes?: number
  /** Set once the talk has been recorded and published */
  recording?: SpeakerRecording
  /** True when there's no usable recording and the speaker page should say so */
  videoUnavailable?: boolean
  /** Slide-by-slide narrative — renders instead of recording + transcript */
  slideNarrative?: SlideNarrative
}

export interface DialogueEvent {
  title: string
  subtitle: string
  time: string
  durationMinutes: number
  paragraphs: string[]
  finalParaPre: string
  finalParaHighlight: string
  calendarDescription: string
  /** Slug for the per-dialogue page (/speaker/<slug>). Required when a
   *  recording is published — drives Watch Now linking. */
  slug?: string
  /** Set once the dialogue has been recorded and published. */
  recording?: SpeakerRecording
}

export interface Day {
  date: string
  label: string
  theme: string
  dotColor: string
  ringColor: string
  badgeColor: string
  titleColor: string
  themeColor: string
  calendarBtnClass: string
  borderColor: string
  subtitleColor: string
  events: SpeakerEvent[]
  dialogueEvent?: DialogueEvent
}

export const days: Day[] = [
  {
    date: '2026-05-20',
    label: 'Wednesday 20 May',
    theme: 'The Origins of Holism',
    dotColor: 'bg-trim-purple',
    ringColor: 'ring-trim-purple',
    badgeColor: 'bg-trim-purple',
    titleColor: 'text-trim-purple',
    themeColor: 'text-trim-purple',
    calendarBtnClass: 'bg-trim-purple/10 text-trim-purple',
    borderColor: 'border-trim-purple',
    subtitleColor: 'text-trim-purple-dark',
    events: [
      {
        speaker: 'Professor Kobus du Pisani',
        slug: 'kobus-du-pisani',
        title: 'The Upward Path of The Universe',
        subtitle: 'The Significance and Origins of Holism: Jan C. Smuts',
        description:
          'Explore the vision of Jan Christian Smuts, the South African thinker behind Holism & Evolution (1926). Discover how his life and work shaped holistic thinking and offered hope during uncertain times and how his insights can inspire connected, compassionate solutions for today\'s complex world.',
        time: '19h00 CEST',
        image: '/images/speakers/kobus-du-pisani.png',
        bio: 'Professor Kobus du Pisani, one of the foremost scholars on Smuts, will anchor the opening program by setting Smuts\' life and work in historical context. Prof du Pisani is editor of "Jan Smuts, Son Of The Veld, Pilgrim Of The World".',
        recording: {
          youtubeId: 'qgAHRoMqaI8',
          pdfUrl: '/downloads/kobus-du-pisani-the-upward-path-of-the-universe.pdf',
          hasTranscript: true,
        },
      },
    ],
  },
  {
    date: '2026-05-21',
    label: 'Thursday 21 May',
    theme: 'The Book Smuts Never Wrote',
    dotColor: 'bg-trim-green',
    ringColor: 'ring-trim-green',
    badgeColor: 'bg-trim-green',
    titleColor: 'text-trim-green',
    themeColor: 'text-trim-green',
    calendarBtnClass: 'bg-trim-green/10 text-trim-green',
    borderColor: 'border-trim-green',
    subtitleColor: 'text-trim-green-dark',
    events: [
      {
        speaker: 'Jeff Blumberg',
        slug: 'jeff-blumberg',
        title: 'Towards A Spiritual Worldview',
        subtitle: 'Revisiting Smuts\' Unfinished Sequel to Holism and Evolution',
        description:
          'Jan Christian Smuts saw Holism as a path to spiritual renewal, not just a philosophy. Though he never completed his promised sequel, his writings reveal a vision of wholeness as a living, creative process, inviting us to live in harmony with the universe and rediscover a deeper, integrated understanding of life and meaning.',
        time: '19h00 CEST',
        image: '/images/speakers/jeff-blumberg.png',
        bio: 'Jeff Blumberg discovered Jan Smuts\'s idea of Holism and Evolution years ago while researching holistic management and realized the philosophy was much deeper than its popular meaning. After a long corporate and consulting career, he returned to study Smuts\'s work in depth and is now writing a book—based on unpublished archives—about Smuts\'s planned sequel. His presentation is drawn from that upcoming book.',
        recording: {
          youtubeId: 'peXmHMLD8gQ',
          pdfUrl: '/downloads/jeff-blumberg-towards-a-spiritual-worldview.pdf',
          hasTranscript: true,
        },
      },
    ],
  },
  {
    date: '2026-05-22',
    label: 'Friday 22 May',
    theme: 'Who We May Become in a Holistic Future',
    dotColor: 'bg-trim-teal',
    ringColor: 'ring-trim-teal',
    badgeColor: 'bg-trim-teal',
    titleColor: 'text-trim-teal',
    themeColor: 'text-trim-teal',
    calendarBtnClass: 'bg-trim-teal/10 text-trim-teal',
    borderColor: 'border-trim-teal',
    subtitleColor: 'text-trim-teal-dark',
    events: [
      {
        speaker: 'Marcus Link',
        slug: 'marcus-link',
        title: 'Keystones in the Patterns of Place',
        subtitle: 'Cultivating a Regenerative Presence on Earth',
        description:
          'Discover what it means to be a life-generative presence on Earth. This work explores the deep patterns shaping human consciousness and civilization and shows how we can act in ways that leave a regenerative wake, reconnecting meaning, myth, and ecosystem into a living, creative whole.',
        time: '19h00 CEST',
        image: '/images/speakers/markus-link.jpeg',
        bio: 'Marcus Link is a pattern seeker, systems thinker, and writer exploring the intersection of ecology, data, and meaning. As founder of Ecological Intelligence, he develops satellite-based software to assess ecosystem health. A philosopher, cultural critic, storyteller, essayist, and poet, he aims to publish Keystones in the Patterns of Place by the time of this talk.',
        recording: {
          youtubeId: '99gR0YnFqxE',
          pdfUrl: '/downloads/marcus-link-keystones-in-the-patterns-of-place.pdf',
          hasTranscript: true,
        },
      },
    ],
  },
  {
    date: '2026-05-23',
    label: 'Saturday 23 May',
    theme: 'Our Inner Home in the Cosmos',
    dotColor: 'bg-trim-blue',
    ringColor: 'ring-trim-blue',
    badgeColor: 'bg-trim-blue',
    titleColor: 'text-trim-blue',
    themeColor: 'text-trim-blue',
    calendarBtnClass: 'bg-trim-blue/10 text-trim-blue',
    borderColor: 'border-trim-blue',
    subtitleColor: 'text-trim-blue-dark',
    events: [
      {
        speaker: 'Dr Jude Currivan',
        slug: 'jude-currivan',
        title: 'A Unitive Vision For Humanity',
        subtitle: 'Convergence of Science and Wisdom Reveals a Universe of Wholeness, Meaning and Evolutionary Purpose',
        description:
          'Scientific discoveries and evidence are overturning the secular paradigm of a mechanistic/materialistic Universe and converging with universal wisdom traditions. The unitive revelations at every scale of existence, and vitally that of our everyday lives, offers a (r)evolution in human awareness empowering healing and emergent potential.',
        time: '10h00 CEST',
        image: '/images/speakers/jude-currivan.png',
        bio: 'Dr Jude Currivan is a cosmologist, planetary healer, futurist, award-winning author and filmmaker, and co-founder of WholeWorld-View. An Evolutionary Leaders Circle council member and Associate Member of the Club of Rome, she combines a background in international business with lifelong research into the unitive nature of reality, aiming to promote collective and planetary healing, conscious evolution, and transformational change.',
        recording: {
          youtubeId: '8sPPvYX5hHQ',
          pdfUrl: '/downloads/jude-currivan-a-unitive-vision-for-humanity.pdf',
          hasTranscript: true,
        },
      },
      {
        speaker: 'David Lorimer',
        slug: 'david-lorimer',
        title: 'Inwardness & Agency in the Evolution of Consciousness',
        subtitle: 'The Subtle Process of Universalisation and Individuation',
        description:
          'Explore how inner life shapes the outer world. By aligning mind, heart, and will, we can integrate apparent opposites and awaken a deeper, universal Self. This journey of wholeness reveals how spirit and matter, the sacred and the everyday, are interconnected in a living, holistic reality.',
        time: '11h30 CEST',
        image: '/images/speakers/david-lorimer.png',
        bio: 'David Lorimer is a writer, lecturer, and editor known for his work in philosophy and education. He is the Programme Director of the Scientific and Medical Network and has authored several books on topics related to science and spirituality.',
        recording: {
          youtubeId: 'oAlx2l6GHi0',
          pdfUrl: '/downloads/david-lorimer-inwardness-agency-and-freedom-in-the-evolution-of-consciousness.pdf',
          hasTranscript: true,
        },
        durationMinutes: 75,
      },
    ],
    dialogueEvent: {
      title: 'A Dialogue with All Presenters',
      subtitle: 'Bringing the insights together into lived understanding',
      time: '13h00 CEST',
      durationMinutes: 60,
      paragraphs: [
        'Join us for a summatory dialogue where the speakers come together to reflect on the deeper themes of the festival.',
        "Together we will explore how 'Holism and Evolution' continues to unfold through ideas such as the participatory universe, humanity as a keystone species, and the role of individual agency in shaping a more regenerative relationship with life.",
      ],
      finalParaPre: 'This is an opportunity not only to listen, but to ',
      finalParaHighlight: 'engage, reflect, and connect the insights to your own perspective and experience.',
      calendarDescription: "Join us for a summatory dialogue where the speakers come together to reflect on the deeper themes of the festival.\n\nTogether we will explore how 'Holism and Evolution' continues to unfold through ideas such as the participatory universe, humanity as a keystone species, and the role of individual agency in shaping a more regenerative relationship with life.\n\nThis is an opportunity not only to listen, but to engage, reflect, and connect the insights to your own perspective and experience.",
      slug: 'a-dialogue-with-all-presenters',
      recording: {
        youtubeId: '9qQj8QSxEsQ',
        pdfUrl: '/downloads/a-dialogue-with-all-presenters.pdf',
        hasTranscript: true,
      },
    },
  },
  {
    date: '2026-05-24',
    label: 'Sunday 24 May',
    theme: 'Holism, Faith & Ethics',
    dotColor: 'bg-trim-purple',
    ringColor: 'ring-trim-purple',
    badgeColor: 'bg-trim-purple',
    titleColor: 'text-trim-purple',
    themeColor: 'text-trim-purple',
    calendarBtnClass: 'bg-trim-purple/10 text-trim-purple',
    borderColor: 'border-trim-purple',
    subtitleColor: 'text-trim-purple-dark',
    events: [
      {
        speaker: 'Dr Rhett Gayle',
        slug: 'rhett-gayle',
        title: 'Holism & Christian Mysticism',
        subtitle: 'Embodying Faith: A Path Toward Human Wholeness',
        description:
          'Discover how Christian mysticism and holistic thinking illuminate a path to human wholeness. By stepping into the meeting place of the divine and the human, we can participate in the wholeness of all life honouring individuality, nurturing dignity, and awakening a deeper, evolutionary sense of purpose.',
        time: '10h30 CEST',
        image: '/images/speakers/rhett-gayle.png',
        bio: 'Dr Rhett Gayle is a researcher, educator and philosopher who has taught at the University of Colorado and is author of several academic papers on topics ranging from Befriending Wisdom to Self-transformation.',
        durationMinutes: 60,
        recording: {
          youtubeId: 'cILaTDCOaPI',
          pdfUrl: '/downloads/rhett-gayle-pre-imperial-christian-mysticism.pdf',
          hasTranscript: true,
        },
      },
      {
        speaker: 'Dr Claudius van Wyk',
        slug: 'claudius-van-wyk',
        title: 'Holism & Ethics: Choosing the Way of Alignment',
        subtitle: 'Why Doing the Right Thing Dynamically Supports the Whole and the Parts',
        description:
          'In a world of moral confusion and competing ideologies, Jan Smuts\' holistic ethic reminds us that doing the right thing is generally the right thing to do. This talk explores how ethical action rooted in wholeness can align individual choices with the well-being of society, the planet, and ourselves.',
        time: '11h30 CEST',
        image: '/images/speakers/claudius-van-wyk.png',
        bio: 'As a life-long scholar of holism, Claudius has enjoyed a career in executive coaching and organisational consultation offering strategic transformation facilitation for over 25 years. He applies complexity-theory insights to strategic management and leadership focused on wellness and sustainability. His expertise is applying Holistic Systems Practice to promote engagement and resilience in the dynamic world.',
        recording: {
          youtubeId: 'Mf70_xh4Gf8',
          pdfUrl: '/downloads/claudius-van-wyk-holism-and-ethics.pdf',
          hasTranscript: true,
        },
      },
    ],
  },
]

export const daysP2: Day[] = [
  {
    date: '2026-06-10',
    label: 'Wednesday 10 June',
    theme: 'Emergent Holistic Governance',
    dotColor: 'bg-trim-purple',
    ringColor: 'ring-trim-purple',
    badgeColor: 'bg-trim-purple',
    titleColor: 'text-trim-purple',
    themeColor: 'text-trim-purple',
    calendarBtnClass: 'bg-trim-purple/10 text-trim-purple',
    borderColor: 'border-trim-purple',
    subtitleColor: 'text-trim-purple-dark',
    events: [
      {
        speaker: 'Dr Glen Martin',
        slug: 'glen-martin',
        title: 'Holism and Eco-Systemic Governing for Planet Earth',
        subtitle: 'Life grows through connected systems',
        description:
          'What if humanity could grow into greater unity without losing its diversity? An exploration into emergent holism, the Earth Constitution, and the fascinating idea of a cooperative, ecologically aware planetary future.',
        time: '19h00 CEST',
        image: '/images/speakers/glen-martin.jpg',
        bio: 'Dr Glen Martin is Professor Emeritus in Philosophy at Radford University. He is President of the World Constitution and Parliament Association (WCPA), and the Earth Constitution Institute. He is also a member of the Presidium of the Provisional World Parliament, and author or editor of 15 books and multiple articles.',
        videoUnavailable: true,
        slideNarrative: {
          abstract:
            'Jan Smuts saw, in 1926, that wholeness was the deepest principle of reality. A century later, Dr Glen Martin argues that personal awakening, cultural shift and scientific paradigm change cannot deliver an ecologically whole planet while the 1648 system of competing sovereign states actively blocks them — what is needed is an <em>institutional</em> form for holism. That form already exists: the <a href="https://earthconstitution.world/" target="_blank" rel="noopener" class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition">Constitution for the Federation of Earth</a>, written 1968&ndash;1991 by hundreds of world citizens and legal scholars, gives humanity common purposes, a tri-cameral world parliament, and an Integrative Complex to administer the planetary commons. Glen has spent thirty years building toward its ratification, and this talk traces both its design and the patient work of the <a href="https://wcpa.world/" target="_blank" rel="noopener" class="font-bold text-trim-purple underline underline-offset-4 decoration-trim-purple/40 hover:decoration-trim-purple transition">Provisional World Parliament</a> that has been giving it voice since 1982.',
          slides: [
            {
              image: '/images/speakers/glen-martin-slides/01-title.png',
              title: 'Actions flowing from a constitution',
              narrative:
                'The frame for the evening: holism, Smuts\' word, taken from a philosophical orientation to an <em>action</em> &mdash; actions flowing from a written constitution for the federation of Earth.',
            },
            {
              image: '/images/speakers/glen-martin-slides/02-constitution-book.png',
              title: 'The constitution is not theoretical',
              narrative:
                'The Constitution for the Federation of Earth was written 1968&ndash;1991 by hundreds of world citizens and legal scholars across four constituent assemblies. It exists as a finished document &mdash; here being presented to the Dalai Lama in 2017 by Swami Agnivesh, a longtime advisor to the World Constitution and Parliament Association.',
            },
            {
              image: '/images/speakers/glen-martin-slides/03-earth-constitution-solution.png',
              title: 'Design for a Living Planet',
              narrative:
                'Glen\'s 2021 book lays out the constitutional case in full. Its cover carries Teilhard de Chardin\'s <em>noosphere</em> &mdash; the encircling sphere of human thought now visible in the internet and AI &mdash; and Ervin Laszlo\'s verdict: <em>"the achievement of the Earth Constitution solution would mark a milestone in humankind\'s evolution into a true planetary species."</em>',
            },
            {
              image: '/images/speakers/glen-martin-slides/04-smuts-social-wholes.png',
              title: 'Smuts and social wholes',
              narrative:
                'Smuts wrote that the individual self only becomes whole through the social wholes around it &mdash; language, community, the person becoming through others. Toward the end of <em>Holism and Evolution</em> he named the League of Nations "the expression of the deeply felt aspiration toward a more stable, holistic human society." For Glen, the Earth Constitution is the next, completed step in that aspiration &mdash; the incarnation of Smuts\' holism in our common human reality.',
            },
            {
              image: '/images/speakers/glen-martin-slides/05-bridging-governed-world.png',
              title: 'Eighty-one years on, the UN has not worked',
              narrative:
                'Eighty-one years after the United Nations was founded, the world it was supposed to govern is in worse shape: endless wars, ultra-nationalism, climate collapse, nuclear arsenals, mass impunity. The UN was a beautiful idea that has not worked. The Earth Constitution is offered as the bridge from that failed architecture to a genuinely governed planet.',
            },
            {
              image: '/images/speakers/glen-martin-slides/06-kovel-pure-community.png',
              title: 'A pure local community is a fantasy',
              narrative:
                'Glen pre-empts a sympathetic objection. Many in the ecological movement believe the answer is small, bioregional, local. Joel Kovel\'s response: a pure community is a fantasy and, at present population levels, would be an ecological nightmare &mdash; "the local and the particular exists <em>in and through</em> the global whole." Holism, properly understood, demands a federation, not a retreat into villages.',
            },
            {
              image: '/images/speakers/glen-martin-slides/07-wilber-aqal.png',
              title: 'Wilber\'s four quadrants',
              narrative:
                'Ken Wilber\'s AQAL chart maps human reality into four quadrants: the inner <em>self</em>, the outer <em>brain and the systems science studies</em>, the shared <em>culture and worldview</em>, and the institutional <em>economic and political structures</em>. Each quadrant evolves toward greater holism &mdash; and the bottom-right, where the Earth Federation belongs, is the one still missing its holistic form.',
            },
            {
              image: '/images/speakers/glen-martin-slides/08-fragmentation-blocks.png',
              title: 'Fragmentation actively blocks all four quadrants',
              narrative:
                'Glen\'s most important amendment to Wilber: at our present moment, the fragmented bottom-right quadrant &mdash; militarised sovereign nations and global capitalism &mdash; does not merely lag the other three. It <em>actively blocks</em> them. Selves grow fanatical, cultures turn divided, science is conscripted into war, because the system makes those outcomes inevitable. Personal and cultural holism alone cannot rescue us.',
            },
            {
              image: '/images/speakers/glen-martin-slides/09-smuts-purpose.png',
              title: 'Purpose liberates mind from circumstance',
              narrative:
                'Smuts again: "Purpose marks the liberation of mind from the domination of circumstances." But today, Glen argues, humanity has no common purpose. 194 militarised sovereign states recognise no binding authority over themselves &mdash; so the problems beyond their scope (climate, nuclear weapons, pandemics) cannot be solved. The Earth Constitution exists to give the species a common purpose.',
            },
            {
              image: '/images/speakers/glen-martin-slides/10-article-1-functions.png',
              title: 'Six purposes for humanity',
              narrative:
                'Article 1 names six broad functions: prevent war and secure disarmament; protect universal human rights; obtain equitable economic and social development for all; regulate world trade, communications, currency and resources; protect the ecological fabric of life; and devise solutions to problems beyond the capacity of nations. These are humanity\'s common purposes, set in writing.',
            },
            {
              image: '/images/speakers/glen-martin-slides/11-earth-constitution-overview.png',
              title: 'A tri-cameral world parliament',
              narrative:
                'The structural sketch. A House of Peoples (1000 representatives elected directly from world electoral districts), a House of Counselors (200 representatives nominated by universities to speak for humanity as a whole), and a House of Nations (around 300 representatives elected by member states) sit above an Integrative Complex of administrative agencies, a World Judiciary, a World Police, and a World Ombudsmus.',
            },
            {
              image: '/images/speakers/glen-martin-slides/12-integrative-complex.png',
              title: 'The Integrative Complex',
              narrative:
                'The working machinery: a World Civil Service, World Boundaries and Elections Administration, an Institute on Governmental Procedures and World Problems, an Agency for Research and Planning, an Agency for Technological and Environmental Assessment, a World Financial Administration, and a Commission for Legislative Review. Together they make the parliament\'s work practical &mdash; designed-in coherence, not improvised coordination.',
            },
            {
              image: '/images/speakers/glen-martin-slides/13-mandala-7-government.png',
              title: 'Government as mandala',
              narrative:
                'A visual rendering of the same architecture as a mandala: the parliament at the rim, the integrative agencies inside it, the people\'s representatives at the bottom, and at the centre the cabinet and world administration &mdash; a living circle of governance rather than a hierarchy.',
            },
            {
              image: '/images/speakers/glen-martin-slides/14-mandala-1-dignity.png',
              title: 'Human dignity at the centre',
              narrative:
                'Another mandala, this time from Glen\'s 2024 book <em>Human Dignity and World Order</em>: nested rings rather than a tree. At the centre, human dignity; outward through ecological sustainability, the rule of law, equitable economy, world federation. The same architecture spoken in the language of meaning rather than mechanism.',
            },
            {
              image: '/images/speakers/glen-martin-slides/15-planetary-resources.png',
              title: 'Planetary resources as commons',
              narrative:
                'Here the consequence becomes vivid. Under the present nation-state system, the atmosphere, oceans, aquifers, forests and fossil fuels are "freely exploited" by each sovereign nation. Under the Earth Constitution they become global commons, protected by a World Environmental Authority. The difference is not rhetorical &mdash; it is who has the legal capacity to refuse extraction.',
            },
            {
              image: '/images/speakers/glen-martin-slides/16-articles-ecology.png',
              title: 'Ecology threaded throughout',
              narrative:
                'The Earth Constitution does not treat ecology as a single article. Ecological provisions are woven through it &mdash; protection of the ecological fabric of life, regulation of planetary resources, recycling, atmosphere, oceans, climate, food, the rights of future generations and of the natural world itself. Wholeness is built in, not bolted on.',
            },
            {
              image: '/images/speakers/glen-martin-slides/17-planet-aqua.png',
              title: 'The noosphere arrives, the institution lags',
              narrative:
                'Jeremy Rifkin\'s recent <em>Planet Aqua</em> (2024) reaches a parallel conclusion from a different angle: a planet-wide Internet of Things mesh, monitoring ecosystems and infrastructure in real time, becomes possible only when there is a planetary body that can act on what it sees. The technology of the noosphere is here; the institutional form is still missing.',
            },
            {
              image: '/images/speakers/glen-martin-slides/18-mandala-2-gaia.png',
              title: 'The parliament as Gaian feedback',
              narrative:
                'Mandala 2 places the World Parliament inside the Gaian feedback loop: conscious modification of activities, monitoring and assessment, human self-aware activities, Earth system balances and consequences. The parliament is not separate from the planet &mdash; it is the institutional way the planet becomes self-aware.',
            },
            {
              image: '/images/speakers/glen-martin-slides/19-pwp-overview.png',
              title: 'The Provisional World Parliament',
              narrative:
                'Article 19 of the Earth Constitution provides for a Provisional World Parliament &mdash; the body that articulates the spirit and letter of the Constitution <em>before</em> full ratification. Since 1982 it has held 17 sessions and passed dozens of World Legislative Acts. The next slides walk through some of them &mdash; the patient work happening in the background, mostly outside Western press attention.',
            },
            {
              image: '/images/speakers/glen-martin-slides/20-pwp-brighton-1982.png',
              title: '1982 · Brighton: first session',
              narrative:
                'The first Provisional World Parliament met in Brighton, England in 1982. Among its first acts: WLA 2 founded a World Economic Development Organisation tying development to environment, energy, equity and democracy; WLA 3 declared the oceans and seabeds "the common heritage of humanity."',
            },
            {
              image: '/images/speakers/glen-martin-slides/21-pwp-new-delhi-1985.png',
              title: '1985 · New Delhi: the EERA',
              narrative:
                'WLA 6 founded the Earth Emergency Rescue Administration (EERA) &mdash; a body to mobilise on environmental crises that cross borders. WLA 9 set up a World Environmental Ministry, observing simply that "the Earth is the only world we have" and most environmental problems disregard boundaries.',
            },
            {
              image: '/images/speakers/glen-martin-slides/22-pwp-miami-1987.png',
              title: '1987 · Miami: clean energy and a global market',
              narrative:
                'WLA 10 founded the World Hydrogen Authority &mdash; to develop clean, low-cost energy. WLA 11 created an Earth Financial Credit Corporation to empower a sustainable global market regulated by world law rather than national interest.',
            },
            {
              image: '/images/speakers/glen-martin-slides/23-pwp-grouped-90s-00s.png',
              title: '1996&ndash;2003 · Barcelona, Malta, Bangkok, Chennai',
              narrative:
                'The late-90s and early-2000s sessions tackled global commons in earnest. Most consequential: the World Hydrocarbon Resource Act (WLA 16), placing fossil resources under the authority of the people of Earth rather than the nations on whose soil they happen to lie.',
            },
            {
              image: '/images/speakers/glen-martin-slides/24-pwp-lucknow-2004.png',
              title: '2004 · Lucknow: the World Water Act',
              narrative:
                'WLA 30, the World Water Act, defined fresh water as belonging to the planet and "as a right of every human being and other living beings." It articulates principles of fair access, reasonable quantity, and control of water systems that bridge national boundaries.',
            },
            {
              image: '/images/speakers/glen-martin-slides/25-pwp-tripoli-2006.png',
              title: '2006 · Tripoli: nuclear acts',
              narrative:
                'Three nuclear acts at the ninth session: a Fissile Production Ban (WLA 33), a Nuclear Weapons Dismantling Procedure (WLA 34), and a Nuclear Power Plant Decommission Fund (WLA 50). Possession of fissile materials for weapons declared a class-5 felony under world law.',
            },
            {
              image: '/images/speakers/glen-martin-slides/26-pwp-2007-2021.png',
              title: '2007&ndash;2021 · the work continues',
              narrative:
                'The movement persisted across Africa, India and online: Kara (Togo) 2007, Nainital 2009, Kolkata 2010, Lucknow 2013, Kolkata 2015, New Delhi 2021. A slow, patient thread of world legislative work, almost entirely under-reported.',
            },
            {
              image: '/images/speakers/glen-martin-slides/27-pwp-new-delhi-2021.png',
              title: '2021 · ecological districts written in',
              narrative:
                'The 2021 New Delhi session added a new Article 7 to the EERA &mdash; making explicit that emergency rescue work must be organised through ecological districts, embedded in local communities. Top-down only is "psychologically and politically impossible." The constitution gains organs as it learns.',
            },
            {
              image: '/images/speakers/glen-martin-slides/28-eera-principles.png',
              title: 'Holism as agronomy, communal, learnable',
              narrative:
                'The principles spelled out: top-down momentum is impossible <em>and</em> immoral; transformation requires people working within the framework of common purposes; restoration is built from the ground up by local cultures who <em>understand</em> their soils and water. Holism here is not abstract &mdash; it is practical, agronomic, communal, learnable.',
            },
            {
              image: '/images/speakers/glen-martin-slides/29-pwp-pondicherry-2025.png',
              title: '2025 · Pondicherry: parliament becomes permanent',
              narrative:
                'The most recent session, Pondicherry December 2025, established a permanent membership for the Parliament, ongoing four-monthly sessions, a permanent Secretariat, and procedures for updating the Earth Constitution itself. The Provisional Parliament is no longer a series of one-off conferences; it now operates as a continuous institutional voice.',
            },
            {
              image: '/images/speakers/glen-martin-slides/30-conclusion.png',
              title: 'A step on the way',
              narrative:
                'Glen\'s closing claim: there can be no true ecological holism for humanity without the Earth Constitution. Personal practice, cultural awakening and scientific revolution are necessary &mdash; but insufficient &mdash; without the institutional form that lets the species act. The Earth Constitution is not the destination; it is a step on the way toward human liberation.',
            },
          ],
        },
      },
    ],
  },
  {
    date: '2026-07-01',
    label: 'Wednesday 1 July',
    theme: 'Lessons From Aquatic Sciences',
    dotColor: 'bg-trim-teal',
    ringColor: 'ring-trim-teal',
    badgeColor: 'bg-trim-teal',
    titleColor: 'text-trim-teal',
    themeColor: 'text-trim-teal',
    calendarBtnClass: 'bg-trim-teal/10 text-trim-teal',
    borderColor: 'border-trim-teal',
    subtitleColor: 'text-trim-teal-dark',
    events: [
      {
        speaker: 'Dr Anthony Turton',
        slug: 'anthony-turton',
        title: 'The Unintended Consequences of Newton\'s Reductionism',
        subtitle: 'Lessons from the Aquatic Sciences and the Need for Holism',
        description:
          'How has modern science shaped the way we manage nature -- and where does it fall short? An exploration of how reductionist thinking has influenced water governance and why today\'s ecological challenges call for a more holistic view of ecosystems and human responsibility.',
        time: '19h00 CEST',
        image: '/images/speakers/anthony-turton.jpg',
        bio: 'Dr Anthony Turton is former Unit Fellow at the South African Council for Scientific and Industrial Research and official spokesperson for the CSIR on water. He serves as a research associate Centre for Environmental Management, University of Free State and is Deputy Governor of the World Water Council where he is also editor for Africa of the Water Policy, official.',
      },
    ],
  },
  {
    date: '2026-07-22',
    label: 'Wednesday 22 July',
    theme: 'Global Food Systems',
    dotColor: 'bg-trim-green',
    ringColor: 'ring-trim-green',
    badgeColor: 'bg-trim-green',
    titleColor: 'text-trim-green',
    themeColor: 'text-trim-green',
    calendarBtnClass: 'bg-trim-green/10 text-trim-green',
    borderColor: 'border-trim-green',
    subtitleColor: 'text-trim-green-dark',
    events: [
      {
        speaker: 'Klaus Mager',
        slug: 'Klaus-mager',
        title: 'Extraction to Regeneration',
        subtitle: 'Rethinking the Future of Food Systems as Living Networks',
        description:
          'Today\'s global food system delivers abundance, but at significant ecological and social cost -- from degraded soils and biodiversity loss to fragile supply chains and weakened connections between people and food. Regenerative approaches treat food as part of living systems, reconnecting agriculture with ecology, community, and innovation to support a more resilient future.',
        time: '19h00 CEST',
        image: '/images/speakers/Klaus-mager.jpg',
        bio: 'Klaus Mager is an international food-systems leader spanning global food service, hospitality, wholesale, and supply-chain innovation. With practical understanding of food systems operating from farm to fork, he founded Food with Thought AI. He helps farmers, supply-chain partners, and food-system leaders co-design regenerative transitions to improve soil health, restore water cycles, support carbon outcomes, and strengthen livelihoods. For Klaus food and agriculture sit at the heart of climate resilience, public health, supply-chain security, and rural prosperity.',
      },
    ],
  },
  {
    date: '2026-08-12',
    label: 'Wednesday 12 August',
    theme: 'Technology and Meaning',
    dotColor: 'bg-trim-blue',
    ringColor: 'ring-trim-blue',
    badgeColor: 'bg-trim-blue',
    titleColor: 'text-trim-blue',
    themeColor: 'text-trim-blue',
    calendarBtnClass: 'bg-trim-blue/10 text-trim-blue',
    borderColor: 'border-trim-blue',
    subtitleColor: 'text-trim-blue-dark',
    events: [
      {
        speaker: 'Prof. George Rzevski',
        slug: 'george-rzevski',
        title: 'Holism, Complexity Science and AI',
        subtitle: 'How Societies and Technologies Evolve Together',
        description:
          'Throughout history, new technologies have reshaped human capability and how societies evolve, and we are now shifting from industrial machines to digital systems that increasingly perform cognitive tasks. This transition, shaped by holism, complexity science, and artificial intelligence, shows how societies and technologies evolve together in an interconnected world, where holistic thinking is increasingly vital for understanding technological change.',
        time: '19h00 CEST',
        image: '/images/speakers/george-rzevski.jpg',
        bio: 'Professor Emeritus George Rzevski of Open University leads advanced research in Complexity Science and Artificial Intelligence. His specialties include managing complexity, including design of complex adaptive organisations and systems. It encompasses knowledge discovery, ontology, AI agents; Digital twins; Semantic Search; Real-Time Adaptive Scheduling.',
      },
    ],
  },
  {
    date: '2026-09-02',
    label: 'Wednesday 2 September',
    theme: 'The Future is Calling Us',
    dotColor: 'bg-trim-purple',
    ringColor: 'ring-trim-purple',
    badgeColor: 'bg-trim-purple',
    titleColor: 'text-trim-purple',
    themeColor: 'text-trim-purple',
    calendarBtnClass: 'bg-trim-purple/10 text-trim-purple',
    borderColor: 'border-trim-purple',
    subtitleColor: 'text-trim-purple-dark',
    events: [
      {
        speaker: 'Richard Cox',
        slug: 'richard-cox',
        title: 'The Beckoning Future and the Holistic Power of Polarities',
        subtitle: 'The Shaping of Living Wholes',
        description:
          'What if life is shaped not only by the past, but also by the future that calls us forward? Exploring holism across science - from biology to geology, meteorology, optics, and systems thinking - highlighting how living wholes are shaped by history and possibility. It invites a richer understanding of life grounded in interconnectedness, deeper patterns, and the relationship between human beings and the living world.',
        time: '19h00 CEST',
        image: '/images/speakers/richard-cox.jpg',
        bio: 'As a teacher and author, in our age of scientific materialism, Richard Cox finds Smuts\' vision and insights indicate a clear direction to lead us back to spiritual dimensions with complete rational clarity. Richard\'s recent book \'Of Signs and Signatures: Reading Nature\'s Script with Goethe and Smuts\' is principally an overview of the various holistic insights that we find in mathematics, optics, botany and zoology.',
      },
    ],
  },
  {
    date: '2026-09-23',
    label: 'Wednesday 23 September',
    theme: 'Buildings, Cities, and Infrastructure',
    dotColor: 'bg-trim-teal',
    ringColor: 'ring-trim-teal',
    badgeColor: 'bg-trim-teal',
    titleColor: 'text-trim-teal',
    themeColor: 'text-trim-teal',
    calendarBtnClass: 'bg-trim-teal/10 text-trim-teal',
    borderColor: 'border-trim-teal',
    subtitleColor: 'text-trim-teal-dark',
    events: [
      {
        speaker: 'Llewellyn van Wyk',
        slug: 'llewellyn-van-wyk',
        title: 'Holism and Architecture',
        subtitle: 'Moving from Isolation/Parts to Entanglement/Systems',
        description:
          'The built environment is under pressure from climate change, resource limits, social fragmentation, and rapid technological change, exposing the limits of fragmented approaches to design and urban development. It reframes buildings, cities, and infrastructure as living systems within ecological, cultural, and social contexts, enriching sustainability, circularity, and adaptive reuse.',
        time: '19h00 CEST',
        image: '/images/speakers/llewellyn-van-wyk.jpg',
        bio: 'Llewellyn van Wyk works in architecture and related design/built environment fields, and engages deeply with architectural theory, urban systems, and design practice across multiple reflections. He is also engaged in a sustained exploration of holism as a scientific and philosophical tradition -- anchored by the centenary of Smuts\'s Holism and Evolution -- tracing the lineage through systems theory, cybernetics, complexity science, quantum non-separability, the noosphere, urban scaling laws, and architectural implications.',
      },
    ],
  },
  {
    date: '2026-10-14',
    label: 'Wednesday 14 October',
    theme: 'Ecocivilization',
    dotColor: 'bg-trim-green',
    ringColor: 'ring-trim-green',
    badgeColor: 'bg-trim-green',
    titleColor: 'text-trim-green',
    themeColor: 'text-trim-green',
    calendarBtnClass: 'bg-trim-green/10 text-trim-green',
    borderColor: 'border-trim-green',
    subtitleColor: 'text-trim-green-dark',
    events: [
      {
        speaker: 'Jeremy Lent',
        slug: 'jeremy-lent',
        title: 'What Would a Truly Holistic Civilization Look Like?',
        subtitle: 'Envisioning an Ecocivilization for a Regenerated Earth',
        description:
          'Authoritarianism is on the rise, inequality is pulling societies apart, and the natural systems we depend on are breaking down -- the results of a civilization based on exploitation, extraction, and separation. What would it take to transform our society into one that is truly holistic, setting the conditions for all beings to thrive on a regenerated Earth? Jeremy will explore the concept of an ecocivilization: why we need it, its underlying principles, and a glimpse of what it might look like in practice -- a coherent system-wide framework grounded in the fundamental principles of life, ecosystems, and human well-being.',
        time: '20h00 CEST',
        image: '/images/speakers/jeremy-lent.png',
        bio: '<a href="https://www.jeremylent.com/" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">Jeremy Lent</a> is an author and speaker whose work investigates the underlying causes of our civilization\'s existential crisis, and explores pathways toward a life-affirming future. His new book, <a href="https://book.ecocivilization.net/" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">Ecocivilization: Making a World that Works for All</a> (May 2026, Melville House), lays out the potential for a fundamentally different world system -- an ecocivilization based on life-affirming principles rather than principles of extraction and exploitation. He is co-founder of the <a href="http://www.ecociv.org/" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">Ecocivilization Coalition</a> and founder of the <a href="https://deeptransformation.network/feed" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">Deep Transformation Network</a>. His previous two books were <a href="https://www.jeremylent.com/the-web-of-meaning.html" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">The Web of Meaning</a> and <a href="https://www.jeremylent.com/the-patterning-instinct.html" target="_blank" rel="noopener" class="font-bold text-trim-green underline underline-offset-4 decoration-trim-green/40 hover:decoration-trim-green transition">The Patterning Instinct</a>.',
      },
    ],
  },
  {
    date: '2026-11-04',
    label: 'Wednesday 4 November',
    theme: 'Retrieving Indigenous Wisdom',
    dotColor: 'bg-trim-blue',
    ringColor: 'ring-trim-blue',
    badgeColor: 'bg-trim-blue',
    titleColor: 'text-trim-blue',
    themeColor: 'text-trim-blue',
    calendarBtnClass: 'bg-trim-blue/10 text-trim-blue',
    borderColor: 'border-trim-blue',
    subtitleColor: 'text-trim-blue-dark',
    events: [
      {
        speaker: 'Rev. Berry Behr',
        slug: 'berry-behr',
        title: 'Signposts to Holism in African Traditional Practice',
        subtitle: 'Insights into co-creating an interrelated future',
        description:
          'Rev. Berry Behr will share what she has learned about Holism by engaging with African Traditional Practice. What began as a mild curiosity about Holism has evolved into an exploration of relationality as a lived reality. Drawing on personal experience, she will reflect on African understandings of relationship, reciprocity, and belonging, and how these lessons may contribute to humanity\'s search for a more interconnected and life-affirming future.',
        time: '19h00 CEST',
        image: '/images/speakers/berry-behr.jpg',
        bio: 'Rev. Berry Behr is an ordained interfaith/inter-spiritual minister and practitioner of dialogue whose journey has included close engagement with African Traditional Practice, Indigenous elders, and the living wisdom of ceremony.',
      },
    ],
  },
  {
    date: '2026-12-02',
    label: 'Wednesday 2 December',
    theme: 'Liminal Reflections on Humanity\'s Potential Becoming',
    dotColor: 'bg-trim-purple',
    ringColor: 'ring-trim-purple',
    badgeColor: 'bg-trim-purple',
    titleColor: 'text-trim-purple',
    themeColor: 'text-trim-purple',
    calendarBtnClass: 'bg-trim-purple/10 text-trim-purple',
    borderColor: 'border-trim-purple',
    subtitleColor: 'text-trim-purple-dark',
    events: [
      {
        speaker: 'Christopher Cooke',
        slug: 'christopher-cooke',
        title: 'The Holistic Personological Pathway of Humankind in Cosmos – an Omnological Inquiry',
        subtitle: 'Exploring Smuts\' "great saving unities"',
        description:
          '"Omnology" endeavours to integrate all scientific and artistic disciplines to find universal patterns across all human knowledge. Christopher Cooke postulates that over the next 150 years humanity is entering a phase of "rolling back the dome to witness a new sky". Drawing upon a lifetime of inquiry into human nature, he will explore the metaphors, meaning structures, developmental pathways, patterns and codes that shape the cognition and awareness of each human being. This enquiry will investigate humanity\'s transition beyond conventional and post-conventional existence through an inexorable context and meaning reframing -- the evolution and emergence of what some describe as the Genuine Human.',
        time: '19h00 CEST',
        image: '/images/speakers/christopher-cooke.jpg',
        bio: 'Christopher Cooke works with individuals and systems at moments of transition, focused on helping people re-orient to deeper patterns of coherence, allowing meaningful change to emerge without force, performance, or premature solutions. Drawing on long experience across inner development, land-based systems, and organisational life, his work is grounded in respect for life as a living, unfolding whole -- working in service of a viable planet and a viable species where humanity fully and consciously engages with the deeper purpose of life on Earth.',
      },
    ],
  },
]

/** Flat list of all speaker slugs — used for pre-rendering routes */
export const allSpeakerSlugs: string[] = days.flatMap(d => d.events.map(e => e.slug))

/** Flat list of Phase 2 speaker slugs — used for pre-rendering routes */
export const allSpeakerSlugsP2: string[] = daysP2.flatMap(d => d.events.map(e => e.slug))

/** Convert a CEST time string (e.g. '19h00 CEST') to BST (UK summer time, −1 hour) */
export function toBST(time: string): string {
  const match = time.match(/(\d{1,2})h(\d{2})/)
  if (!match) return ''
  let h = parseInt(match[1], 10) - 1
  if (h < 0) h += 24
  return `${h}h${match[2]}`
}

/** Find a speaker event + its day by slug — searches Phase 1 then Phase 2.
 *  Also resolves panel dialogues: when a Day's `dialogueEvent` carries a slug
 *  and recording, it's projected into a SpeakerEvent-shaped object so the
 *  /speaker/<slug> page can render it with no extra branching. */
export function findSpeakerBySlug(slug: string) {
  for (const day of [...days, ...daysP2]) {
    const event = day.events.find(e => e.slug === slug)
    if (event) return { event, day }
  }
  for (const day of [...days, ...daysP2]) {
    const d = day.dialogueEvent
    if (d?.slug === slug) {
      const bio = [...d.paragraphs, `${d.finalParaPre}${d.finalParaHighlight}`].join('\n\n')
      const event: SpeakerEvent = {
        speaker: 'The Phase One Presenters',
        slug: d.slug,
        title: d.title,
        subtitle: d.subtitle,
        description: bio,
        time: d.time,
        image: '/images/speakers/interconnectedness.avif',
        bio,
        durationMinutes: d.durationMinutes,
        recording: d.recording,
      }
      return { event, day }
    }
  }
  return null
}
