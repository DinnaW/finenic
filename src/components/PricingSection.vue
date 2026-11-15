<script setup>
import { ref } from 'vue'
import { ArrowUpRight, Check, Globe2, PanelsTopLeft, CalendarDays, ShoppingBag, Utensils, BedDouble, CarFront, UsersRound, Mail, MessageCircle, Phone, Server, Pause, Play } from 'lucide-vue-next'
import PremiumButton from './PremiumButton.vue'
import FooterMarquee from './ui/FooterMarquee.vue'

const emit = defineEmits(['search-domain','industry','show-messaging','hosting'])
const notice = ref(''), paused = ref(false)
// Draft offers for design review, not published commercial terms.
const plans = [
 { id:'starter',name:'Starter',description:'Make your first impression a good one.',price:'19',unit:'/ month',footnote:'For your first website',action:'Choose Starter',includes:'A home for your next idea',features:['One website, made for your brand','Connect your own domain','Hosting & SSL included','One business email inbox','Contact forms & enquiries'] },
 { id:'business',name:'Business',description:'Your website and daily work, in one place.',price:'49',unit:'/ month',footnote:'For a growing business',action:'Choose Business',featured:true,includes:'Everything in Starter, plus',features:['One business app of your choice','Online bookings or store & POS','Customer & lead management','Five business email inboxes','SMS reminders & notifications'] },
 { id:'scale',name:'Scale',description:'A setup shaped around how you work.',price:'Custom',unit:'',footnote:'Let’s find your fit',action:'Talk about your business',includes:'Everything in Business, plus',features:['Multiple websites or locations','Connected apps & workflows','Team roles & permissions','Guided setup & migration','A support plan built around you'] },
]
const services = [
 {label:'Domains',icon:Globe2,color:'#326bb5',action:'domain'},
 {label:'Websites',icon:PanelsTopLeft,color:'#326bb5',action:'website'},
 {label:'Salon Booking',icon:CalendarDays,color:'#7352b5',industry:0},
 {label:'Online Store',icon:ShoppingBag,color:'#a56a36',industry:1},
 {label:'Restaurants',icon:Utensils,color:'#32806c',industry:2},
 {label:'Hotels',icon:BedDouble,color:'#326bb5',industry:3},
 {label:'Car Dealers',icon:CarFront,color:'#7352b5',industry:4},
 {label:'CRM',icon:UsersRound,color:'#a56a36',industry:5},
 {label:'Email',icon:Mail,color:'#32806c',action:'messaging'},
 {label:'SMS',icon:MessageCircle,color:'#a45080',action:'messaging'},
 {label:'Cloud PBX',icon:Phone,color:'#a56a36',action:'pbx'},
 {label:'Hosting',icon:Server,color:'#326bb5',action:'hosting'},
]
function choose(plan) {
 notice.value=`${plan.name} is a sample plan. Final pricing and signup will be available when Finenic launches.`
}
function selectService(index) {
 const service=services[index]
 if(service.industry!==undefined) { emit('industry',service.industry);return }
 if(service.action==='domain') emit('search-domain')
 else if(service.action==='messaging') emit('show-messaging')
 else if(service.action==='hosting') emit('hosting')
 else if(service.action==='website') document.querySelector('#business-services')?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})
 else notice.value='Cloud PBX details are coming soon.'
}
</script>

<template>
 <section id="pricing" class="pricing-section" aria-labelledby="pricing-heading">
  <div class="pricing-inner">
   <header class="pricing-heading"><h2 id="pricing-heading" tabindex="-1">A plan for your next chapter.</h2><p>Start with a website. Add the tools your business needs.</p></header>
   <div class="pricing-grid" aria-describedby="pricing-disclaimer">
    <article v-for="plan in plans" :key="plan.id" class="pricing-plan" :class="{'pricing-plan--featured':plan.featured}" :aria-labelledby="`plan-${plan.id}`">
     <div class="plan-summary">
      <div class="plan-light" aria-hidden="true"></div>
      <div class="plan-intro"><div class="plan-title"><h3 :id="`plan-${plan.id}`">{{ plan.name }}</h3><span v-if="plan.featured" class="plan-recommended">Recommended</span></div><p>{{ plan.description }}</p></div>
      <div class="plan-purchase"><p class="plan-fit">{{ plan.footnote }}</p><p class="plan-price"><span v-if="plan.unit" class="plan-currency">$</span><strong>{{ plan.price }}</strong><span v-if="plan.unit" class="plan-unit">{{ plan.unit }}</span></p><PremiumButton variant="pricing" class="plan-action" @click="choose(plan)">{{ plan.action }}<template #icon><ArrowUpRight :size="15"/></template></PremiumButton></div>
     </div>
     <div class="plan-details"><p>{{ plan.includes }}</p><ul><li v-for="feature in plan.features" :key="feature"><Check :size="13" stroke-width="1.7" aria-hidden="true"/><span>{{ feature }}</span></li></ul></div>
    </article>
   </div>
   <p id="pricing-disclaimer" class="pricing-disclaimer">Sample plans for preview. Prices shown in USD; final pricing and inclusions may change.</p>
   <p class="pricing-notice" role="status" aria-live="polite">{{ notice }}</p>
  </div>
  <div class="pricing-services">
   <div class="pricing-services-heading"><h3>Every tool. One place.</h3><p>From your first domain to your next customer.</p></div>
   <div class="pricing-pill-rows">
    <FooterMarquee v-for="row in [0,1]" :key="row" class="pricing-service-marquee" :items="services.slice(row*6,row*6+6).map(item=>item.label)" :label="row===0?'Websites and industry tools':'Communication and business tools'" :paused="paused" :reverse="row===1" @activate="selectService($event+row*6)"><template #item="{item,index}"><span class="service-pill-icon" :style="{'--pill-accent':services[index+row*6].color}"><component :is="services[index+row*6].icon" :size="20" stroke-width="1.6" aria-hidden="true"/></span><span class="service-pill-label">{{ item }}</span></template></FooterMarquee>
   </div>
   <button class="pricing-motion-control" :aria-pressed="paused" :aria-label="paused?'Resume service marquee':'Pause service marquee'" @click="paused=!paused"><component :is="paused?Play:Pause" :size="12" aria-hidden="true"/><span>{{ paused?'Resume motion':'Pause motion' }}</span></button>
  </div>
 </section>
</template>

<style scoped>
.pricing-section { position:relative; padding-top:clamp(56px,6vw,100px); background:linear-gradient(#edf4fa,#fff 170px); color:#171b22; }
.pricing-inner { width:calc(100% - var(--section-gutter)*2); max-width:1240px; margin-inline:auto; }
.pricing-heading { text-align:center; margin-bottom:clamp(32px,3.8vw,60px); }
.pricing-heading h2 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:var(--type-heading-leading); text-wrap:balance; }
.pricing-heading>p { margin:16px 0 0; color:#69717a; font-size:var(--type-description); line-height:1.7; }
.pricing-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(16px,1.5vw,26px); }
.plan-summary { position:relative; isolation:isolate; overflow:hidden; min-height:clamp(280px,23vw,350px); padding:clamp(22px,2vw,32px); border:1px solid #f0f1f2; border-radius:12px; background:#f3f5f5; display:flex; flex-direction:column; justify-content:space-between; gap:50px; }
.plan-title { display:flex; align-items:center; justify-content:space-between; gap:10px; }.plan-title h3 { margin:0; font-size:clamp(19px,1.55vw,24px); font-weight:600; letter-spacing:-.035em; line-height:1.3; }
.plan-intro>p { margin:10px 0 0; font-size:clamp(13px,1vw,15px); color:#646d75; line-height:1.65; max-width:26ch; }
.plan-fit { margin:0 0 10px; font-size:11px; color:#7b838a; }
.plan-price { margin:0 0 20px; display:flex; align-items:baseline; gap:3px; line-height:1; letter-spacing:-.055em; }.plan-price strong { font-size:clamp(38px,3.3vw,52px); font-weight:550; }.plan-currency { font-size:clamp(27px,2.5vw,38px); font-weight:500; }.plan-unit { margin-left:5px; color:#68717a; font-size:12px; letter-spacing:0; }
.plan-action { width:100%; min-height:44px; justify-content:space-between; padding-inline:18px; font-size:12px; }
.plan-recommended { border:1px solid #ffffff24; border-radius:99px; background:#ffffff17; color:#e4e9ec; padding:5px 9px; font-size:10px; line-height:1; white-space:nowrap; }
.plan-light { display:none; }
.pricing-plan--featured .plan-summary { background:#141b20; color:#fff; border-color:#283139; box-shadow:inset 0 1px 0 #ffffff14; }
.pricing-plan--featured .plan-light { display:block; position:absolute; z-index:-1; inset:0; background:radial-gradient(ellipse at 89% 92%,#f4f7fa99 0%,#b6c5d45c 13%,transparent 36%),radial-gradient(ellipse at 73% 43%,#d3dce780 0%,#9daeb736 19%,transparent 42%),linear-gradient(135deg,#0d1418,#202a31 70%,#626f7b); }
.pricing-plan--featured .plan-light::after { content:''; position:absolute; inset:0; opacity:.18; background-image:radial-gradient(#d7e4ed 0.6px,transparent .8px); background-size:4px 4px; mask-image:linear-gradient(135deg,#000,transparent 58%); }
.pricing-plan--featured .plan-intro>p { color:#c1cbd3; }.pricing-plan--featured .plan-fit,.pricing-plan--featured .plan-unit { color:#c3cdd5; }
.pricing-plan--featured .plan-action { background:#fff; color:#171b22; border-color:#fff; box-shadow:inset 0 1px 0 #fff,0 2px 9px #0000000a; }
.plan-details { padding:24px 6px 0; }.plan-details>p { font-size:12px; color:#6a737b; margin:0 0 10px; min-height:20px; line-height:1.5; }.plan-details ul { list-style:none; margin:0; padding:0; }.plan-details li { border-top:1px solid #edf0f2; padding:13px 0; display:flex; align-items:start; gap:10px; font-size:clamp(12px,.93vw,14px); line-height:1.6; color:#515c66; }.plan-details li svg { margin-top:3px; color:#81949b; }
.pricing-disclaimer { margin:26px auto 0; text-align:center; font-size:11px; line-height:1.7; color:#7c858d; }
.pricing-notice { min-height:23px; margin:10px auto 0; text-align:center; font-size:12px; line-height:1.7; color:#486780; max-width:65ch; }
.pricing-services { margin-top:clamp(24px,3vw,48px); padding:clamp(34px,4vw,64px) var(--section-gutter) clamp(20px,2vw,32px); background:radial-gradient(ellipse at 50% 60%,#e7f4fc88,transparent 66%),linear-gradient(#fff,#f5f9fc 55%,#edf4fa); }
.pricing-services-heading { text-align:center; margin:0 auto clamp(26px,2.5vw,40px); }.pricing-services-heading h3 { margin:0; font-size:clamp(24px,2.2vw,34px); font-weight:500; letter-spacing:-.04em; line-height:1.2; }.pricing-services-heading>p { margin:12px 0 0; font-size:13px; line-height:1.6; color:#6e7e8a; }
.pricing-pill-rows { max-width:1320px; margin-inline:auto; }
.pricing-service-marquee { padding:7px 0 11px; mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent); }
.pricing-service-marquee :deep(.marquee-group) { gap:14px; padding-right:14px; justify-content:space-around; }
.pricing-service-marquee :deep(.marquee-group button) { padding:9px 24px 9px 10px; width:auto; height:64px; flex-direction:row; flex-shrink:0; justify-content:flex-start; gap:13px; background:linear-gradient(145deg,#fff,#ffffffd9); border:1px solid #e0e9ef; border-radius:999px; white-space:nowrap; box-shadow:inset 0 1px 0 #fff,0 3px 8px #42627c05; }
.pricing-service-marquee :deep(.marquee-group button:nth-child(3n+2)) { background:linear-gradient(130deg,#fafdff,#eaf5fc); border-color:#dcebf5; }
.pricing-service-marquee :deep(.service-pill-icon) { display:grid; place-items:center; width:42px; height:42px; flex-shrink:0; border-radius:50%; border:1px solid #edf1f4; background:linear-gradient(#fff,#f4f7fa); color:var(--pill-accent); box-shadow:inset 0 1px 0 white; }
.pricing-service-marquee :deep(.service-pill-label) { color:#334653; font-size:clamp(14px,1.1vw,17px); font-weight:500; line-height:1.4; letter-spacing:-.025em; }
.pricing-motion-control { display:flex; align-items:center; justify-content:center; gap:7px; min-height:36px; padding:0 12px; margin:18px auto 0; border-radius:99px; color:#718492; font-size:10px; }
.pricing-motion-control:focus-visible { outline:2px solid #1976d2; outline-offset:4px; }
@media(hover:hover) and (pointer:fine) { .pricing-plan--featured .plan-action:hover { background:#eff4f8; border-color:#eff4f8; }.pricing-service-marquee :deep(.marquee-group button:hover) { border-color:#cbdfea; background:#fbfdff; } }
@media(max-width:1000px) and (min-width:701px) { .plan-summary { padding:22px 18px; }.plan-title { flex-wrap:wrap; align-content:start; min-height:62px; }.plan-intro>p { margin-top:7px; }.plan-recommended { font-size:9px; }.plan-action { font-size:11px; padding-inline:12px; gap:8px; } }
@media(max-width:700px) { .pricing-grid { grid-template-columns:1fr; gap:32px; }.pricing-inner { max-width:440px; }.pricing-heading { margin-bottom:30px; }.pricing-heading h2 { font-size:clamp(30px,7.2vw,42px); }.pricing-heading>p { max-width:30ch; margin-inline:auto; }.plan-summary { min-height:284px; padding:26px; }.plan-title h3 { font-size:23px; }.plan-intro>p { font-size:14px; }.plan-price strong { font-size:44px; }.plan-currency { font-size:32px; }.plan-details { padding:20px 4px 0; }.plan-details li { font-size:13px; padding-block:11px; }.pricing-disclaimer { max-width:38ch; }.pricing-services-heading>p { font-size:12px; }.pricing-service-marquee :deep(.marquee-group) { gap:10px; padding-right:10px; }.pricing-service-marquee :deep(.marquee-group button) { height:56px; padding:7px 20px 7px 8px; gap:10px; }.pricing-service-marquee :deep(.service-pill-icon) { width:38px; height:38px; }.pricing-service-marquee :deep(.service-pill-label) { font-size:14px; } }
</style>
