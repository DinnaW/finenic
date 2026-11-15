<script setup>
const base = import.meta.env.BASE_URL
</script>

<template>
 <img class="dotted-world-map" :src="`${base}images/dotted-world-map.svg`" width="360" height="180" alt="Dotted world map" loading="lazy" decoding="async">
</template>

<style scoped>
.dotted-world-map { display:block; width:100%; height:auto; color:#a3afba; }
</style>
