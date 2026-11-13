<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

defineEmits(['search'])
const section = ref(null)
const video = ref(null)
const failed = ref(false)
const step = ref(0)
const base = import.meta.env.BASE_URL
const steps = ['Find a name that feels like you.', 'Check your domain options.', 'Give your idea a home online.']
let dispose = () => {}
onMounted(() => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
 const motion = gsap.matchMedia()
 motion.add({ desktop: '(min-width: 761px)', animate: '(prefers-reduced-motion: no-preference)' }, (context) => {
  if (!context.conditions.animate) return
  const desktop = context.conditions.desktop
  const select = gsap.utils.selector(section.value)
  const reveal = gsap.timeline({ scrollTrigger: {
   trigger: section.value, start: 'top 85%', end: 'bottom bottom', scrub: 0.8,
   invalidateOnRefresh: true,
  } })
  reveal.from(select('.headline-line'), { yPercent: 105, stagger: 0.08, duration: 0.35, ease: 'power3.out' }, 0)
   .from(select('.story-intro'), { opacity: 0.35, y: 20, duration: 0.35 }, 0.05)
   .fromTo(select('.story-film'), { clipPath: `inset(0 ${desktop ? 12 : 3}% 0 ${desktop ? 12 : 3}% round 24px)` },
    { clipPath: 'inset(0 0% 0 0% round 16px)', duration: 0.65, ease: 'power2.inOut' }, 0.1)
   .from(select('video'), { scale: desktop ? 1.13 : 1.05, duration: 0.75, ease: 'power2.out' }, 0.1)
   .from(select('.address-letter'), { opacity: 0, stagger: 0.018, duration: 0.01 }, 0.4)
   .from(select('.film-copy'), { y: 24, opacity: 0, duration: 0.3 }, 0.55)
 })
 let inView = false
 const syncPlayback = () => {
  if (inView && !document.hidden && !reduced.matches) video.value?.play().catch(() => {})
  else video.value?.pause()
 }
 const observer = new IntersectionObserver(([entry]) => {
  inView = entry.isIntersecting
  syncPlayback()
 }, { threshold: 0.05 })
 observer.observe(video.value)
 document.addEventListener('visibilitychange', syncPlayback)
 reduced.addEventListener('change', syncPlayback)
 dispose = () => { motion.revert(); observer.disconnect(); document.removeEventListener('visibilitychange', syncPlayback); reduced.removeEventListener('change', syncPlayback) }
})
onUnmounted(() => dispose())
</script>

<template>
 <section ref="section" class="domain-story" aria-labelledby="story-title">
  <div class="story-heading">
   <h2 id="story-title"><span class="headline-mask"><span class="headline-line">Big ideas start</span></span><span class="headline-mask"><span class="headline-line">with a name.</span></span></h2>
   <div class="story-intro"><p>That business you've been dreaming of. That project you can't stop thinking about. Start with a domain that makes it yours.</p>
    <button class="story-link" @click="$emit('search')">Find your domain <ArrowUpRight :size="17" /></button>
   </div>
  </div>
  <div class="story-film">
   <div class="film-browser" aria-hidden="true"><div class="browser-dots"><i></i><i></i><i></i></div><div class="browser-address"><span v-for="(letter, index) in 'your-next-chapter.com'" :key="index" class="address-letter">{{ letter }}</span></div><span class="browser-example">Example domain</span></div>
   <video ref="video" :poster="`${base}video/domain-story.jpg`" muted loop playsinline preload="none"
    aria-label="Two people planning a project together at a laptop. Silent illustrative footage."
    @error="failed = true" @timeupdate="step = Math.min(2, Math.floor(($event.target.currentTime / ($event.target.duration || 12)) * 3))">
    <source :src="`${base}video/domain-story.mp4`" type="video/mp4">
   </video>
   <div class="film-shade"></div>
   <div class="film-copy" aria-hidden="true"><Transition name="chapter" mode="out-in"><p :key="step">{{ steps[step] }}</p></Transition>
    <div class="film-progress"><i v-for="(_, index) in steps" :key="index" :class="{ active: index <= step }"></i></div>
   </div>
   <p v-if="failed" class="film-error">Video unavailable. You can still explore domain names above.</p>
  </div>
  <p class="story-caption">Choose your name. Check your domain options. Build your website.</p>
 </section>
</template>

<style scoped>
.domain-story{width:100%;max-width:none;box-sizing:border-box;margin:0;padding:3vw 10vw;color:#f6f6f6}
.headline-mask{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}.headline-line{display:block}
.film-browser{position:absolute;z-index:2;top:0;left:0;right:0;height:52px;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:0 24px;background:#151719;color:#f6f6f6;font-size:12px}
.browser-dots{display:flex;gap:6px}.browser-dots i{width:6px;height:6px;border-radius:50%;background:#777}
.browser-address{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;letter-spacing:.025em}.address-letter{display:inline-block}.browser-example{color:#b7bcc5;font-size:10px}
.chapter-enter-active,.chapter-leave-active{transition:opacity .3s ease,transform .3s ease}.chapter-enter-from{opacity:0;transform:translateY(12px)}.chapter-leave-to{opacity:0;transform:translateY(-8px)}
.story-heading{display:flex;justify-content:space-between;align-items:end;gap:64px;margin-bottom:40px}
.story-heading h2{font-size:clamp(36px,4vw,56px);font-weight:500;line-height:1.1;letter-spacing:-.035em;margin:0}
.story-heading>div{max-width:390px}.story-heading p{font-size:15px;line-height:1.8;color:#aaa;margin:0 0 18px}
.story-link{display:flex;align-items:center;gap:10px;min-height:44px;font-size:13px;font-weight:650}
.story-film{position:relative;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:#202827}
video{width:100%;height:100%;object-fit:cover;display:block;transform-origin:center}
.film-shade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(transparent 30%,#000b 100%)}
.film-copy{position:absolute;left:44px;bottom:44px;max-width:70%;color:white}.film-copy>span{font-size:13px;color:#ffffffc9}.film-copy p{font-size:clamp(24px,3vw,40px);line-height:1.2;letter-spacing:-.025em;margin:12px 0 24px}
.film-progress{display:flex;gap:8px}.film-progress i{height:3px;width:44px;border-radius:2px;background:#ffffff40}.film-progress i.active{background:white}
.film-error{position:absolute;bottom:12px;right:20px;color:white;font-size:12px}.story-caption{font-size:12px;color:#aaa;text-align:center;margin:20px 0 0}
:global([data-theme="light"]) .domain-story{color:var(--graphite)}
:global([data-theme="light"]) .story-heading p,:global([data-theme="light"]) .story-caption{color:var(--secondary)}
:global([data-theme="light"]) .story-link{color:var(--accent)}
:global([data-theme="light"]) .film-browser{background:#eef1f8;color:#25334f}:global([data-theme="light"]) .browser-example{color:#55627c}:global([data-theme="light"]) .browser-dots i{background:#8793aa}
.story-link:focus-visible{outline:2px solid #7198ff;outline-offset:5px}
@media(max-width:760px){.browser-example{display:none}.film-browser{height:42px;padding:0 16px}.browser-address{font-size:10px}.browser-dots{gap:4px}.browser-dots i{width:4px;height:4px}}
@media(max-width:760px){.story-heading{display:block;margin-bottom:24px}.story-heading>div{margin-top:24px}.story-film{aspect-ratio:4/5;border-radius:14px}.film-copy{left:24px;bottom:24px;max-width:85%}.film-copy p{font-size:28px}}
@media(prefers-reduced-motion:reduce){.chapter-enter-active,.chapter-leave-active{transition:none}}
</style>
