<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const props = defineProps({ paused: Boolean })
const host = ref(null)
const canvas = ref(null)
const ready = ref(false)
let dispose = () => {}
let update = () => {}
watch(() => props.paused, () => update())
onMounted(() => {
 const gl = canvas.value.getContext('webgl', {alpha:true, antialias:false, powerPreference:'low-power'})
 if (!gl) return
 const vertex = `attribute vec2 aPosition;void main(){gl_Position=vec4(aPosition,0.,1.);}`
 const fragment = `precision mediump float;
 uniform vec2 uResolution;uniform float uTime;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
 float fbm(vec2 p){float v=0.;float a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(5.4,1.7);a*=.5;}return v;}
 void main(){
 vec2 uv=gl_FragCoord.xy/uResolution;float t=uTime*.075;
 float sides=pow(abs(uv.x-.5)*2.,2.3);
 float warp=fbm(vec2(uv.x*3.3+t*.15,uv.y*2.2-t*.13));
 float rise=.19+.31*sides+.095*sin(uv.x*7.5+t)+.16*(warp-.5);
 float distance=uv.y-rise;
 float ribbon=exp(-pow(distance/.065,2.));
 float haze=exp(-pow(distance/.23,2.));
 float threads=.62+.38*fbm(vec2(uv.x*18.+warp*3.,uv.y*3.-t));
 vec3 left=vec3(.08,.66,.78),middle=vec3(.30,.28,.85),right=vec3(.55,.27,.80);
 vec3 color=mix(left,middle,smoothstep(.05,.52,uv.x));color=mix(color,right,smoothstep(.5,1.,uv.x));
 float energy=(ribbon*.53+haze*.26)*threads;
 float bottom=exp(-uv.y*7.)*.25;
 float edge=pow(sides,2.)*(1.-smoothstep(.28,.85,uv.y))*.20;
 float clearCenter=1.-.90*exp(-pow((uv.x-.5)/.29,4.))*smoothstep(.22,.52,uv.y);
 vec3 light=color*(energy+bottom+edge)*clearCenter;
 light+=vec3(.30,.65,.95)*ribbon*.07;
 float fade=1.-smoothstep(.63,.96,uv.y);
 gl_FragColor=vec4(light*fade,1.);
 }`
 function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){gl.deleteShader(shader);return null}return shader}
 const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment)
 if(!vs||!fs){if(vs)gl.deleteShader(vs);if(fs)gl.deleteShader(fs);return}
 const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)
 if(!gl.getProgramParameter(program,gl.LINK_STATUS)){gl.deleteProgram(program);return}
 gl.useProgram(program)
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW)
 const pos=gl.getAttribLocation(program,'aPosition');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0)
 const res=gl.getUniformLocation(program,'uResolution'),time=gl.getUniformLocation(program,'uTime')
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
 let frame=0,elapsed=12,last=0,visible=true,lost=false
 function render(){if(lost)return;gl.uniform2f(res,canvas.value.width,canvas.value.height);gl.uniform1f(time,elapsed);gl.drawArrays(gl.TRIANGLES,0,6)}
 function tick(now){frame=0;if(!last)last=now;if(now-last>=32){elapsed+=Math.min((now-last)/1000,.1);last=now;render()}frame=requestAnimationFrame(tick)}
 update=()=>{cancelAnimationFrame(frame);frame=0;last=0;if(lost)return;render();if(!props.paused&&!reduced.matches&&!document.hidden&&visible)frame=requestAnimationFrame(tick)}
 function resize(){const rect=host.value.getBoundingClientRect();const ratio=Math.min(window.devicePixelRatio||1,1.5);canvas.value.width=Math.max(1,Math.round(rect.width*ratio));canvas.value.height=Math.max(1,Math.round(rect.height*ratio));gl.viewport(0,0,canvas.value.width,canvas.value.height);render()}
 const observer=new ResizeObserver(resize);observer.observe(host.value)
 const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()});intersection.observe(host.value)
 function contextLost(event){event.preventDefault();lost=true;ready.value=false;cancelAnimationFrame(frame)}
 canvas.value.addEventListener('webglcontextlost',contextLost)
 document.addEventListener('visibilitychange',update);reduced.addEventListener('change',update)
 resize();ready.value=true;update()
 dispose=()=>{cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',update);reduced.removeEventListener('change',update);canvas.value?.removeEventListener('webglcontextlost',contextLost);if(!lost){gl.deleteBuffer(buffer);gl.deleteProgram(program)}update=()=>{}}
})
onBeforeUnmount(()=>dispose())
</script>
<template><div ref="host" class="aurora-background" aria-hidden="true"><div class="aurora-fallback" :class="{'is-rendered':ready}"></div><canvas ref="canvas" :class="{'is-ready':ready}"></canvas></div></template>
<style scoped>
.aurora-background{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0}.aurora-background canvas{height:100%;width:100%;display:block;opacity:0;mix-blend-mode:screen}.aurora-background canvas.is-ready{opacity:1}.aurora-fallback{position:absolute;inset:0;background:radial-gradient(ellipse at 0 83%,#1a8aa580,transparent 48%),radial-gradient(ellipse at 100% 80%,#8455cd80,transparent 48%),radial-gradient(ellipse at 50% 110%,#4646bfa0,transparent 58%)}.aurora-fallback.is-rendered{opacity:0}
</style>
