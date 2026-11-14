<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight, ArrowRight, ChevronDown, Search, Globe2, Menu, X, Server, Mail, LifeBuoy, BookOpen } from 'lucide-vue-next'
import { domainSuggestions } from './domain'
import GradientBarHero from './components/ui/GradientBarHero.vue'
import AvatarPill from './components/ui/AvatarPill.vue'
import DomainStory from './components/DomainStory.vue'
import BusinessServices from './components/BusinessServices.vue'
import IndustryShowcase from './components/IndustryShowcase.vue'
import PremiumButton from './components/PremiumButton.vue'
import './gradient-hero.css'
import './typography.css'
import './site-motion.css'
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
async function selectItem(item) {activeMenu.value=null;mobileOpen.value=false;if(item.title==='Find a domain'||item.title==='Domain extensions'){focusSearch();return}product.value=item.title;results.value=[];await nextTick();productSection.value?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'})}
function escape(event) {if(event.key==='Escape'){activeMenu.value=null;mobileOpen.value=false;product.value=null}}
onMounted(()=>document.addEventListener('keydown',escape))
onUnmounted(()=>document.removeEventListener('keydown',escape))
</script>

<template>
 <div ref="siteRoot" class="site-shell site-shell--gradient-hero" @click="activeMenu=null">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="header-wrap">
   <div class="header-inner flex items-center justify-between">
    <a class="brand flex items-center" :href="baseUrl" aria-label="finenic home"><svg class="brand-symbol" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(45 20 20)"/><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(-45 20 20)"/><circle cx="20" cy="20" r="4" fill="white"/></svg><span>finenic<span class="brand-dot">.</span></span></a>
    <nav class="desktop-nav flex items-center" aria-label="Main navigation">
     <div v-for="(items,name) in menuItems" :key="name" class="nav-item" @click.stop>
      <button class="nav-trigger flex items-center" :aria-expanded="activeMenu===name" :aria-controls="`menu-${name}`" @click="activeMenu=activeMenu===name?null:name">{{name}}<ChevronDown :size="13" :class="{'rotate-180':activeMenu===name}" /></button>
      <div v-if="activeMenu===name" :id="`menu-${name}`" class="nav-dropdown">
       <button v-for="item in items" :key="item.title" class="nav-option flex items-center" @click="selectItem(item)"><component :is="item.icon" :size="19"/><span><strong>{{item.title}}</strong><small>{{item.text}}</small></span><ArrowUpRight :size="16"/></button>
      </div>
     </div>
    </nav>
    <div class="header-actions flex items-center"><button class="contact-button" @click.stop="selectItem({title:'Help & support'})">Let’s talk <ArrowUpRight :size="14"/></button><PremiumButton variant="header" @click="focusSearch">Get started<template #icon><ArrowUpRight :size="15"/></template></PremiumButton><button class="mobile-toggle" aria-label="Toggle navigation" :aria-expanded="mobileOpen" aria-controls="mobile-nav" @click="mobileOpen=!mobileOpen"><X v-if="mobileOpen" :size="22"/><Menu v-else :size="22"/></button></div>
   </div>
   <nav v-if="mobileOpen" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation"><div v-for="(items,name) in menuItems" :key="name"><p>{{name}}</p><button v-for="item in items" :key="item.title" @click="selectItem(item)">{{item.title}}<ArrowUpRight :size="16"/></button></div></nav>
  </header>

  <main id="main">
   <section class="hero relative" aria-labelledby="hero-title">
    <GradientBarHero :reduced="reducedMotion" />
    <div class="hero-content relative mx-auto text-center">
     <AvatarPill />
     <div class="hero-introduction">
     <h1 id="hero-title">Built for your next big idea.<br> Starting with your domain.</h1>
     <p class="hero-description">Find your name. Build your website. Make it yours.</p>
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
     <section v-if="product" ref="productSection" class="product-panel text-left" aria-live="polite"><div class="result-header"><h2>{{product}}</h2><button class="icon-button" aria-label="Close details" @click="product=null"><X :size="18"/></button></div><template v-if="product==='Getting started'"><p>Start with a name that?s short, memorable, and easy to spell. Then choose a hosting plan for the website you want to build.</p><button class="text-link" @click="focusSearch">Find your domain <ArrowRight :size="16"/></button></template><template v-else-if="product==='Help & support'"><p>Finenic is taking shape. Support and contact options will be added as the website launches.</p></template><template v-else><p>{{product==='Business email'?'Bring your brand to every conversation with an email address at your own domain.':'Give your website a home with room for your ideas to grow.'}}</p><p class="panel-note">Plans and pricing are coming soon.</p><button class="text-link" @click="focusSearch">Start with your domain <ArrowRight :size="16"/></button></template></section>
     <button class="explore-link flex items-center justify-center" @click="selectItem({title:'Web hosting'})">Explore hosting <ArrowUpRight :size="15"/></button>
    </div>
   </section>
   <DomainStory @search-domain="focusSearch" />
   <BusinessServices />
   <IndustryShowcase @search-domain="focusSearch" />
  </main>
 </div>
</template>
