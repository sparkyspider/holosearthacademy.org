<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14">

    <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-purple text-left mb-4">
      As a Founding Member&hellip;
    </h2>

    <p class="text-xl font-roboto font-normal text-neutral-600 leading-relaxed mb-10">
      Your gift as a festival participant is an invitation to become a founding member of the Holos Earth Alliance.
      As the Alliance grows, members will have access to:
    </p>

    <div class="grid grid-cols-1 min-[860px]:grid-cols-2 lg:grid-cols-3 gap-6">

      <div v-for="benefit in benefits" :key="benefit.title" class="flex items-start gap-4">
        <div :class="['w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5', benefit.bgColor]">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" :d="benefit.icon" />
          </svg>
        </div>
        <div>
          <h3 :class="['text-lg font-condensed font-bold uppercase tracking-wide mb-1', benefit.textColor]">
            {{ benefit.title }}
          </h3>
          <p class="text-base font-roboto font-light text-neutral-500 leading-relaxed">
            {{ benefit.description }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const benefits = [
  {
    title: 'Future Dialogues',
    description: 'Ongoing online conversations exploring the unfolding implications of holism across disciplines.',
    bgColor: 'bg-trim-yellow',
    textColor: 'text-trim-yellow',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    title: 'Session Recordings',
    description: 'Access to recordings of past festival sessions and future Alliance gatherings.',
    bgColor: 'bg-trim-green',
    textColor: 'text-trim-green',
    icon: 'M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  },
  {
    title: 'Collaborative Forums',
    description: 'Spaces to connect, share, and explore with fellow practitioners and thinkers from around the world.',
    bgColor: 'bg-trim-teal',
    textColor: 'text-trim-teal',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Working Groups',
    description: 'Smaller, focused groups exploring how holistic principles apply within specific fields and practices.',
    bgColor: 'bg-trim-blue',
    textColor: 'text-trim-blue',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    title: 'Future Symposia',
    description: 'Invitations to attend in-depth gatherings — online and in person — as the Alliance takes form.',
    bgColor: 'bg-trim-purple',
    textColor: 'text-trim-purple',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]
</script>
