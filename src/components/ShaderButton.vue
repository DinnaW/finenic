<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({ variant: { type: String, default: 'header' }, type: { type: String, default: 'button' } })
const button = ref(null), canvas = ref(null), label = ref(null)
const ready = ref(false)
let cleanup = () => {}

// Original, compact shader inspired by the end-lit Framer reference.
// The label's measured right edge defines a safe area the glow never enters.
const vertex = 'attribute vec2 position; varying vec2 uv; void main(){ uv=position*.5+.5; gl_Position=vec4(position,0.,1.); }'
const fragment = `
precision mediump float;
varying vec2 uv;
uniform float time;
uniform float hover;
uniform float guard;
uniform float pointerY;
float hash(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p) {
  vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);
}
void main() {
  float t=time*.45;
  float x=(1.-uv.x)*3.8;
  float n=noise(vec2(x*2.-t,uv.y*3.+t*.25));
  float flow=sin(x*4.2-t*1.5+n*2.)*.13;
  float center=.5+flow+(pointerY-.5)*hover*.2;
  float ribbon=exp(-pow((uv.y-center)*5.5,2.));
  float crest=exp(-pow((uv.y-center-.18*sin(x*3.-t)) * 16.,2.));
  float cap=exp(-x*(1.45-hover*.4));
  float light=(ribbon*.6+crest*.32+n*.17)*cap*(.8+hover*.55);
  light+=exp(-pow((uv.y-.08-flow*.25)*13.,2.))*cap*.3;
  float safe=smoothstep(guard,min(.99,guard+.16),uv.x);
  vec3 sapphire=vec3(.16,.30,.78);
  vec3 ice=vec3(.51,.75,1.);
  vec3 color=mix(sapphire,ice,clamp(crest*.65+n*.22,0.,1.));
  gl_FragColor=vec4(color,clamp(light*safe,0.,.95));
}`

onMounted(() => {
  const el = button.value, cv = canvas.value
  const gl = cv.getContext('webgl', { alpha: true, antialias: false, depth: false, powerPreference: 'low-power' })
  if (!gl) return
  const shaders = []
  const compile = (kind, source) => {
    const shader = gl.createShader(kind)
    if (!shader) return null
    shaders.push(shader)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
  }
  const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment)
  const program = gl.createProgram()
  if (!vs || !fs || !program) { shaders.forEach(s => gl.deleteShader(s)); if (program) gl.deleteProgram(program); return }
  gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
  shaders.forEach(s => gl.deleteShader(s))
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); return }
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
  gl.useProgram(program)
  const position = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
  const uniforms = Object.fromEntries(['time', 'hover', 'guard', 'pointerY'].map(key => [key, gl.getUniformLocation(program, key)]))
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let visible = false, raf = 0, elapsed = 0, last = 0, level = 0, target = 0, pointer = .5, safe = .55
  const draw = () => {
    if (gl.isContextLost()) { ready.value = false; return }
    gl.viewport(0, 0, cv.width, cv.height)
    gl.uniform1f(uniforms.time, elapsed)
    gl.uniform1f(uniforms.hover, level)
    gl.uniform1f(uniforms.guard, safe)
    gl.uniform1f(uniforms.pointerY, pointer)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    ready.value = true
  }
  const frame = now => {
    raf = 0
    if (!visible || document.hidden || reduced.matches || gl.isContextLost()) { last = 0; return }
    if (!last || now - last >= 32) {
      const dt = last ? Math.min((now - last) / 1000, .05) : 1 / 30
      elapsed += dt
      level += (target - level) * (1 - Math.exp(-dt * 7))
      draw(); last = now
    }
    raf = requestAnimationFrame(frame)
  }
  const wake = () => {
    if (!raf && visible && !document.hidden && !reduced.matches) raf = requestAnimationFrame(frame)
  }
  const measure = () => {
    const rect = el.getBoundingClientRect(), text = label.value.getBoundingClientRect()
    const ratio = Math.min(devicePixelRatio || 1, 2)
    cv.width = Math.max(1, Math.round(rect.width * ratio)); cv.height = Math.max(1, Math.round(rect.height * ratio))
    safe = Math.min(.78, (text.right - rect.left + 4) / rect.width)
    draw(); wake()
  }
  const enter = () => { target = 1; wake() }
  const leave = () => { target = el.matches(':focus-visible') ? 1 : 0 }
  const move = event => { const rect = el.getBoundingClientRect(); pointer = 1 - (event.clientY - rect.top) / rect.height }
  const focus = () => { target = 1; wake() }
  const blur = () => { target = 0 }
  const preference = () => { cancelAnimationFrame(raf); raf = 0; last = 0; level = 0; elapsed = 0; draw(); wake() }
  const visibility = () => { if (document.hidden) { cancelAnimationFrame(raf); raf = 0; last = 0 } else wake() }
  const lost = event => { event.preventDefault(); ready.value = false; cancelAnimationFrame(raf); raf = 0 }
  const resize = new ResizeObserver(measure)
  resize.observe(el)
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else { cancelAnimationFrame(raf); raf = 0; last = 0 } })
  intersection.observe(el)
  el.addEventListener('pointerenter', enter); el.addEventListener('pointerleave', leave); el.addEventListener('pointermove', move)
  el.addEventListener('focus', focus); el.addEventListener('blur', blur)
  cv.addEventListener('webglcontextlost', lost)
  reduced.addEventListener('change', preference)
  document.addEventListener('visibilitychange', visibility)
  measure()
  cleanup = () => {
    cancelAnimationFrame(raf); resize.disconnect(); intersection.disconnect()
    el.removeEventListener('pointerenter', enter); el.removeEventListener('pointerleave', leave); el.removeEventListener('pointermove', move)
    el.removeEventListener('focus', focus); el.removeEventListener('blur', blur)
    cv.removeEventListener('webglcontextlost', lost)
    reduced.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility)
    gl.deleteBuffer(buffer); gl.deleteProgram(program)
  }
})
onUnmounted(() => cleanup())
</script>

<template>
  <button ref="button" :type="type" class="shader-button" :class="[`shader-button--${variant}`, { 'shader-ready': ready }]">
    <span class="shader-fallback" aria-hidden="true"></span>
    <canvas ref="canvas" class="shader-canvas" aria-hidden="true"></canvas>
    <span ref="label" class="shader-label"><slot /></span>
    <span class="shader-icon" aria-hidden="true"><slot name="icon" /></span>
  </button>
</template>

<style scoped>
.shader-button {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 16px;
  padding: 0 17px;
  min-height: 42px;
  border: 1px solid #51535d;
  border-radius: 999px;
  overflow: hidden;
  background: #1c1d22;
  color: #fff;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  white-space: nowrap;
  box-shadow: 0 5px 15px -10px #05060b70;
  transition: transform .25s ease, border-color .25s ease;
}
.shader-button:hover { border-color: #8b93a9; }
.shader-button:active { transform: scale(.98); }
.shader-button:focus-visible { outline: 2px solid #809eff; outline-offset: 4px; }
.shader-fallback, .shader-canvas { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.shader-fallback { background: radial-gradient(ellipse at 110% 50%, #8ebcff, #3553ad 22%, transparent 43%); }
.shader-ready .shader-fallback { opacity: 0; }
.shader-label, .shader-icon { position: relative; z-index: 1; }
.shader-icon { display: grid; place-items: center; transition: transform .3s ease; }
.shader-button:hover .shader-icon { transform: translate(1px, -1px); }
.shader-button--hero { min-height: 50px; padding-inline: 20px; gap: 18px; }
@media (max-width: 760px) {
  .shader-button--header { padding-inline: 12px; gap: 9px; font-size: 11px; min-height: 38px; }
  .shader-button--hero { width: 100%; border-radius: 10px; min-height: 48px; font-size: 13px; }
}
@media (prefers-reduced-motion: reduce) {
  .shader-button, .shader-icon { transition: none; }
  .shader-button:active, .shader-button:hover .shader-icon { transform: none; }
}
@media (max-width: 360px) {
  .shader-button--header { padding-inline: 9px; gap: 7px; }
}
</style>
