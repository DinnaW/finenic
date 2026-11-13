<script setup>
import { motion } from 'motion-v'

defineProps({ reduced: Boolean })
const heights = [76, 65, 54, 43, 32]
</script>
<template>
 <div class="prism-scene" aria-hidden="true">
  <div class="scene-light"></div>
  <div v-for="side in ['left', 'right']" :key="side" class="prism-bank" :class="side">
   <motion.div v-for="(height,index) in heights" :key="index" class="prism-column"
    :style="{'--height':height+'%', '--offset':(index*38)+'%'}"
    :initial="reduced ? false : { y: '35%', opacity: 0.65 }"
    :animate="{ y: '0%', opacity: 1 }"
    :transition="{ duration: reduced ? 0 : 2.8, delay: reduced ? 0 : 0.15+(heights.length-1-index)*0.09, ease: [0.45,0,0.2,1] }">
    <div class="prism-edge"></div>
   </motion.div>
  </div>
  <div class="scene-fade"></div>
 </div>
</template>
<style scoped>
.prism-scene{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0}
.scene-light{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 44%,#191919 0%,#0a0a0a 42%,#030303 76%)}
/* Five columns per side; a gradual fade keeps the inner steps quiet. */
.prism-bank{position:absolute;top:0;bottom:0;width:43%;display:flex;align-items:flex-end}
.left{left:0;mask-image:linear-gradient(90deg,#000 0%,#000 25%,#0008 48%,#0002 72%,transparent 100%)}
.right{right:0;flex-direction:row-reverse;mask-image:linear-gradient(270deg,#000 0%,#000 25%,#0008 48%,#0002 72%,transparent 100%)}
.prism-column{flex:1;min-width:0;height:var(--height);position:relative;background:#020202;border-left:1px solid #ffffff12;border-right:1px solid #ffffff09}
.prism-column:after{content:'';position:absolute;top:0;left:-1px;bottom:0;width:1px;background:linear-gradient(#d7d7d766,#aaa2 28%,transparent 88%)}
.prism-edge{position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(104deg,#777 0%,#ececec 15%,#fff 33%,#bdbdbd 42%,#f9f9f9 51%,#fff 70%,#505050 92%);background-size:280% 100%;background-position:var(--offset) 50%;box-shadow:0 -1px 7px #fff1}
.scene-fade{position:absolute;inset:0;background:linear-gradient(transparent 68%,#030303 100%)}
@media(max-width:760px){.prism-bank{width:43%}.prism-column{height:calc(var(--height)*.4)}.prism-edge{height:2px}}
</style>
