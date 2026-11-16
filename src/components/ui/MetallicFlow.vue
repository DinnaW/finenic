<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const canvas = ref(null)
let gl, program, buffer, observer, resize, preference, frame, visible = false, time = 0, last = 0
let timeUniform, ratioUniform
function draw(now = 0) {
  frame = null
  if (!gl || gl.isContextLost()) return
  if (last && !preference.matches) time += Math.min((now-last)/1000,.05)
  last = now
  gl.uniform1f(timeUniform,time)
  gl.uniform1f(ratioUniform,canvas.value.width/canvas.value.height)
  gl.drawArrays(gl.TRIANGLES,0,3)
  if (visible && !document.hidden && !preference.matches) frame=requestAnimationFrame(draw)
}
function sync() { cancelAnimationFrame(frame); last=0; if(visible && !document.hidden) draw() }
onMounted(()=>{
  const el=canvas.value
  gl=el.getContext('webgl',{alpha:true,antialias:false,powerPreference:'low-power'})
  if(!gl) return
  const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null}return shader}
  const vertex=compile(gl.VERTEX_SHADER,'attribute vec2 a; varying vec2 uv; void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}')
  const fragment=compile(gl.FRAGMENT_SHADER,`precision mediump float;
    varying vec2 uv; uniform float t; uniform float ratio;
    void main(){
      vec2 p=(uv-.5)*vec2(ratio,1.);
      float slow=t*.13;
      float wave=p.y*3.4+p.x*.8+sin(p.x*1.5+slow)*.85+sin(p.y*2.6-p.x*.6-slow*.7)*.55;
      float fold=sin(wave*3.1+sin(p.x*1.3-slow)*1.5);
      float sheen=pow(.5+.5*fold,7.);
      float lip=pow(.5+.5*sin(wave*3.1+.42),22.);
      vec3 metal=mix(vec3(.025,.045,.075),vec3(.20,.36,.52),.5+.5*fold);
      metal+=sheen*vec3(.32,.43,.53)+lip*vec3(.12,.19,.25);
      float center=exp(-dot(p*vec2(.68,1.2),p*vec2(.68,1.2))*1.2);
      metal*=1.-center*.72;
      gl_FragColor=vec4(metal,1.);
    }`)
  if(!vertex||!fragment) return
  program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);gl.deleteShader(vertex);gl.deleteShader(fragment)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return
  gl.useProgram(program);buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW)
  const attribute=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(attribute);gl.vertexAttribPointer(attribute,2,gl.FLOAT,false,0,0)
  timeUniform=gl.getUniformLocation(program,'t');ratioUniform=gl.getUniformLocation(program,'ratio')
  preference=window.matchMedia('(prefers-reduced-motion: reduce)');preference.addEventListener('change',sync)
  resize=new ResizeObserver(()=>{el.width=Math.min(1600,Math.round(el.clientWidth));el.height=Math.max(1,Math.round(el.width*el.clientHeight/el.clientWidth));gl.viewport(0,0,el.width,el.height);sync()});resize.observe(el)
  observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(el)
  document.addEventListener('visibilitychange',sync)
})
onUnmounted(()=>{cancelAnimationFrame(frame);observer?.disconnect();resize?.disconnect();preference?.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);if(gl){gl.deleteBuffer(buffer);gl.deleteProgram(program)}})
</script>
<template><canvas ref="canvas" class="metallic-flow" aria-hidden="true" /></template>
<style scoped>.metallic-flow { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }</style>
