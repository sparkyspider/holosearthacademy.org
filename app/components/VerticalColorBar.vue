<template>
  <div class="w-2 shrink-0 overflow-hidden">
    <div
      v-for="(color, i) in repeatedColors"
      :key="i"
      class="w-full h-[60px] shrink-0"
      :style="{ backgroundColor: color }"
    />
  </div>
</template>

<script setup lang="ts">
const palette = ['#DDC66E', '#6EB189', '#62BDB1', '#7CA5DD', '#A27CB8']

// Repeat enough times to fill any reasonable page height
const repeatedColors = Array.from({ length: 80 }, (_, i) => palette[i % palette.length])
</script>
