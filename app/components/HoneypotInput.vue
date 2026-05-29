<template>
  <!--
    Honeypot. CSS-hidden so a real human never sees or focuses it; left in the
    DOM with a plausible-looking name attribute so bots that "fill all inputs"
    populate it. The server rejects any submission where this comes back
    non-empty. See form_to_database.py → check_honeypot.
  -->
  <input
    :value="modelValue"
    @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    type="text"
    name="country"
    autocomplete="off"
    tabindex="-1"
    aria-hidden="true"
    class="absolute left-[-9999px] top-auto w-px h-px opacity-0 pointer-events-none"
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
