export interface SpeakerEvent {
  speaker: string
  slug: string
  title: string
  subtitle?: string
  description: string
  time: string
  image: string
  bio: string
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
        time: '19h00 CET',
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
        time: '19h00 CET',
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
        time: '19h00 CET',
        image: '/images/speakers/marcus-link.png',
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
        time: '10h00 CET',
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
        time: '11h30 CET',
        image: '/images/speakers/david-lorimer.png',
        bio: 'David Lorimer is a writer, lecturer, and editor known for his work in philosophy and education. He is the Programme Director of the Scientific and Medical Network and has authored several books on topics related to science and spirituality.',
      },
    ],
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
        time: '10h30 CET',
        image: '/images/speakers/rhett-gayle.png',
        bio: 'Dr Rhett Gayle is a researcher, educator and philosopher who has taught at the University of Colorado and is author of several academic papers on topics ranging from Befriending Wisdom to Self-transformation.',
      },
      {
        speaker: 'Dr Claudius van Wyk',
        slug: 'claudius-van-wyk',
        title: 'Holism & Ethics: Choosing the Way of Alignment',
        subtitle: 'Why Doing the Right Thing Dynamically Supports the Whole and the Parts',
        description:
          'In a world of moral confusion and competing ideologies, Jan Smuts\' holistic ethic reminds us that doing the right thing is generally the right thing to do. This talk explores how ethical action rooted in wholeness can align individual choices with the well-being of society, the planet, and ourselves.',
        time: '11h30 CET',
        image: '/images/speakers/claudius-van-wyk.png',
        bio: 'As a life-long scholar of holism, Claudius has enjoyed a career in executive coaching and organisational consultation offering strategic transformation facilitation for over 25 years. He applies complexity-theory insights to strategic management and leadership focused on wellness and sustainability. His expertise is applying Holistic Systems Practice to promote engagement and resilience in the dynamic world.',
      },
    ],
  },
]

/** Flat list of all speaker slugs — used for pre-rendering routes */
export const allSpeakerSlugs: string[] = days.flatMap(d => d.events.map(e => e.slug))

/** Find a speaker event + its day by slug */
export function findSpeakerBySlug(slug: string) {
  for (const day of days) {
    const event = day.events.find(e => e.slug === slug)
    if (event) return { event, day }
  }
  return null
}
