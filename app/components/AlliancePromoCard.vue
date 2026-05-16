<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-10 flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">

    <!-- Left: content -->
    <div class="flex-1 min-w-0 text-center lg:text-left">
      <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400">What comes next</span>
      <h2 class="text-3xl lg:text-4xl font-condensed font-bold uppercase tracking-wide text-trim-purple mt-2 mb-3">
        The Holos Earth Alliance
      </h2>
      <p class="text-xl font-roboto font-normal text-neutral-600 leading-relaxed">
        A <span class="font-bold text-trim-green">living continuation</span> of the inquiry &mdash;
        an evolving network of people exploring the future of
        <span class="font-bold text-trim-teal">holistic thought and practice</span>.
        Become a <span class="font-bold text-trim-purple">founding member</span>.
      </p>
    </div>

    <!-- Right: CTA -->
    <div class="shrink-0">
      <NuxtLink
        to="/alliance"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-trim-purple text-white text-base lg:text-lg font-condensed font-bold uppercase tracking-wider hover:bg-trim-purple/90 transition cursor-pointer"
      >
        Join the Alliance
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12 L14 5 L14 9 L2 9 L2 15 L14 15 L14 19 Z" />
        </svg>
      </NuxtLink>
    </div>

  </div>
</template>
