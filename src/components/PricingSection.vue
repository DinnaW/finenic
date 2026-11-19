<script setup>
import { ref } from 'vue'
import { ArrowUpRight, Check, Globe2, PanelsTopLeft, CalendarDays, ShoppingBag, Utensils, BedDouble, CarFront, UsersRound, Mail, MessageCircle, Phone, Server } from 'lucide-vue-next'
import PremiumButton from './PremiumButton.vue'
import FooterMarquee from './ui/FooterMarquee.vue'

const emit = defineEmits(['search-domain','industry','show-messaging','hosting'])
const notice = ref('')
// Monthly USD placeholders for design review.
const plans = [
 { id:'saptivo', name:'Saptivo', description:'Keep leads and customer conversations together.', price:'15', unit:'/ month', footnote:'CRM', action:'Explore Saptivo', industry:5, includes:'CRM tools', features:['Customer records','Lead management','Sales follow-ups'] },
 { id:'saptify', name:'Saptify', description:'Manage appointments and checkout in one place.', price:'16', unit:'/ month', footnote:'Appointment booking & POS', action:'Explore Saptify', industry:0, featured:true, includes:'Booking tools', features:['Online appointment booking','Client rebooking','Point of sale'] },
 { id:'cartinno-food', name:'Cartinno Food', description:'Take orders online, at the table and at the counter.', price:'15', unit:'/ month', footnote:'Restaurant website, ordering & POS', action:'Explore Cartinno Food', industry:2, includes:'Restaurant tools', features:['Restaurant ordering website','QR menu & table ordering','Restaurant POS'] },
 { id:'cartinno', name:'Cartinno', description:'Sell online and in store with connected stock.', price:'20', unit:'/ month', footnote:'Ecommerce website & POS', action:'Explore Cartinno', industry:1, includes:'Retail tools', features:['Ecommerce storefront','In-store POS','Synced inventory'] },
]
const services = [
 {label:'Domains',description:'Find an address for your next idea.',sample:'juniper.studio',icon:Globe2,color:'#326bb5',action:'domain'},
 {label:'Websites',description:'Give customers a place to find you.',sample:'Home   /   Shop   /   Contact',icon:PanelsTopLeft,color:'#326bb5',action:'website'},
 {label:'Salon Booking',description:'Let clients choose their next appointment.',sample:'10:30 AM   ·   Haircut',icon:CalendarDays,color:'#7352b5',industry:0},
 {label:'Online Store',description:'Keep counter and online orders in sync.',sample:'Canvas tote   ×   2',icon:ShoppingBag,color:'#a56a36',industry:1},
 {label:'Restaurants',description:'Take orders straight from the table.',sample:'Table 04   ·   Pickup ready',icon:Utensils,color:'#32806c',industry:2},
 {label:'Hotels',description:'Turn room searches into direct bookings.',sample:'Garden suite   ·   2 nights',icon:BedDouble,color:'#326bb5',industry:3},
 {label:'Car Dealers',description:'Put every showroom on one forecourt.',sample:'City hatchback   ·   In stock',icon:CarFront,color:'#7352b5',industry:4},
 {label:'CRM',description:'Keep the next follow-up in sight.',sample:'New enquiry   →   Follow-up',icon:UsersRound,color:'#a56a36',industry:5},
 {label:'Email',description:'Send mail from your own domain.',sample:'hello@juniper.studio',icon:Mail,color:'#32806c',action:'messaging'},
 {label:'SMS',description:'Reach customers before their appointment.',sample:'Tomorrow at 10:30 AM',icon:MessageCircle,color:'#a45080',action:'messaging'},
 {label:'Cloud PBX',description:'Route incoming calls to the right desk.',sample:'Reception   →   Sales',icon:Phone,color:'#a56a36',action:'pbx'},
 {label:'Hosting',description:'Give your website a secure home.',sample:'HTTPS   ·   Connected',icon:Server,color:'#326bb5',action:'hosting'},
]
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
    <article v-for="plan in plans" :key="plan.id" class="pricing-plan" :class="{'pricing-plan--featured':plan.featured, 'pricing-plan--retail':plan.id==='cartinno'}" :aria-labelledby="`plan-${plan.id}`">
     <div class="plan-summary">

      <div class="plan-intro"><div class="plan-title"><h3 :id="`plan-${plan.id}`">{{ plan.name }}</h3></div><p>{{ plan.description }}</p></div>
      <div class="plan-purchase"><p class="plan-fit">{{ plan.footnote }}</p><p class="plan-price"><span v-if="plan.unit" class="plan-currency">$</span><strong>{{ plan.price }}</strong><span v-if="plan.unit" class="plan-unit">{{ plan.unit }}</span></p><PremiumButton variant="pricing" class="plan-action" @click="emit('industry',plan.industry)">{{ plan.action }}<template #icon><ArrowUpRight :size="15"/></template></PremiumButton></div>
     </div>
     <div class="plan-details"><p>{{ plan.includes }}</p><ul><li v-for="feature in plan.features" :key="feature"><Check :size="13" stroke-width="1.7" aria-hidden="true"/><span>{{ feature }}</span></li></ul></div>
    </article>
   </div>
   <p id="pricing-disclaimer" class="pricing-disclaimer">Sample monthly prices in USD. Final pricing will be confirmed.</p>
   <p class="pricing-notice" role="status" aria-live="polite">{{ notice }}</p>
  </div>
  <div class="pricing-services">
   <div class="pricing-services-heading"><h3>Every tool. One place.</h3><p>From your first domain to your next customer.</p></div>
   <FooterMarquee class="tool-reel" :items="services.map(service => service.label)" label="Explore Finenic services" @activate="selectService">
    <template #item="{item,index}">
     <span class="tool-card" :style="{ '--ink': services[index].color }">
      <span class="tool-art" aria-hidden="true">
       <component :is="services[index].icon" class="tool-glyph" :size="80" stroke-width="1.15"/>
       
      </span>
      <span class="tool-title">{{ item }} <ArrowUpRight :size="16" aria-hidden="true"/></span>
      <span class="tool-description">{{ services[index].description }}</span>
      <span class="tool-sample" aria-hidden="true">{{ services[index].sample }}</span>
     </span>
    </template>
   </FooterMarquee>
  </div>
 </section>
</template>

<style scoped>
.pricing-section { position:relative; padding-top:clamp(68px,7vw,120px); background:linear-gradient(#edf4fa,#fff 170px); color:#171b22; }
.pricing-inner { width:calc(100% - var(--section-gutter)*2); max-width:1240px; margin-inline:auto; }
.pricing-heading { text-align:center; margin-bottom:clamp(28px,3.2vw,52px); }
.pricing-heading h2 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:var(--type-heading-leading); text-wrap:balance; }
.pricing-heading>p { margin:16px 0 0; color:#69717a; font-size:var(--type-description); line-height:1.7; }
.pricing-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(16px,1.5vw,26px); }
.plan-summary { position:relative; isolation:isolate; overflow:hidden; min-height:clamp(280px,23vw,350px); padding:clamp(22px,2vw,32px); border:1px solid #f0f1f2; border-radius:12px; background:#f3f5f5; display:flex; flex-direction:column; justify-content:space-between; gap:50px; }
.plan-title { display:flex; align-items:center; justify-content:space-between; gap:10px; }.plan-title h3 { margin:0; font-size:clamp(19px,1.55vw,24px); font-weight:600; letter-spacing:-.035em; line-height:1.3; }
.plan-intro>p { margin:10px 0 0; font-size:clamp(13px,1vw,15px); color:#646d75; line-height:1.65; max-width:26ch; }
.plan-fit { margin:0 0 10px; font-size:11px; color:#7b838a; }
.plan-price { margin:0 0 20px; display:flex; align-items:baseline; gap:3px; line-height:1; letter-spacing:-.055em; }.plan-price strong { font-size:clamp(38px,3.3vw,52px); font-weight:550; }.plan-currency { font-size:clamp(27px,2.5vw,38px); font-weight:500; }.plan-unit { margin-left:5px; color:#68717a; font-size:12px; letter-spacing:0; }
.plan-action { width:100%; min-height:44px; justify-content:space-between; padding-inline:18px; font-size:12px; }
.pricing-plan--retail .plan-summary { background:linear-gradient(145deg,#fcfefd,#eaf3f2); border-color:#cfdfdd; }
.pricing-plan--featured .plan-summary {
 color:#172135; border-color:#c4d6e6;
 background:radial-gradient(ellipse at 92% 90%,#cfe1ef,transparent 55%),linear-gradient(135deg,#fbfdff,#edf4fa 65%);
 box-shadow:inset 0 1px 0 #fff;
}
.pricing-plan--featured .plan-intro>p,.pricing-plan--featured .plan-fit,.pricing-plan--featured .plan-unit { color:#496074; }
.plan-details { padding:24px 6px 0; }.plan-details>p { font-size:12px; color:#6a737b; margin:0 0 10px; min-height:20px; line-height:1.5; }.plan-details ul { list-style:none; margin:0; padding:0; }.plan-details li { border-top:1px solid #edf0f2; padding:13px 0; display:flex; align-items:start; gap:10px; font-size:clamp(12px,.93vw,14px); line-height:1.6; color:#515c66; }.plan-details li svg { margin-top:3px; color:#81949b; }
.pricing-disclaimer { margin:26px auto 0; text-align:center; font-size:11px; line-height:1.7; color:#7c858d; }
.pricing-notice { min-height:23px; margin:10px auto 0; text-align:center; font-size:12px; line-height:1.7; color:#486780; max-width:65ch; }
.pricing-services {
 margin-top:clamp(12px,1.25vw,24px);
 padding:clamp(32px,3vw,56px) var(--section-gutter) clamp(52px,6vw,104px);
 background:linear-gradient(180deg,#fff,#f3f7fa);
}
.pricing-services-heading { margin:0 auto clamp(42px,4.5vw,80px); text-align:center; }
.pricing-services-heading h3 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:1.12; }
.pricing-services-heading>p { margin:14px 0 0; font-size:var(--type-description); color:#596976; }
.tool-reel { padding:6px 4px 16px; }
.tool-reel :deep(.marquee-group) { gap:clamp(14px,1.35vw,24px); padding-right:clamp(14px,1.35vw,24px); }
.tool-reel :deep(.marquee-group button) { display:block; padding:0; white-space:normal; text-align:left; letter-spacing:normal; border-radius:20px; }
.tool-card {
 --wash:color-mix(in srgb,var(--ink) 11%,white);
 position:relative; isolation:isolate; overflow:hidden; box-sizing:border-box;
 display:flex; flex-direction:column; width:clamp(260px,22vw,360px); min-height:clamp(338px,25vw,415px);
 padding:clamp(23px,2vw,35px); border:1px solid color-mix(in srgb,var(--ink) 19%,white); border-radius:20px;
 background:linear-gradient(154deg,var(--wash),#fff 94%);
}
.tool-card::before {
 content:''; position:absolute; z-index:-1; inset:0; pointer-events:none;
 background:radial-gradient(color-mix(in srgb,var(--ink) 27%,transparent) .8px,transparent 1px) 0 0/9px 9px;
 mask-image:linear-gradient(160deg,#000,transparent 68%);
}
.tool-art { flex:1; display:flex; align-items:center; padding:4px 0 24px; }
.tool-glyph { color:var(--ink); filter:drop-shadow(0 2px 0 white); }
.tool-card .tool-title { display:flex; align-items:center; justify-content:space-between; gap:10px; color:#162535; font-size:clamp(23px,1.7vw,30px); font-weight:500; line-height:1.15; letter-spacing:-.045em; }
.tool-title svg { color:var(--ink); }
.tool-card .tool-description { margin-top:10px; min-height:3em; color:#50606e; font-size:15px; line-height:1.5; }
.tool-card .tool-sample { display:block; margin-top:22px; padding-top:14px; border-top:1px solid color-mix(in srgb,var(--ink) 18%,white); color:#435564; font:12px/1.5 ui-monospace,monospace; letter-spacing:0; }
@media(max-width:1100px) and (min-width:701px) { .pricing-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .plan-summary { padding:22px 18px; }.plan-title { flex-wrap:wrap; align-content:start; min-height:62px; }.plan-intro>p { margin-top:7px; }.plan-action { font-size:11px; padding-inline:12px; gap:8px; } }
@media(max-width:700px) { .pricing-grid { grid-template-columns:1fr; gap:32px; }.pricing-inner { max-width:440px; }.pricing-heading { margin-bottom:26px; }.pricing-heading h2 { font-size:clamp(30px,7.2vw,42px); }.pricing-heading>p { max-width:30ch; margin-inline:auto; }.plan-summary { min-height:284px; padding:26px; }.plan-title h3 { font-size:23px; }.plan-intro>p { font-size:14px; }.plan-price strong { font-size:44px; }.plan-currency { font-size:32px; }.plan-details { padding:20px 4px 0; }.plan-details li { font-size:13px; padding-block:11px; }.pricing-disclaimer { max-width:38ch; }.pricing-services-heading>p { font-size:12px; } }
</style>
