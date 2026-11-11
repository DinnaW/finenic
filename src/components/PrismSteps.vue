<script setup>
import { motion } from 'motion-v'
defineProps({ reduced: Boolean })
const heights = [76, 62, 48, 35, 20, 35, 48, 62, 76]
</script>
<template>
 <div class="prism-scene" aria-hidden="true">
  <div class="scene-light"></div>
  <div class="prism-columns">
   <motion.div v-for="(height,index) in heights" :key="index" class="prism-column" :style="{'--height':`${height}%`,'--offset':`${index*19}%`}" :initial="reduced ? false : { y: '35%', opacity: 0.65 }" :animate="{y:'0%',opacity:1}" :transition="{duration:reduced?0:2.8,delay:reduced?0:0.15+Math.abs(index-4)*0.12,ease:[0.45,0,0.2,1]}"><div class="prism-edge"></div></motion.div>
  </div>
  <div class="scene-fade"></div>
 </div>
</template>
<style scoped>
.prism-scene{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}.scene-light{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 44%,#191919 0%,#0a0a0a 42%,#030303 76%)}.prism-columns{position:absolute;inset:0;display:grid;grid-template-columns:repeat(9,minmax(0,1fr));align-items:end}.prism-column{height:var(--height);position:relative;background:#020202;border-left:1px solid #ffffff12;border-right:1px solid #ffffff09}.prism-column:after{content:'';position:absolute;top:0;left:-1px;bottom:0;width:1px;background:linear-gradient(#d7d7d766,#aaa2 28%,transparent 88%)}.prism-edge{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(104deg,#777a85 0%,#ececf0 15%,#fff 33%,#f4ffa4 37%,#ffb952 39%,#ff5563 41%,#6d60ff 44%,#5cf9e7 47%,#fbfff7 51%,#fff 70%,#505160 92%);background-size:280% 100%;background-position:var(--offset) 50%;box-shadow:0 -1px 7px #fff1}.prism-column:nth-child(3n) .prism-edge{background-position:calc(var(--offset) + 48%) 50%}.prism-column:nth-child(5) .prism-edge{opacity:.5}.scene-fade{position:absolute;inset:0;background:linear-gradient(transparent 68%,#030303 100%)}
@media(max-width:760px){.prism-columns{grid-template-columns:repeat(9,minmax(0,1fr))}.prism-column{height:calc(var(--height)*.54)}.prism-edge{height:3px}.scene-light{background:radial-gradient(ellipse at 50% 40%,#161616,#030303 75%)}}
</style>
