<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe2, PanelsTopLeft, BriefcaseBusiness, ArrowUpRight } from 'lucide-vue-next'
gsap.registerPlugin(ScrollTrigger)
const section=ref(null), description=ref(null)
const emit=defineEmits(['search-domain'])
const copy='A domain opens the door. Build what comes next, with your website and business tools in one place.'
let media
onMounted(()=>{
 media=gsap.matchMedia()
 media.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.fromTo(description.value.querySelectorAll('.statement-word'),{color:'#738298'},{color:'#172135',stagger:.08,duration:.45,ease:'none',scrollTrigger:{trigger:description.value,start:'top 88%',end:'bottom 54%',scrub:.5,invalidateOnRefresh:true}})
 },section.value)
})
onUnmounted(()=>media?.revert())
</script>

<template>
 <section ref="section" class="brand-statement" aria-label="About Finenic">
  <div class="statement-inner">
   <div class="statement-copy">
    <div class="statement-aside"><span class="domain-sign"><Globe2 :size="16" stroke-width="1.5" aria-hidden="true"/> Your idea starts here</span><p>From your first domain<br>to your next customer.</p></div>
    <p ref="description" class="brand-description" :aria-label="copy"><span aria-hidden="true"><template v-for="(word,index) in copy.split(' ')" :key="index"><span class="statement-word">{{ word }}</span>{{ ' ' }}</template></span></p>
   </div>
   <nav class="statement-links" aria-label="Explore Finenic">
    <button @click="emit('search-domain')"><span class="journey-icon"><Globe2 :size="21" stroke-width="1.4" aria-hidden="true"/></span><span><strong>Make it yours.</strong><small>Find your domain</small></span><ArrowUpRight :size="17" aria-hidden="true"/></button>
    <a href="#business-services"><span class="journey-icon"><PanelsTopLeft :size="21" stroke-width="1.4" aria-hidden="true"/></span><span><strong>Bring it to life.</strong><small>Build your website</small></span><ArrowUpRight :size="17" aria-hidden="true"/></a>
    <a href="#industry-heading"><span class="journey-icon"><BriefcaseBusiness :size="21" stroke-width="1.4" aria-hidden="true"/></span><span><strong>Keep it growing.</strong><small>Run your business</small></span><ArrowUpRight :size="17" aria-hidden="true"/></a>
   </nav>
  </div>
 </section>
</template>

<style scoped>
.brand-statement { position:relative; padding:clamp(70px,8vw,136px) var(--section-gutter) clamp(35px,4vw,68px); background:linear-gradient(180deg,var(--hero-join),#f4faff 25%,#fff 85%); color:#172135; }
.statement-inner { max-width:var(--section-width); margin-inline:auto; }
.statement-copy { display:grid; grid-template-columns:1fr 2fr; gap:6vw; align-items:start; }
.statement-aside { padding-top:8px; }.domain-sign { display:inline-flex; align-items:center; gap:10px; padding:10px 14px; font-size:12px; border:1px solid #d6e3f0; border-radius:999px; background:#ffffff70; }
.statement-aside>p { font-size:var(--type-description); line-height:1.75; color:#667488; margin:22px 0 0; }
.brand-description { margin:0; max-width:32ch; font-size:var(--type-statement); font-weight:450; line-height:1.4; letter-spacing:-.03em; text-wrap:pretty; }.statement-word { display:inline-block; }
.statement-links { display:grid; grid-template-columns:repeat(3,1fr); margin-top:clamp(40px,5vw,80px); padding-top:26px; border-top:1px solid #dce4ed; }
.statement-links a,.statement-links button { display:flex; gap:18px; align-items:center; text-align:left; min-height:76px; padding:8px 2.5vw; color:#172135; text-decoration:none; border-left:1px solid #dce4ed; }
.statement-links>:first-child { padding-left:0; border-left:0; }.statement-links>:last-child { padding-right:0; }.journey-icon { display:grid; place-items:center; width:46px; height:46px; border:1px solid #e0e8f0; background:linear-gradient(145deg,white,#edf5fc); border-radius:13px; color:#4c6a8b; flex-shrink:0; box-shadow:inset 0 1px 0 white; }
.statement-links strong { display:block; font-size:clamp(16px,1.25vw,20px); font-weight:500; letter-spacing:-.02em; }.statement-links small { display:block; margin-top:6px; font-size:12px; color:#69778a; }.statement-links a>svg,.statement-links button>svg { margin-left:auto; flex-shrink:0; }
.statement-links :is(a,button):focus-visible { outline:2px solid #315fbe; outline-offset:5px; border-radius:4px; }
@media(hover:hover) and (pointer:fine) { .statement-links :is(a,button):hover .journey-icon { border-color:#a9bfd6; }.statement-links :is(a,button):hover strong { color:#315f8c; } }
@media(max-width:900px) { .statement-copy { grid-template-columns:1fr 1.7fr; gap:5vw; }.statement-links a,.statement-links button { gap:10px; }.journey-icon { width:36px; height:36px; border-radius:10px; }.statement-links strong { font-size:15px; } }
@media(max-width:700px) { .brand-statement { padding-block:18vw 5vw; }.statement-copy { grid-template-columns:1fr; gap:26px; }.statement-aside { display:flex; flex-wrap:wrap; align-items:center; gap:15px 24px; padding:0; }.statement-aside>p { font-size:13px; margin:0; }.brand-description { max-width:34ch; }.statement-links { grid-template-columns:1fr; margin-top:30px; padding-top:8px; }.statement-links a,.statement-links button { padding:16px 0; border-left:0; border-bottom:1px solid #e6edf3; gap:16px; }.journey-icon { width:42px; height:42px; }.statement-links strong { font-size:17px; }.statement-links small { font-size:12px; } }
</style>
