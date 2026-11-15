<script setup>
import { computed } from 'vue'

const props = defineProps({ name: { type: String, required: true } })
// Optical bounds remove transparent file padding in CSS; original assets stay intact.
const logos = {
  Saptify: { file: 'saptify.png', size: [720, 180], bounds: [64, 16, 572, 139], height: 6.5 },
  Cartinno: { file: 'cartinno.webp', size: [800, 226], bounds: [83, 43, 631, 137], height: 5.8 },
  Ipsova: { file: 'ipsova.png', size: [1000, 284], bounds: [6, 33, 988, 204], height: 6.2 },
  Smardove: { file: 'smardove.png', size: [666, 434], bounds: [10, 14, 644, 403], height: 9 },
  SaaSBeds: { file: 'saasbeds.png', size: [1536, 346], bounds: [0, 18, 1536, 254], height: 5.5 },
  Veyogo: { file: 'veyogo.png', size: [1154, 224], bounds: [52, 46, 1054, 136], height: 4.5 },
  Saptivo: { file: 'saptivo.png', size: [1974, 359], bounds: [1, 0, 1973, 359], height: 5.7 },
}
const logo = computed(() => logos[props.name])
const frameStyle = computed(() => logo.value && ({
  height: `${logo.value.height}cqw`,
  aspectRatio: `${logo.value.bounds[2]} / ${logo.value.bounds[3]}`,
}))
const imageStyle = computed(() => {
  if (!logo.value) return undefined
  const { size, bounds: [x, y, width, height] } = logo.value
  return { width: `${size[0] / width * 100}%`, height: `${size[1] / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }
})
const base = import.meta.env.BASE_URL
</script>

<template>
  <div v-if="logo" class="product-brand-logo" :style="frameStyle">
    <img :src="`${base}images/brands/${logo.file}`" :alt="name" :width="logo.size[0]" :height="logo.size[1]" :style="imageStyle" decoding="async" draggable="false" />
  </div>
  <template v-else>{{ name }}</template>
</template>

<style scoped>
.product-brand-logo { position:relative; flex:none; overflow:hidden; }
.product-brand-logo img { position:absolute; display:block; max-width:none; object-fit:fill; }
</style>
