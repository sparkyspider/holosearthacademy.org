<template>
  <div class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14 flex flex-col lg:flex-row items-center lg:items-start gap-10">

    <!-- Left: "Previously" recap + Phase Two tagline (replaces "A free online…") -->
    <div class="flex flex-col items-center gap-6 lg:items-start min-w-0">

      <!-- Phase Two tagline — the lead message, matches original IntroCard typography -->
      <p class="text-3xl lg:text-4xl font-condensed font-normal uppercase leading-snug text-neutral-500 text-center lg:text-left tracking-wide">
        In <span class="font-bold text-trim-purple">Phase Two</span>, we turn to the
        <span class="font-bold text-trim-yellow">embodiment</span> of holism &mdash;
        bringing <span class="font-bold text-trim-teal">holistic thinking</span> into
        everyday life. Entering a <span class="font-bold text-trim-purple">liminal space</span>,
        we reflect on <span class="font-bold text-trim-blue">being</span> and
        <span class="font-bold text-trim-blue">doing</span>, deepening our
        <span class="font-bold text-trim-green">inwardness</span>, and exploring how
        greater <span class="font-bold text-trim-teal">holistic awareness</span> can
        shape the choices we make and how we respond to the world.
      </p>

      <div class="flex flex-col items-center self-center mt-6">
        <span class="text-xs font-condensed font-normal uppercase tracking-[0.35em] text-neutral-400 mb-2">presented by</span>
        <img src="/images/holos-logo.svg" alt="Holos Earth" class="w-36 md:w-48" />
      </div>
    </div>

    <!-- Right: "Liminal Space" framing with the gradient quote bar -->
    <div class="flex shrink-0 lg:w-[440px]">
      <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
      <div class="pl-8">
        <p class="text-xl lg:text-2xl font-roboto font-normal leading-relaxed text-neutral-600">
          <span class="text-6xl md:text-7xl font-condensed font-bold text-trim-purple leading-none float-left mr-3 -mt-1">A</span>
          <span class="font-bold text-trim-teal">liminal space</span> is a
          <span class="font-bold text-trim-purple">threshold</span> &mdash; a moment between
          what has been and what is emerging. It is a space for inner growth, where we
          deepen <span class="font-bold text-trim-green">inwardness</span> and shift from constant
          <span class="font-bold text-trim-blue">doing</span> to intentional
          <span class="font-bold text-trim-blue">being</span>. Through reflection, our responses
          become more conscious, connected, and grounded in a deeper relationship with the world.
        </p>
      </div>
    </div>

  </div>
</template>
