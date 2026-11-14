<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { heroBarTones } from '../../data/heroBars'

// Vue adaptation of the GradientBars component supplied by the user.
// Keep the glass silhouette and a fixed base for a seamless section transition.
defineProps({ reduced: Boolean })
const root = ref(null), awake = ref(false)
const desktopQuery = window.matchMedia('(min-width: 1024px)')
const isDesktop = ref(desktopQuery.matches)
function updateDensity(event) { isDesktop.value = event.matches }
const bars = computed(() => Array.from({ length: isDesktop.value ? 25 : 15 }, (_, index) => {
  const center = isDesktop.value ? 12 : 7
  const distanceFromCenter = Math.abs(index - center)
  const distance = distanceFromCenter / center
  const strength = distanceFromCenter % 3
  return {
    height: `${24 + 76 * Math.pow(distance, 1.2)}%`,
    delay: `${Math.round(260 * (1 - Math.pow(1 - distance, 2)))}ms`,
    ...heroBarTones[strength],
  }
}))
let observer
function pageVisibility() { awake.value = !document.hidden && Boolean(root.value?.getBoundingClientRect().bottom > 0) }
onMounted(() => {
  desktopQuery.addEventListener('change', updateDensity)
  observer = new IntersectionObserver(([entry]) => { awake.value = entry.isIntersecting && !document.hidden })
  observer.observe(root.value)
  document.addEventListener('visibilitychange', pageVisibility)
})
onUnmounted(() => { observer?.disconnect(); desktopQuery.removeEventListener('change', updateDensity); document.removeEventListener('visibilitychange', pageVisibility) })
</script>

<template>
  <div ref="root" class="gradient-bar-scene" :class="{ 'bars-awake': awake && !reduced, 'bars-still': reduced }" aria-hidden="true">
    <div class="gradient-bars">
      <div v-for="(bar, index) in bars" :key="index" class="gradient-bar-column"
        :style="{ '--bar-height': bar.height, '--bar-delay': bar.delay, '--bar-foot': bar.foot, '--bar-middle': bar.middle }">
        <div class="gradient-bar-fill">
          <div class="gradient-bar-glass"></div>
          <div class="gradient-bar-edge"></div>
        </div>
        <div v-if="index > 0" class="gradient-bar-seam"></div>
      </div>
    </div>
    <div class="gradient-bar-clearance"></div>
  </div>
</template>

<style scoped>
.gradient-bar-scene {
  position:absolute; inset:0; z-index:0; overflow:hidden; pointer-events:none; background:#fff;
}
.gradient-bars { position:absolute; inset:0; display:flex; align-items:end; }
.gradient-bar-column { position:relative; flex:1 1 0; min-width:0; height:var(--bar-height); transform-origin:bottom; animation:bar-arrive 2.2s cubic-bezier(.23,1,.32,1) both; animation-delay:var(--bar-delay); }
.gradient-bar-fill { position:absolute; inset:0; background:linear-gradient(0deg,var(--bar-foot) 0%,var(--bar-middle) 26%,var(--cool-sky) 43%,#90caf9b3 61%,#bbdefb66 80%,#e3f2fd26 100%); }
.gradient-bar-glass {
  position:absolute; top:0; left:1px; right:1px;
  height:clamp(14px,1.8vw,28px);
  border:1px solid #ffffff80;
  border-bottom-color:#90caf924;
  border-radius:3px 3px 1px 1px;
  background:linear-gradient(125deg,#ffffffa6 0%,#e3f2fd66 32%,#bbdefb33 55%,#ffffff99 100%);
  backdrop-filter:blur(6px);
  -webkit-backdrop-filter:blur(6px);
  box-shadow:inset 0 1px 0 #fff,inset 1px 0 0 #fff6,0 4px 12px -8px #1565c033;
}
.gradient-bar-glass::after { content:''; position:absolute; inset:2px 8% 48%; background:linear-gradient(110deg,#fff0,#ffffffa6,#fff0); border-radius:inherit; }
.gradient-bar-edge { position:absolute; inset:0; border-radius:5px 5px 0 0; box-shadow:inset 1px 0 0 #ffffff4d,inset -1px 0 0 #ffffff1f; mask-image:linear-gradient(#000 0%,#0008 45%,transparent 90%); }
.gradient-bar-fill::after { content:''; position:absolute; inset:0; background:linear-gradient(100deg,#ffffff26 0%,#ffffff06 12%,transparent 40%,#0d47a109 78%,#ffffff29 100%); }
.gradient-bar-seam { position:absolute; z-index:1; top:0; bottom:0; left:calc(clamp(4px,.5vw,9px) / -2); width:clamp(4px,.5vw,9px); border-left:1px solid #ffffff66; border-radius:3px 3px 0 0; background:linear-gradient(90deg,#ffffff08 0%,#ffffff66 30%,#e3f2fd20 60%,#0d47a112 85%,#ffffff20 100%); box-shadow:2px 0 8px -3px #0d47a11a; backdrop-filter:blur(3px) saturate(.85); -webkit-backdrop-filter:blur(3px) saturate(.85); mask-image:linear-gradient(180deg,#0009,#000 14%,#0008 65%,transparent 100%); }
.gradient-bar-clearance { position:absolute; inset:0; background:radial-gradient(ellipse 39% 55% at 50% 28%,#fff 0%,#fffffff2 48%,#ffffff00 100%),linear-gradient(180deg,#fff 0%,#ffffff00 30%); }
.gradient-bar-scene::after { content:''; position:absolute; inset:auto 0 0; height:clamp(110px,22svh,240px); background:linear-gradient(0deg,var(--hero-join) 0%,#e3f2fdc7 24%,#e3f2fd59 57%,#e3f2fd00 100%); }
.gradient-bar-column,.gradient-bar-fill { animation-play-state:paused; }
.bars-awake .gradient-bar-column,.bars-awake .gradient-bar-fill { animation-play-state:running; }
.bars-still .gradient-bar-column,.bars-still .gradient-bar-fill { animation:none; }
@keyframes bar-arrive { from { opacity:.45; transform:translateY(36px) scaleY(.96); } to { opacity:1; transform:translateY(0) scaleY(1); } }
@media(max-width:760px) {
  .gradient-bars { top:32%; }
  .gradient-bar-clearance { background:radial-gradient(ellipse 75% 52% at 50% 22%,#fff 0%,#ffffffee 50%,#ffffff00 100%); }
}
@media(prefers-reduced-motion:reduce) { .gradient-bar-column,.gradient-bar-fill { animation:none!important; } }
</style>
