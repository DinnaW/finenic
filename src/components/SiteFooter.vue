<script setup>
import { computed, ref } from 'vue'
import { ArrowUpRight, ArrowUp, Globe2, MessageCircle, Grid2X2, Pause, Play } from 'lucide-vue-next'
import DottedWorldMap from './ui/DottedWorldMap.vue'
import FooterMarquee from './ui/FooterMarquee.vue'
const emit = defineEmits(['search-domain','show-messaging','support','hosting','industry'])
const base = import.meta.env.BASE_URL
const group = ref('Industries'), paused = ref(false)
const industries = ['Salon & Spa','Online Store','Restaurants','Hotels','Car Dealers','CRM & Sales','Other Industries']
const services = ['Domains','Business apps','Email & SMS','Hosting']
const ribbon = computed(()=>group.value==='Industries'?industries:services)
function activateItem(index) {
 if (group.value==='Industries') emit('industry',index)
 else if(index===0) emit('search-domain')
 else if(index===1) emit('industry',0)
 else if(index===2) emit('show-messaging')
 else emit('hosting')
}
function backToTop() {
 document.querySelector('.brand')?.focus({preventScroll:true})
 window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
}
</script>

<template>
 <footer class="finenic-footer" aria-label="Finenic footer">
  <div class="footer-inner">
   <div class="footer-grid">
    <aside class="footer-aside">
     <div><p class="footer-label">Start a conversation</p><div class="footer-circles"><button @click="emit('search-domain')" aria-label="Find a domain"><Globe2 :size="18"/></button><button @click="emit('industry',0)" aria-label="Explore business apps"><Grid2X2 :size="17"/></button><button @click="emit('support')" aria-label="Contact and support"><MessageCircle :size="18"/></button></div></div>
     <figure class="footer-photo"><img :src="`${base}images/solutions/domain-cafe.jpg`" alt="A man exploring ideas on his phone at a café" width="1200" height="800" loading="lazy" decoding="async"><figcaption>Big ideas start somewhere.</figcaption></figure>
    </aside>
    <div class="footer-main">
     <div class="footer-directory">
      <nav class="footer-navigation" aria-label="Footer services"><p class="footer-label">Explore Finenic</p><div class="footer-link-grid"><div><a href="#main">Home</a><button @click="emit('search-domain')">Domains</button><button @click="emit('hosting')">Hosting</button></div><div><a href="#business-services">Websites</a><button @click="emit('industry',0)">Business apps</button><button @click="emit('show-messaging')">Email & SMS</button></div><div><a href="#business-journey">Our solutions</a><button @click="emit('industry',0)">Industries</button><button @click="emit('support')">Let’s talk</button></div></div></nav>
      <div class="footer-start"><p class="footer-label">Make it yours</p><p>A name to call your own.<br>A business ready for what’s next.</p><button class="footer-start-button" @click="emit('search-domain')">Find your domain <ArrowUpRight :size="16" aria-hidden="true"/></button></div>
     </div>
     <div class="footer-ribbon">
      <div class="footer-ribbon-controls"><div class="footer-switch" aria-label="Browse by"><button v-for="label in ['Industries','Services']" :key="label" :aria-pressed="group===label" @click="group=label">{{ label }}</button></div><button class="footer-motion-toggle" :aria-label="paused ? 'Resume footer motion' : 'Pause footer motion'" :aria-pressed="paused" @click="paused=!paused"><component :is="paused?Play:Pause" :size="13" aria-hidden="true"/></button></div>
      <FooterMarquee :key="group" :items="ribbon" :label="`Browse ${group.toLowerCase()}`" :paused="paused" @activate="activateItem" />
     </div>
     <div class="footer-details">
      <div class="footer-detail-column"><div><p class="footer-label">Your place online</p><p>From your first domain<br>to your next big chapter.</p><button class="footer-inline" @click="emit('search-domain')">Find your name <ArrowUpRight :size="14" aria-hidden="true"/></button></div><div><p class="footer-label">Built around your business</p><p class="footer-small">Saptify / Cartinno / SaaSBeds<br>Veyogo / Saptivo</p></div></div>
      <div class="footer-detail-column"><div><p class="footer-label">Stay connected</p><button class="footer-detail-link" @click="emit('show-messaging')">Business email & SMS <ArrowUpRight :size="14" aria-hidden="true"/></button><p class="footer-muted">Your name, in every conversation.</p></div><div><p class="footer-label">A little guidance</p><button class="footer-detail-link" @click="emit('support')">Let’s build your next chapter <ArrowUpRight :size="14" aria-hidden="true"/></button></div></div>
      <div class="footer-world" aria-hidden="true"><DottedWorldMap /><span>Your business. A world of possibilities.</span></div>
     </div>
    </div>
   </div>
   <div class="footer-bottom"><span>? {{ new Date().getFullYear() }} Finenic.</span><span>Domains. Websites. Business apps.</span></div>
  </div>
 </footer>
</template>

<style scoped>
.finenic-footer { position:relative; background:linear-gradient(#edf4fa 0, #fff clamp(90px,9vw,150px)); color:#171b22; padding:clamp(70px,8vw,130px) var(--section-gutter) 0; }
.footer-inner { max-width:var(--section-width); margin-inline:auto; }
.footer-main { min-width:0; }
.footer-topline { display:flex; align-items:flex-start; justify-content:space-between; gap:24px; padding-bottom:clamp(30px,3vw,52px); }
.footer-topline>p { font-size:var(--type-description); line-height:1.5; margin:0; letter-spacing:-.02em; }.footer-top { display:flex; align-items:center; gap:20px; color:#626b76; font-size:12px; min-height:44px; }
.footer-grid { display:grid; grid-template-columns:18% minmax(0,1fr); gap:7.5%; }.footer-aside,.footer-main { border-top:1px solid #dfe3e6; padding-top:clamp(32px,3.8vw,64px); }
.footer-aside { display:flex; flex-direction:column; justify-content:space-between; gap:60px; padding-bottom:10px; }.footer-label { margin:0 0 16px; font-size:11px; font-weight:500; color:#69727b; line-height:1.3; }
.footer-circles { display:flex; gap:8px; }.footer-circles>button { width:42px; height:42px; display:grid; place-items:center; border:1px solid #ccd2d7; border-radius:50%; }
.footer-photo { margin:0; }.footer-photo img { width:100%; aspect-ratio:1.45; object-fit:cover; object-position:48% center; filter:grayscale(1); }.footer-photo figcaption { font-size:10px; color:#767f88; margin-top:12px; }
.footer-directory { display:grid; grid-template-columns:1.8fr 1fr; gap:5vw; }.footer-link-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:22px; }.footer-link-grid>div { display:flex; flex-direction:column; align-items:flex-start; gap:2px; }.footer-link-grid a,.footer-link-grid button { font-size:clamp(13px,1.04vw,17px); line-height:1.4; min-height:34px; display:flex; align-items:center; text-align:left; letter-spacing:-.025em; }
.footer-start>p:not(.footer-label) { margin:0 0 20px; font-size:clamp(13px,1vw,16px); line-height:1.6; }.footer-start-button { display:flex; align-items:center; gap:28px; border-radius:99px; background:linear-gradient(#292929,#090909); border:1px solid #363636; box-shadow:inset 0 1px 0 #ffffff35,0 3px 7px #00000012; min-height:44px; padding:0 18px; color:white; font-size:12px; font-weight:550; }
.footer-ribbon-controls { display:flex; align-items:center; gap:12px; margin-bottom:14px; }.footer-ribbon-controls .footer-switch { margin-bottom:0; }.footer-motion-toggle { display:grid; place-items:center; width:36px; height:36px; border-radius:50%; color:#69727b; }.footer-motion-toggle:hover { background:#f2f3f4; }
.footer-ribbon { margin-top:clamp(44px,5vw,84px); border-bottom:1px solid #dfe3e6; padding-bottom:26px; min-width:0; }.footer-switch { display:inline-flex; background:#f2f3f4; padding:4px; border-radius:99px; gap:2px; margin-bottom:14px; }.footer-switch button { min-height:32px; padding:0 15px; border-radius:99px; color:#6d7580; font-size:11px; }.footer-switch [aria-pressed=true] { background:white; color:#252c34; box-shadow:0 1px 3px #1526380a; }
.footer-details { display:grid; grid-template-columns:1fr 1.05fr 1fr; gap:3vw; padding:clamp(32px,3.3vw,56px) 0 0; }.footer-detail-column { display:flex; flex-direction:column; justify-content:space-between; gap:36px; }.footer-detail-column p:not(.footer-label) { font-size:clamp(13px,1.02vw,16px); margin:0; line-height:1.55; letter-spacing:-.02em; }.footer-detail-column .footer-label { margin-bottom:12px; }.footer-inline { display:flex; align-items:center; gap:12px; min-height:40px; margin-top:10px; text-decoration:underline; text-underline-offset:4px; font-size:12px; }.footer-detail-link { display:flex; align-items:center; gap:12px; text-align:left; min-height:30px; font-size:clamp(13px,1.02vw,16px); line-height:1.5; letter-spacing:-.025em; }.footer-detail-column .footer-muted { font-size:11px!important; color:#7c858e; margin-top:8px!important; }.footer-world { align-self:center; color:#a3afba; text-align:center; }.footer-world svg { display:block; width:100%; }.footer-world>span { display:block; font-size:10px; color:#78848e; }

.finenic-footer a { text-decoration:none; }.finenic-footer button { cursor:pointer; }.finenic-footer :is(a,button):focus-visible { outline:2px solid #1976d2; outline-offset:5px; border-radius:3px; }
@media(hover:hover) and (pointer:fine) { .footer-link-grid :is(a,button):hover,.footer-detail-link:hover,.footer-inline:hover { color:#1565c0; }.footer-circles>button:hover { background:#edf6ff; border-color:#b2cbe4; }.footer-top:hover { color:#171b22; }.footer-start-button:hover { background:#303030; } }
@media(max-width:1100px) { .footer-grid { grid-template-columns:18% minmax(0,1fr); gap:5%; }.footer-directory { gap:30px; grid-template-columns:1.5fr 1fr; }.footer-link-grid { gap:14px; }.footer-details { gap:20px; }.footer-circles { gap:5px; }.footer-circles>button { width:36px; height:36px; }.footer-start-button { gap:14px; padding-inline:14px; }.footer-world>span { line-height:1.6; } }
@media(max-width:800px) { .footer-grid { grid-template-columns:1fr; gap:32px; }.footer-aside { display:none; }.footer-directory { grid-template-columns:1.6fr 1fr; }.footer-main { padding-top:32px; }.footer-world svg { min-width:0; }.footer-topline { padding-bottom:26px; }.footer-label { font-size:11px; }.footer-link-grid a,.footer-link-grid button { min-height:40px; font-size:14px; } }
@media(max-width:520px) { .finenic-footer { padding-top:54px; }.footer-topline>p { font-size:14px; }.footer-top { font-size:11px; gap:8px; }.footer-directory { grid-template-columns:1fr; gap:32px; }.footer-start { display:grid; grid-template-columns:1fr auto; gap:0 12px; align-items:center; }.footer-start .footer-label { grid-column:1/-1; margin-bottom:12px; }.footer-start>p:not(.footer-label) { font-size:12px; margin:0; }.footer-start-button { font-size:11px; gap:9px; padding-inline:13px; }.footer-ribbon { margin-top:38px; padding-bottom:16px; }.footer-details { grid-template-columns:1fr 1fr; gap:28px 22px; }.footer-detail-column { gap:28px; justify-content:flex-start; }.footer-world { grid-column:1/-1; width:min(260px,100%); margin:0 auto; }.footer-world>span { font-size:9px; }.footer-detail-column p:not(.footer-label),.footer-detail-link { font-size:13px; }.footer-wordmark { height:100px; } }

/* Compact finish: a clear brand anchor, readable links and a quiet legal row. */
.finenic-footer { padding-top:clamp(48px,5vw,80px); padding-bottom:24px; }
.footer-topline { align-items:center; padding-bottom:30px; }
.footer-brand { display:inline-block; font-size:30px; font-weight:750; letter-spacing:-.065em; color:#172135; margin-bottom:12px; }
.footer-brand-block p { margin:0; font-size:14px; line-height:1.65; color:#626d7b; }
.footer-aside,.footer-main { padding-top:32px; }
.footer-aside { gap:32px; }
.footer-label { font-size:12px; color:#5f6b78; margin-bottom:14px; }
.footer-link-grid :is(a,button) { min-height:38px; font-size:14px; letter-spacing:-.015em; }
.footer-ribbon { margin-top:34px; padding-bottom:22px; }
.footer-details { padding-top:28px; }
.footer-detail-column { gap:24px; }
.footer-photo img { border-radius:8px; }
.footer-bottom { display:flex; justify-content:space-between; gap:16px; border-top:1px solid #dfe5eb; margin-top:36px; padding-top:20px; color:#687584; font-size:11px; line-height:1.6; }
@media(max-width:520px) { .footer-bottom { flex-direction:column; gap:4px; margin-top:28px; }.footer-brand { font-size:27px; }.footer-brand-block p { font-size:12px; }.footer-topline { gap:16px; }.footer-link-grid :is(a,button) { min-height:42px; } }
.finenic-footer { padding-top:clamp(28px,3vw,48px); }
</style>
