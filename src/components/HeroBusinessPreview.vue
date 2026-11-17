<script setup>
import { ref } from 'vue'
import { LockKeyhole, ArrowUpRight, Check, CalendarDays, ShoppingBag, BedDouble } from 'lucide-vue-next'
const selected=ref(0)
const base=import.meta.env.BASE_URL
const examples=[
 {name:'Salon',brand:'The Sunday Studio',domain:'sundaystudio.com',image:'salon',title:'A little time.\nJust for you.',action:'Find your moment',note:'Your next appointment',detail:'Cut & styling · Thursday, 10:30',icon:CalendarDays},
 {name:'Shop',brand:'Objects & Everyday',domain:'objectsandeveryday.com',image:'store',title:'Good things.\nFor every day.',action:'Explore the collection',note:'Your store, connected',detail:'Online orders & in-store sales',icon:ShoppingBag},
 {name:'Hotel',brand:'Somewhere Slow',domain:'somewhereslow.com',image:'hotel',title:'A change\nof scenery.',action:'Find your stay',note:'Book a little escape',detail:'Direct bookings on your website',icon:BedDouble},
]
</script>
<template>
 <div class="hero-business-preview">
  <div class="preview-blue-disc" aria-hidden="true"></div>
  <div class="preview-orbit" aria-hidden="true"></div>
  <div class="hero-domain-label" aria-hidden="true"><span class="domain-label-dot"></span><span>Your idea has an address.</span><ArrowUpRight :size="16"/></div>
  <div class="hero-browser" aria-hidden="true">
   <div class="hero-browser-chrome"><span class="browser-dots"><i></i><i></i><i></i></span><span class="browser-address"><LockKeyhole :size="11"/>{{examples[selected].domain}}</span><span class="browser-plus">+</span></div>
   <Transition name="business-example" mode="out-in"><div :key="selected" class="hero-example">
    <div class="hero-example-photo"><img :src="`${base}images/business/${examples[selected].image}.jpg`" alt="" width="800" height="1000" fetchpriority="high"/><div class="hero-example-top"><strong>{{examples[selected].brand}}</strong><span>Discover <ArrowUpRight :size="11"/></span></div><div class="hero-example-text"><h3>{{examples[selected].title}}</h3><span class="example-cta">{{examples[selected].action}}<ArrowUpRight :size="13"/></span></div></div>
    <div class="hero-example-bottom"><span>Made for your world.</span><span>Your website. Your way.</span></div>
   </div></Transition>
  </div>
  <div class="hero-preview-note" aria-hidden="true"><span class="preview-note-icon"><component :is="examples[selected].icon" :size="23" stroke-width="1.5"/></span><div><strong>{{examples[selected].note}}</strong><span>{{examples[selected].detail}}</span></div><Check :size="17"/></div>
  <div class="hero-example-selector"><span>Imagine your business</span><div role="group" aria-label="Example business website"><button v-for="(example,index) in examples" :key="example.name" :aria-pressed="selected===index" @click="selected=index">{{example.name}}</button></div><small>Illustrative website previews</small></div>
 </div>
</template>
<style scoped>
.hero-business-preview { position:relative; width:100%; max-width:660px; aspect-ratio:.99; margin:auto; isolation:isolate; container-type:inline-size; }
.preview-blue-disc { position:absolute; z-index:-2; width:96%; height:94%; left:7%; top:-2%; border-radius:50%; background:radial-gradient(ellipse at 25% 21%,#eff9ff 0%,#d4edff 26%,#90caf9 58%,#498dda 86%,#286aba); box-shadow:inset 0 2px 0 #fff9; }
.preview-orbit { position:absolute; z-index:-1; inset:2% -3% 15% 2%; border:1px solid #fff9; border-radius:50%; transform:rotate(-26deg) scaleX(1.09); }
.hero-domain-label { position:absolute; z-index:3; left:0; top:8%; display:flex; align-items:center; gap:10px; padding:15px 19px; border:1px solid #d2e4f0; border-radius:100px; background:#ffffffed; box-shadow:0 12px 25px #26425d12; font-size:clamp(10px,2cqw,13px); color:#34506c; }.domain-label-dot { width:6px; height:6px; border-radius:50%; background:#679ad0; }.hero-domain-label>svg { margin-left:14px; }
.hero-browser { position:absolute; width:83%; left:10%; top:17%; border-radius:14px; padding:5px; background:#ffffffb8; border:1px solid #fff; box-shadow:0 30px 55px -24px #15395760,0 5px 10px #234c6810; transform:rotate(-4deg); overflow:hidden; }
.hero-browser-chrome { display:flex; align-items:center; justify-content:space-between; gap:8px; height:7.5cqw; padding:0 3cqw; color:#6a7a89; font-size:1.8cqw; }.browser-dots { display:flex; gap:4px; }.browser-dots i { width:4px; height:4px; border-radius:50%; background:#b5c5d2; }.browser-address { display:flex; align-items:center; justify-content:center; gap:7px; padding:6px 18px; border:1px solid #dae5ed; border-radius:5px; background:#fff8; min-width:58%; }.browser-plus { font-size:20px; line-height:1; }
.hero-example-photo { position:relative; height:55cqw; overflow:hidden; border-radius:8px 8px 0 0; color:#fff; background:#35433e; }.hero-example-photo:after { content:''; position:absolute; inset:0; background:linear-gradient(#071d2033,transparent 25%,#081a1c80); pointer-events:none; }.hero-example-photo>img { width:100%; height:100%; object-fit:cover; object-position:50% 40%; }.hero-example-top { position:absolute; z-index:1; left:6%; right:6%; top:7%; display:flex; align-items:center; justify-content:space-between; }.hero-example-top strong { font-size:2.5cqw; font-weight:500; letter-spacing:-.03em; }.hero-example-top>span { display:flex; gap:8px; align-items:center; font-size:1.6cqw; }
.hero-example-text { position:absolute; z-index:1; left:7%; bottom:10%; }.hero-example-text h3 { margin:0 0 3cqw; font-family:Georgia,serif; font-weight:400; font-size:7.5cqw; line-height:1.04; letter-spacing:-.045em; white-space:pre-line; }.example-cta { display:inline-flex; align-items:center; gap:18px; padding:9px 13px; background:white; color:#253b34; font-size:1.7cqw; border-radius:3px; }
.hero-example-bottom { display:flex; justify-content:space-between; padding:3cqw 5cqw; background:#fff; font-size:1.7cqw; color:#566b7a; border-radius:0 0 8px 8px; }
.hero-preview-note { position:absolute; z-index:4; right:-2%; bottom:13%; display:flex; align-items:center; gap:12px; width:67%; padding:3.6cqw; border-radius:12px; border:1px solid #e0eaf1; background:#fff; box-shadow:0 18px 40px -15px #23415d35; transform:rotate(3deg); }.preview-note-icon { width:7cqw; height:7cqw; display:grid; place-items:center; border-radius:9px; background:#edf5fc; color:#4f7292; flex:none; }.hero-preview-note strong { display:block; font-size:2.1cqw; font-weight:600; letter-spacing:-.02em; }.hero-preview-note div>span { display:block; margin-top:5px; color:#718398; font-size:1.7cqw; }.hero-preview-note>svg { margin-left:auto; color:#5b829e; }
.hero-example-selector { position:absolute; bottom:-6%; left:12%; right:0; display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:12px; color:#5e7489; }.hero-example-selector>span { font-size:11px; }.hero-example-selector>div { display:flex; gap:3px; border:1px solid #cddfeb; background:#ffffff8c; padding:4px; border-radius:100px; }.hero-example-selector button { padding:8px 14px; border-radius:100px; font-size:11px; min-height:34px; color:#5d7185; }.hero-example-selector button[aria-pressed="true"] { background:#fff; color:#172135; box-shadow:0 2px 7px #183e6414; }.hero-example-selector small { width:100%; text-align:center; font-size:9px; color:#8293a4; }.hero-example-selector button:focus-visible { outline:2px solid #466f97; outline-offset:2px; }
.business-example-enter-active,.business-example-leave-active { transition:opacity 160ms ease; }.business-example-enter-from,.business-example-leave-to { opacity:0; }
.hero-business-preview:has(button:focus-visible) .business-example-enter-active,.hero-business-preview:has(button:focus-visible) .business-example-leave-active { transition:none; }
@media(max-width:1000px) { .hero-business-preview { max-width:530px; }.hero-domain-label { padding:12px 15px; }.hero-preview-note { right:0; } }
@media(prefers-reduced-motion:reduce) { .business-example-enter-active,.business-example-leave-active { transition:none; } }
</style>
