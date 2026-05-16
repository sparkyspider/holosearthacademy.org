<template>
  <section
    class="relative w-full overflow-hidden h-[400px] min-[860px]:h-[340px]"
    style="text-shadow: 0 0 6px rgba(0,0,0,0.55), 0 0 20px rgba(0,0,0,0.40), 0 0 44px rgba(0,0,0,0.25);"
  >

    <!-- Gradient overlay: darker at top (where the title sits & sky is bright),
         fading to transparent at the bottom so the people / cityscape detail
         comes through clean. Replaces the previous uniform bg-black/30. -->
    <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-transparent"></div>

    <!-- ===================== DESKTOP (860px+) ===================== -->
    <div class="hidden min-[860px]:absolute min-[860px]:inset-0 min-[860px]:flex z-10 items-center">
      <div class="w-full max-w-7xl mx-auto px-16 flex items-center justify-center gap-12">

        <!-- Left: Date (range across two months — 4 stacked rows, centered) -->
        <div class="font-condensed font-light text-white leading-none shrink-0 text-center mt-3">
          <div class="text-[3.1rem]">19 JUN</div>
          <div class="my-2 flex items-center justify-center gap-3">
            <div class="h-px flex-1 bg-white"></div>
            <span class="text-[1.1rem] tracking-[0.25em] leading-none -mr-[0.25em]">TO</span>
            <div class="h-px flex-1 bg-white"></div>
          </div>
          <div class="text-[3.1rem]">28 SEP</div>
          <div class="text-[4.6rem] mt-2">2026</div>
        </div>

        <!-- Right: Title + gradient line + subtitle -->
        <div class="flex flex-col justify-center w-fit">
          <div class="font-condensed font-bold text-white text-[4.25rem] uppercase leading-tight tracking-wide">
            FESTIVAL PHASE 2
          </div>
          <div class="font-condensed font-bold text-white text-[2.93rem] uppercase leading-tight tracking-[0.07em]">
            OF HOLISM &amp; EVOLUTION
          </div>

          <!-- Line -->
          <div class="h-[9px] my-4 w-full bg-white/50 rounded-full"></div>

          <!-- Subtitle: per-letter flex so the visual right edge matches the title -->
          <div class="font-condensed font-bold text-white text-2xl uppercase w-full flex justify-between items-center">
            <span>L</span><span>I</span><span>M</span><span>I</span><span>N</span><span>A</span><span>L</span><span class="w-3"></span><span>S</span><span>P</span><span>A</span><span>C</span><span>E</span>
          </div>
        </div>

      </div>
    </div>

    <!-- ===================== MOBILE / TABLET (below 860px) ===================== -->
    <div class="min-[860px]:hidden absolute inset-0 z-10 flex flex-col justify-center items-center px-10">

      <!-- Wrap everything in a w-fit container so date/bar/subtitle all share the title block's width -->
      <div class="flex flex-col w-fit">

        <!-- Date (single row, justified to fill the title block's width) -->
        <div class="font-condensed font-light text-white leading-tight mb-3 text-[1.35rem] uppercase w-full flex justify-between items-baseline">
          <span>19 JUN</span>
          <span class="tracking-[0.1em]">TO</span>
          <span>28 SEP</span>
          <span>2026</span>
        </div>

        <!-- Title lines -->
        <div class="font-condensed font-bold text-white text-[3.44rem] uppercase leading-tight text-center">FESTIVAL</div>
        <div class="font-condensed font-bold text-white text-[3.9rem] uppercase leading-tight text-center">PHASE 2</div>
        <div class="font-condensed font-bold text-white text-[3.35rem] uppercase leading-tight text-center">HOLISM &amp;</div>
        <div class="font-condensed font-bold text-white text-[2.85rem] uppercase leading-tight text-center">EVOLUTION</div>

        <!-- Line — width matches widest title line above -->
        <div class="h-[6px] my-3 w-full bg-white/50 rounded-full"></div>

        <!-- Subtitle: per-letter flex so the visual edges align with the title bar -->
        <div class="font-condensed font-bold text-white text-[0.857rem] uppercase w-full flex justify-between items-center">
          <span>L</span><span>I</span><span>M</span><span>I</span><span>N</span><span>A</span><span>L</span><span class="w-2"></span><span>S</span><span>P</span><span>A</span><span>C</span><span>E</span>
        </div>

      </div>

    </div>

  </section>
</template>
