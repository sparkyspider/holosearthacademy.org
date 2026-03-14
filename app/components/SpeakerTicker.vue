<template>
  <div class="bg-black/50 overflow-hidden">
    <div class="flex w-max animate-ticker hover:[animation-play-state:paused]">
      <div v-for="(_, setIndex) in 2" :key="setIndex" class="flex shrink-0">
        <div
          v-for="speaker in speakers"
          :key="`${setIndex}-${speaker.name}`"
          class="flex items-center gap-4 px-10 py-5"
        >
          <img
            :src="speaker.image"
            :alt="speaker.name"
            class="w-[4.5rem] h-[4.5rem] rounded-lg object-cover object-top shrink-0"
          />
          <div>
            <div class="text-white text-lg font-roboto font-normal leading-tight whitespace-nowrap">{{ speaker.name }}</div>
            <div class="text-white/80 text-sm font-roboto font-normal leading-snug">{{ speaker.line1 }}<br />{{ speaker.line2 }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const speakers = [
  { name: 'Prof Kobus Du Pisani', image: '/images/speakers/kobus-du-pisani.png', line1: 'Smuts Scholar', line2: '& Historian' },
  { name: 'Jeff Blumberg', image: '/images/speakers/jeff-blumberg.png', line1: 'Author on Holism', line2: '& Evolution' },
  { name: 'Marcus Link', image: '/images/speakers/marcus-link.png', line1: 'Founder', line2: 'Ecological Intelligence' },
  { name: 'Dr Jude Currivan', image: '/images/speakers/jude-currivan.png', line1: 'Cosmologist', line2: 'WholeWorld-View Co-founder' },
  { name: 'David Lorimer', image: '/images/speakers/david-lorimer.png', line1: 'Programme Director', line2: 'Scientific & Medical Network' },
  { name: 'Dr Rhett Gayle', image: '/images/speakers/rhett-gayle.png', line1: 'Philosopher', line2: '& Wisdom Researcher' },
  { name: 'Dr Claudius van Wyk', image: '/images/speakers/claudius-van-wyk.png', line1: 'Holistic Systems', line2: 'Practice Expert' },
]
</script>
