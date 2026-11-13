<script setup>
// Adapted from Inspira UI Globe (Cobe). See LICENSE and README.md.
import createGlobe from 'cobe'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Globe2 } from 'lucide-vue-next'
const props = defineProps({ active: Boolean })
const canvas = ref(null), ready = ref(false)
let globe, observer, width = 0, phi = 1.8, last = 0
function setActive() { globe?.toggle(props.active) }
watch(() => props.active, setActive)
onMounted(() => {
  const el = canvas.value
  width = el.clientWidth
  const ratio = Math.min(devicePixelRatio, 1.5)
  try {
    if (!el.getContext('webgl2') && !el.getContext('webgl')) return
    globe = createGlobe(el, {
      width: width * ratio, height: width * ratio, devicePixelRatio: ratio,
      phi, theta: .22, dark: 0, diffuse: 1.1, mapSamples: 12000, mapBrightness: 3,
      baseColor: [.84,.82,.78], markerColor: [.23,.25,.20], glowColor: [.92,.90,.86],
      markers: [{ location:[6.9271,79.8612],size:.08 },{location:[51.5074,-.1278],size:.05},{location:[1.3521,103.8198],size:.05}],
      onRender(state) {
        const now = performance.now()
        if (props.active) phi += Math.min(now - (last || now), 40) * .00022
        last = now
        state.phi = phi; state.width = width * ratio; state.height = width * ratio
      },
    })
    ready.value = true
    globe.render(); setActive()
    observer = new ResizeObserver(() => { width = el.clientWidth; if(!props.active) globe.render() })
    observer.observe(el)
  } catch { ready.value = false }
})
onUnmounted(() => { observer?.disconnect(); globe?.destroy() })
</script>

<template><div class="live-globe"><Globe2 v-if="!ready" class="globe-fallback" :stroke-width=".6"/><canvas ref="canvas" :style="{ opacity: ready ? 1 : 0 }" /></div></template>
<style scoped>.live-globe { position:absolute; aspect-ratio:1; }.live-globe canvas { width:100%; height:100%; }.globe-fallback { position:absolute; inset:10%; width:80%; height:80%; color:#f7f5ef; }</style>
