<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { ChevronDown, ArrowUpRight, UserRound, ShoppingCart, Menu, X, Pause, Play, Plus } from 'lucide-vue-next'
defineProps({ scrolled:Boolean })
const emit=defineEmits(['action'])
const root=ref(null), active=ref(null), mobile=ref(false), paused=ref(false)
const base=import.meta.env.BASE_URL
const strip=['Your idea. Your domain.','Websites that mean business','Bookings, orders & more','Your next chapter starts here']
const groups=[
 {name:'Domains',items:[['Find a domain','Find the name for your next idea.','domain'],['Transfer a domain','Explore domain transfer guidance.','faq']]},
 {name:'Websites',items:[['Business websites','Build a home for your business.','websites'],['Business apps','Bookings, orders and daily work.','apps']]},
 {name:'Email',items:[['Business email','Your name in every conversation.','messaging']]},
 {name:'SMS',items:[['SMS & reminders','Keep your customers in the loop.','messaging']]},
 {name:'Cloud PBX',items:[['Cloud PBX','Business phone options.','pbx']]},
 {name:'Hosting',items:[['Web hosting','A home for your website.','hosting'],['Hosting & maintenance','Keep your website running smoothly.','maintenance']]},
]
let resize, opener
function toggle(name,event) { opener=event.currentTarget;active.value=active.value===name?null:name }
function go(action) { active.value=null;mobile.value=false;emit('action',action) }
function outside(event) { if(!root.value?.contains(event.target)){active.value=null;mobile.value=false} }
function escape(event) { if(event.key==='Escape'){active.value=null;mobile.value=false;opener?.focus()} }
async function first(name,event) { event.preventDefault();opener=event.currentTarget;active.value=name;await nextTick();root.value.querySelector('.compact-menu button')?.focus() }
onMounted(()=>{resize=new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${root.value.offsetHeight}px`));resize.observe(root.value);document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape)})
onUnmounted(()=>{resize?.disconnect();document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);document.documentElement.style.removeProperty('--header-height')})
</script>
<template>
 <header ref="root" class="header-wrap compact-header" :class="{'is-scrolled':scrolled}" @click.stop>
  <div class="compact-row">
   <a class="brand flex items-center" :href="base" aria-label="finenic home"><svg class="brand-symbol" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(45 20 20)"/><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(-45 20 20)"/><circle cx="20" cy="20" r="4" fill="white"/></svg><span>finenic<span class="brand-dot">.</span></span></a>
   <nav id="compact-navigation" class="compact-navigation" :class="{'is-open':mobile}" aria-label="Main navigation">
    <div v-for="group in groups" :key="group.name" class="compact-item"><button class="compact-trigger" :aria-expanded="active===group.name" :aria-controls="`compact-${group.name.replaceAll(' ','-')}`" @click="toggle(group.name,$event)" @keydown.down="first(group.name,$event)">{{group.name}}<ChevronDown :size="12"/></button><div v-if="active===group.name" :id="`compact-${group.name.replaceAll(' ','-')}`" class="compact-menu"><button v-for="item in group.items" :key="item[0]" @click="go(item[2])"><span><strong>{{item[0]}}</strong><small>{{item[1]}}</small></span><ArrowUpRight :size="16"/></button></div></div>
    <button class="compact-trigger" @click="go('pricing')">Pricing</button>
    <div class="compact-mobile-links"><button @click="go('deals')">Deals</button><button @click="go('faq')">Help Center</button></div>
   </nav>
   <div class="compact-utilities"><button class="utility-link" @click="go('deals')">Deals</button><button class="utility-link" @click="go('faq')">Help Center</button><div class="compact-item"><button class="utility-signin" :aria-expanded="active==='account'" aria-controls="compact-account" @click="toggle('account',$event)"><UserRound :size="17"/><span>Sign in</span></button><div v-if="active==='account'" id="compact-account" class="compact-notice" role="status"><strong>Your Finenic account</strong><p>Sign in and account management will be available when Finenic launches.</p></div></div><div class="compact-item"><button class="compact-icon" aria-label="Shopping cart" :aria-expanded="active==='cart'" aria-controls="compact-cart" @click="toggle('cart',$event)"><ShoppingCart :size="20"/></button><div v-if="active==='cart'" id="compact-cart" class="compact-notice" role="status"><strong>Your cart is empty</strong><p>Ordering and checkout aren’t connected yet. Explore the products to find your fit.</p><button @click="go('apps')">Explore products <ArrowUpRight :size="14"/></button></div></div><button class="compact-toggle" aria-label="Toggle navigation" :aria-expanded="mobile" aria-controls="compact-navigation" @click="mobile=!mobile;active=null"><X v-if="mobile" :size="22"/><Menu v-else :size="22"/></button></div>
  </div>
 </header>
</template>
<style scoped>
.compact-header { color:#172135; border-bottom:1px solid #dce8f180; }
.header-ribbon { height:30px; padding-right:32px; background:linear-gradient(90deg,#e3f2fd,#edf5fa 50%,#dcecf9); border-bottom:1px solid #c9deed70; position:relative; }
.header-ribbon :deep(.footer-marquee) { padding:0; mask-image:none; }.header-ribbon :deep(.marquee-group) { gap:60px; padding-right:60px; }.header-ribbon :deep(.marquee-group button) { height:30px; padding:0; gap:60px; font-size:11px; font-weight:550; letter-spacing:0; color:#425d74; }.header-ribbon :deep(.marquee-group span) { color:inherit; }.header-ribbon :deep(.marquee-group svg) { color:#789ab5; }
.ribbon-pause { position:absolute; right:0; top:0; width:32px; height:30px; display:grid; place-items:center; background:#e3eff8; color:#526a80; }
.compact-row { width:90%; margin:auto; height:76px; display:flex; align-items:center; gap:clamp(22px,2.5vw,48px); }.compact-row .brand { font-size:26px; flex:none; }.compact-row .brand-symbol { width:28px; height:28px; }
.compact-navigation { display:flex; align-items:center; gap:clamp(14px,1.55vw,30px); }.compact-item { position:relative; }.compact-trigger { display:flex; gap:6px; align-items:center; min-height:44px; font-size:12px; white-space:nowrap; }.compact-trigger[aria-expanded="true"]>svg { transform:rotate(180deg); }
.compact-utilities { display:flex; align-items:center; gap:18px; margin-left:auto; font-size:11px; white-space:nowrap; }.compact-utilities button { min-height:40px; }.utility-signin { display:flex; align-items:center; gap:7px; }.compact-icon { width:30px; display:grid; place-items:center; }
.compact-menu,.compact-notice { position:absolute; z-index:2; top:100%; width:290px; padding:9px; border:1px solid #dce6ef; border-radius:14px; background:#fff; box-shadow:0 18px 45px #15324e1a; }.compact-menu { left:-16px; }.compact-menu>button { display:flex; align-items:center; justify-content:space-between; gap:14px; width:100%; padding:14px 12px; text-align:left; border-radius:8px; }.compact-menu>button:hover { background:#f0f7fc; }.compact-menu strong { display:block; font-size:13px; font-weight:600; }.compact-menu small { display:block; margin-top:5px; font-size:11px; color:#748393; line-height:1.6; }
.compact-notice { right:0; padding:20px; }.compact-notice strong { font-size:14px; }.compact-notice p { margin:9px 0 0; font-size:12px; white-space:normal; line-height:1.7; color:#6b7986; }.compact-notice>button { display:flex; gap:12px; align-items:center; font-size:12px; margin-top:10px; }
.compact-toggle,.compact-mobile-links { display:none; }.compact-header :is(button,a):focus-visible { outline:2px solid #7294ae; outline-offset:3px; border-radius:4px; }
@media(max-width:1250px) { .compact-row { gap:22px; }.compact-navigation { gap:15px; }.utility-link { display:none; }.compact-mobile-links { display:flex; gap:15px; }.compact-mobile-links button { font-size:11px; }.compact-utilities { gap:10px; }.utility-signin span { display:none; } }
@media(max-width:1050px) { .compact-navigation { display:none; }.compact-navigation.is-open { display:flex; position:absolute; top:100%; left:0; right:0; max-height:calc(100dvh - var(--header-height)); overflow:auto; background:white; flex-direction:column; align-items:stretch; gap:2px; padding:14px 5vw 22px; border-bottom:1px solid #dce6ef; box-shadow:0 14px 25px #173b8315; }.compact-menu { position:static; width:100%; box-shadow:none; }.compact-trigger { width:100%; justify-content:space-between; }.compact-mobile-links { border-top:1px solid #e2ebf2; padding-top:16px; }.compact-toggle { display:grid; place-items:center; width:36px; }.utility-link,.utility-signin span { display:block; }.compact-utilities { gap:18px; }.compact-notice { position:fixed; top:var(--header-height); right:5vw; max-width:90vw; } }
@media(max-width:600px) { .compact-row { width:88%; height:66px; }.compact-row .brand { font-size:24px; }.compact-utilities { gap:8px; }.utility-link { display:none; }.header-ribbon :deep(.marquee-group),.header-ribbon :deep(.marquee-group button) { gap:32px; } }
@media(max-width:360px) { .utility-signin span { display:none; } }
</style>
