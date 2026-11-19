<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Globe2, CalendarDays, Mail, Check } from 'lucide-vue-next'
gsap.registerPlugin(ScrollTrigger)
const emit=defineEmits(['search-domain','show-messaging'])
const root=ref(null)
const base=import.meta.env.BASE_URL
const panels=[
 { id:'domains',label:'Domains',index:'01',image:'domain-cafe',alt:'A man using his smartphone beside a café window',icon:Globe2,title:'Claim your name before someone else does.',copy:'Search hundreds of endings, transfer the domains you already own, and manage DNS and privacy from one dashboard.',action:'Find a domain',features:['Find your name','Transfer a domain','DNS & privacy'],caption:'Every idea starts somewhere.' },
 { id:'apps',label:'Business Apps',index:'02',image:'salon-tablet',alt:'A salon receptionist welcoming a customer at a counter with a tablet',icon:CalendarDays,title:'Built for the way you do business.',copy:'Software for salons, shops, restaurants, hotels and car dealers. Saptify takes salon bookings, Cartinno runs your store and POS, SaaSBeds fills your rooms, Veyogo sells your cars, and Saptivo CRM keeps every lead and customer in one place.',action:'Explore business apps',features:['Saptify','Cartinno','SaaSBeds','Veyogo','Saptivo'],caption:'More time for the people you serve.' },
 { id:'connect',label:'Email & SMS',index:'03',image:'team-messages',alt:'A team member working on her laptop in a bright office',icon:Mail,title:'Look professional. Stay in touch.',copy:'Smardove gives every team member secure email on your domain. Ipsova sends bulk SMS, reminders and alerts under your own sender name.',action:'See email & SMS',features:['Smardove email','Ipsova SMS'],caption:'Make every conversation count.' },
]
let media
onMounted(()=>{
 media=gsap.matchMedia()
 media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
  const headerOffset=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'))+16
  const cards=Array.from(root.value.querySelectorAll('.solution-panel'))
  const focusHandlers=[]
  cards.slice(0,-1).forEach((card,index)=>{
   const face=card.querySelector('.solution-face')
   const next=cards[index+1]
   gsap.to(face,{y:-6,ease:'none',scrollTrigger:{id:`solution-depth-${index}`,trigger:next,start:'top 88%',end:()=>`top ${headerOffset()+24+(index+1)*24}px`,scrub:.55,invalidateOnRefresh:true}})
   gsap.to(face.querySelector('.stack-dim'),{opacity:.09,ease:'none',scrollTrigger:{trigger:next,start:'top 65%',end:()=>`top ${headerOffset()+24+(index+1)*24}px`,scrub:.55}})
  })
  // Bring a covered card back into view when reached through keyboard navigation.
  cards.forEach((card,index)=>{
   const onFocus=(event)=>{
    if (!event.target.matches(':focus-visible')) return
    const stack = root.value.querySelector('.solution-stack')
    const preceding = cards.slice(0,index).reduce((sum,item)=>sum+item.offsetHeight+parseFloat(getComputedStyle(item).marginBottom),0)
    const targetY=window.scrollY+stack.getBoundingClientRect().top+preceding-(headerOffset()+index*24)
    window.scrollTo({top:targetY,behavior:'instant'})
   }
   card.addEventListener('focusin',onFocus)
   focusHandlers.push(()=>card.removeEventListener('focusin',onFocus))
  })
  return()=>focusHandlers.forEach(remove=>remove())
 },root.value)
})
onUnmounted(()=>media?.revert())
</script>

<template>
 <section ref="root" id="business-journey" class="business-journey" aria-labelledby="journey-heading">
  <div class="journey-inner">
   <header class="journey-header"><h2 id="journey-heading">Power your business,<br>start to finish.</h2><p>Your name. Your daily work. Your next conversation.<br>Everything connected, with Finenic.</p></header>
   <div class="solution-stack">
    <article v-for="(panel,index) in panels" :key="panel.id" class="solution-panel" :class="`solution-${panel.id}`" :style="{'--stack-index':index}" :aria-labelledby="`solution-title-${panel.id}`">
     <div class="solution-face">
      <div class="solution-photo"><img :src="`${base}images/solutions/${panel.image}.jpg`" :alt="panel.alt" width="1200" height="800" loading="lazy" decoding="async"><div class="photo-shade" aria-hidden="true"></div><p class="photo-caption">{{ panel.caption }}</p>
       <div v-if="panel.id==='domains'" class="photo-note" aria-hidden="true"><Globe2 :size="18"/><span>yourbigidea<strong>.com</strong></span><span class="note-arrow"><ArrowUpRight :size="15"/></span></div>
       <div v-else-if="panel.id==='apps'" class="photo-note" aria-hidden="true"><CalendarDays :size="18"/><span>Your next booking.<br><small>Right where it belongs.</small></span><Check :size="16"/></div>
       <div v-else class="photo-note" aria-hidden="true"><Mail :size="18"/><span>you<strong>@yourbusiness.com</strong></span><Check :size="16"/></div>
      </div>
      <div class="solution-content">
       <div class="solution-kicker"><span><component :is="panel.icon" :size="18" stroke-width="1.5" aria-hidden="true"/>{{ panel.label }}</span><span class="solution-index" aria-hidden="true">{{ panel.index }} / 03</span></div>
       <div class="solution-main"><h3 :id="`solution-title-${panel.id}`">{{ panel.title }}</h3><p>{{ panel.copy }}</p><a v-if="panel.id==='apps'" href="#industry-heading" class="solution-action">{{ panel.action }}<ArrowUpRight :size="17" aria-hidden="true"/></a><button v-else class="solution-action" @click="panel.id==='domains'?emit('search-domain'):emit('show-messaging')">{{ panel.action }}<ArrowUpRight :size="17" aria-hidden="true"/></button></div>
       <ul class="solution-features" :aria-label="panel.id==='apps'?'Business apps':'Included tools'"><li v-for="feature in panel.features" :key="feature">{{ feature }}</li></ul>
      </div>
      <div class="stack-dim" aria-hidden="true"></div>
     </div>
    </article>
   </div>
  </div>
 </section>
</template>

<style scoped>
.business-journey { position:relative; background:linear-gradient(#fafbf9,#f1f5f8 45%,#edf4fa); color:#172135; padding:clamp(44px,5vw,84px) var(--section-gutter) clamp(50px,6vw,100px); }
.journey-inner { max-width:var(--section-width); margin-inline:auto; }
.journey-header { display:flex; justify-content:space-between; align-items:end; gap:5vw; margin-bottom:clamp(36px,4.5vw,72px); }
.journey-header h2 { margin:0; font-size:var(--type-section-heading); line-height:1.12; letter-spacing:-.04em; font-weight:450; }.journey-header>p { margin:0 0 4px; color:#66717e; font-size:var(--type-description); line-height:1.7; max-width:41ch; }
.solution-stack { position:relative; }.solution-panel { position:relative; margin-bottom:clamp(24px,3vw,48px); scroll-margin-top:48px; }
.solution-face { position:relative; display:grid; grid-template-columns:1fr 1fr; min-height:580px; border:1px solid #bed4e8; border-radius:18px; overflow:hidden; background:#e3f2fd; box-shadow:0 -10px 30px -25px #17213550; transform-origin:50% 0; }
.solution-photo { position:relative; min-width:0; min-height:100%; overflow:hidden; background:#d6e2e9; }.solution-photo>img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:56% center; }.photo-shade { position:absolute; inset:0; background:linear-gradient(180deg,#0004,transparent 32%,transparent 55%,#0004); }.photo-caption { position:absolute; top:clamp(24px,2.8vw,44px); left:clamp(24px,2.8vw,44px); right:24px; margin:0; color:white; font-size:clamp(18px,1.8vw,29px); font-weight:450; letter-spacing:-.035em; max-width:17ch; line-height:1.25; }
.photo-note { position:absolute; bottom:clamp(24px,2.8vw,44px); left:clamp(24px,2.8vw,44px); right:clamp(24px,2.8vw,44px); display:flex; align-items:center; gap:13px; padding:18px 20px; border:1px solid #fff9; border-radius:12px; background:#ffffffdf; backdrop-filter:blur(18px); color:#33475c; font-size:clamp(12px,1.1vw,17px); box-shadow:0 8px 24px #10223915; }.photo-note strong { font-weight:600; }.photo-note>svg:last-child,.note-arrow { margin-left:auto; }.note-arrow { display:grid; place-items:center; width:30px; height:30px; background:white; border-radius:50%; }.photo-note small { font-size:11px; color:#68798b; }
.solution-content { position:relative; isolation:isolate; padding:clamp(28px,3.8vw,62px); display:flex; flex-direction:column; justify-content:space-between; gap:30px; background:radial-gradient(ellipse at 25% 30%,#fff 0%,#ffffffed 31%,#ffffff70 63%,transparent 88%),radial-gradient(ellipse at 100% 100%,#c8e8f8 0%,#e2f2fc 34%,#f4faff 75%); }
.solution-content::before { content:''; position:absolute; inset:0; z-index:-1; pointer-events:none; background-image:radial-gradient(circle,#7da9c650 .75px,transparent 1px); background-size:10px 10px; mask-image:radial-gradient(ellipse at 95% 85%,#000 0%,#0009 34%,transparent 76%); }
.solution-content::after { content:''; position:absolute; inset:0; z-index:-1; pointer-events:none; background:radial-gradient(ellipse at 32% 37%,#ffffffb3 0%,#ffffff66 27%,transparent 65%); }
.solution-apps .solution-content { background:radial-gradient(ellipse at 70% 25%,#fff 0%,#ffffffeb 35%,transparent 84%),radial-gradient(ellipse at 0% 100%,#dce7ee 0%,#edf2f6 36%,#f8fafb 74%); }
.solution-apps .solution-content::before { mask-image:radial-gradient(ellipse at 5% 88%,#000 0%,#0008 35%,transparent 76%); }
.solution-kicker { display:flex; align-items:center; justify-content:space-between; gap:15px; font-size:13px; }.solution-kicker>span:first-child { display:flex; align-items:center; gap:10px; }.solution-index { font-size:11px; color:#657c93; }
.solution-main h3 { margin:0 0 24px; max-width:16ch; font-size:clamp(30px,3vw,48px); line-height:1.13; letter-spacing:-.04em; font-weight:450; text-wrap:pretty; }.solution-main>p { margin:0 0 28px; max-width:47ch; font-size:var(--type-description); line-height:1.75; color:#4b6278; }
.solution-action { display:inline-flex; align-items:center; justify-content:center; gap:24px; min-height:52px; padding:0 23px; border:1px solid #111; border-radius:99px; background:#111; color:white; font-size:13px; font-weight:500; text-decoration:none; width:fit-content; }
.solution-features { display:flex; flex-wrap:wrap; gap:10px 20px; list-style:none; padding:20px 0 0; margin:0; border-top:1px solid #17213520; color:#48637e; font-size:11px; }.solution-features li { white-space:nowrap; }
.solution-apps .solution-face { background:#f5f6f7; border-color:#d8dfe5; }.solution-apps .solution-photo { order:2; }.solution-apps .solution-content { order:1; }.solution-apps .solution-photo>img { object-position:48% center; }.solution-apps .solution-main h3 { max-width:17ch; }.solution-apps .solution-main>p { color:#5a646e; }.solution-apps .solution-features { color:#505e6b; }
.solution-connect .solution-face { background:#edf6fc; border-color:#cbdfea; color:#172135; }.solution-connect .solution-content { background:radial-gradient(ellipse at 28% 35%,#fff 0%,#fffffff2 34%,transparent 82%),radial-gradient(ellipse at 100% 100%,#c3e3f5 0%,#e1eff9 40%,#f3f9fd 80%); }.solution-connect .solution-main>p { color:#4b6278; }.solution-connect .solution-index,.solution-connect .solution-features { color:#657c93; }.solution-connect .solution-features { border-top-color:#17213520; }.solution-connect .solution-action { background:#111; color:white; border-color:#111; }.solution-connect .solution-photo>img { object-position:48% center; }
.stack-dim { position:absolute; inset:0; background:#10223b; pointer-events:none; opacity:0; border-radius:inherit; }
.journey-end { margin:clamp(36px,4vw,60px) 0 0; text-align:center; font-size:13px; color:#667b91; }
.solution-action:focus-visible { outline:3px solid #5489be; outline-offset:6px; }
@media(min-width:901px) and (prefers-reduced-motion:no-preference) { .solution-panel { position:sticky; top:calc(var(--header-height) + 16px + var(--stack-index)*24px); z-index:calc(1 + var(--stack-index)); margin-bottom:9vh; }.solution-face { min-height:580px; height:clamp(580px,74svh,760px); }.solution-stack { padding-bottom:2vh; } }
@media(hover:hover) and (pointer:fine) { .solution-action:hover { background:#323232; } }
@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference) { .solution-action>svg { transition:transform 180ms var(--hero-ease-out); }.solution-action:hover:not(:focus-visible)>svg { transform:translate(2px,-2px); } }
@media(max-width:1100px) { .solution-content { padding:30px; gap:24px; }.solution-main h3 { font-size:32px; }.solution-main>p { font-size:15px; }.solution-kicker { font-size:12px; }.photo-note { left:22px; right:22px; padding:15px; }.solution-features { gap:10px 14px; } }
@media(min-width:901px) and (max-height:799px) and (prefers-reduced-motion:no-preference) {
 .solution-face { height:auto; min-height:clamp(360px,72svh,560px); }
 .solution-content { padding:clamp(20px,3vh,28px) clamp(24px,3vw,42px); gap:16px; }
 .solution-main h3,.solution-main>p { margin-bottom:16px; }

}
@media(max-width:900px) { .solution-face { min-height:0; }.solution-content { padding:30px; }.solution-photo { min-height:520px; }.journey-header { gap:30px; }.journey-header>p br { display:none; } }
@media(max-width:650px) { .business-journey { padding-top:8vw; padding-bottom:14vw; }.journey-header { display:block; margin-bottom:30px; }.journey-header>p { margin-top:22px; }.solution-face { grid-template-columns:1fr; border-radius:14px; }.solution-photo { min-height:0; height:85vw; max-height:430px; }.solution-apps .solution-photo,.solution-apps .solution-content { order:initial; }.solution-content { padding:26px; gap:25px; }.solution-main h3 { font-size:clamp(28px,7vw,37px); margin-bottom:19px; }.solution-main>p { font-size:15px; margin-bottom:24px; }.photo-caption { top:24px; left:24px; font-size:23px; }.photo-note { bottom:22px; }.solution-panel { margin-bottom:22px; }.solution-features { padding-top:18px; }.journey-end { line-height:1.7; max-width:28ch; margin-inline:auto; } }
@media(prefers-reduced-motion:reduce) { .solution-panel { position:relative; }.solution-face { transform:none!important; }.stack-dim { display:none; } }
</style>
