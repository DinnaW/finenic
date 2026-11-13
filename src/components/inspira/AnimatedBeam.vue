<script setup>
// Adapted from Inspira UI AnimatedBeam. See LICENSE and README.md.
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
const props = defineProps({ container: Object, from: Object, to: Object, active: Boolean, curvature: { type: Number, default: 0 }, duration: { type: Number, default: 4 }, delay: { type: Number, default: 0 } })
const id = useId(), svg = ref(null), path = ref(''), width = ref(1), height = ref(1), vertical = ref(false), reversed = ref(false)
const first = computed(() => reversed.value ? '110%; -10%' : '-10%; 110%')
const second = computed(() => reversed.value ? '100%; -20%' : '-20%; 100%')
let observer
function updatePath() {
  if (!props.container || !props.from || !props.to) return
  const container = props.container.getBoundingClientRect(), a = props.from.getBoundingClientRect(), b = props.to.getBoundingClientRect()
  width.value = container.width; height.value = container.height
  const x1 = a.left - container.left + a.width / 2, y1 = a.top - container.top + a.height / 2
  const x2 = b.left - container.left + b.width / 2, y2 = b.top - container.top + b.height / 2
  vertical.value = Math.abs(y2 - y1) > Math.abs(x2 - x1)
  reversed.value = vertical.value ? y2 < y1 : x2 < x1
  path.value = `M ${x1},${y1} Q ${(x1 + x2) / 2},${y1 - props.curvature} ${x2},${y2}`
}
watch(() => [props.container, props.from, props.to], () => {
  observer?.disconnect()
  if (props.container && observer) observer.observe(props.container)
  nextTick(updatePath)
}, { flush: 'post' })
watch(() => props.active, async (active) => { await nextTick(); active ? svg.value?.unpauseAnimations() : svg.value?.pauseAnimations() })
onMounted(() => { observer = new ResizeObserver(updatePath); if(props.container) observer.observe(props.container); updatePath(); if(!props.active) svg.value?.pauseAnimations() })
onUnmounted(() => observer?.disconnect())
</script>

<template>
  <svg ref="svg" class="animated-beam" :viewBox="`0 0 ${width} ${height}`" fill="none" aria-hidden="true">
    <path :d="path" stroke="#535b4e" stroke-opacity=".22" stroke-width="1.5" />
    <path :d="path" :stroke="`url(#${id})`" stroke-width="2.4" stroke-linecap="round" />
    <defs>
      <linearGradient :id="id" gradientUnits="userSpaceOnUse" x1="0%" x2="0%" y1="0%" y2="0%">
        <stop stop-color="#fff" stop-opacity="0"/><stop offset=".2" stop-color="#fff"/><stop offset=".5" stop-color="#626e54"/><stop offset="1" stop-color="#626e54" stop-opacity="0"/>
        <animate :attributeName="vertical ? 'y1' : 'x1'" :values="first" :dur="`${duration}s`" :begin="`${delay}s`" repeatCount="indefinite" />
        <animate :attributeName="vertical ? 'y2' : 'x2'" :values="second" :dur="`${duration}s`" :begin="`${delay}s`" repeatCount="indefinite" />
      </linearGradient>
    </defs>
  </svg>
</template>
<style scoped>.animated-beam { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }</style>
