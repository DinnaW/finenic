<template>
  <div class="orbital-backdrop" aria-hidden="true">
    <div class="orbital-grid"></div>
    <div class="orbital-ring orbital-ring--outer"></div>
    <div class="orbital-ring orbital-ring--inner"></div>
    <div class="orbital-reflection"></div>
  </div>
</template>

<style scoped>
.orbital-backdrop { position:absolute; inset:0; z-index:-1; overflow:hidden; pointer-events:none; border-radius:inherit; background:radial-gradient(ellipse at 105% 75%,#277de8 0%,transparent 52%),radial-gradient(ellipse at -10% 115%,#638de4 0%,transparent 55%),linear-gradient(155deg,#091b3b 4%,#153c76 53%,#2863b2 100%); }
.orbital-grid { position:absolute; inset:35% -30% -60%; background-image:linear-gradient(#b5d8ff12 1px,transparent 1px),linear-gradient(90deg,#b5d8ff12 1px,transparent 1px); background-size:12% 12%; transform:perspective(400px) rotateX(56deg) rotateZ(-16deg); mask-image:linear-gradient(transparent,#000 45%,transparent); }
.orbital-ring { position:absolute; width:145%; aspect-ratio:1; border:1px solid #c7e9ff66; border-radius:50%; transform:rotate(-32deg) scaleY(.64); box-shadow:0 -2px 9px #9dd5ff55,inset 0 1px 3px #e8f7ff55; }
.orbital-ring--outer { left:-38%; top:18%; }
.orbital-ring--inner { width:112%; left:-21%; top:33%; opacity:.45; }
.orbital-reflection { position:absolute; inset:0; background:linear-gradient(125deg,transparent 36%,#badbff0d 48%,#dff3ff26 49%,#b5dcff08 50%,transparent 64%); box-shadow:inset 0 1px 0 #ffffff24,inset 0 0 0 1px #b9d8ff24; border-radius:inherit; }
</style>
