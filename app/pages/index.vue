<template>
  <div class="min-h-screen bg-bg-default">

    <!-- Hero Banner -->
    <section class="relative w-full overflow-hidden h-[340px]">

      <!-- Background image -->
      <img
        src="/space-option-1.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- ===================== DESKTOP (lg: 1024px+) ===================== -->
      <div class="hidden lg:absolute lg:inset-0 lg:flex z-10 items-center">
        <div class="w-full max-w-7xl mx-auto px-16 flex items-center gap-12">

          <!-- Left: Date -->
          <div class="font-condensed font-light text-white leading-none shrink-0 text-right">
            <div class="text-[3.2rem]">20-24</div>
            <div class="text-[4.0rem]">MAY</div>
            <div class="text-[3.7rem]">2026</div>
          </div>

          <!-- Right: Title + gradient line + subtitle -->
          <div class="flex flex-col justify-center w-fit">
            <div class="font-condensed font-bold text-white text-5xl uppercase leading-tight tracking-wide">
              INTERNATIONAL FESTIVAL
            </div>
            <div class="font-condensed font-bold text-white text-[2.93rem] uppercase leading-tight tracking-[0.07em]">
              OF HOLISM &amp; EVOLUTION
            </div>

            <!-- Gradient line -->
            <div class="h-[9px] my-4 w-[calc(100%-0.5rem)] bg-[linear-gradient(to_right,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)] rounded-full"></div>

            <!-- Subtitle -->
            <div class="font-condensed font-normal text-white text-2xl tracking-[0.442em] uppercase">
              A NEW HOPE FOR THE FUTURE
            </div>
          </div>

        </div>
      </div>

      <!-- ===================== MOBILE / TABLET (below lg: < 1024px) ===================== -->
      <div class="lg:hidden absolute inset-0 z-10 flex flex-col justify-center items-center px-10">

        <!-- Date (single row) -->
        <div class="font-condensed font-light text-white leading-none mb-3 text-[1.55rem] tracking-wide uppercase text-center">
          20-24 &nbsp;·&nbsp; MAY &nbsp;·&nbsp; 2026
        </div>

        <!-- Title lines + bar: w-fit so bar width matches the widest title line -->
        <div class="flex flex-col w-fit">
          <div class="font-condensed font-bold text-white text-[2rem] uppercase leading-tight text-center">INTERNATIONAL</div>
          <div class="font-condensed font-bold text-white text-[2.6rem] uppercase leading-tight text-center">FESTIVAL OF</div>
          <div class="font-condensed font-bold text-white text-[3.35rem] uppercase leading-tight text-center">HOLISM &amp;</div>
          <div class="font-condensed font-bold text-white text-[2.85rem] uppercase leading-tight text-center">EVOLUTION</div>

          <!-- Gradient line — width matches widest title line above -->
          <div class="h-[6px] my-3 w-full bg-[linear-gradient(to_right,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)] rounded-full"></div>
        </div>

        <!-- Subtitle -->
        <div class="font-condensed font-normal text-white text-[0.857rem] tracking-[0.15em] uppercase text-center">
          A NEW HOPE FOR THE FUTURE
        </div>

      </div>

    </section>

  </div>
</template>
<script setup lang="ts">
</script>
