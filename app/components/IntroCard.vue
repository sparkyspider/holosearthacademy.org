<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14 flex flex-col lg:flex-row items-center lg:items-start gap-10">
    <!-- Left: Tagline + presented by logo -->
    <div class="flex flex-col items-center gap-6 lg:items-start min-w-0">
      <p class="text-3xl lg:text-4xl font-condensed font-normal uppercase leading-snug text-neutral-500 text-center lg:text-left tracking-wide">
        A <span class="font-bold text-trim-yellow">free</span> <span class="font-bold text-trim-yellow">online</span> global <span class="font-bold text-trim-blue">dialogue</span> on the meaning and application of <span class="font-bold text-trim-teal">holism</span> in an
        age of <span class="font-bold text-trim-purple">fragmentation</span> and <span class="font-bold text-trim-green">transformation</span>.
      </p>
      <div class="flex flex-col items-center self-center mt-6">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400 mb-2">presented by</span>
        <img src="/images/holos-logo.svg" alt="Holos Earth" class="w-36 md:w-48" />
      </div>
    </div>

    <!-- Right: Quote -->
    <div class="flex shrink-0 lg:w-[440px]">
      <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
      <div class="pl-8">
        <p class="text-xl lg:text-2xl font-roboto font-normal leading-relaxed text-neutral-600">
          <span class="text-6xl md:text-7xl font-condensed font-bold text-trim-teal leading-none float-left mr-3 -mt-1">100</span>
          years ago Jan Christian Smuts published his seminal work
          <span class="font-bold text-trim-purple">Holism and Evolution</span>.
          During the festival we will explore the scientific relevance, and spiritual dimension of holism in the 21st century.
          We will honour the legacy of Jan Christian Smuts and contribute to the continuing evolution of holistic understanding.
        </p>
      </div>
    </div>
  </div>
</template>
