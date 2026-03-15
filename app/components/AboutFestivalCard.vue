<template>
  <div id="about-festival" class="min-[860px]:bg-white min-[860px]:rounded-xl min-[860px]:shadow-[0_8px_40px_rgba(0,0,0,0.08)] w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-4 min-[860px]:px-8 md:px-12 py-8 min-[860px]:py-14">
    <!-- Header -->
    <h2 class="text-4xl lg:text-5xl font-condensed font-bold uppercase tracking-wide text-trim-teal text-left mb-4">
      More About the Festival
    </h2>
    <a href="#programme" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-condensed font-bold uppercase tracking-wider bg-trim-purple/10 text-trim-purple transition hover:opacity-80 cursor-pointer mb-12">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 16v-4M12 8h.01" /></svg>
      Jump to: The Programme
    </a>

    <!-- Full-width Smuts hero image -->
    <div class="mb-10">
      <div class="relative w-full aspect-[1496/766] rounded-xl overflow-hidden">
        <img src="/images/smuts.jpg" alt="Jan Christian Smuts" class="w-full h-full object-cover object-top" />
        <!-- Overlay: 860px+ only -->
        <div class="hidden min-[860px]:block absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="hidden min-[860px]:block absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h3 class="text-xl lg:text-2xl font-condensed font-bold uppercase tracking-wide text-white mb-1">Jan Christian Smuts</h3>
          <p class="text-xl lg:text-2xl font-condensed font-normal uppercase tracking-[0.2em] text-white/70">1870–1950</p>
        </div>
      </div>
      <!-- Caption: below 860px only -->
      <p class="min-[860px]:hidden mt-2 px-1 text-xl lg:text-2xl font-roboto font-normal text-neutral-400">
        — Jan Christian Smuts (1870–1950)
      </p>
    </div>

    <!-- Content below image -->
    <div class="flex flex-col lg:flex-row items-start gap-12 mb-14">
      <!-- Left column -->
      <div class="flex flex-col gap-6 min-w-0 flex-1">
        <p class="text-3xl lg:text-4xl font-condensed font-normal uppercase leading-snug text-neutral-500 tracking-wide">
          The <span class="font-bold text-trim-yellow">2026</span> Festival of <span class="font-bold text-trim-teal">Holism</span> and <span class="font-bold text-trim-green">Evolution</span> explores how holism can guide a <span class="font-bold text-trim-blue">hopeful</span>, <span class="font-bold text-trim-green">regenerative</span> future.
        </p>
        <p class="text-xl font-roboto font-normal text-neutral-600 leading-relaxed">
          We celebrate the visionary legacy of <span class="font-bold text-trim-purple">Jan Christian Smuts</span>, whose 1926 book <span class="italic font-bold text-trim-teal">Holism &amp; Evolution</span> laid the foundational groundwork for holistic thought and human understanding. His life and work continue to inspire holistic practice as a vital guide toward a new era of coherence during times of unprecedented transformation.
        </p>
        <p class="text-xl font-roboto font-normal text-neutral-600 leading-relaxed">
          This first phase of the festival is followed by phase two, a series of informative, interactive, specialist presentations. It culminates in October 2026 with phase three, an <span class="font-bold text-trim-yellow">in-person gathering in South Africa</span>. Gathering in Cape Town we will follow in the footsteps of Smuts' rich and diverse life, that lead to him writing <span class="italic font-bold text-trim-teal">Holism and Evolution</span>.
        </p>
        <div
          class="h-1.5 w-full rounded-full my-4"
          style="background: linear-gradient(to right, #DDC66E, #6EB189, #62BDB1, #7CA5DD, #A27CB8)"
        />
        <NewsletterCard />
        <!-- Claudius van Wyk card -->
        <div
          class="h-1.5 w-full rounded-full my-4"
          style="background: linear-gradient(to right, #DDC66E, #6EB189, #62BDB1, #7CA5DD, #A27CB8)"
        />
        <div class="flex items-center gap-5 flex-wrap">
          <img
            src="/images/speakers/claudius-van-wyk.png"
            alt="Dr Claudius van Wyk"
            class="w-20 h-20 rounded-full object-cover object-top shrink-0"
          />
          <div class="flex-1 min-w-0">
            <p class="text-xl font-roboto font-normal text-neutral-600 leading-relaxed">
              <span class="font-bold text-trim-purple">Holos Earth Academy</span> is convened by <span class="font-bold text-neutral-700 whitespace-nowrap">Dr Claudius van Wyk</span> — Holistic Systems Practice pioneer, author and speaker. Exploring coherence, complexity and the evolution of consciousness.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/claudius-van-wyk-77997b11/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A66C2] text-white text-sm font-roboto font-bold hover:bg-[#004182] transition shrink-0"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Contact Claudius
          </a>
        </div>
      </div>

      <!-- Right column: Saving the Soul quote -->
      <div class="shrink-0 lg:w-[440px]">
        <div class="bg-bg-default rounded-xl px-8 py-10 flex flex-col">
          <h3 class="text-2xl lg:text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-6 text-center">
            Saving the Soul of Civilisation
          </h3>
          <div class="flex">
            <div class="w-1.5 shrink-0 rounded-full bg-[linear-gradient(to_bottom,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)]"></div>
            <div class="pl-8 flex flex-col gap-4">
              <p class="text-xl lg:text-2xl font-roboto font-normal text-neutral-600 leading-relaxed">
                In <span class="italic font-bold text-trim-teal">Holism and Evolution</span>, Smuts warned of the fragmenting world we are experiencing today. He believed that the understanding of Holism would be essential for <span class="font-bold text-trim-purple">"saving the soul of civilisation"</span>. He warned that a purely mechanistic and material view of reality risks separating humanity from the deeper living processes of life.
              </p>
              <p class="text-xl lg:text-2xl font-roboto font-normal text-neutral-600 leading-relaxed">
                In a time when our world once again feels fragmented and uncertain, this insight speaks with renewed relevance.
              </p>
              <p class="text-xl lg:text-2xl font-roboto font-normal text-neutral-600 leading-relaxed">
                The festival highlights lessons from holistic practice and Smuts' thinking to <span class="font-bold text-trim-teal">inspire humanity for the next century</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Three pillars (hidden for now) -->
    <div class="hidden grid-cols-1 md:grid-cols-3 gap-8">
      <!-- What is Holos.Earth? -->
      <div class="bg-bg-default rounded-xl p-8 flex flex-col">
        <div class="w-12 h-12 rounded-full bg-trim-teal flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        </div>
        <h3 class="text-xl font-condensed font-bold uppercase tracking-wide text-trim-teal mb-3">
          What is Holos.Earth?
        </h3>
        <p class="text-base font-roboto font-normal text-neutral-500 leading-relaxed">
          We are building an international network of individuals and organisations to explore how to shift thinking and practice to the holistic perspective. This transformed world-view will better address the complex challenges of the 21st century.
        </p>
      </div>

      <!-- Living A Holistic Life -->
      <div class="bg-bg-default rounded-xl p-8 flex flex-col">
        <div class="w-12 h-12 rounded-full bg-trim-green flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9" />
            <path d="M17 8c-3 0-5 2.5-5 5.5S14 19 17 19s5-2.5 5-5.5S20 8 17 8z" />
          </svg>
        </div>
        <h3 class="text-xl font-condensed font-bold uppercase tracking-wide text-trim-green mb-3">
          Living a Holistic Life
        </h3>
        <p class="text-base font-roboto font-normal text-neutral-500 leading-relaxed">
          Whilst the prevailing mechanistic and materialistic worldview has brought numerous advantages, it is now recognised as having separated us from natural organic life processes. Evaluating the cost of that separation in terms of human life and planetary sustainability is an essential aspect of creating a new compass to navigate by.
        </p>
      </div>

      <!-- Restoring Our Connection -->
      <div class="bg-bg-default rounded-xl p-8 flex flex-col">
        <div class="w-12 h-12 rounded-full bg-trim-purple flex items-center justify-center mb-5">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <h3 class="text-xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-3">
          Restoring Our Connection
        </h3>
        <p class="text-base font-roboto font-normal text-neutral-500 leading-relaxed">
          We are committed to discovering together how to personally live a holistic life to assist with the process of building self-organising communities of practice engaged in applying the holistic perspective. These network nodes will be multidisciplinary, regionally based or distributed around specific communities of interest.
        </p>
      </div>
    </div>

  </div>
</template>
