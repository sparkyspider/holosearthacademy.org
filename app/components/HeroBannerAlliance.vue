<template>
  <section
    class="relative w-full overflow-hidden h-[540px] min-[860px]:h-[500px]"
    style="text-shadow: 0 0 6px rgba(0,0,0,0.55), 0 0 20px rgba(0,0,0,0.40), 0 0 44px rgba(0,0,0,0.25);"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-transparent"></div>

    <!-- DESKTOP (860px+) -->
    <div class="hidden min-[860px]:absolute min-[860px]:inset-0 min-[860px]:flex z-10 items-center">
      <div class="w-full max-w-7xl mx-auto px-16 flex items-center justify-between">

        <!-- Left: eyebrow + tag -->
        <div class="font-condensed text-white leading-none shrink-0 text-center">
          <div class="text-xs font-normal uppercase tracking-[0.4em] text-white/70 mb-3">Centenary Festival of Holism &amp; Evolution</div>
          <div class="font-light text-[1.25rem] uppercase tracking-[0.2em] text-white/80">
            Continuing the Inquiry
          </div>
        </div>

        <!-- Right: Title + line + subtitle -->
        <div class="flex flex-col justify-center w-fit">
          <div class="font-condensed font-bold text-white text-[4.25rem] uppercase leading-tight tracking-wide">
            HOLOS EARTH
          </div>
          <div class="font-condensed font-bold text-white text-[4.25rem] uppercase leading-tight w-full flex justify-between items-center">
            <span>A</span><span>L</span><span>L</span><span>I</span><span>A</span><span>N</span><span>C</span><span>E</span>
          </div>

          <div class="h-[9px] my-4 w-full bg-white/50 rounded-full"></div>

          <div class="font-condensed font-normal text-white text-2xl uppercase w-full flex justify-between items-center">
            <span>F</span><span>O</span><span>U</span><span>N</span><span>D</span><span>I</span><span>N</span><span>G</span>
            <span class="w-3"></span>
            <span>M</span><span>E</span><span>M</span><span>B</span><span>E</span><span>R</span><span>S</span>
          </div>
        </div>

      </div>
    </div>

    <!-- MOBILE / TABLET (below 860px) -->
    <div class="min-[860px]:hidden absolute inset-0 z-10 flex flex-col justify-center items-center px-10">
      <div class="flex flex-col w-fit">

        <div class="font-condensed font-normal text-white/70 text-sm uppercase tracking-[0.2em] text-center mb-3">
          Continuing the Inquiry
        </div>

        <div class="font-condensed font-bold text-white text-[3.44rem] uppercase leading-tight text-center">HOLOS EARTH</div>
        <div class="font-condensed font-bold text-white text-[3.44rem] uppercase leading-tight w-full flex justify-between items-center">
          <span>A</span><span>L</span><span>L</span><span>I</span><span>A</span><span>N</span><span>C</span><span>E</span>
        </div>

        <div class="h-[6px] my-3 w-full bg-white/50 rounded-full"></div>

        <div class="font-condensed font-normal text-white text-[0.857rem] uppercase w-full flex justify-between items-center">
          <span>F</span><span>O</span><span>U</span><span>N</span><span>D</span><span>I</span><span>N</span><span>G</span>
          <span class="w-2"></span>
          <span>M</span><span>E</span><span>M</span><span>B</span><span>E</span><span>R</span><span>S</span>
        </div>

      </div>
    </div>

  </section>
</template>
