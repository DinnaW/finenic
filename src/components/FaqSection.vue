<script setup>
import { ref, nextTick } from 'vue'
import { Plus, ArrowUpRight } from 'lucide-vue-next'
import { faqGroups } from '../data/faqs'
const selected = ref(0), expanded = ref(0), tabs = ref(null)
async function select(index, focus = false) {
  selected.value = index
  expanded.value = 0
  await nextTick()
  const tab = tabs.value?.querySelectorAll('[role="tab"]')[index]
  if (focus) tab?.focus({ preventScroll:true })
  if (window.innerWidth <= 760 && tab) tabs.value.scrollTo({ left:tab.offsetLeft - tabs.value.offsetLeft - 8, behavior:'instant' })
}
function keys(event) {
  const moves = { ArrowDown:1, ArrowRight:1, ArrowUp:-1, ArrowLeft:-1 }
  if (!(event.key in moves) && !['Home','End'].includes(event.key)) return
  event.preventDefault()
  select(event.key === 'Home' ? 0 : event.key === 'End' ? faqGroups.length - 1 : (selected.value + moves[event.key] + faqGroups.length) % faqGroups.length, true)
}
</script>

<template>
  <section id="faq" class="faq-section" aria-labelledby="faq-heading">
    <div class="faq-inner">
      <header class="faq-heading"><h2 id="faq-heading">Frequently asked<br>questions.</h2><p>A little clarity before your next step.<br>Find answers for your business.</p></header>
      <div class="faq-layout">
        <div class="faq-sidebar">
          <div ref="tabs" class="faq-tabs" role="tablist" aria-label="FAQ categories" @keydown="keys">
            <button v-for="(group,index) in faqGroups" :id="`faq-tab-${group.id}`" :key="group.id" role="tab" :aria-selected="selected === index" :aria-controls="`faq-panel-${group.id}`" :tabindex="selected === index ? 0 : -1" @click="select(index)"><span>{{ group.label }}</span><ArrowUpRight :size="16" aria-hidden="true"/></button>
          </div>
          <p class="faq-sidebar-note">One place to start.<br>Room for everything that’s next.</p>
        </div>
        <div class="faq-panels">
          <section v-for="(group,index) in faqGroups" :id="`faq-panel-${group.id}`" :key="group.id" role="tabpanel" :aria-labelledby="`faq-tab-${group.id}`" :hidden="selected !== index" tabindex="0">
            <div class="faq-panel-heading"><span>{{ group.label }}</span><span>{{ group.questions.length }} questions</span></div>
            <article v-for="(item,questionIndex) in group.questions" :key="item.question" class="faq-item" :class="{ 'is-open': expanded === questionIndex }">
              <h3><button :id="`faq-question-${group.id}-${questionIndex}`" :aria-expanded="expanded === questionIndex" :aria-controls="`faq-answer-${group.id}-${questionIndex}`" @click="expanded = expanded === questionIndex ? -1 : questionIndex"><span>{{ item.question }}</span><span class="faq-toggle"><Plus :size="18" stroke-width="1.5" aria-hidden="true"/></span></button></h3>
              <div :id="`faq-answer-${group.id}-${questionIndex}`" class="faq-answer" :inert="expanded !== questionIndex" :aria-hidden="expanded !== questionIndex"><div><p>{{ item.answer }}</p></div></div>
            </article>
          </section>
          <div class="faq-bottom"><span>Your business has its own next step.</span><a href="#industry-heading">Explore your options <ArrowUpRight :size="16" aria-hidden="true"/></a></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section { padding:clamp(64px,7vw,120px) var(--section-gutter) clamp(60px,6vw,100px); background:linear-gradient(#edf4fa,#fff 24%,#fff 82%,#edf4fa); color:#172135; }
.faq-inner { max-width:min(var(--section-width),1440px); margin-inline:auto; }
.faq-heading { display:flex; justify-content:space-between; align-items:end; gap:32px; margin-bottom:clamp(38px,4.5vw,72px); }
.faq-heading h2 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:1.12; }
.faq-heading>p { margin:0 0 4px; font-size:var(--type-description); line-height:1.7; color:#6a7581; }
.faq-layout { display:grid; grid-template-columns:minmax(210px, .8fr) minmax(0,2fr); gap:clamp(48px,7vw,112px); }
.faq-tabs { display:flex; flex-direction:column; gap:4px; }
.faq-sidebar,.faq-panels { min-width:0; }
.faq-tabs button { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:14px 18px; border-radius:12px; color:#65717e; text-align:left; min-height:48px; font-size:14px; }
.faq-tabs button>svg { opacity:0; }.faq-tabs button:hover { background:#f1f6fa; color:#172135; }.faq-tabs button[aria-selected="true"] { background:#171b22; color:#fff; box-shadow:inset 0 1px 0 #ffffff25; }.faq-tabs button[aria-selected="true"]>svg { opacity:1; }
.faq-sidebar-note { margin:32px 18px 0; font-size:12px; line-height:1.8; color:#88939e; }
.faq-panel-heading { display:flex; justify-content:space-between; padding:0 0 18px; border-bottom:1px solid #d5e0e8; font-size:12px; color:#71808e; }.faq-panel-heading>span:first-child { color:#172135; font-weight:600; }
.faq-item { border-bottom:1px solid #dce5ec; }.faq-item h3 { margin:0; }.faq-item h3>button { display:flex; align-items:center; justify-content:space-between; gap:24px; width:100%; padding:26px 0; text-align:left; font-size:clamp(16px,1.15vw,20px); line-height:1.5; font-weight:500; letter-spacing:-.025em; }
.faq-toggle { display:grid; place-items:center; flex:none; width:32px; height:32px; border:1px solid #dce5ed; border-radius:50%; background:#fff; transition:background .2s; }.faq-toggle svg { transition:transform .25s; }.is-open .faq-toggle { background:#edf5fb; }.is-open .faq-toggle svg { transform:rotate(45deg); }
.faq-answer { display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows .28s ease,opacity .2s; }.is-open .faq-answer { grid-template-rows:1fr; opacity:1; }.faq-answer>div { overflow:hidden; }.faq-answer p { max-width:66ch; margin:0; padding:0 52px 28px 0; font-size:var(--type-description); line-height:1.8; color:#667382; }
.faq-bottom { display:flex; justify-content:space-between; flex-wrap:wrap; gap:16px; padding-top:28px; font-size:12px; color:#778592; }.faq-bottom a { display:flex; align-items:center; gap:12px; color:#172135; min-height:28px; }
.faq-section :is(button,a,[role="tabpanel"]):focus-visible { outline:2px solid #69869e; outline-offset:4px; }
@media(min-width:1921px) { .faq-inner { max-width:75vw; } }
@media(max-width:760px) { .faq-heading { display:block; }.faq-heading>p { margin-top:22px; }.faq-layout { grid-template-columns:1fr; gap:28px; }.faq-tabs { flex-direction:row; overflow-x:auto; scrollbar-width:thin; padding:5px 2px 10px; }.faq-tabs button { white-space:nowrap; flex:none; padding:11px 16px; border-radius:100px; font-size:12px; }.faq-tabs button>svg { display:none; }.faq-sidebar-note { display:none; }.faq-item h3>button { padding:22px 0; gap:16px; }.faq-answer p { padding-right:12px; font-size:14px; }.faq-section { padding-block:64px; } }
@media(prefers-reduced-motion:reduce) { .faq-answer,.faq-toggle,.faq-toggle svg { transition:none; } }
</style>
