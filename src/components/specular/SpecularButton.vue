<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { mountSpecularLight } from './specular-light'

const props = defineProps({ disabled: Boolean })
const button = ref(null)
const canvas = ref(null)
let teardown = () => {}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const settings = {
    radius: 999,
    lineColor: '#ffffff',
    baseColor: '#6b6b6b',
    intensity: 1.3,
    idleIntensity: .4,
    shineSize: 10,
    shineFade: 34,
    thickness: 1.2,
    glow: 1,
    speed: .35,
    followMouse: true,
    proximity: 200,
    autoAnimate: false,
    get disabled() { return props.disabled },
  }
  let disposeLight
  const setup = () => {
    disposeLight?.()
    disposeLight = undefined
    if (!reduced.matches) disposeLight = mountSpecularLight(button.value, canvas.value, settings)
  }
  setup()
  reduced.addEventListener('change', setup)
  teardown = () => {
    reduced.removeEventListener('change', setup)
    disposeLight?.()
  }
})
onUnmounted(() => teardown())
</script>

<template>
  <button ref="button" type="button" class="specular-button" :disabled="disabled">
    <canvas ref="canvas" class="specular-button-light" aria-hidden="true"></canvas>
    <span class="specular-button-label"><slot /></span>
  </button>
</template>

<style scoped>
/* Vue adaptation of React Bits SpecularButton.css; see accompanying license. */
.specular-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  min-height: 54px;
  margin: 0;
  padding: 0 25px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  color: #f5f5f5;
  background: linear-gradient(155deg, #272727, #121212);
  box-shadow: inset 0 0 0 1px #6b6b6b66, 0 10px 24px -14px #0008;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform .25s cubic-bezier(.2, .8, .2, 1);
}
.specular-button:active:not(:disabled) { transform: scale(.97); }
.specular-button:focus-visible { outline: 2px solid #6a6a6a; outline-offset: 5px; }
.specular-button:disabled { opacity: .5; cursor: default; }
.specular-button-light {
  position: absolute;
  inset: -24px;
  z-index: 1;
  display: block;
  width: calc(100% + 48px);
  height: calc(100% + 48px);
  pointer-events: none;
}
.specular-button-label { position: relative; z-index: 2; display: inline-flex; align-items: center; gap: inherit; }
@media (prefers-reduced-motion: reduce) {
  .specular-button { transition: none; }
  .specular-button:active:not(:disabled) { transform: none; }
  .specular-button-light { display: none; }
}
</style>
