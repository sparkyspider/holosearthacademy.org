<template>
  <div
    class="relative z-10 hidden min-[860px]:flex items-end gap-1.5 w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl px-3"
  >
    <NuxtLink
      v-for="tab in tabs"
      :key="tab.key"
      :to="tab.path"
      :class="[
        'px-6 py-2.5 rounded-t-lg font-condensed font-bold text-sm uppercase tracking-wider transition-colors',
        tab.key === current ? 'bg-white' : 'bg-neutral-100 hover:bg-neutral-50',
        tab.key === current ? tab.activeColor : tab.inactiveColor,
      ]"
    >
      {{ tab.label }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ current: 'P1' | 'P2' | 'Alliance' }>()

const tabs = [
  { key: 'P2',       label: 'Phase Two',  path: '/',         activeColor: 'text-trim-purple', inactiveColor: 'text-trim-purple/60' },
  { key: 'P1',       label: 'Phase One',  path: '/phase-1',  activeColor: 'text-trim-teal',   inactiveColor: 'text-trim-teal/60'   },
  { key: 'Alliance', label: 'Alliance', path: '/alliance', activeColor: 'text-trim-blue',   inactiveColor: 'text-trim-blue/60'   },
]
</script>
