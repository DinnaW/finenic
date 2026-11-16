<script setup>
import { ArrowUpRight, MessageCircle } from 'lucide-vue-next'
import MetallicFlow from './ui/MetallicFlow.vue'
defineEmits(['contact'])
const phone = import.meta.env.VITE_CONTACT_PHONE?.trim()
const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g,'')}` : ''
</script>
<template>
  <section class="support-cta" aria-labelledby="support-cta-title">
    <div class="support-cta-panel">
      <MetallicFlow />
      <div class="support-cta-dots" aria-hidden="true"></div>
      <div class="support-cta-content">
        <span class="support-cta-symbol" aria-hidden="true"><MessageCircle :size="23" stroke-width="1.3"/></span>
        <h2 id="support-cta-title">Need help?<br>We’re here for you.</h2>
        <p>Get advice on domains, apps and setup.<br><template v-if="phone">Call us at <a :href="phoneHref">{{ phone }}</a> or start a chat.</template><template v-else>Start a chat. Let’s find your next step.</template></p>
        <div class="support-cta-actions"><button @click="$emit('contact')">Contact us <ArrowUpRight :size="17"/></button><a href="#faq">Help Center <ArrowUpRight :size="17"/></a></div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.support-cta { padding:clamp(28px,3vw,52px) var(--section-gutter) clamp(28px,3vw,52px); background:#edf4fa; }
.support-cta-panel { position:relative; isolation:isolate; overflow:hidden; max-width:var(--section-width); margin:auto; border-radius:22px; border:1px solid #90caf955; background:radial-gradient(ellipse at 0 0,#90caf9,transparent 55%),radial-gradient(ellipse at 100% 100%,#527da6,transparent 55%),#0b1828; box-shadow:inset 0 1px 0 #e3f2fd45; }
.support-cta-panel::after { content:''; position:absolute; inset:0; pointer-events:none; border-radius:inherit; box-shadow:inset 0 1px 0 #ffffff40,inset 0 -1px 0 #ffffff1a; }
.support-cta-dots { position:absolute; inset:0; background-image:radial-gradient(circle,#bbdefb 0.7px,transparent 1px); background-size:9px 9px; opacity:.23; mask-image:linear-gradient(90deg,#000,transparent 42%,transparent 58%,#000); pointer-events:none; }
.support-cta-content { position:relative; padding:clamp(54px,6vw,100px) 24px; text-align:center; color:#fff; background:radial-gradient(ellipse at center,#070b1170,transparent 68%); }
.support-cta-symbol { width:48px; height:48px; display:grid; place-items:center; margin:0 auto 24px; border:1px solid #ffffff40; border-radius:14px; background:linear-gradient(140deg,#ffffff22,#ffffff05); box-shadow:inset 0 1px 0 #ffffff20; color:#edf3f8; }
.support-cta-content h2 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:1.13; color:#fff; }
.support-cta-content p { margin:22px 0 0; font-size:var(--type-description); line-height:1.8; color:#d0d8e0; }.support-cta-content p a { text-decoration:underline; text-underline-offset:4px; }
.support-cta-actions { display:flex; justify-content:center; gap:12px; margin-top:30px; }.support-cta-actions :is(button,a) { display:flex; align-items:center; justify-content:center; gap:24px; min-height:49px; padding:13px 23px; border-radius:100px; font-size:13px; font-weight:600; }.support-cta-actions button { color:#131820; background:linear-gradient(#fff,#e4eaf0); box-shadow:inset 0 1px 0 white,0 3px 10px #0002; }.support-cta-actions>a { color:#fff; border:1px solid #ffffff50; background:#ffffff08; }.support-cta-actions button:hover { background:#fff; }.support-cta-actions>a:hover { background:#ffffff18; }.support-cta :is(a,button):focus-visible { outline:2px solid white; outline-offset:5px; }
@media(max-width:600px) { .support-cta-panel { border-radius:16px; }.support-cta-content { padding:52px 18px; }.support-cta-actions { gap:10px; }.support-cta-actions :is(button,a) { padding:12px 17px; gap:12px; font-size:12px; }.support-cta-dots { background-size:8px 8px; } }
</style>
