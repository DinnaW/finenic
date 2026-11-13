<script setup>
import { ref } from 'vue'
import { ArrowUpRight, ArrowRight } from 'lucide-vue-next'
import SpecularButton from './specular/SpecularButton.vue'

const base = import.meta.env.BASE_URL
const notice = ref('')
const destinations = {
  start: import.meta.env.VITE_SIGNUP_URL,
  plans: import.meta.env.VITE_PLANS_URL,
}
const services = [
  {
    title: 'Bookings & appointments',
    image: 'salon',
    alt: 'A stylist welcoming a client at a salon',
    lead: 'Make it easy to book.',
    copy: 'From salon appointments to hotel stays, give customers a direct way to reserve through your website.',
  },
  {
    title: 'Online store + POS',
    image: 'store',
    alt: 'Clothing displayed in an independent shop',
    lead: 'Your shop, wherever people buy.',
    copy: 'Bring your online storefront and point of sale together, so your website works alongside your physical store.',
  },
  {
    title: 'Food ordering',
    image: 'food',
    alt: 'A restaurant ready to welcome guests',
    lead: 'From your menu to their next order.',
    copy: 'Give your food a home online, with a clear menu and a simple way for customers to order directly from you.',
  },
  {
    title: 'CRM & lead manager',
    image: 'crm',
    alt: 'A team working together around a table',
    lead: 'Keep the conversation moving.',
    copy: 'Bring enquiries and customer relationships into one place. Turn a first visit into a connection you can build on.',
  },
]

function act(type) {
  if (destinations[type]) window.location.assign(destinations[type])
  else notice.value = type === 'start'
    ? 'Free signup is coming soon.'
    : 'Plans and pricing are coming soon.'
}
</script>

<template>
  <section class="business-services" aria-labelledby="services-heading">
    <div class="services-inner">
      <div class="services-guides" aria-hidden="true"><span v-for="line in 6" :key="line"></span></div>
      <header class="services-header">
        <h2 id="services-heading">A website that<br>works for you.</h2>
        <div class="services-intro">
          <p>More than a place to be found. A website and business app that bring your bookings, sales and customers together.</p>
          <div class="services-actions">
            <SpecularButton @click="act('start')">Start for free <ArrowUpRight :size="18" aria-hidden="true" /></SpecularButton>
            <button class="services-plans" @click="act('plans')">See plans <ArrowRight :size="17" aria-hidden="true" /></button>
          </div>
          <p v-if="notice" class="services-notice" role="status">{{ notice }}</p>
        </div>
      </header>

      <div class="services-list">
        <article v-for="service in services" :key="service.image" class="service-row">
          <h3>{{ service.title }}</h3>
          <img :src="`${base}images/business/${service.image}.jpg`" :alt="service.alt" width="160" height="160" loading="lazy" decoding="async">
          <p><strong>{{ service.lead }}</strong> {{ service.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.business-services {
  --services-paper: #f1f1f1;
  --services-ink: #000;
  --services-muted: #000;
  --services-guide: #2e2e2e18;
  position: relative;
  padding: 0 5vw;
  background: var(--services-paper);
  color: var(--services-ink);
  color-scheme: light;
}
.services-inner {
  position: relative;
  max-width: 1680px;
  margin-inline: auto;
  padding-block: clamp(64px, 6.5vw, 120px) clamp(48px, 5vw, 90px);
}
.services-guides {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  border-right: 1px solid var(--services-guide);
  pointer-events: none;
}
.services-guides span { border-left: 1px solid var(--services-guide); }
.services-header {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr clamp(76px, 8vw, 136px) 1fr;
  gap: 2vw;
  align-items: start;
  padding-bottom: clamp(36px, 4vw, 72px);
}
.services-header h2 {
  grid-column: 1 / 3;
  margin: 0;
  font-size: clamp(36px, 4.1vw, 68px);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -.035em;
}
.services-intro > p {
  margin: 0;
  max-width: 39ch;
  font-size: clamp(14px, 1.05vw, 18px);
  line-height: 1.7;
  color: var(--services-muted);
}
.services-actions { display: flex; flex-wrap: wrap; align-items: center; gap: clamp(18px, 2vw, 32px); margin-top: clamp(20px, 2vw, 32px); }
.services-plans { display: inline-flex; justify-content: center; align-items: center; gap: 16px; min-height: 46px; font-size: 13px; font-weight: 600; }
.services-plans { color:#fff; background:#111; border-radius:999px; padding-inline:22px; min-height:54px; }
.services-plans:hover { color:#fff; background:#333; }
.services-intro .services-notice { font-size: 12px; margin-top: 14px; }
.service-row {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr clamp(76px, 8vw, 136px) 1fr;
  gap: 2vw;
  align-items: start;
  padding-block: clamp(20px, 1.8vw, 32px);
  border-top: 1px solid #2e2e2e80;
}
.service-row:last-child { border-bottom: 1px solid #2e2e2e80; }
.service-row h3 { margin: 0; font-size: clamp(21px, 1.95vw, 32px); font-weight: 450; line-height: 1.25; letter-spacing: -.03em; }
.service-row img { display: block; width: 100%; aspect-ratio: 1; height: auto; object-fit: cover; border-radius: 2px; }
.service-row p { margin: 0; max-width: 45ch; font-size: clamp(14px, 1.02vw, 17px); line-height: 1.65; color: var(--services-muted); }
.service-row strong { font-weight: 500; color: var(--services-ink); }
.business-services button:focus-visible { outline: 2px solid #6a6a6a; outline-offset: 5px; }
.business-services ::selection { background: #ebebeb; color: #484848; }
@media (max-width: 1000px) {
  .services-header { grid-template-columns: 1fr 1fr; gap: 5vw; }
  .services-header h2 { grid-column: auto; }
  .service-row { grid-template-columns: 1fr clamp(76px, 10vw, 100px) 1.15fr; }
  .service-row h3 { font-size: clamp(20px, 2.5vw, 26px); }
}
@media (max-width: 620px) {
  .business-services { padding-inline: 6vw; }
  .services-inner { padding-block: 14vw 10vw; }
  .services-header { grid-template-columns: 1fr; gap: 6vw; padding-bottom: 9vw; }
  .services-header h2 { font-size: clamp(34px, 9vw, 44px); }
  .services-intro > p { max-width: 39ch; }
  .services-actions { margin-top: 6vw; }
  .services-guides { grid-template-columns: repeat(3, 1fr); --services-guide: #2e2e2e10; }
  .services-guides span:nth-child(n + 4) { display: none; }
  .service-row { grid-template-columns: 1fr 20vw; gap: 4vw; padding-block: 6vw; }
  .service-row h3 { font-size: clamp(20px, 5.5vw, 27px); padding-right: 2vw; }
  .service-row img { grid-column: 2; grid-row: 1 / 3; }
  .service-row p { grid-column: 1; font-size: 13px; line-height: 1.65; }
}
</style>
