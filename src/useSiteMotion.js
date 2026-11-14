import { onMounted, onUnmounted } from 'vue'

// One-shot marketing sequences. Text and controls stay in the normal document flow.
export function useSiteMotion(root) {
  let observer, preference
  const groups = new Map()
  const all = []
  let reduced = false
  const sync = () => {
    for (const group of groups.values()) {
      for (const animation of group.animations) {
        if (animation.playState === 'finished' || animation.playState === 'idle') continue
        if (group.visible && !document.hidden) animation.play()
        else animation.pause()
      }
    }
  }
  const reduce = () => {
    if (!preference.matches) return
    reduced = true
    observer?.disconnect()
    // Cancelling restores the complete, readable CSS state immediately.
    all.forEach(animation => animation.cancel())
  }
  onMounted(() => {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    preference.addEventListener('change', reduce)
    if (preference.matches || !root.value || !Element.prototype.animate) return
    const ease = getComputedStyle(root.value).getPropertyValue('--hero-ease-out').trim() || 'cubic-bezier(.23,1,.32,1)'
    const add = (trigger, definitions) => {
      if (!trigger) return
      const animations = []
      for (const { selector, frames, duration, delay = 0 } of definitions) {
        const el = selector ? trigger.querySelector(selector) : trigger
        if (!el) continue
        const animation = el.animate(frames, { duration, delay, easing:ease, fill:'both' })
        animation.pause()
        animation.currentTime = 0
        // Drop the animation's compositing layer after its one run.
        animation.onfinish = () => animation.cancel()
        animations.push(animation)
        all.push(animation)
      }
      groups.set(trigger, { animations, visible:false })
      observer.observe(trigger)
    }
    observer = new IntersectionObserver(entries => {
      if (reduced) return
      entries.forEach(entry => { groups.get(entry.target).visible = entry.isIntersecting })
      sync()
    }, { threshold:.2 })
    const arrive = [ { opacity:0, transform:'translateY(10px)' }, { opacity:1, transform:'translateY(0)' } ]
    add(root.value.querySelector('.booking-scene'), [
      { selector:'.chosen', frames:[{ opacity:.35, transform:'scale(.94)' },{ opacity:1, transform:'scale(1)' }], duration:400, delay:200 },
      { selector:'.booking-confirmation', frames:arrive, duration:400, delay:550 },
    ])
    add(root.value.querySelector('.commerce-scene'), [
      { selector:'.order-preview', frames:arrive, duration:600, delay:150 },
    ])
    add(root.value.querySelector('.relationships-scene'), [
      { selector:'.message-in', frames:arrive, duration:400 },
      { selector:'.message-out', frames:arrive, duration:400, delay:500 },
      { selector:'.contact-saved', frames:[{opacity:0},{opacity:1}], duration:250, delay:850 },
    ])
    document.addEventListener('visibilitychange', sync)
  })
  onUnmounted(() => {
    observer?.disconnect()
    preference?.removeEventListener('change', reduce)
    document.removeEventListener('visibilitychange', sync)
    all.forEach(animation => animation.cancel())
  })
}
