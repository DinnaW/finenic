import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Page-level scroll rhythm. Product-demo timelines own their inner illustrations.
export function usePageScrollMotion(root) {
  let media, resizeObserver, refreshFrame, disposed = false, lastHeight = 0
  const refresh = () => {
    cancelAnimationFrame(refreshFrame)
    refreshFrame = requestAnimationFrame(() => { if (!disposed) ScrollTrigger.refresh() })
  }
  onMounted(() => {
    const page = root.value
    if (!page) return
    const curve = getComputedStyle(page).getPropertyValue('--hero-ease-out').trim().replace('cubic-bezier(', '').replace(')', '')
    CustomEase.create('page-ease-out', curve || '.23,1,.32,1')
    media = gsap.matchMedia()
    media.add({ motion:'(prefers-reduced-motion: no-preference)', desktop:'(min-width: 901px) and (pointer: fine)' }, context => {
      if (!context.conditions.motion) return
      const select = gsap.utils.selector(page)
      const focusHandlers = []
      const reveal = (selector, { distance=18, duration=.8, opacity=.5, id } = {}) => {
        select(selector).forEach((el,index) => {
          const tween = gsap.fromTo(el,{ y:distance, opacity }, {
            y:0, opacity:1, duration, ease:'page-ease-out', clearProps:'transform,opacity',
            scrollTrigger:{ id:`${id}-${index}`, trigger:el, start:'top 93%', once:true },
          })
          // Keyboard navigation never waits for an entrance to finish.
          const show = () => tween.progress(1)
          el.addEventListener('focusin',show)
          focusHandlers.push(()=>el.removeEventListener('focusin',show))
        })
      }
      // The existing hero entrance owns the individual columns. Scroll motion owns their parent.
      if (context.conditions.desktop) {
        gsap.to(select('.gradient-bars'),{
          yPercent:7, opacity:.78, ease:'none',
          scrollTrigger:{ id:'page-hero-depth', trigger:select('.hero')[0], start:'top top', end:'bottom top', scrub:.8 },
        })
      }
      reveal('.statement-aside',{distance:14,duration:.8,id:'page-story-intro'})
      reveal('.statement-links',{distance:18,duration:.85,opacity:.65,id:'page-story-links'})
      // Preserve the accepted heading wipe, now coordinated by GSAP ScrollTrigger.
      select('.services-header h2, .industry-heading-row h2').forEach((el,index)=>{
        gsap.fromTo(el,{clipPath:'inset(0 0 100% 0)',opacity:0},{
          clipPath:'inset(0 0 0% 0)',opacity:1,duration:.6,ease:'page-ease-out',clearProps:'clipPath,opacity',
          scrollTrigger:{id:`page-heading-${index}`,trigger:el,start:'top 94%',once:true},
        })
      })
      reveal('.services-intro, .industry-heading-row > p',{distance:12,duration:.7,opacity:.65,id:'page-section-intro'})
      reveal('.story-copy',{distance:20,duration:.85,id:'page-story-caption'})
      if (context.conditions.desktop) {
        select('.story-scene > img').forEach((image,index)=>{
          gsap.fromTo(image,{scale:1.07,yPercent:-2},{scale:1.04,yPercent:2,ease:'none',
            scrollTrigger:{id:`page-photo-${index}`,trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:1},
          })
        })
      }
      reveal('.services-footer',{distance:12,duration:.75,opacity:.65,id:'page-service-close'})
      // Only the initial catalogue's descriptions enter. Tab changes stay immediate.
      reveal('.industry-panel:not([hidden]) .product-copy',{distance:16,duration:.75,opacity:.6,id:'page-product-copy'})
      return () => focusHandlers.forEach(remove=>remove())
    },page)
    resizeObserver = new ResizeObserver(entries=>{
      const height = entries[0]?.contentRect.height
      if (height !== lastHeight) { lastHeight=height;refresh() }
    })
    resizeObserver.observe(page)
    document.fonts?.ready.then(()=>{if(!disposed)refresh()})
    window.addEventListener('load',refresh)
  })
  onUnmounted(()=>{
    disposed=true
    cancelAnimationFrame(refreshFrame)
    resizeObserver?.disconnect()
    window.removeEventListener('load',refresh)
    media?.revert()
  })
}
