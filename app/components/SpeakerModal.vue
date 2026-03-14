<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-center justify-center px-6 py-12"
      >
        <!-- Backdrop — click to close, no blur -->
        <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>

        <!-- Modal wrapper — drop-shadow covers the circle + card as one unified shape -->
        <div class="relative z-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <!-- Floating avatar — sits half outside the card -->
          <div class="flex justify-center -mb-20 relative z-20">
            <div :class="['w-40 h-40 rounded-full ring-6 ring-offset-4 ring-offset-white', ringColor]">
              <div class="w-full h-full rounded-full overflow-hidden">
                <img
                  :src="image"
                  :alt="name"
                  class="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>

          <!-- Card body -->
          <div class="bg-white rounded-2xl pt-28 pb-8 px-8 md:px-10 max-w-lg w-full relative">
            <!-- Close button -->
            <button
              @click="$emit('close')"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition z-30 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Speaker name -->
            <h3 class="text-2xl font-condensed font-bold uppercase tracking-wide text-neutral-700 text-center mb-1">
              {{ name }}
            </h3>

            <!-- Talk title -->
            <p v-if="talk" class="text-center mb-4">
              <span class="text-sm font-condensed font-normal uppercase tracking-widest text-neutral-400">Talk: </span>
              <span :class="['text-xl font-condensed font-bold italic tracking-wide', titleColor]">{{ talk }}</span>
            </p>

            <!-- Divider -->
            <div :class="['h-0.5 w-16 mx-auto rounded-full mb-5', bgColor]"></div>

            <!-- Bio -->
            <p class="text-sm font-condensed font-normal uppercase tracking-widest text-neutral-400 text-center mb-1">About the speaker</p>
            <p class="text-lg font-roboto font-light text-neutral-600 leading-relaxed text-center">
              {{ bio }}
            </p>

            <!-- Speaking footer -->
            <div v-if="speakingDate" class="mt-8 pt-6 border-t border-neutral-200 flex flex-col items-center gap-4">
              <p class="text-lg font-condensed font-bold uppercase tracking-wider text-neutral-500">
                Speaking: <span :class="titleColor">{{ speakingDate }}</span>, <span :class="titleColor">{{ speakingTime }}</span>
              </p>
              <AddToCalendar
                :title="talk || ''"
                :speaker="speaker"
                :description="bio"
                :theme="theme"
                :date="eventDate"
                :time="speakingTime"
                :button-class="calendarBtnClass"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  name: string
  image: string
  talk?: string
  bio: string
  ringColor: string
  titleColor?: string
  bgColor?: string
  speakingDate?: string
  speakingTime?: string
  eventDate?: string
  calendarBtnClass?: string
  speaker?: string
  theme?: string
}>()

defineEmits<{
  close: []
}>()
</script>
