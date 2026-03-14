<template>
  <div class="flex items-center gap-4 md:gap-6">
    <div v-for="unit in units" :key="unit.label" class="flex flex-col items-center">
      <span class="text-4xl md:text-5xl font-condensed font-bold text-trim-teal leading-none">{{ unit.value }}</span>
      <span class="text-xs font-condensed font-normal uppercase tracking-widest text-neutral-400 mt-1">{{ unit.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 20 May 2026 at 19:00 CET (UTC+1) = 18:00 UTC
const targetDate = new Date('2026-05-20T18:00:00Z')

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const units = computed(() => {
  const diff = Math.max(0, targetDate.getTime() - now.value)
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return [
    { value: String(days).padStart(2, '0'), label: 'Days' },
    { value: String(hours).padStart(2, '0'), label: 'Hours' },
    { value: String(minutes).padStart(2, '0'), label: 'Minutes' },
    { value: String(seconds).padStart(2, '0'), label: 'Seconds' },
  ]
})
</script>
