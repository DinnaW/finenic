<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const section = ref(null)
const description = ref(null)
const film = ref(null)
const video = ref(null)
const base = import.meta.env.BASE_URL
const lines = [
  'Finenic brings your domains, websites',
  'and business apps together. One place',
  'to launch your idea and grow your business.',
]
let cleanup = () => {}

onMounted(() => {
  const media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // Reveal each word as the actual paragraph crosses the viewport.
    const words = description.value.querySelectorAll('.statement-word')
    gsap.set(words, {
      color: '#8a8a8a',
      opacity: 0,
      yPercent: 85,
      clipPath: 'inset(0 0 100% 0)',
    })
    gsap.to(words, {
      color: '#ececec',
      opacity: 1,
      yPercent: 0,
      clipPath: 'inset(0 0 -15% 0)',
      stagger: .07,
      duration: .5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: description.value,
        start: 'clamp(top 95%)',
        end: 'clamp(bottom 75%)',
        scrub: .8,
        invalidateOnRefresh: true,
      },
    })
    gsap.fromTo(film.value, { y: 24, rotate: -4, scale: .94 }, {
      y: 0, rotate: 0, scale: 1, ease: 'power2.out',
      scrollTrigger: { trigger: section.value, start: 'top 85%', end: 'top 10%', scrub: .8 },
    })
  }, section.value)

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  let inView = false
  const playback = () => {
    if (inView && !document.hidden && !reduced.matches) video.value?.play().catch(() => {})
    else video.value?.pause()
  }
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    playback()
  }, { threshold: .1 })
  observer.observe(film.value)
  document.addEventListener('visibilitychange', playback)
  reduced.addEventListener('change', playback)
  cleanup = () => {
    media.revert()
    observer.disconnect()
    document.removeEventListener('visibilitychange', playback)
    reduced.removeEventListener('change', playback)
  }
})
onUnmounted(() => cleanup())
</script>

<template>
  <section ref="section" class="brand-statement" aria-labelledby="brand-statement-heading">
    <div class="statement-composition">
      <div class="film-position" aria-hidden="true">
        <div ref="film" class="statement-film">
          <video ref="video" muted loop playsinline preload="none" tabindex="-1" :poster="`${base}video/domain-user-poster.jpg`">
            <source :src="`${base}video/v14044g50000db5q7knog65naf03aj3g.MP4`" type="video/mp4">
          </video>
        </div>
      </div>
      <h2 id="brand-statement-heading" ref="description" class="brand-description" :aria-label="lines.join(' ')">
        <span v-for="line in lines" :key="line" class="statement-line" aria-hidden="true"><template v-for="(word, index) in line.split(' ')" :key="index"><span class="statement-word">{{ word }}</span>{{ ' ' }}</template></span>
      </h2>
    </div>
  </section>
</template>

<style scoped>
.brand-statement {
  position: relative;
  display: grid;
  place-items: center;
  padding: calc(clamp(34px, 4.25vw, 78px) * 4.4 + 32px) 5vw clamp(150px, 13vw, 240px);
  overflow: clip;
  background: #030303;
  color: #ececec;
}
.statement-composition {
  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 1600px;
  font-size: clamp(34px, 4.25vw, 78px);
}
.brand-description {
  position: relative;
  top: calc(-1 * clamp(20px, 2.5vw, 44px));
  z-index: 1;
  margin: 0;
  text-align: center;
  font-size: inherit;
  line-height: 1.3;
  font-weight: 450;
  letter-spacing: -.035em;
  /* Only the glyphs blend with the film below, giving the reference's cut-out effect. */
  mix-blend-mode: difference;
}
.statement-line { display: block; }
.statement-word { display: inline-block; }
.film-position {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: -4.4em;
  width: 5.8em;
  transform: translateX(-50%);
  pointer-events: none;
}
.statement-film {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 2px;
  background: #1c1c1c;
  transform-origin: center;
}
.statement-film video { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.brand-statement ::selection { background: #e5e5e0; color: #030303; }
@media (max-width: 760px) {
  .brand-statement { padding: calc(clamp(26px, 5.2vw, 39px) * 6 + 28px) 5vw clamp(120px, 22vw, 168px); }
  .statement-composition { max-width: 680px; font-size: clamp(26px, 5.2vw, 39px); }
  .brand-description { line-height: 1.4; }
  .statement-line { display: inline; }
  .film-position { top: -6em; width: 7.8em; }
}
@media (prefers-reduced-motion: reduce) {
  .statement-film { transform: none; }
  .statement-word { color: #ececec; }
}
</style>
