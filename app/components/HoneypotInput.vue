<template>
  <!--
    Honeypot. CSS-hidden so a real human never sees or focuses it; left in the
    DOM with a plausible-looking name attribute so bots that "fill all inputs"
    populate it. The server rejects any submission where this comes back
    non-empty. See form_to_database.py → check_honeypot.

    The name attribute must NEVER be an autofill-recognised field name
    (country, address, phone, name, email, etc.). Chrome address autofill
    fills such fields even with autocomplete="off", so the server sees a
    non-empty honeypot and rejects a real user with 403 (incident 2026-10-21).
    The JSON key "country" is set by the consumers (RegistrationModal,
    NewsletterCard, JoinAllianceModal) from the v-model, to match the Lambda's
    HONEYPOT_FIELDS. It does not depend on this input's name attribute.
  -->
  <input
    :value="modelValue"
    @input="(e: Event) => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    type="text"
    name="hp_field_7x"
    autocomplete="section-hp nope"
    tabindex="-1"
    aria-hidden="true"
    class="absolute left-[-9999px] top-auto w-px h-px opacity-0 pointer-events-none"
  />
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
