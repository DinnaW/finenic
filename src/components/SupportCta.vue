<script setup>
import { ArrowUpRight, MessageCircle } from 'lucide-vue-next'
import Meteors from './magicui/Meteors.vue'
defineEmits(['contact'])
const phone = import.meta.env.VITE_CONTACT_PHONE?.trim()
const phoneHref = phone ? `tel:${phone.replace(/[^+\d]/g,'')}` : ''
</script>
<template>
  <section class="support-cta" aria-labelledby="support-cta-title">
    <div class="support-cta-panel">
      <Meteors />
      <div class="support-cta-content">
        
        <div class="support-intro"><h2 id="support-cta-title">Need help?<br>We’re here for you.</h2>
        <p>Get advice on domains, apps and setup.<br><template v-if="phone">Call us at <a :href="phoneHref">{{ phone }}</a> or start a chat.</template><template v-else>Start a chat. Let’s find your next step.</template></p>
        <div class="support-cta-actions"><button @click="$emit('contact')"><MessageCircle :size="17" aria-hidden="true"/> Contact us</button><a href="#faq">Help Center <ArrowUpRight :size="17"/></a></div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.support-cta { padding:clamp(32px,4vw,72px) var(--section-gutter); background:linear-gradient(#edf4fa,#fff); }
.support-cta-panel { position:relative; isolation:isolate; overflow:hidden; max-width:var(--section-width); margin:auto; border:1px solid #d6e3ed; border-radius:22px; }
.support-cta-content h2 { grid-row:span 2; align-self:center; margin:0; color:#111c28; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:1.12; }
.support-cta-content p { margin:0; color:#475967; font-size:var(--type-description); line-height:1.7; }
.support-cta-content p a { text-decoration:underline; text-underline-offset:3px; }
.support-cta-actions { display:flex; flex-wrap:wrap; align-items:center; gap:14px 24px; margin-top:22px; }
.support-cta-actions :is(button,a) { display:inline-flex; align-items:center; justify-content:center; gap:9px; min-height:44px; font-size:14px; font-weight:550; cursor:pointer; }
.support-cta-actions button { border-radius:99px; padding:0 21px; background:#182838; color:white; }
.support-cta-actions button:hover { background:#29445a; }
.support-cta-actions>a { color:#253b4e; text-decoration:underline; text-decoration-color:#9bb0bf; text-underline-offset:5px; }
.support-cta :is(a,button):focus-visible { outline:2px solid #27689b; outline-offset:4px; }
.support-cta-panel {
 --meteor-ink:#69869e;
 background:
   radial-gradient(ellipse at 50% 10%,#fff 12%,#ffffffc2 41%,transparent 73%),
   linear-gradient(158deg,#edf4fa 0%,#fff 48%,#edf4fa 84%);
}
.support-cta-panel::before {
 content:''; position:absolute; inset:0; pointer-events:none;
 background:
   radial-gradient(ellipse 90% 150% at 0% -63%,transparent 78%,#c7d6e1 78.3%,#e3ebf1 79%,transparent 87%),
   radial-gradient(ellipse 96% 160% at 100% 170%,transparent 70%,#c0d1df 70.4%,#dbe6ee 71%,transparent 84%);
 mask-image:linear-gradient(90deg,#000 4%,transparent 46%,transparent 56%,#000 98%);
}
.support-cta-content { position:relative; display:block; padding:clamp(58px,7vw,122px) 22px; text-align:center; }
.support-intro { width:fit-content; max-width:100%; margin:auto; }
.support-intro p { margin-top:18px; }
.support-cta-actions { justify-content:center; }
</style>