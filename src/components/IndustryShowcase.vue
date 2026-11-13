<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { motion, useReducedMotion } from 'motion-v'
import ProductPreview from './ProductPreview.vue'
import SpecularButton from './specular/SpecularButton.vue'
import { industries, salonPackageUrl } from '../data/industryCatalog'

const emit = defineEmits(['search-domain'])
const selected = ref(0), tablist = ref(null), notice = ref(null)
const active = computed(() => industries[selected.value])
const reduced = useReducedMotion()
const section = ref(null), firstCard = ref(0), visibleCount = ref(4), atEnd = ref(false)
const cardCount = computed(() => active.value.cards.length + (active.value.id === 'salon' ? 1 : 0))
const lastCard = computed(() => Math.min(firstCard.value + visibleCount.value, cardCount.value))
let resizeObserver
function track() { return section.value?.querySelector('.industry-panel:not([hidden]) .product-grid') }
function updateCarousel() {
  const el = track(), card = el?.firstElementChild
  if (!el || !card) return
  const stride = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap)
  visibleCount.value = Math.max(1, Math.round(el.clientWidth / stride))
  firstCard.value = Math.round(el.scrollLeft / stride)
  atEnd.value = el.scrollLeft >= el.scrollWidth - el.clientWidth - 3
}
function moveCarousel(direction) {
  const el = track(), card = el?.firstElementChild
  if (!el || !card) return
  const stride = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap)
  el.scrollBy({ left: direction * stride, behavior: reduced.value ? 'instant' : 'smooth' })
}
function carouselKeys(event) {
  if (event.target !== event.currentTarget || !['ArrowLeft','ArrowRight'].includes(event.key)) return
  event.preventDefault(); moveCarousel(event.key === 'ArrowRight' ? 1 : -1)
}
onMounted(() => { resizeObserver = new ResizeObserver(updateCarousel); resizeObserver.observe(section.value); updateCarousel() })
onUnmounted(() => resizeObserver?.disconnect())

async function select(index, focus = false) {
  selected.value = index
  notice.value = null
  await nextTick()
  track()?.scrollTo({ left: 0, behavior: 'instant' })
  updateCarousel()
  const tab = tablist.value?.querySelectorAll('[role="tab"]')[index]
  if (focus) tab?.focus({ preventScroll: true })
  if (tab) {
    const list = tablist.value
    const left = tab.offsetLeft, right = left + tab.offsetWidth
    const scroll = left < list.scrollLeft ? left - 8 : right > list.scrollLeft + list.clientWidth ? right - list.clientWidth + 8 : list.scrollLeft
    list.scrollTo({ left: scroll, behavior: reduced.value ? 'instant' : 'smooth' })
  }
}

function navigateTabs(event) {
  const keys = { ArrowRight: (selected.value + 1) % industries.length, ArrowLeft: (selected.value + industries.length - 1) % industries.length, Home: 0, End: industries.length - 1 }
  if (!(event.key in keys)) return
  event.preventDefault()
  select(keys[event.key], true)
}

function activateCard(card) {
  if (card.id === 'domain') { emit('search-domain'); return }
  notice.value = { id: card.id, text: `${card.brand} ${card.title.toLowerCase()} details are coming soon.` }
}
function getPackage() {
  if (salonPackageUrl) window.location.assign(salonPackageUrl)
  else notice.value = { id: 'package', text: 'Salon & Spa package details are coming soon.' }
}
</script>

<template>
  <section ref="section" class="industry-showcase" aria-labelledby="industry-heading">
    <div class="industry-inner">
      <header class="industry-heading-row">
        <h2 id="industry-heading">Everything you need<br>to grow online.</h2>
        <p>Start with your industry.<br>Find the right tools for your next chapter.</p>
      </header>

      <div ref="tablist" class="industry-tabs" role="tablist" aria-label="Choose your industry" @keydown="navigateTabs">
        <button v-for="(industry, index) in industries" :id="`industry-tab-${industry.id}`" :key="industry.id" role="tab" :aria-selected="selected === index" :aria-controls="`industry-panel-${industry.id}`" :tabindex="selected === index ? 0 : -1" @click="select(index)">
          <motion.span v-if="selected === index" class="tab-selection" layout-id="industry-selection" :transition="reduced ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 32 }" aria-hidden="true" />
          <span class="tab-label">{{ industry.label }}</span>
        </button>
      </div>

      <div v-for="industry in industries" :id="`industry-panel-${industry.id}`" :key="industry.id" class="industry-panel" role="tabpanel" :aria-labelledby="`industry-tab-${industry.id}`" :hidden="active.id !== industry.id" tabindex="0">
        <Transition name="industry-content" appear>
          <div v-if="active.id === industry.id" :key="active.id" class="product-grid" role="region" :aria-label="`${active.label} product carousel`" aria-roledescription="carousel" tabindex="0" @scroll.passive="updateCarousel" @keydown="carouselKeys">
            <article v-for="card in active.cards" :key="`${active.id}-${card.id}`" class="product-card">
              <ProductPreview :item="card" :business="active.shortName" />
              <div class="product-copy">
                <h3>{{ card.title }}</h3>
                <p>{{ card.copy }}</p>
                <a v-if="card.href" class="product-action" :href="card.href">{{ card.action }}<ArrowUpRight :size="15" aria-hidden="true"/></a>
                <button v-else class="product-action" @click="activateCard(card)">{{ card.action }}<ArrowUpRight :size="15" aria-hidden="true"/></button>
                <p v-if="notice?.id === card.id" class="product-notice" role="status">{{ notice.text }}</p>
              </div>
            </article>

            <article v-if="active.id === 'salon'" class="product-card package-card">
              <div class="package-visual" aria-hidden="true">
                <div class="package-top">Made for your Salon & Spa</div>
                <div class="package-message">One account.<br>One bill.</div>
                <div class="package-brands"><span>Domains</span><span>Saptify</span><span>Ipsova</span><span>Smardove</span></div>
              </div>
              <div class="product-copy">
                <h3>Everything, together.</h3>
                <p>Get everything above in one Salon & Spa package, with one account and one bill.</p>
                <SpecularButton class="package-action" @click="getPackage">Get the package<ArrowRight :size="15" aria-hidden="true"/></SpecularButton>
                <p v-if="notice?.id === 'package'" class="product-notice" role="status">{{ notice.text }}</p>
              </div>
            </article>
          </div>
        </Transition>
      </div>
      <div class="carousel-footer">
        <p class="preview-caption">Illustrative product previews.</p>
        <div class="carousel-controls">
          <span class="carousel-count" aria-live="polite">{{ firstCard + 1 }}–{{ lastCard }} <span>of {{ cardCount }}</span></span>
          <button type="button" aria-label="Previous products" :disabled="firstCard === 0" @click="moveCarousel(-1)"><ArrowLeft :size="18" /></button>
          <button type="button" aria-label="Next products" :disabled="atEnd" @click="moveCarousel(1)"><ArrowRight :size="18" /></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.industry-showcase { background:#fafbf9; color:#111; padding:clamp(60px,7vw,120px) 5vw clamp(64px,7vw,120px); color-scheme:light; }
.industry-inner { max-width:1680px; margin-inline:auto; }
.industry-heading-row { display:flex; justify-content:space-between; align-items:end; gap:6vw; margin-bottom:clamp(30px,3vw,52px); }
.industry-heading-row h2 { margin:0; font-size:clamp(32px,3.35vw,56px); line-height:1.13; font-weight:500; letter-spacing:-.035em; }
.industry-heading-row>p { margin:0 0 3px; color:#666666; font-size:clamp(14px,1.05vw,17px); line-height:1.7; }
.industry-tabs { position:relative; display:flex; gap:clamp(4px,.65vw,12px); align-items:center; overflow-x:auto; scrollbar-width:thin; scrollbar-color:#cacaca transparent; padding:5px 0 13px; margin-bottom:clamp(22px,2.3vw,38px); border-bottom:1px solid #dce0df; }
.industry-tabs button { position:relative; isolation:isolate; flex-shrink:0; min-height:46px; padding:0 clamp(13px,1.5vw,24px); border-radius:999px; font-size:13px; font-weight:500; white-space:nowrap; color:#616161; transition:color .25s; }
.industry-tabs button[aria-selected=true] { color:#fff; }
.industry-tabs button:hover:not([aria-selected=true]) { color:#1e1e1e; background:#e9edeb; }
.tab-selection { position:absolute; inset:0; z-index:-1; border-radius:inherit; background:#111; }
.tab-label { position:relative; }
.industry-panel[hidden] { display:none; }
.industry-panel:focus-visible { outline:2px solid #6a6a6a; outline-offset:8px; border-radius:5px; }
.product-grid { --card-gap:clamp(16px,1.5vw,26px); display:grid; grid-auto-flow:column; grid-auto-columns:calc((100% - 3 * var(--card-gap)) / 4); gap:var(--card-gap); overflow-x:auto; overscroll-behavior-x:contain; scroll-snap-type:x mandatory; scrollbar-width:none; padding:5px 0 24px; }
.product-grid::-webkit-scrollbar { display:none; }
.product-grid:focus-visible { outline:2px solid #111; outline-offset:5px; }
.product-grid>.product-card { scroll-snap-align:start; display:flex; flex-direction:column; }
.product-grid .product-copy { flex:1; display:flex; flex-direction:column; align-items:start; }
.product-grid .product-copy>p { flex:1; }
.carousel-footer { display:flex; align-items:center; justify-content:space-between; gap:16px; margin-top:16px; }
.carousel-controls { display:flex; align-items:center; gap:8px; }
.carousel-controls button { width:44px; height:44px; display:grid; place-items:center; border-radius:50%; background:#111; color:white; }
.carousel-controls button:hover:not(:disabled) { background:#333; }
.carousel-controls button:disabled { background:#e9e9e6; color:#888; cursor:default; }
.carousel-count { font-size:12px; font-variant-numeric:tabular-nums; margin-right:12px; white-space:nowrap; }
.carousel-count>span { color:#73736d; margin-left:4px; }
.product-card { min-width:0; }
.product-copy { padding:clamp(18px,1.5vw,26px) 0 0; }
.product-copy h3 { font-weight:500; font-size:clamp(18px,1.5vw,25px); letter-spacing:-.025em; line-height:1.3; margin:0 0 10px; }
.product-copy>p { color:#666666; font-size:clamp(13px,1vw,16px); line-height:1.65; margin:0; max-width:40ch; min-height:3.3em; text-wrap:pretty; }
.product-action { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:44px; padding:0 17px; border-radius:999px; margin-top:18px; background:#111; color:white; font-size:12px; font-weight:500; text-align:left; }
.product-action svg { transition:transform .25s; }
.product-action:hover svg { transform:translate(2px,-2px); }
.product-action:hover { background:#333; color:white; }
.product-copy .product-notice { font-size:12px; min-height:0; margin-top:8px; color:#545454; }
.package-visual { display:flex; flex-direction:column; justify-content:space-between; padding:7.5%; aspect-ratio:.94; border-radius:12px; background:linear-gradient(140deg,#e9e7e0,#d9d6cb 60%,#e3d8d3); color:#242420; }
.package-top { font-size:clamp(11px,.9vw,15px); font-weight:500; }
.package-message { font-size:clamp(29px,2.65vw,45px); font-weight:500; letter-spacing:-.04em; line-height:1.1; padding-block:5%; }
.package-brands { display:flex; flex-wrap:wrap; gap:6px; }.package-brands span { font-size:clamp(9px,.8vw,13px); padding:6px 10px; background:#ffffff80; border-radius:999px; color:#515151; }
.package-action { margin-top:15px; }
.preview-caption { color:#6d6d67; font-size:11px; margin:0; }
.industry-content-enter-active { transition:opacity .35s ease,transform .45s cubic-bezier(.16,1,.3,1); }
.industry-content-enter-from { opacity:0; transform:translateY(9px); }
.industry-content-leave-active { display:none; }
.industry-showcase :is(button,a):focus-visible { outline:2px solid #6a6a6a; outline-offset:3px; }
.industry-showcase ::selection { background:#ebebeb; color:#272727; }
@media(max-width:1000px) {
  .product-grid { grid-auto-columns:calc((100% - var(--card-gap)) / 2); }
  .industry-tabs button { padding-inline:17px; }
  .package-message { font-size:clamp(34px,5.2vw,54px); }
  .package-top { font-size:12px; }
  .package-brands span { font-size:10px; }
}
@media(max-width:620px) {
  .industry-showcase { padding:16vw 6vw 12vw; }
  .industry-heading-row { display:block; margin-bottom:7vw; }
  .industry-heading-row h2 { font-size:clamp(30px,8vw,42px); }
  .industry-heading-row>p { font-size:14px; margin-top:6vw; }
  .industry-tabs { margin-right:-6vw; padding-right:6vw; margin-bottom:7vw; }
  .industry-tabs button { font-size:12px; padding-inline:16px; }
  .product-grid { grid-auto-columns:90%; }
  .product-copy { padding-top:5vw; }
  .product-copy h3 { font-size:21px; }
  .product-copy>p { font-size:14px; min-height:0; max-width:38ch; }
  .product-action { margin-top:5px; }
  .package-message { font-size:clamp(38px,11vw,62px); }
  .package-top { font-size:12px; }
  .preview-caption { max-width:120px; }
}
@media(prefers-reduced-motion:reduce) {
  .industry-content-enter-active,.product-action svg { transition:none; }
  .industry-content-enter-from,.product-action:hover svg { transform:none; }
}
</style>
