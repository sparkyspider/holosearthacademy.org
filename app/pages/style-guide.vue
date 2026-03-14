<template>
  <div class="min-h-screen bg-bg-default p-12">
    <h1 class="text-3xl font-bold text-gray-800 mb-10">Style Guide</h1>

    <!-- Colour Palette -->
    <section class="mb-12">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Colour Palette</h2>

      <!-- Background colours -->
      <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">Background</h3>
      <div class="flex flex-col mb-6 overflow-hidden rounded-lg shadow-sm border border-gray-200 w-96">
        <div class="flex items-stretch h-14">
          <div class="w-20 shrink-0 bg-bg-default border-r border-gray-200"></div>
          <div class="flex flex-col justify-center px-4">
            <span class="text-sm font-semibold text-gray-700">bg-default</span>
            <span class="text-xs text-gray-400">#F1F0F0</span>
          </div>
        </div>
      </div>

      <!-- Trim colours -->
      <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">Trim</h3>
      <div class="flex flex-col overflow-hidden rounded-lg shadow-sm border border-gray-200 w-96">
        <div v-for="(swatch, index) in trimSwatches" :key="swatch.name"
          class="flex items-stretch h-14"
          :class="{ 'border-t border-gray-200': index > 0 }">
          <div class="w-20 shrink-0" :class="swatch.bgClass"></div>
          <div class="flex flex-col justify-center px-4">
            <span class="text-sm font-semibold text-gray-700">trim-{{ swatch.name }}</span>
            <span class="text-xs text-gray-400">{{ swatch.hex }}</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const trimSwatches = [
  { name: 'purple', hex: '#8B5CA6', bgClass: 'bg-trim-purple' },
  { name: 'blue',   hex: '#5B8FD4', bgClass: 'bg-trim-blue'   },
  { name: 'teal',   hex: '#3BAD9E', bgClass: 'bg-trim-teal'   },
  { name: 'green',  hex: '#4A9E6B', bgClass: 'bg-trim-green'  },
  { name: 'yellow', hex: '#D4B84A', bgClass: 'bg-trim-yellow' },
]
</script>
