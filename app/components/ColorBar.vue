<template>
  <div class="h-2 w-full flex">
    <div
      v-for="(color, i) in repeatedColors"
      :key="i"
      class="h-full w-[60px] shrink-0"
      :style="{ backgroundColor: color }"
    />
  </div>
</template>

<script setup lang="ts">
const palette = ['#DDC66E', '#6EB189', '#62BDB1', '#7CA5DD', '#A27CB8']

// Repeat enough times to always fill the viewport
const repeatedColors = Array.from({ length: 80 }, (_, i) => palette[i % palette.length])
</script>
