<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({ reduced: Boolean })
const canvas = ref(null)
let dispose = () => {}
onMounted(() => {
 const el = canvas.value
 const ctx = el.getContext('2d')
 if (!ctx) return
 const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
 let width = 0, height = 0, frame = 0, start = performance.now()
 const duration = 4800
 function draw(now) {
  const progress = props.reduced || preference.matches ? 1 : Math.min((now - start) / duration, 1)
  const phase = 1 - Math.pow(1 - progress, 3)
  ctx.clearRect(0, 0, width, height)
  const columns = Math.ceil(width / 9)
  const rows = width < 760 ? 22 : 34
  for (let col = 0; col <= columns; col++) {
   const u = col / columns
   const x = u * width
   for (let row = 0; row < rows; row++) {
    const v = row / (rows - 1)
    const wave = Math.sin(u * 8 + v * 2.5 + phase * 0.7)
    const y = height * (0.96 - u * 0.48 + wave * 0.09 + (v - 0.5) * 0.24)
    const edge = Math.pow(Math.abs(u - 0.5) * 2, 0.65)
    const feather = Math.pow(Math.sin(v * Math.PI), 1.4)
    const alpha = feather * (0.08 + edge * 0.39) * (0.5 + phase * 0.5)
    const r = Math.round(112 + u * 24), g = r, b = r
    ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')'
    const size = 0.8 + feather * 0.8 + edge * 0.35
    ctx.fillRect(x, y, size, size)
   }
  }
  if (progress < 1 && !document.hidden) frame = requestAnimationFrame(draw)
 }
 function render() {
  cancelAnimationFrame(frame)
  width = el.clientWidth; height = el.clientHeight
  const ratio = Math.min(window.devicePixelRatio || 1, 2)
  el.width = Math.round(width * ratio); el.height = Math.round(height * ratio)
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  draw(performance.now())
 }
 const observer = new ResizeObserver(render)
 observer.observe(el)
 preference.addEventListener('change', render)
 document.addEventListener('visibilitychange', render)
 dispose = () => {
  cancelAnimationFrame(frame); observer.disconnect()
  preference.removeEventListener('change', render)
  document.removeEventListener('visibilitychange', render)
 }
})
onUnmounted(() => dispose())
</script>

<template>
 <div class="gradient-backdrop" aria-hidden="true">
  <div class="ambient-light"></div>
  <canvas ref="canvas" class="particle-ribbon"></canvas>
  <div class="edge-fade"></div>
 </div>
</template>

<style scoped>
.gradient-backdrop{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;background:#fafaf8}
.ambient-light{position:absolute;inset:0;background:radial-gradient(ellipse 48% 46% at -5% 95%,#d7d7d3 0%,#d7d7d300 100%),radial-gradient(ellipse 42% 55% at 110% 70%,#d4d4d0 0%,#d4d4d000 100%),radial-gradient(ellipse 55% 25% at 50% 110%,#e2e2de 0%,#e2e2de00 100%)}
.particle-ribbon{position:absolute;inset:0;width:100%;height:100%}
.edge-fade{position:absolute;inset:0;background:linear-gradient(180deg,#fafaf8 0%,#fafaf800 25%,#fafaf800 82%,#fafaf8 100%)}
@media(max-width:760px){.ambient-light{opacity:.75}.particle-ribbon{opacity:.7}}
</style>
