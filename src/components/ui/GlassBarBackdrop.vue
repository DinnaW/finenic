<script setup>
defineProps({ variant: { type: String, default: 'ice' } })
// Each rib samples a slightly shifted slice of the same color field, like fluted glass.
const ribs = Array.from({ length: 18 }, (_, index) => ({
  position: `${(index / 17) * 100 + (index % 2 ? 1.2 : -1.2)}%`,
}))
</script>

<template>
  <div class="glass-bar-backdrop" :class="`glass-variant-${variant}`" aria-hidden="true">
    <span v-for="(rib, index) in ribs" :key="index" :style="{ '--rib-position': rib.position }"></span>
  </div>
</template>

<style scoped>
.glass-bar-backdrop {
  --glass-scene:radial-gradient(ellipse at 24% 78%,#1860d9 0%,#287beccc 18%,transparent 43%),radial-gradient(ellipse at 85% 49%,#d9f2ff 0%,#94d2ffcc 25%,transparent 48%),radial-gradient(ellipse at 75% 105%,#1553cc 0%,transparent 48%),linear-gradient(155deg,#edf8ff 4%,#acd8ff 38%,#4d9af1 76%,#2463d2);
  position:absolute; inset:0; z-index:-1; display:flex; pointer-events:none; overflow:hidden; border-radius:inherit; background-image:var(--glass-scene);
}
.glass-bar-backdrop span {
  position:relative; flex:1 1 0; min-width:0; height:100%;
  background-image:var(--glass-scene); background-size:1800% 100%; background-position:var(--rib-position) 0;
}
.glass-bar-backdrop span::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,#063c9b33 0%,#ffffff05 14%,#ffffff03 38%,#ffffff40 71%,#ffffffb3 86%,#ffffff40 91%,#0750a64d 100%);
  box-shadow:inset -1px 0 0 #ffffffa6,inset 1px 0 2px #124d9226;
}
.glass-bar-backdrop::before { content:''; position:absolute; inset:0; z-index:1; background:linear-gradient(125deg,transparent 24%,#ffffff05 36%,#ffffff40 39%,#ffffff08 42%,transparent 55%); pointer-events:none; }
.glass-bar-backdrop::after {
  content:''; position:absolute; inset:0; border-radius:inherit;
  background:linear-gradient(180deg,#f0f9ffb3 0%,#e3f3ff33 24%,transparent 48%,#c4e5ff1a 100%);
  box-shadow:inset 0 1px 0 #ffffffa6,inset 0 0 0 1px #ffffff40;
}
.glass-variant-sage,.glass-variant-mint { --glass-scene:radial-gradient(ellipse at 80% 85%,#1b64df 0%,transparent 49%),radial-gradient(ellipse at 15% 50%,#d9f3ff 0%,#91d0ffb3 25%,transparent 53%),linear-gradient(145deg,#e8f6ff 4%,#9dd0ff 40%,#488fe8 76%,#2463d2); }
.glass-variant-sand,.glass-variant-stone { --glass-scene:radial-gradient(ellipse at 10% 88%,#1a5ed5 0%,transparent 45%),radial-gradient(ellipse at 70% 38%,#e2f4ff 0%,#a9dbffcc 24%,transparent 52%),linear-gradient(160deg,#eaf7ff 5%,#acd8ff 40%,#4d9af1 76%,#2463d2); }
</style>
