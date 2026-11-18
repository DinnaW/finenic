<script setup>
// Vue adaptation of Magic UI Meteors. See the adjacent MIT license.
const meteors = Array.from({ length: 20 }, (_, index) => {
  const duration = 4 + Math.random() * 5
  return {
    left: ((index + Math.random()) * 7) + '%',
    animationDuration: duration + 's',
    animationDelay: -(Math.random() * duration) + 's',
  }
})
</script>

<template>
  <div class="meteor-field" aria-hidden="true">
    <i v-for="(style, index) in meteors" :key="index" :style="style"/>
  </div>
</template>

<style scoped>
.meteor-field { position:absolute; inset:0; pointer-events:none; overflow:hidden; mask-image:linear-gradient(90deg,#000 8%,#0003 42%,#0003 58%,#000 92%); }
.meteor-field i { position:absolute; top:-5%; width:3px; height:3px; border-radius:50%; background:var(--meteor-ink,white); box-shadow:0 0 3px white; animation:meteor linear infinite; }
.meteor-field i::after { content:''; position:absolute; top:1px; left:1px; height:1px; width:clamp(52px,6vw,100px); background:linear-gradient(90deg,var(--meteor-ink,white),transparent); }
@keyframes meteor {
  from { transform:rotate(-38deg) translateX(0); opacity:1; }
  70% { opacity:1; }
  to { transform:rotate(-38deg) translateX(-760px); opacity:0; }
}
@media(prefers-reduced-motion:reduce) { .meteor-field { display:none; } }
</style>
