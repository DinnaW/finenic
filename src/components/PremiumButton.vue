<script setup>
defineProps({
  variant: { type: String, default: 'header' },
  type: { type: String, default: 'button' },
})
</script>

<template>
  <button :type="type" class="premium-button" :class="`premium-button--${variant}`">
    <span class="premium-label"><slot /></span>
    <span class="premium-icon" aria-hidden="true"><slot name="icon" /></span>
  </button>
</template>

<style scoped>
.premium-button { position:relative; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; gap:16px; min-height:42px; padding:0 17px; border:1px solid #dededb; border-radius:999px; background:linear-gradient(165deg,#fff,#eaeae7); color:#111; font:inherit; font-size:12px; font-weight:600; line-height:1.3; white-space:nowrap; box-shadow:inset 0 1px 0 #fff,0 6px 14px -8px #0006; transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease; }
.premium-button:hover { border-color:#aaa; box-shadow:inset 0 1px 0 #fff,0 8px 18px -8px #0006; transform:translateY(-1px); }
:global([data-theme="light"] .premium-button) { color:#fff; background:linear-gradient(165deg,#242424,#080808); border-color:#333; box-shadow:inset 0 1px 0 #ffffff20,0 6px 14px -8px #0006; }
:global([data-theme="light"] .premium-button:hover) { border-color:#666; }
.premium-button:active { transform:translateY(0) scale(.98); }
.premium-button:focus-visible { outline:2px solid currentColor; outline-offset:4px; }
.premium-icon { display:grid; place-items:center; color:inherit; transition:transform .25s ease; }
.premium-button:hover .premium-icon { transform:translate(1px,-1px); }
.premium-button--hero { min-height:50px; padding-inline:20px; gap:18px; }
@media(max-width:760px) {
  .premium-button--header { padding-inline:12px; gap:9px; font-size:11px; min-height:38px; }
  .premium-button--hero { width:100%; border-radius:10px; min-height:48px; font-size:13px; }
}
@media(max-width:360px) { .premium-button--header { padding-inline:9px; gap:7px; } }
@media(prefers-reduced-motion:reduce) {
  .premium-button,.premium-icon { transition:none; }
  .premium-button:hover,.premium-button:active,.premium-button:hover .premium-icon { transform:none; }
}
</style>
