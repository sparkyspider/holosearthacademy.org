<template>
  <div class="min-h-[100dvh] bg-neutral-100 flex items-start justify-center px-4 py-10 min-[860px]:py-16">
    <div class="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-8 min-[860px]:p-12">
      <h1 class="text-3xl font-condensed font-bold uppercase tracking-wide text-trim-purple mb-6">
        Privacy
      </h1>

      <section v-for="s in sections" :key="s.title" class="mb-8">
        <h2 class="text-xl font-condensed font-bold uppercase tracking-wide text-trim-teal mb-2">
          {{ s.title }}
        </h2>
        <p
          v-for="(line, i) in s.lines"
          :key="i"
          class="text-base font-roboto font-light text-neutral-600 leading-relaxed mb-2"
        >
          {{ line }}
        </p>
      </section>

      <p class="text-base font-roboto font-light text-neutral-600 leading-relaxed">
        Questions: <a href="mailto:info@holosearthacademy.org" class="underline text-trim-purple">info@holosearthacademy.org</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Privacy | Holos Earth Academy' })

const sections = [
  {
    title: 'What you give us',
    lines: [
      'You can register for the festival or sign up for event alerts.',
      'We ask for your name and email address.',
      'You can also tick the events you want to hear about.',
      'These are Festival Phase II – Specialist Presentations, Festival Phase III – South African Pilgrimage, Holistic Systems Practice Training and Claudius\' Book Release.',
      'If you join the Holos Earth Alliance, we also keep your profession, interests and how you heard about us. These are optional.',
      'When you add an event to your calendar, we note which event and which calendar.',
    ],
  },
  {
    title: 'What we record automatically',
    lines: [
      'With each form we store the date, which form you used, your IP address and your browser details.',
      'We use these to block spam.',
      'Your name, email and ID are kept in your browser\'s local storage, so the forms fill in next time. It also remembers which events you registered for and added to your calendar.',
      'Our own code sets no cookies.',
    ],
  },
  {
    title: 'Why we use it',
    lines: [
      'We use it to send you the festival emails and reminders you asked for.',
      'We also use it to tell you about the events you ticked.',
    ],
  },
  {
    title: 'Emails',
    lines: [
      'We send email through Amazon SES in Ireland, from info@holosearthacademy.org.',
      'Links in our emails pass through an Amazon address, awstrack.me.',
      'Our emails also carry a tiny image that tells Amazon when an email is opened.',
      'Amazon counts opens and clicks.',
    ],
  },
  {
    title: 'Google Analytics',
    lines: [
      'This site uses Google Analytics to count visits and clicks.',
      'It loads on every page and may set its own cookies.',
      'To opt out, use a tracking blocker in your browser or Google\'s opt-out add-on.',
    ],
  },
  {
    title: 'Where it is kept and who sees it',
    lines: [
      'Your details sit in a database on Amazon Web Services in Ireland.',
      'Each new registration is emailed to Mark, Claudius and Michelle.',
      'Replies to info@holosearthacademy.org are forwarded by ImprovMX to Claudius\'s Gmail inbox.',
    ],
  },
  {
    title: 'Opting out',
    lines: [
      'Our newsletters and reminders have an unsubscribe link. It leads to holosearthacademy.org/unsubscribe.',
      'After you unsubscribe, we stop sending you newsletters and reminders. We keep your address, marked as unsubscribed.',
      'To ask about your data, write to us at the address below.',
    ],
  },
  {
    title: 'Who is responsible',
    lines: [],
  },
]
</script>
