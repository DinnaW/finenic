<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { createParticleText } from './particleTextEngine'
const props = defineProps({ text:{type:String,default:'FINENIC'}, paused:Boolean })
const container = ref(null), canvas = ref(null), ready = ref(false)
const settings = { current: {} }, wake = { current: () => {} }
function sync() {
 settings.current = { text:props.text, particleSize:1.65, density:4, color:'currentColor', highlightColor:'#1976d2', highlightMode:'motion', shape:'circle', intro:'gather', scatter:190, gatherDuration:2500, stagger:450, clickBurst:true, burstStrength:1, pointerRepel:42, repelRadius:120, idleDrift:.35, trigger:'mount', fontSize:'clamp(80px, 23vw, 420px)', fontWeight:600, fontFamily:'inherit', glow:true, paused:props.paused }
 wake.current()
}
sync()
watch(()=>[props.text,props.paused],sync)
let observer, dispose
onMounted(()=>{
 observer = new IntersectionObserver(([entry])=>{
  if (entry.intersectionRatio < .2 || dispose) return
  dispose = createParticleText(container.value,canvas.value,settings,wake)
  ready.value = !!dispose
  observer.disconnect()
 },{threshold:.2})
 observer.observe(container.value)
})
onUnmounted(()=>{ observer?.disconnect(); dispose?.() })
</script>

<template>
 <div ref="container" class="particle-text">
  <canvas ref="canvas" class="particle-text__canvas" aria-hidden="true" />
  <span :class="ready?'particle-text__sr':'particle-text__fallback'">{{ text }}</span>
 </div>
</template>

<style scoped>
.particle-text { position:relative; width:100%; height:100%; overflow:hidden; touch-action:pan-y; isolation:isolate; }
.particle-text__canvas { position:absolute; inset:0; display:block; width:100%; height:100%; }
.particle-text__fallback { display:flex; height:100%; align-items:center; justify-content:center; font-size:clamp(80px,20vw,360px); font-weight:600; letter-spacing:-.06em; }
.particle-text__sr { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>
