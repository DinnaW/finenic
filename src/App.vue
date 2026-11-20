<script setup>
import { ref, nextTick, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { ArrowUpRight, ArrowRight, ChevronDown, Search, Globe2, Menu, X, Server, Mail, LifeBuoy, BookOpen } from 'lucide-vue-next'
import { domainSuggestions } from './domain'
import AvatarPill from './components/ui/AvatarPill.vue'
import DomainStory from './components/DomainStory.vue'
import BusinessServices from './components/BusinessServices.vue'
import IndustryShowcase from './components/IndustryShowcase.vue'
import BusinessJourney from './components/BusinessJourney.vue'
import SiteFooter from './components/SiteFooter.vue'
import PricingSection from './components/PricingSection.vue'
import BlogSection from './components/BlogSection.vue'
import FaqSection from './components/FaqSection.vue'
import SupportCta from './components/SupportCta.vue'
import SiteHeader from './components/SiteHeader.vue'
const assistant = ref(null)
async function openSupportChat() { assistantReady.value = true; await nextTick(); assistant.value?.openChat() }
const FinenicAssistant = defineAsyncComponent(() => import('./components/FinenicAssistant.vue'))
const industryShowcase = ref(null)
import PremiumButton from './components/PremiumButton.vue'
import './gradient-hero.css'
import './typography.css'
import './site-motion.css'
import './launch-hero.css'
import { useSiteMotion } from './useSiteMotion'
import { usePageScrollMotion } from './usePageScrollMotion'
const siteRoot = ref(null)
useSiteMotion(siteRoot)
usePageScrollMotion(siteRoot)
const reducedMotion = ref(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
// The supplied gradient-bar design uses a white header and hero.
const theme = ref('light')
function applyTheme() {
 document.documentElement.dataset.theme = theme.value
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.value === 'light' ? '#fafaf8' : '#030303')
}
applyTheme()
const baseUrl = import.meta.env.BASE_URL
const query = ref('')
const heroInteracted = ref(false)
const input = ref(null)
const error = ref('')
const results = ref([])
const activeMenu = ref(null)
const mobileOpen = ref(false)
const headerScrolled = ref(false)
const assistantReady = ref(false)
function updateHeaderScroll() {
 headerScrolled.value = window.scrollY > 16
 // Load the guide as the visitor approaches the end of the hero.
 if (!assistantReady.value && document.querySelector('.hero')?.getBoundingClientRect().bottom < window.innerHeight * .5) assistantReady.value = true
}
onMounted(() => { updateHeaderScroll(); window.addEventListener('scroll', updateHeaderScroll, { passive:true }) })
onUnmounted(() => window.removeEventListener('scroll', updateHeaderScroll))
const resultSection = ref(null)
const product = ref(null)
const productSection = ref(null)
const extensions = ['.com', '.io', '.co', '.net']
const menuItems = {
  Hosting: [{title:'Web hosting',text:'A home for your website.',icon:Globe2},{title:'Cloud hosting',text:'Room for your next stage.',icon:Server},{title:'Business email',text:'Make every introduction yours.',icon:Mail}],
  Domains: [{title:'Find a domain',text:'Your idea starts with a name.',icon:Search},{title:'Domain extensions',text:'Find the ending that fits.',icon:Globe2}],
  Resources: [{title:'Getting started',text:'From a first idea to a first website.',icon:BookOpen},{title:'Help & support',text:'A little guidance for your next step.',icon:LifeBuoy}]
}
async function focusSearch() { activeMenu.value=null;mobileOpen.value=false;product.value=null;await nextTick();input.value?.focus();input.value?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'}) }
async function searchDomains() {
 error.value='';product.value=null
 try { results.value=domainSuggestions(query.value);await nextTick();resultSection.value?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'}) }
 catch(e) {results.value=[];error.value=e.message;input.value?.focus()}
}
function chooseExtension(ext) {query.value=(query.value.trim().replace(/\.[a-z]+$/i,'')||'yourbigidea')+ext;focusSearch()}
async function navigateAssistant(action) {
 if (action.type === 'domain') { if (action.query) query.value = action.query; await focusSearch(); if (action.query) await searchDomains(); return }
 if (action.type === 'industry') { await industryShowcase.value?.showIndustry(action.index); return }
 if (action.type === 'messaging') { await industryShowcase.value?.showMessaging(); return }
 if (action.type === 'pricing') { const heading = document.getElementById('pricing-heading'); heading?.focus({preventScroll:true}); heading?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'}) }
}
async function headerAction(action) {
 if(typeof action==='object') return industryShowcase.value?.showIndustry(action.industry,action.card)
 if(action==='support') return openSupportChat()
 if(action==='domain') return focusSearch()
 if(action==='messaging') return industryShowcase.value?.showMessaging()
 if(action==='apps') return industryShowcase.value?.showIndustry(0)
 if(action==='maintenance') return industryShowcase.value?.showIndustry(6)
 if(action==='hosting') return selectItem({title:'Web hosting'})
 if(action==='pbx') return selectItem({title:'Cloud PBX'})
 const id=action==='faq'?'faq-heading':action==='websites'?'services-heading':'pricing-heading'
 const target=document.getElementById(id)
 target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true});target?.scrollIntoView({behavior:reducedMotion.value?'instant':'smooth',block:'start'})
}
async function selectItem(item) {activeMenu.value=null;mobileOpen.value=false;if(item.title==='Find a domain'||item.title==='Domain extensions'){focusSearch();return}product.value=item.title;results.value=[];await nextTick();productSection.value?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'})}
function escape(event) {if(event.key==='Escape'){activeMenu.value=null;mobileOpen.value=false;product.value=null}}
onMounted(()=>document.addEventListener('keydown',escape))
onUnmounted(()=>document.removeEventListener('keydown',escape))
</script>

<template>
 <div ref="siteRoot" class="site-shell site-shell--gradient-hero" @click="activeMenu=null">
  <a class="skip-link" href="#main">Skip to content</a>
  <SiteHeader :scrolled="headerScrolled" @action="headerAction" />

  <main id="main">
   <!-- Previous homepage hero, retained for rollback.
   <section class="hero launch-hero relative" aria-labelledby="hero-title">
    <div class="hero-liquid" aria-hidden="true"><div class="hero-liquid-wave"></div></div>
    <div class="hero-content relative mx-auto">
     <div class="launch-hero-copy">
     <AvatarPill />
     <div class="hero-introduction">
     <h1 id="hero-title">Built for your next big idea.<br>Starting with your domain.</h1>
     <p class="hero-description">Find your name. Launch your website.
      Bring your business to life.</p>
     </div>
     <div class="domain-area mx-auto" :class="{ 'is-engaged': heroInteracted }" @focusin="heroInteracted = true">
      <form class="domain-search flex items-center" :class="{'has-error':error}" @submit.prevent="searchDomains" role="search" aria-label="Domain search">
       <Globe2 class="search-globe shrink-0" :size="23" stroke-width="1.5" aria-hidden="true"/>
       <label for="domain" class="sr-only">Find your domain name</label><input id="domain" ref="input" v-model.trim="query" autocomplete="off" autocapitalize="none" spellcheck="false" type="text" placeholder="Find your perfect domain" :aria-invalid="!!error" :aria-describedby="error?'domain-error':'domain-hint'" @input="error=''"/>
       <PremiumButton variant="hero" type="submit">Find your domain<template #icon><ArrowUpRight :size="19" stroke-width="1.7"/></template></PremiumButton>
      </form>
      <p v-if="error" id="domain-error" class="form-error" role="alert">{{error}}</p>
      <div class="extension-row flex items-center justify-center"><span id="domain-hint">Make it yours</span><button v-for="ext in extensions" :key="ext" class="extension-button" @click="chooseExtension(ext)">{{ext}}<span class="extension-dot"></span></button><span class="more-extensions">& more</span></div>
     </div>
     <section v-if="results.length" ref="resultSection" class="search-results text-left" aria-label="Domain suggestions" aria-live="polite"><div class="result-header"><div><h2>A name for your next chapter</h2><p>Search preview ? Live availability and pricing aren?t connected.</p></div><button class="icon-button" aria-label="Close domain suggestions" @click="results=[];input?.focus()"><X :size="18"/></button></div><div v-for="(domain,i) in results" :key="domain" class="domain-result"><div><strong>{{domain}}</strong><span v-if="i===0" class="match-label">Your search</span></div><a :href="`https://lookup.icann.org/en/lookup?name=${encodeURIComponent(domain)}`" target="_blank" rel="noopener noreferrer">Look up <ArrowUpRight :size="15"/><span class="sr-only">{{domain}} on ICANN, opens in a new tab</span></a></div><p class="result-note">ICANN lookup shows registration records; it does not reserve a domain.</p></section>
     <section v-if="product" ref="productSection" class="product-panel text-left" aria-live="polite"><div class="result-header"><h2>{{product}}</h2><button class="icon-button" aria-label="Close details" @click="product=null"><X :size="18"/></button></div><template v-if="product==='Getting started'"><p>Start with a name that?s short, memorable, and easy to spell. Then choose a hosting plan for the website you want to build.</p><button class="text-link" @click="focusSearch">Find your domain <ArrowRight :size="16"/></button></template><template v-else-if="product==='Help & support'"><p>Finenic is taking shape. Support and contact options will be added as the website launches.</p></template><template v-else-if="product==='Cloud PBX'"><p>Business phone options and Cloud PBX details are coming soon.</p></template><template v-else><p>{{product==='Business email'?'Bring your brand to every conversation with an email address at your own domain.':'Give your website a home with room for your ideas to grow.'}}</p><p class="panel-note">Plans and pricing are coming soon.</p><button class="text-link" @click="focusSearch">Start with your domain <ArrowRight :size="16"/></button></template></section>
     <button class="explore-link flex items-center justify-center" @click="selectItem({title:'Web hosting'})">Explore hosting <ArrowUpRight :size="15"/></button>
     </div>
     
    </div>
   </section>
   -->
   <section class="hero film-hero" aria-labelledby="hero-title">
    <div class="film-search">
     <div class="domain-area mx-auto" :class="{ 'is-engaged': heroInteracted }" @focusin="heroInteracted = true">
      <form class="domain-search flex items-center" :class="{'has-error':error}" @submit.prevent="searchDomains" role="search" aria-label="Domain search">
       <Globe2 class="search-globe shrink-0" :size="23" stroke-width="1.5" aria-hidden="true"/>
       <label for="domain" class="sr-only">Find your domain name</label><input id="domain" ref="input" v-model.trim="query" autocomplete="off" autocapitalize="none" spellcheck="false" type="text" placeholder="Find your perfect domain" :aria-invalid="!!error" :aria-describedby="error?'domain-error':'domain-hint'" @input="error=''"/>
       <PremiumButton variant="hero" type="submit">Find your domain<template #icon><ArrowUpRight :size="19" stroke-width="1.7"/></template></PremiumButton>
      </form>
      <p v-if="error" id="domain-error" class="form-error" role="alert">{{error}}</p>
      <div class="extension-row flex items-center justify-center"><span id="domain-hint">Make it yours</span><button v-for="ext in extensions" :key="ext" class="extension-button" @click="chooseExtension(ext)">{{ext}}<span class="extension-dot"></span></button><span class="more-extensions">& more</span></div>
     </div>
     <section v-if="results.length" ref="resultSection" class="search-results text-left" aria-label="Domain suggestions" aria-live="polite"><div class="result-header"><div><h2>A name for your next chapter</h2><p>Search preview ? Live availability and pricing aren?t connected.</p></div><button class="icon-button" aria-label="Close domain suggestions" @click="results=[];input?.focus()"><X :size="18"/></button></div><div v-for="(domain,i) in results" :key="domain" class="domain-result"><div><strong>{{domain}}</strong><span v-if="i===0" class="match-label">Your search</span></div><a :href="`https://lookup.icann.org/en/lookup?name=${encodeURIComponent(domain)}`" target="_blank" rel="noopener noreferrer">Look up <ArrowUpRight :size="15"/><span class="sr-only">{{domain}} on ICANN, opens in a new tab</span></a></div><p class="result-note">ICANN lookup shows registration records; it does not reserve a domain.</p></section>
     <section v-if="product" ref="productSection" class="product-panel text-left" aria-live="polite"><div class="result-header"><h2>{{product}}</h2><button class="icon-button" aria-label="Close details" @click="product=null"><X :size="18"/></button></div><template v-if="product==='Getting started'"><p>Start with a name that?s short, memorable, and easy to spell. Then choose a hosting plan for the website you want to build.</p><button class="text-link" @click="focusSearch">Find your domain <ArrowRight :size="16"/></button></template><template v-else-if="product==='Help & support'"><p>Finenic is taking shape. Support and contact options will be added as the website launches.</p></template><template v-else-if="product==='Cloud PBX'"><p>Business phone options and Cloud PBX details are coming soon.</p></template><template v-else><p>{{product==='Business email'?'Bring your brand to every conversation with an email address at your own domain.':'Give your website a home with room for your ideas to grow.'}}</p><p class="panel-note">Plans and pricing are coming soon.</p><button class="text-link" @click="focusSearch">Start with your domain <ArrowRight :size="16"/></button></template></section>
    </div>
    <div class="film-stage">
     <video :autoplay="!reducedMotion" muted loop playsinline preload="metadata" :poster="baseUrl+'video/domain-story.jpg'" aria-hidden="true">
      <source :src="baseUrl+'video/domain-story.mp4'" type="video/mp4">
     </video>
     <div class="film-caption">
      <h1 id="hero-title">Built for your next big idea.<br>Starting with your domain.</h1>
      <p>Find your name. Build your website. Make it yours.</p>
     </div>
    </div>
   </section>
   <DomainStory @search-domain="focusSearch" />
   <BusinessServices />
   <IndustryShowcase ref="industryShowcase" @search-domain="focusSearch" />
   <BusinessJourney @search-domain="focusSearch" @show-messaging="industryShowcase?.showMessaging()" />
   <PricingSection @search-domain="focusSearch" @industry="industryShowcase?.showIndustry($event)" @show-messaging="industryShowcase?.showMessaging()" @hosting="selectItem({title:'Web hosting'})" />
   <BlogSection />
   <FaqSection />
   <SupportCta @contact="openSupportChat" />
  </main>
  <SiteFooter @search-domain="focusSearch" @show-messaging="industryShowcase?.showMessaging()" @industry="industryShowcase?.showIndustry($event)" @support="selectItem({title:'Help & support'})" @hosting="selectItem({title:'Web hosting'})" />
  <FinenicAssistant v-if="assistantReady" ref="assistant" @navigate="navigateAssistant" />
 </div>
</template>
