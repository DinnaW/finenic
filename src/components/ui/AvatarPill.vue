<script setup>
import { ref } from 'vue'
import { UserRound } from 'lucide-vue-next'

// Native Vue adaptation of the overlapping avatar pill supplied by the user.
// Decorative stock portraits; no customer identities or endorsement claim.
const failed = ref({})
const portraits = Array.from({ length: 4 }, (_, index) => `${import.meta.env.BASE_URL}images/avatars/portrait-${index + 1}.jpg`)
</script>

<template>
  <div class="avatar-pill">
    <div class="avatar-pill-faces" aria-hidden="true">
      <span v-for="(src, index) in portraits" :key="src" class="avatar-pill-face">
        <img v-if="!failed[index]" :src="src" alt="" width="32" height="32" decoding="async" @error="failed[index] = true" />
        <UserRound v-else :size="16" stroke-width="1.5" />
      </span>
    </div>
    <span class="avatar-pill-label">For people with big ideas</span>
  </div>
</template>

<style scoped>
.avatar-pill { align-self:center; display:inline-flex; align-items:center; gap:11px; max-width:100%; padding:5px 15px 5px 5px; margin:0 0 clamp(22px,2vw,32px); border:1px solid transparent; border-radius:999px; background:linear-gradient(130deg,#ffffffed,#f4f9fdd9); box-shadow:0 0 0 1px #173b8312,inset 0 1px 0 #fff,0 3px 12px -6px #183b6c14; color:var(--secondary); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); }
.avatar-pill-faces { display:flex; flex-shrink:0; padding-right:1px; }
.avatar-pill-face { position:relative; display:grid; place-items:center; width:32px; height:32px; flex-shrink:0; border:2px solid #fff; border-radius:50%; overflow:hidden; background:#e3edf4; color:#526078; }
.avatar-pill-face + .avatar-pill-face { margin-left:-9px; }
.avatar-pill-face img { display:block; width:100%; height:100%; object-fit:cover; }
.avatar-pill-label { font-size:12px; line-height:1.4; font-weight:500; letter-spacing:-.01em; }
@media(max-width:760px) { .avatar-pill { gap:9px; margin-bottom:22px; padding-right:12px; }.avatar-pill-face { width:28px; height:28px; }.avatar-pill-label { font-size:11px; } }
</style>
