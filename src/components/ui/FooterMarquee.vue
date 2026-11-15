<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
defineProps({items:{type:Array,required:true},label:String,paused:Boolean})
const emit=defineEmits(['activate'])
const root=ref(null), group=ref(null), visible=ref(false), pageVisible=ref(true), width=ref(0), duration=ref(38)
let resize, intersection
function visibility(){pageVisible.value=!document.hidden}
onMounted(()=>{
 visibility();document.addEventListener('visibilitychange',visibility)
 resize=new ResizeObserver(()=>{
  width.value=root.value.clientWidth
  duration.value=Math.max(26,group.value.getBoundingClientRect().width/28)
 });resize.observe(root.value);resize.observe(group.value)
 intersection=new IntersectionObserver(([entry])=>visible.value=entry.isIntersecting)
 intersection.observe(root.value)
})
onUnmounted(()=>{resize?.disconnect();intersection?.disconnect();document.removeEventListener('visibilitychange',visibility)})
</script>

<template>
 <nav ref="root" class="footer-marquee" :class="{'is-paused':paused,'is-offscreen':!visible||!pageVisible}" :aria-label="label" :style="{'--marquee-width':`${width}px`,'--marquee-duration':`${duration}s`}">
  <div class="marquee-track">
   <div ref="group" class="marquee-group"><button v-for="(item,index) in items" :key="item" @pointerdown.prevent @click="emit('activate',index)">{{ item }}<span aria-hidden="true">·</span></button></div>
   <div class="marquee-group marquee-copy" aria-hidden="true"><button v-for="(item,index) in items" :key="item" tabindex="-1" @pointerdown.prevent @click="emit('activate',index)">{{ item }}<span>·</span></button></div>
  </div>
 </nav>
</template>

<style scoped>
.footer-marquee { overflow:hidden; padding:6px 0 12px; mask-image:linear-gradient(to right,#000 94%,transparent); }
.marquee-track { display:flex; width:max-content; animation:footer-marquee var(--marquee-duration) linear infinite; }
.marquee-group { display:flex; align-items:center; justify-content:space-around; flex-shrink:0; min-width:var(--marquee-width); }
.marquee-group button { display:flex; align-items:center; gap:24px; padding-right:24px; white-space:nowrap; cursor:pointer; color:#77828d; font-size:clamp(22px,2vw,34px); line-height:1.5; letter-spacing:-.035em; }
.marquee-group span { color:#c3cbd3; }
.is-offscreen .marquee-track { animation-play-state:paused; }
.footer-marquee:focus-within,.is-paused { overflow-x:auto; scrollbar-width:thin; scrollbar-color:#d9dfe5 transparent; }
.footer-marquee:focus-within .marquee-track,.is-paused .marquee-track { animation:none; }
.footer-marquee:focus-within .marquee-copy,.is-paused .marquee-copy { display:none; }
.marquee-group button:focus-visible { outline:2px solid #1976d2; outline-offset:3px; border-radius:3px; }
@keyframes footer-marquee { to { transform:translateX(-50%); } }
@media(hover:hover) and (pointer:fine) { .footer-marquee:hover .marquee-track { animation-play-state:paused; }.marquee-group button:hover { color:#1565c0; } }
@media(prefers-reduced-motion:reduce) { .footer-marquee { overflow-x:auto; }.marquee-track { animation:none; }.marquee-copy { display:none; } }
@media(max-width:520px) { .marquee-group button { font-size:24px; gap:18px; padding-right:18px; } }
</style>
