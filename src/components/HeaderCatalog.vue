<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, ArrowUpRight, BookOpen, ChevronRight, Headphones, Inbox, Mail, Send, Star } from 'lucide-vue-next'
import { industries } from '../data/industryCatalog'
import ProductPreview from './ProductPreview.vue'

const props = defineProps({ group:{type:Object,required:true}, base:String })
defineEmits(['action','close'])
const sectionIndex = ref(0)
const itemIndex = ref(0)
const section = computed(()=>props.group.sections[sectionIndex.value])
const item = computed(()=>section.value.items[itemIndex.value])
const featured = computed(()=>{
 const target = item.value.action
 if (target && typeof target==='object') return industries[target.industry].cards.find(card=>card.id===target.card)
 const id = { Domains:'domain', SMS:'sms', Email:'email', Hosting:'hosting' }[props.group.name]
 return id && industries.flatMap(industry=>industry.cards).find(card=>card.id===id || card.visual===id)
})
const columns = computed(()=>{
 const sections = props.group.sections.map((entry,index)=>({
   title:entry.title, index, items:entry.items.map((link,i)=>({link,i}))
 }))
 if(props.group.name==='Websites') return sections.map(entry=>[entry])
 if(sections.length===1){
   const group=sections[0], mid=Math.ceil(group.items.length/2)
   return [[{...group,items:group.items.slice(0,mid)}],[{...group,title:'',items:group.items.slice(mid)}]]
 }
 const split=Math.ceil(sections.length/2)
 return [sections.slice(0,split),sections.slice(split)]
})
const blurb = computed(()=>item.value.detail || featured.value?.copy || props.group.description)
const messages = [
 { initials:'AL', sender:'Ava Lee', subject:'Spring collection proofs', time:'9:42' },
 { initials:'MK', sender:'Mila Kim', subject:'Re: Friday’s studio booking', time:'9:18' },
 { initials:'JD', sender:'Jon Davis', subject:'Your order is on its way', time:'8:56' }
]
function preview(groupIndex,linkIndex) { sectionIndex.value=groupIndex; itemIndex.value=linkIndex }
function hover(event, callback) { if(event.pointerType==='mouse') callback() }
</script>

<template>
 <div class="catalog" :class="{ websites:group.name==='Websites' }">
  <div class="panes">
   <div class="name-index">
    <header><h2>{{ group.title }}</h2><button @click="$emit('action',group.action)">{{ group.cta }} <ArrowRight :size="15"/></button></header>
    <div class="name-columns">
     <div v-for="(column,c) in columns" :key="c">
      <section v-for="bucket in column" :key="bucket.index" class="name-group">
       <h3 v-if="bucket.title">{{bucket.title}}</h3>
       <button v-for="{link,i} in bucket.items" :key="link.label" :aria-pressed="sectionIndex===bucket.index && itemIndex===i"
        @pointerenter="hover($event,()=>preview(bucket.index,i))" @focus="preview(bucket.index,i)" @click="preview(bucket.index,i)">
        {{link.label}}<ChevronRight :size="13" aria-hidden="true"/>
       </button>
      </section>
     </div>
    </div>
   </div>
   <section class="spotlight" :aria-label="item.label">
    <div class="preview-inner"><div class="stage"><div class="illustration" inert>
     <div v-if="group.name==='Email' || featured?.visual==='email'" class="mail-scene" aria-hidden="true">
      <div class="mail-window">
       <div class="mail-bar"><Mail :size="15"/> Smardove <span>hello@juniper.studio</span></div>
       <div class="mail-body">
        <div class="mail-rail"><Inbox :size="16"/><Star :size="15"/><Send :size="15"/></div>
        <div class="mail-list"><strong>Inbox</strong>
         <div v-for="message in messages" :key="message.sender" class="mail-item"><i>{{ message.initials }}</i><div><b>{{ message.sender }}</b><small>{{ message.subject }}</small></div><time>{{ message.time }}</time></div>
        </div>
       </div>
      </div>
     </div>
     <ProductPreview v-else-if="featured" :key="featured.id + featured.title" :item="featured" business="Juniper Studio" :paused="true"/>
     <div v-else class="phone-preview"><Headphones :size="35"/><strong>Reception</strong><span>Incoming call → Sales</span></div>
    </div>
    </div><div class="summary"><h3>{{ item.label }}</h3><p>{{ blurb }}</p>
     <a v-if="item.action==='lookup'" href="https://lookup.icann.org/" target="_blank" rel="noopener" @click="$emit('close')">Open WHOIS lookup <ArrowUpRight :size="15"/></a>
     <button v-else @click="$emit('action',item.action || 'support')">{{ item.action ? 'Explore '+item.label : 'Ask about '+item.label }} <ArrowRight :size="15"/></button>
    </div>
   </div></section>
  </div>
  <footer><button @click="$emit('action','pricing')">Compare pricing <ArrowRight :size="14"/></button><button @click="$emit('action','faq')"><BookOpen :size="14"/> Help Center</button></footer>
 </div>
</template>

<style scoped>
.catalog {
 --ink:#172339; --rule:#dbe4ed;
 zoom:var(--menu-scale,1);
 color:var(--ink); background:#fff; border:1px solid var(--rule); border-radius:20px;
 overflow:auto; max-height:calc((100dvh - var(--header-height) - 14px) / var(--menu-scale,1)); box-shadow:0 22px 60px -20px #17325150;
}
.panes { display:grid; grid-template-columns:minmax(0,1.66fr) minmax(0,1fr); }
.catalog :is(button,a) { display:flex; align-items:center; gap:8px; text-align:left; cursor:pointer; font-size:13px; }
.name-index { min-width:0; padding:clamp(18px,2vw,30px); }
.name-index header,footer { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.name-index header { padding-bottom:16px; border-bottom:1px solid var(--rule); }
.name-index h2 { margin:0; font-size:clamp(24px,2vw,32px); font-weight:550; line-height:1.1; letter-spacing:-.055em; }
.name-index header button { color:#254d75; font-weight:600; }
.name-columns { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:clamp(12px,2vw,30px); }
.name-group { margin-top:19px; }
.name-group h3 { display:flex; align-items:center; gap:8px; color:#3d5f83; margin:0 0 6px; font-size:11px; font-weight:650; letter-spacing:.075em; text-transform:uppercase; }
.name-group h3::after { content:''; height:1px; flex:1; background:linear-gradient(90deg,var(--rule),transparent); }
.name-group:not(:has(h3)) { padding-top:21px; }
.name-group button { width:100%; justify-content:space-between; min-height:32px; line-height:1.3; padding:6px 8px; border-left:2px solid transparent; border-radius:0 6px 6px 0; }
.name-group button svg { flex:none; opacity:0; }
.name-group button[aria-pressed=true] { color:#183e76; border-left-color:#477bbf; background:linear-gradient(90deg,#e4effe,#f8fbff); }
.name-group button[aria-pressed=true] svg { opacity:1; }
.name-index {
 background:radial-gradient(circle,#9bb1cd22 .75px,transparent .9px) 1px 1px/12px 12px,#fff;
}
.websites .panes { grid-template-columns:minmax(0,2.65fr) minmax(248px,1fr); }
.websites .name-columns { grid-template-columns:repeat(4,minmax(0,1fr)); column-gap:clamp(10px,1.3vw,20px); }
.websites .name-group button { min-height:29px; padding:5px 4px; }
.spotlight {
 min-width:0; display:flex; border-inline-start:1px solid var(--rule);
 background:radial-gradient(circle,#94afc426 .8px,transparent 1px) 0 0/12px 12px,
 radial-gradient(ellipse at 98% 18%,#c7e3ff,transparent 62%),linear-gradient(160deg,#f0f6ff,#deedf9 58%,#f9fbff);
}
.preview-inner { display:flex; flex:1; flex-direction:column; min-width:0; }
.stage { display:grid; flex:1; align-items:stretch; min-width:0; min-height:194px; overflow:hidden; }
.illustration { display:grid; min-width:0; align-items:stretch; }
.illustration :deep(.product-preview) { width:100%; height:100%; min-height:200px; aspect-ratio:auto; border:0; border-radius:0; }
.mail-scene { display:grid; align-items:center; padding:clamp(14px,1.65vw,25px) 0 clamp(14px,1.65vw,25px) clamp(14px,1.65vw,25px); }
.mail-window { overflow:hidden; border:1px solid #fff; border-inline-end:0; border-radius:13px 0 0 13px; background:#fdfefe; box-shadow:0 10px 25px -13px #3159817a; }
.mail-bar { display:flex; align-items:center; gap:6px; padding:10px; background:#edf4fc; border-bottom:1px solid #dce7f2; color:#223c59; font-size:11px; font-weight:650; }
.mail-bar span { margin-left:auto; font-size:9px; font-weight:450; color:#495f77; }
.mail-body { display:flex; }
.mail-rail { display:grid; align-content:start; gap:18px; padding:15px 9px; background:#f3f7fb; color:#647d97; }
.mail-rail svg:first-child { color:#2862a5; }
.mail-list { min-width:0; flex:1; padding:9px 10px; }
.mail-list > strong { font-size:16px; font-weight:600; }
.mail-item { display:flex; align-items:center; gap:7px; padding:7px 0; border-top:1px solid #e6ecf2; }
.mail-item:first-of-type { margin-top:6px; }
.mail-item i { display:grid; place-items:center; flex:none; width:24px; height:24px; border-radius:50%; font-weight:600; font-size:9px; font-style:normal; background:#dce9f9; color:#234971; }
.mail-item:nth-of-type(2) i { background:#ede5f8; color:#614779; }
.mail-item:nth-of-type(3) i { background:#def0ea; color:#326753; }
.mail-item div { min-width:0; }
.mail-item b,.mail-item small { display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.mail-item b { font-size:11px; font-weight:600; }
.mail-item small,.mail-item time { font-size:10px; color:#5b6a7c; }
.mail-item time { margin-left:auto; align-self:flex-start; }
.phone-preview { align-self:center; justify-self:center; display:grid; justify-items:center; gap:6px; padding:22px; border:1px solid #fff; border-radius:18px; background:#ffffffbf; }
.phone-preview span { font-size:12px; }
.summary { padding:17px 20px 20px; background:linear-gradient(0deg,#f6faff 40%,#f6faffcb); }
.summary h3 { margin:0; font-size:22px; line-height:1.15; font-weight:550; letter-spacing:-.045em; }
.summary p { margin:8px 0 16px; font-size:13px; line-height:1.55; color:#536477; }
.summary :is(button,a) {
 display:inline-flex; padding:9px 14px; border:1px solid #333; border-radius:99px;
 background:linear-gradient(165deg,#242424,#080808); color:#fff; font-weight:600;
 box-shadow:inset 0 1px 0 #ffffff20,0 6px 14px -8px #0006;
}
@media(hover:hover) {
 .summary :is(button,a):hover { border-color:#666; }
}
footer { padding:12px 24px; border-top:1px solid var(--rule); background:#f8fafc; }
@media(prefers-reduced-motion:no-preference) {
 .catalog { animation:catalog-arrive .2s ease-out; }
 .illustration :deep(.product-preview) { animation:preview-arrive .22s ease-out; }
 @keyframes catalog-arrive { from { opacity:0; transform:translateY(-4px); } }
 @keyframes preview-arrive { from { opacity:.65; transform:translateY(3px); } }
}
@media(min-width:1051px) and (max-width:1199px) {
 .websites .name-columns { grid-template-columns:repeat(3,minmax(0,1fr)); }
}
@media(max-width:1050px) {
 .catalog { max-height:none; box-shadow:none; }
 .panes,.websites .panes { grid-template-columns:1fr; }
 .name-index { padding:16px; }
 .websites .name-columns { grid-template-columns:repeat(2,minmax(0,1fr)); }
 .name-group button,.websites .name-group button { min-height:36px; }
 .spotlight { border-inline-start:0; border-top:1px solid var(--rule); }
 .preview-inner { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); }
 .stage { grid-column:2; min-height:145px; }
 .summary { grid-column:1; grid-row:1; align-self:center; background:transparent; }
}
@media(max-width:600px) {
 .preview-inner { display:flex; }
 .stage { flex:none; min-height:0; }
 .illustration :deep(.product-preview) { height:185px; min-height:0; }
 .summary { align-self:stretch; }
}
</style>
