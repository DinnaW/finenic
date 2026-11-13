<script setup>
// Adapted from Inspira UI AnimatedList. See LICENSE and README.md.
import { computed, onUnmounted, ref, watch } from 'vue'
import { Motion } from 'motion-v'

const props = defineProps({ items: { type: Array, required: true }, active: Boolean, delay: { type: Number, default: 3200 }, limit: { type: Number, default: 3 } })
const step = ref(0)
let timer
const displayedItems = computed(() => Array.from({ length: Math.min(props.limit, props.items.length) }, (_, offset) => {
  const sequence = step.value - offset
  return { item: props.items[((sequence % props.items.length) + props.items.length) % props.items.length], id: sequence }
}))
watch(() => props.active, (active) => {
  clearInterval(timer)
  if (active) timer = setInterval(() => step.value++, props.delay)
}, { immediate: true })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <TransitionGroup tag="div" name="activity" class="animated-list">
    <Motion v-for="data in displayedItems" :key="data.id" class="animated-list-item"
      :initial="active ? { y: -18, scale: .96, opacity: 0 } : false"
      :animate="{ y: 0, scale: 1, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 350, damping: 40 }">
      <slot :item="data.item" />
    </Motion>
  </TransitionGroup>
</template>

<style scoped>
.animated-list { position:relative; display:flex; flex-direction:column; gap:3cqw; }
.animated-list-item { width:100%; }
.activity-move { transition:transform .55s cubic-bezier(.16,1,.3,1); }
.activity-leave-active { position:absolute; left:0; right:0; transition:opacity .25s; }
.activity-leave-to { opacity:0; }
@media(prefers-reduced-motion:reduce) { .activity-move,.activity-leave-active { transition:none; } }
</style>
