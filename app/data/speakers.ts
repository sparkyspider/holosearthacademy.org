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

/** Find a speaker event + its day by slug — searches Phase 1 then Phase 2 */
export function findSpeakerBySlug(slug: string) {
  for (const day of [...days, ...daysP2]) {
    const event = day.events.find(e => e.slug === slug)
    if (event) return { event, day }
  }
  return null
}
