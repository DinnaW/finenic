<script setup>
// Vue adaptation of Magic UI Animated List (MIT). See README.md and LICENSE.
import { computed, ref, watch, onUnmounted } from 'vue'
import { AnimatePresence, motion } from 'motion-v'
const props=defineProps({ items:{type:Array,required:true},active:Boolean,reduced:Boolean,delay:{type:Number,default:2400},limit:{type:Number,default:3} })
const sequence=ref(0)
let timer
const displayed=computed(()=>{
 if(props.reduced) return props.items.slice(0,props.limit).map((item,id)=>({item,id}))
 return Array.from({length:Math.min(sequence.value+1,props.limit,props.items.length)},(_,offset)=>{
  const id=sequence.value-offset
  return {id,item:props.items[id%props.items.length]}
 })
})
watch(()=>[props.active,props.reduced,props.delay],()=>{
 clearInterval(timer)
 if(props.active&&!props.reduced) timer=setInterval(()=>sequence.value++,props.delay)
},{immediate:true})
onUnmounted(()=>clearInterval(timer))
</script>

<template>
 <div class="magic-animated-list">
  <AnimatePresence :initial="false">
   <motion.div v-for="entry in displayed" :key="entry.id" class="magic-list-item" layout
    :initial="active&&!reduced?{opacity:0,scale:.96,y:-16}:false"
    :animate="{opacity:1,scale:1,y:0}"
    :exit="{opacity:0,scale:.96}"
    :transition="active&&!reduced?{type:'spring',stiffness:350,damping:40}:{duration:0}">
    <slot :item="entry.item" />
   </motion.div>
  </AnimatePresence>
 </div>
</template>

<style scoped>
.magic-animated-list { position:relative; display:flex; flex-direction:column; gap:3cqw; }
.magic-list-item { width:100%; transform-origin:50% 0; }
</style>
