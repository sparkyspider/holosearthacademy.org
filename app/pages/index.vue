<template>
  <div class="min-h-screen bg-bg-default">

    <!-- Hero Banner -->
    <section class="relative w-full h-[480px] overflow-hidden">

      <!-- Background image -->
      <img
        src="/space-option-1.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover object-center"
      />

      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Content -->
      <div class="relative z-10 flex items-center h-full">
        <div class="w-full max-w-7xl mx-auto px-8 flex items-center gap-14">

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

            <!-- Gradient line cycling through trim colours -->
            <div class="h-[9px] my-4 w-[calc(100%-0.5rem)] bg-[linear-gradient(to_right,#DDC66E,#6EB189,#62BDB1,#7CA5DD,#A27CB8)] rounded-full"></div>

            <!-- Subtitle -->
            <div class="font-condensed font-normal text-white text-2xl tracking-[0.442em] uppercase">
              A NEW HOPE FOR THE FUTURE
            </div>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>
<script setup lang="ts">
</script>