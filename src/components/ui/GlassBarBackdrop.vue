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
  --glass-scene:radial-gradient(ellipse at 18% 96%,#b3e0f5f2 0%,#d0edfad9 25%,transparent 56%),radial-gradient(ellipse at 94% 72%,#c0e8f7eb 0%,#e1f4fccc 31%,transparent 62%),radial-gradient(ellipse at 53% 22%,#fff 0%,#ffffffd9 30%,transparent 73%),linear-gradient(155deg,#fff 8%,#f4fbff 42%,#e1f2fc 75%,#c5e7f8);
  position:absolute; inset:0; z-index:-1; display:flex; pointer-events:none; overflow:hidden; border-radius:inherit; background-image:var(--glass-scene);
}
.glass-bar-backdrop span {
  position:relative; flex:1 1 0; min-width:0; height:100%;
  background-image:var(--glass-scene); background-size:1800% 100%; background-position:var(--rib-position) 0;
  filter:blur(3px); opacity:.92;
}
.glass-bar-backdrop span::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,#a5d6eb1f 0%,#ffffff26 18%,#ffffff08 42%,#ffffff70 74%,#ffffffbd 87%,#ffffff52 94%,#92c9e126 100%);
  box-shadow:inset -1px 0 2px #ffffffb3,inset 1px 0 3px #a6d3e61a;
}
.glass-bar-backdrop::before { content:''; position:absolute; inset:-8%; z-index:1; background:radial-gradient(ellipse at 35% 24%,#ffffff80 0%,#ffffff33 28%,transparent 65%); filter:blur(22px); pointer-events:none; }
.glass-bar-backdrop::after {
  content:''; position:absolute; inset:0; border-radius:inherit;
  background:linear-gradient(180deg,#ffffff73 0%,#ffffff26 32%,#ffffff0d 65%,#eef7ff26 100%);
  box-shadow:inset 0 1px 0 #ffffffa6,inset 0 0 0 1px #ffffff40;
}
.glass-variant-sage,.glass-variant-mint { --glass-scene:radial-gradient(ellipse at 86% 95%,#b8e2f5f2 0%,transparent 57%),radial-gradient(ellipse at 12% 72%,#d8f0fbe6 0%,transparent 60%),radial-gradient(ellipse at 48% 28%,#fff 0%,#ffffffd9 28%,transparent 70%),linear-gradient(145deg,#fff 8%,#f5fbff 42%,#e3f3fc 77%,#cceafa); }
.glass-variant-sand,.glass-variant-stone { --glass-scene:radial-gradient(ellipse at 8% 100%,#b4dff3f2 0%,transparent 56%),radial-gradient(ellipse at 90% 70%,#dbf1fce6 0%,transparent 58%),radial-gradient(ellipse at 57% 25%,#fff 0%,#ffffffe6 30%,transparent 72%),linear-gradient(160deg,#fff 8%,#f5fcff 42%,#e5f4fc 78%,#c8e8f8); }
</style>
