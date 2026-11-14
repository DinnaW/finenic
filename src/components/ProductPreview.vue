<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from 'motion-v'
import Globe from './inspira/Globe.vue'
import GlassBarBackdrop from './ui/GlassBarBackdrop.vue'
import AnimatedList from './inspira/AnimatedList.vue'
import AnimatedBeam from './inspira/AnimatedBeam.vue'
import { Globe2, Search, Check, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock, Mail, Bell, ShoppingBag, CreditCard, QrCode, Building2, MessageCircle, Server, ShieldCheck, RefreshCw, Link2, ArrowUpRight } from 'lucide-vue-next'

const props = defineProps({ item: Object, business: String, paused: Boolean })
const root = ref(null), visible = ref(false)
const reduced = useReducedMotion(), pageVisible = ref(true)
const animate = computed(() => visible.value && pageVisible.value && !reduced.value && !props.paused)
const phase = ref(0)
const demoPhase = computed(() => reduced.value ? 3 : phase.value)
let demoTimer
watch(animate, (running) => {
  clearInterval(demoTimer)
  if (running) demoTimer = setInterval(() => { phase.value = (phase.value + 1) % 4 }, 1800)
}, { immediate:true })
const branchHub = ref(null), branches = ref([])
const syncFrom = ref(null), syncTo = ref(null), syncContainer = ref(null)
const emailItems = [
  { title:'A new connection', copy:"Let's talk about your business.", icon:'N' },
  { title:'Your team', copy:'Everything in one conversation.', icon:'T' },
  { title:'Smardove', copy:'A more professional hello.', icon:'S' },
  { title:'Your next opportunity', copy:'A new enquiry, ready for you.', icon:'Y' },
]
const smsItems = computed(() => props.item.title === 'SMS reminders' ? [
  { title:'Appointment reminder', copy:'Your appointment is tomorrow at 10:30. See you soon!', icon:'bell' },
  { title:'Booking confirmed', copy:'Your next visit is all set. We look forward to seeing you.', icon:'check' },
  { title:'Time for your next visit?', copy:'Find a time that works for you. Book online anytime.', icon:'message' },
] : [
  { title:'A personal update', copy:'Thanks for choosing us. We look forward to seeing you!', icon:'message' },
  { title:'Enquiry received', copy:"We have your details. Our team will be in touch shortly.", icon:'check' },
  { title:'Stay in the loop', copy:'Your latest update, sent straight to your phone.', icon:'bell' },
])
const base = import.meta.env.BASE_URL
const website = computed(() => ({
  store: { image: 'store', title: 'Find your next favourite.', subtitle: 'Thoughtfully chosen. Yours to discover.', action: 'Shop the collection' },
  food: { image: 'food', title: 'Good food. Your way.', subtitle: 'Fresh from our kitchen to your table.', action: 'Order online' },
  hotel: { image: 'hotel', title: 'A little room to escape.', subtitle: 'Your next stay starts here.', action: 'Find your stay' },
  cars: { image: 'cars', title: 'Your next journey.', subtitle: 'Find a vehicle that feels like you.', action: 'Explore the showroom' },
  custom: { image: 'store', title: 'Your idea. Your space.', subtitle: 'A website made around your business.', action: 'Discover more' },
}[props.item.visual]))
let observer
function visibilityChanged() { pageVisible.value = !document.hidden }
onMounted(() => {
  visibilityChanged()
  document.addEventListener('visibilitychange', visibilityChanged)
  observer = new IntersectionObserver(([entry]) => { visible.value = entry.isIntersecting }, { threshold: .15 })
  observer.observe(root.value)
})
onUnmounted(() => { clearInterval(demoTimer); observer?.disconnect(); document.removeEventListener('visibilitychange', visibilityChanged) })
</script>

<template>
  <div ref="root" class="product-preview" :class="[`tone-${item.tone}`, `preview-${item.visual}`, `demo-phase-${demoPhase}`, { 'preview-awake': animate }]" :data-demo-phase="demoPhase" aria-hidden="true">
    <GlassBarBackdrop :variant="item.tone" />
    <div class="preview-brand">{{ item.brand }}<span v-if="item.id === 'domain'">Start here</span></div>

    <template v-if="item.visual === 'domain'">
      <Globe class="domain-live-globe" :active="animate" />
      <div class="ui-window domain-window">
        <div class="ui-window-bar"><i></i><i></i><i></i><span>Your next chapter</span></div>
        <div class="domain-query"><Search :size="15"/><span>yourbusiness<span class="typing-caret"></span></span><div><ArrowRight :size="14"/></div></div>
        <div class="domain-result-preview"><span>yourbusiness<strong>.com</strong></span><span class="domain-check"><Check v-if="demoPhase >= 2" :size="13"/><Search v-else :size="13"/>{{ demoPhase >= 2 ? 'Your name' : 'Searching' }}</span></div>
        <div class="domain-extensions"><span>.com</span><span>.lk</span><span>.store</span></div>
      </div>
    </template>

    <template v-else-if="item.visual === 'booking'">
      <div class="ui-window booking-window">
        <div class="ui-title"><span>Choose your moment</span><CalendarDays :size="16"/></div>
        <div class="calendar-month"><ChevronLeft :size="12"/><span>November</span><ChevronRight :size="12"/></div>
        <div class="calendar-week"><span v-for="(day, i) in ['M','T','W','T','F','S','S']" :key="i">{{day}}</span><span v-for="day in 14" :key="day" :class="{'selected-day': day === 12 && demoPhase >= 1}">{{day}}</span></div>
        <div class="booking-times"><span>10:00</span><span :class="{ 'chosen-time': demoPhase >= 2 }">10:30</span><span>11:00</span></div>
      </div>
      <div class="floating-note demo-confirm" :class="{ 'is-confirmed': demoPhase === 3 }"><span class="note-icon"><Check :size="15"/></span><div><strong>You're booked.</strong><small>Thursday, 10:30 am</small></div></div>
    </template>

    <template v-else-if="item.visual === 'app'">
      <div class="app-phone">
        <div class="phone-camera"></div><div class="phone-time">9:41</div>
        <img :src="`${base}images/business/salon.jpg`" alt="" loading="lazy">
        <div class="app-body"><small>{{ business }}</small><strong>A moment<br>for yourself.</strong><div class="app-choice"><span>Cut & styling</span><ArrowUpRight :size="12"/></div><div class="app-choice"><span>Your appointments</span><CalendarDays :size="12"/></div><div class="app-book">{{ demoPhase >= 2 ? 'Appointment booked' : 'Book again' }} <Check v-if="demoPhase >= 2" :size="12"/><ArrowRight v-else :size="12"/></div></div>
      </div>
      <div class="app-badge demo-confirm" :class="{ 'is-confirmed': demoPhase >= 2 }"><CalendarDays :size="18"/><span>Your next visit,<br>one tap away.</span></div>
    </template>

    <template v-else-if="website">
      <div class="ui-window website-window">
        <div class="ui-window-bar"><i></i><i></i><i></i><span>{{ item.visual === 'custom' ? 'yourbusiness.com' : business.toLowerCase().replaceAll(' ', '') + '.com' }}</span></div>
        <div class="site-preview-nav"><strong>{{ business }}</strong><span>About <span>Contact</span></span></div>
        <div class="site-photo"><img :src="`${base}images/business/${website.image}.jpg`" alt="" loading="lazy"><div class="site-photo-shade"></div><div class="site-preview-copy"><strong>{{ website.title }}</strong><small>{{ website.subtitle }}</small><span>{{ website.action }} <ArrowRight :size="10"/></span></div></div>
        <div v-if="item.visual === 'hotel'" class="site-footer"><span>Check in <strong>12 Nov</strong></span><span>Check out <strong>15 Nov</strong></span><span class="mini-dark">Find a room</span></div>
        <div v-else class="site-footer"><span>{{ item.visual === 'cars' ? 'Find your fit' : 'Made for you' }}</span><span>Explore <ArrowRight :size="11"/></span></div>
      </div>
      <div class="website-note demo-confirm" :class="{ 'is-confirmed': demoPhase === 3 }"><Check :size="13"/> {{ item.visual === 'food' ? 'Order received' : item.visual === 'hotel' ? 'Direct booking' : item.visual === 'cars' ? 'Enquiry received' : 'Your business, online' }}</div>
    </template>

    <template v-else-if="item.visual === 'sms'">
      <div class="sms-live-stack">
        <div class="activity-caption"><MessageCircle :size="15"/> {{ business }}</div>
        <AnimatedList :items="smsItems" :active="animate" :delay="3500">
          <template #default="{ item: message }"><div class="live-notification"><div class="notification-top"><span class="notification-symbol"><Bell v-if="message.icon === 'bell'" :size="15"/><Check v-else-if="message.icon === 'check'" :size="15"/><MessageCircle v-else :size="15"/></span><strong>{{ message.title }}</strong><small>now</small></div><p>{{ message.copy }}</p><span class="notification-delivery"><Check :size="10"/> Delivered with Ipsova</span></div></template>
        </AnimatedList>
      </div>
    </template>

    <template v-else-if="item.visual === 'email'">
      <div class="ui-window email-window"><div class="ui-title"><span><Mail :size="15"/> Inbox</span><span class="tiny-avatar">Y</span></div><div class="email-address">you@yourbusiness.com</div><AnimatedList :items="emailItems" :active="animate" :delay="3800"><template #default="{ item: mail }"><div class="mail-row"><span class="mail-avatar">{{ mail.icon }}</span><div><strong>{{ mail.title }}</strong><small>{{ mail.copy }}</small></div><span class="mail-dot"></span></div></template></AnimatedList><div class="mail-footer"><ShieldCheck :size="13"/> Your business. Your address.</div></div>
    </template>

    <template v-else-if="item.visual === 'pos'">
      <div class="ui-window pos-window"><div class="ui-title"><span>{{ item.id === 'restaurant-pos' ? 'Counter & kitchen' : 'Point of sale' }}</span><CreditCard :size="16"/></div><div class="pos-line"><span class="pos-item-icon"><ShoppingBag :size="19"/></span><div><strong>{{ item.id === 'restaurant-pos' ? 'Table order' : 'In-store purchase' }}</strong><small>2 items</small></div><span>{{ demoPhase >= 2 ? 'Paid' : 'Ready' }}</span></div><div class="pos-rule"></div><div ref="syncContainer" class="pos-sync-diagram"><AnimatedBeam :container="syncContainer" :from="syncFrom" :to="syncTo" :active="animate" :duration="3"/><span ref="syncFrom" class="sync-node"><ShoppingBag :size="23"/></span><small>{{ item.id === 'restaurant-pos' ? 'Kitchen connected' : 'Stock in sync' }}</small><span ref="syncTo" class="sync-node"><RefreshCw :size="23" class="sync-mark"/></span></div><div class="pos-pay"><Check :size="15"/> {{ demoPhase >= 2 ? 'Sale completed' : 'Processing sale' }}</div></div><div class="floating-note pos-note demo-confirm" :class="{ 'is-confirmed': demoPhase === 3 }"><Check :size="15"/><strong>{{ item.id === 'restaurant-pos' ? 'Sent to the kitchen' : 'Inventory updated' }}</strong></div>
    </template>

    <template v-else-if="item.visual === 'qr'">
      <div class="qr-stand"><div class="qr-scan-line"></div><small>Welcome to your table</small><QrCode :size="88" :stroke-width="1.2"/><strong>Scan. Order. Enjoy.</strong><span>Table 04</span></div><div class="floating-note qr-note demo-confirm" :class="{ 'is-confirmed': demoPhase >= 2 }"><Check :size="15"/><div><strong>Your order is in.</strong><small>Straight to the kitchen.</small></div></div>
    </template>

    <template v-else-if="item.visual === 'channels'">
      <div class="ui-window channels-window"><div class="ui-title"><span>One view. Every room.</span><RefreshCw :size="15" class="sync-mark"/></div><div class="channel-head"><span>Channel</span><span>Rooms & rates</span></div><div v-for="channel in ['Your website','Booking channels','Front desk']" :key="channel" class="channel-row"><span><Building2 :size="14"/>{{channel}}</span><small><Check :size="12"/>{{ demoPhase > 0 ? 'In sync' : 'Syncing' }}</small></div><div class="channel-footer">Connected with SaaSBeds</div></div>
    </template>

    <template v-else-if="item.visual === 'chat' || item.visual === 'whatsapp'">
      <div class="ui-window chat-window"><div class="ui-title"><span><MessageCircle :size="16"/>{{ item.visual === 'chat' ? 'Your front desk' : 'Customer conversations' }}</span><span class="online-dot"></span></div><div class="chat-question">{{ item.visual === 'chat' ? 'How can I book a stay?' : 'Hi! Can you tell me more?' }}</div><div class="chat-answer" :class="{ 'answer-ready': demoPhase >= 2 }"><span v-if="demoPhase < 2" class="demo-typing"><i></i><i></i><i></i></span><span v-else>{{ item.visual === 'chat' ? 'Of course. Choose your dates to explore rooms and book directly.' : 'Absolutely. Let us help you find the right fit for your business.' }}</span></div><div class="chat-input">Write a message <ArrowRight :size="14"/></div></div>
    </template>

    <template v-else-if="item.visual === 'crm' || item.visual === 'leads'">
      <div class="ui-window crm-window"><div class="ui-title"><span>{{ item.visual === 'leads' ? 'Every lead, a next step.' : 'Your relationships, together.' }}</span><Link2 :size="15"/></div>
        <div class="demo-pipeline"><div class="demo-pipeline-head"><span>New enquiry</span><span>In conversation</span></div>
          <div class="demo-pipeline-lanes"><div></div><div></div></div>
          <div class="demo-lead" :class="{ 'demo-lead-progressed': demoPhase >= 2 }"><span class="lead-source">Website enquiry</span><strong>{{ business }}</strong><span><Check v-if="demoPhase >= 2" :size="12"/><MessageCircle v-else :size="12"/>{{ demoPhase >= 2 ? 'Follow-up sent' : 'New message' }}</span></div>
        </div><div class="crm-footer"><span></span>{{ demoPhase >= 2 ? 'Conversation started. Next step ready.' : 'A new enquiry, ready for your team.' }}</div></div>
    </template>

    <template v-else-if="item.visual === 'branches'">
      <AnimatedBeam v-for="(branch,index) in branches" :key="index" :container="root" :from="branchHub" :to="branch" :active="animate" :duration="3.5" :delay="index*.4" />
      <div ref="branchHub" class="branch-hub"><Building2 :size="34"/><strong>One account</strong></div><div class="branch-locations"><div v-for="(place,index) in ['Main showroom','City branch','Coast branch']" :ref="el => branches[index] = el" :key="place"><Building2 :size="22"/><span>{{place}}</span><small><Check :size="10"/> Connected</small></div></div>
    </template>

    <template v-else-if="item.visual === 'hosting'">
      <div class="ui-window hosting-window"><div class="ui-title"><span><Server :size="17"/> A home for your website</span></div><div v-for="(row, i) in [['Hosting','Connected'],['Updates','Managed'],['Support','Here to help']]" :key="row[0]" class="hosting-row"><span>{{row[0]}}</span><small><Check :size="12"/>{{row[1]}}</small></div><div class="hosting-activity"><div><span>Response activity</span><small>Demo</small></div><svg viewBox="0 0 240 58" fill="none"><path d="M0 46H240 M0 24H240" stroke="#dce5ef" stroke-width="1"/><path d="M0 42L18 40L36 43L54 28L72 33L90 30L108 36L126 18L144 24L162 21L180 29L198 16L216 22L240 12" stroke="#2876d5" stroke-width="2" stroke-linecap="round"/><circle :cx="[54,108,162,216][demoPhase]" :cy="[28,36,21,22][demoPhase]" r="4" fill="#2876d5" stroke="white" stroke-width="2"/></svg></div><div class="hosting-footer"><ShieldCheck :size="18"/><span>You run your business.<br>We'll handle the upkeep.</span></div></div>
    </template>
  </div>
</template>

<style scoped>
.product-preview { position:relative; isolation:isolate; aspect-ratio:.94; overflow:hidden; border-radius:12px; container-type:inline-size; color:#28302f; font-size:clamp(10px,3cqw,13px); background:#eef5fc; }
.preview-brand { position:absolute; left:6%; top:5%; right:6%; display:flex; align-items:center; justify-content:space-between; z-index:2; font-size:3.8cqw; font-weight:600; letter-spacing:-.02em; color:#172135; }
.preview-brand>span { font-size:3cqw; font-weight:500; padding:1cqw 2cqw; border-radius:30px; background:#ffffff80; color:#172135; border:1px solid #ffffff30; }
.ui-window { position:absolute; background:#fbfbf8; border-radius:10px; box-shadow:0 4cqw 7cqw -3cqw #3d3d3d4d; overflow:hidden; font-size:3cqw; }
.ui-window-bar { display:flex; gap:1cqw; align-items:center; height:7cqw; padding:0 3.5cqw; border-bottom:1px solid #e6e7e4; color:#787878; font-size:2.1cqw; }
.ui-window-bar i { width:1cqw; height:1cqw; border-radius:50%; background:#ccd0cd; }
.ui-window-bar>span { flex:1; text-align:center; padding-right:4cqw; }
.ui-title { display:flex; align-items:center; justify-content:space-between; gap:2cqw; font-weight:600; font-size:3.1cqw; }
.ui-title>span { display:flex; gap:2cqw; align-items:center; }
.floating-note { position:absolute; display:flex; align-items:center; gap:2.6cqw; background:#fff; padding:3cqw 4cqw; border-radius:9px; box-shadow:0 3cqw 6cqw -2cqw #40404033; font-size:3cqw; }
.floating-note strong { display:block; font-weight:600; font-size:2.9cqw; }
.floating-note small { display:block; font-size:2.5cqw; color:#68716d; margin-top:.8cqw; }
.note-icon { display:grid; place-items:center; width:7cqw; height:7cqw; background:#e7efea; color:#43705b; border-radius:50%; }
.domain-orbit { position:absolute; top:15%; left:0; right:0; display:grid; place-items:center; color:#ffffffd9; }
.domain-orbit svg { width:21cqw; height:21cqw; }
.domain-window { left:7%; right:7%; top:43%; }
.domain-query { display:flex; align-items:center; gap:2.5cqw; margin:4cqw; padding:2cqw; background:#f0f1ef; border-radius:6px; font-size:3.5cqw; }
.domain-query>span { flex:1; }.domain-query>div { display:grid; place-items:center; width:6cqw; height:6cqw; border-radius:4px; background:#3d3d3d; color:#fff; }
.typing-caret { display:inline-block; height:3.7cqw; width:1px; background:#676767; margin-left:.4cqw; vertical-align:middle; animation:caret 2s steps(1) infinite; }
.domain-result-preview { display:flex; align-items:center; justify-content:space-between; margin:0 4cqw 3cqw; font-size:2.8cqw; }.domain-result-preview strong{font-weight:600}.domain-check { display:flex; align-items:center; gap:1cqw; font-size:2.3cqw; color:#4c7561; }
.domain-extensions { display:flex; gap:2cqw; padding:0 4cqw 4cqw; }.domain-extensions span { background:#eeefec; border-radius:30px; padding:1cqw 2.4cqw; font-size:2.5cqw; }
.booking-window { left:4%; right:4%; top:17%; padding:5cqw; }
.calendar-month { display:flex; justify-content:space-between; margin:5cqw 0 3cqw; font-size:3cqw; }
.calendar-week { display:grid; grid-template-columns:repeat(7,1fr); gap:1.4cqw; text-align:center; align-items:center; }
.calendar-week span { display:grid; place-items:center; aspect-ratio:1; font-size:2.8cqw; }.calendar-week span:nth-child(-n+7) { color:#7a827e; font-size:2.4cqw; }.calendar-week .selected-day { color:#fff; background:#536c5e; border-radius:50%; }
.booking-times { display:flex; justify-content:space-between; gap:2cqw; margin-top:4cqw; }.booking-times span { border:1px solid #e3e6e0; border-radius:5px; padding:1.5cqw 2.4cqw; font-size:2.5cqw; }.booking-times .chosen-time { background:#e7eee7; border-color:#a7b9aa; }
.preview-booking .floating-note { bottom:9%; right:6%; }
.app-phone { position:absolute; left:15%; top:14%; width:70%; height:100%; padding:1.5cqw; border-radius:8cqw; background:#fbfaf6; box-shadow:0 4cqw 8cqw -3cqw #4e493d66; transform:rotate(-5deg); overflow:hidden; }
.phone-camera { position:absolute; top:2.7cqw; left:36%; width:28%; height:3.7cqw; border-radius:20px; background:#262626; z-index:2; }.phone-time { position:relative; margin:2cqw 3cqw 3cqw; font-size:2cqw; font-weight:700; }
.app-phone img { width:100%; height:34cqw; object-fit:cover; border-radius:5cqw 5cqw 1cqw 1cqw; }.app-body { padding:3cqw; }.app-body>small { font-size:2cqw; color:#777d74; }.app-body>strong { display:block; font-size:7cqw; line-height:1.15; letter-spacing:-.04em; margin:2cqw 0 3cqw; font-weight:500; }.app-choice { display:flex; justify-content:space-between; padding:2cqw 0; border-top:1px solid #e4e5de; font-size:2.3cqw; }.app-book { display:flex; justify-content:space-between; background:#171717; color:#fff; padding:2cqw; border-radius:5px; margin-top:2cqw; font-size:2.3cqw; }.app-badge { position:absolute; right:5%; top:35%; display:flex; align-items:center; gap:2cqw; padding:3cqw; border-radius:8px; background:#fffffff2; box-shadow:0 2cqw 4cqw #4b493c18; font-size:2.7cqw; }
.website-window { left:3%; right:3%; top:17%; }.site-preview-nav { display:flex; align-items:center; justify-content:space-between; padding:3cqw 4cqw; font-size:2.1cqw; }.site-preview-nav strong { font-size:2.6cqw; }.site-preview-nav>span>span{margin-left:2cqw}.site-photo { position:relative; height:53cqw; }.site-photo img { height:100%; width:100%; object-fit:cover; }.site-photo-shade { position:absolute; inset:0; background:linear-gradient(90deg,#17171799,transparent); }.site-preview-copy { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; align-items:start; padding:5cqw; color:white; }.site-preview-copy>strong { max-width:13ch; font-size:6cqw; line-height:1.08; letter-spacing:-.035em; font-weight:500; }.site-preview-copy>small { font-size:2cqw; margin:2cqw 0 3cqw; max-width:26ch; }.site-preview-copy>span { display:flex; gap:2cqw; align-items:center; padding:1.6cqw 2cqw; border-radius:3px; background:white; color:#273128; font-size:2cqw; }.site-footer { display:flex; justify-content:space-between; align-items:center; padding:3cqw 4cqw; gap:2cqw; font-size:2.2cqw; }.site-footer>span { display:flex; gap:1cqw; align-items:center; }.site-footer strong{font-size:2.2cqw}.mini-dark { background:#171717; padding:1.5cqw; color:#fff; border-radius:3px; }.website-note { position:absolute; right:7%; bottom:7%; display:flex; align-items:center; gap:1.5cqw; background:#fbfcf9; padding:2.2cqw 3cqw; border-radius:30px; box-shadow:0 2cqw 5cqw #3939391a; font-size:2.5cqw; color:#416050; }
.message-device { position:absolute; top:25%; left:11%; right:11%; padding:5cqw; border-radius:14px; background:#f8f7f4; box-shadow:0 4cqw 7cqw -3cqw #54434355; }.device-top { display:flex; gap:2.5cqw; align-items:center; font-size:3cqw; font-weight:600; margin-bottom:4cqw; }.sms-bubble { background:#e9ece7; padding:4cqw; border-radius:2px 10px 10px; }.sms-bubble small { font-size:2.4cqw; font-weight:600; }.sms-bubble p { font-size:3cqw; line-height:1.55; margin:2cqw 0; }.sms-bubble>span { font-size:2cqw; color:#6d756b; }.message-delivered { display:flex; align-items:center; justify-content:end; gap:.5cqw; font-size:2.3cqw; margin-top:3cqw; color:#54745d; }.message-delivered svg+svg { margin-left:-2cqw; }.sms-note { bottom:7%; left:6%; }
.email-window { top:21%; left:8%; right:8%; padding:4cqw; }.tiny-avatar { width:5.5cqw; height:5.5cqw; display:grid!important; place-items:center; border-radius:50%; background:#e9e9e9; font-size:2.4cqw; }.email-address { font-size:2.5cqw; color:#757575; margin:1.5cqw 0 4cqw; }.mail-row { display:flex; align-items:center; gap:2.5cqw; padding:3cqw 0; border-top:1px solid #e7e9e8; }.mail-avatar { display:grid; place-items:center; flex-shrink:0; width:7cqw; height:7cqw; border-radius:50%; background:#e5e5e5; font-size:2.7cqw; color:#595959; }.mail-avatar.pale { background:#ecece7; color:#71766e; }.mail-row strong { display:block; font-size:2.7cqw; font-weight:600; }.mail-row small { display:block; font-size:2.2cqw; color:#727974; margin-top:1cqw; }.mail-dot { width:1.3cqw; height:1.3cqw; border-radius:50%; background:#818181; margin-left:auto; }.mail-footer { display:flex; align-items:center; gap:1.5cqw; font-size:2.2cqw; padding-top:3cqw; color:#6a766f; }
.pos-window { top:16%; left:4%; right:4%; padding:5cqw; }.pos-line { display:flex; gap:3cqw; align-items:center; margin:5cqw 0; }.pos-item-icon { display:grid; place-items:center; width:12cqw; height:12cqw; background:#ece8dc; border-radius:7px; }.pos-line strong { display:block; font-size:3cqw; }.pos-line small { display:block; font-size:2.5cqw; margin-top:1cqw; color:#7a7a6d; }.pos-line>span:last-child { margin-left:auto; font-size:2.4cqw; }.pos-rule{height:1px;background:#e2e3dc}.pos-sync { display:flex; align-items:center; gap:2cqw; padding:4cqw 0; font-size:2.5cqw; }.pos-pay { display:flex; align-items:center; justify-content:center; gap:2cqw; background:#171717; color:white; padding:3cqw; border-radius:6px; font-size:2.8cqw; }.pos-note { bottom:8%; right:6%; color:#3f6851; }
.qr-stand { position:absolute; left:15%; top:15%; width:70%; padding:7cqw 3cqw; display:flex; flex-direction:column; align-items:center; gap:4cqw; background:#f8f6ee; border-radius:9px; box-shadow:0 5cqw 8cqw -3cqw #283b3555; transform:rotate(-5deg); }.qr-stand>small { font-size:2.2cqw; }.qr-stand>svg { width:36cqw; height:36cqw; }.qr-stand>strong { font-size:3.1cqw; }.qr-stand>span { font-size:2.5cqw; color:#71776c; }.qr-note { bottom:7%; right:5%; }
.channels-window { top:18%; left:4%; right:4%; padding:5cqw; }.channel-head { display:flex; justify-content:space-between; margin-top:5cqw; color:#7a827c; font-size:2.2cqw; padding-bottom:2cqw; }.channel-row { display:flex; align-items:center; justify-content:space-between; border-top:1px solid #e3e6df; padding:3.5cqw 0; }.channel-row>span { display:flex; gap:2cqw; align-items:center; font-size:2.5cqw; }.channel-row small { display:flex; gap:1cqw; align-items:center; color:#4b745d; font-size:2.3cqw; }.channel-footer { padding-top:2cqw; font-size:2.3cqw; color:#7a827c; }
.chat-window { top:18%; left:4%; right:4%; padding:4cqw; }.online-dot { width:1.5cqw; height:1.5cqw; background:#5f8f74; border-radius:50%; }.chat-question { margin:6cqw 0 3cqw 13%; background:#e7ebe8; font-size:3cqw; line-height:1.5; padding:3cqw; border-radius:9px 2px 9px 9px; }.chat-answer { margin-right:8%; background:#ecf0e9; font-size:3cqw; line-height:1.5; padding:3cqw; border-radius:2px 9px 9px 9px; animation:reply 8s ease infinite; }.chat-input { display:flex; justify-content:space-between; align-items:center; color:#8b908b; margin-top:5cqw; padding:2.5cqw; border:1px solid #e2e6df; border-radius:5px; font-size:2.5cqw; }
.crm-window { top:18%; left:3%; right:3%; padding:4cqw; }.pipeline { display:grid; grid-template-columns:1fr 1fr; gap:3cqw; margin-top:5cqw; }.pipeline>div { min-width:0; padding:2cqw; border-radius:5px; background:#eef0eb; }.pipeline>div>small { display:block; font-size:2.2cqw; margin-bottom:3cqw; color:#707b71; }.pipeline-lead { padding:3cqw 2cqw; border-radius:5px; background:#fff; box-shadow:0 1cqw 2cqw #323e3b0a; }.lead-source { font-size:2cqw; color:#778278; }.pipeline-lead>strong { display:block; font-size:2.7cqw; margin:2cqw 0 4cqw; line-height:1.3; }.pipeline-lead>span:last-child { display:flex; align-items:center; gap:1cqw; font-size:1.9cqw; color:#667466; }.crm-footer { margin-top:4cqw; display:flex; align-items:center; gap:1.5cqw; font-size:2.2cqw; color:#737f73; }.crm-footer span { width:1.2cqw; height:1.2cqw; border-radius:50%; background:#86a18a; }
.branch-hub { position:absolute; top:24%; left:31%; right:31%; padding:5cqw 1cqw; display:flex; flex-direction:column; align-items:center; gap:3cqw; background:#f8f7f1; border-radius:9px; box-shadow:0 3cqw 6cqw #4a453326; }.branch-hub strong{font-size:3cqw}.branch-connectors { position:absolute; top:51%; left:18%; width:64%; height:14%; border-top:1px solid #6d756d80; border-left:1px solid #6d756d80; border-right:1px solid #6d756d80; }.branch-connectors::before { content:''; position:absolute; top:-5cqw; left:50%; width:1px; height:18cqw; background:#6d756d80; }.branch-locations { position:absolute; bottom:13%; left:6%; right:6%; display:flex; gap:3cqw; }.branch-locations>div { flex:1; display:flex; flex-direction:column; align-items:center; gap:2cqw; padding:3cqw 1cqw; border-radius:7px; background:#faf9f2; box-shadow:0 3cqw 5cqw #3f443b15; }.branch-locations span{font-size:2.3cqw}.branch-locations small { display:flex; align-items:center; gap:.5cqw; font-size:1.9cqw; color:#63806a; }
.hosting-window { top:16%; left:4%; right:4%; padding:5cqw; }.hosting-row { display:flex; align-items:center; justify-content:space-between; padding:4cqw 0; border-bottom:1px solid #e5e5dd; font-size:3cqw; }.hosting-row:first-of-type { margin-top:4cqw; }.hosting-row small { display:flex; gap:1cqw; align-items:center; color:#56735a; font-size:2.5cqw; }.hosting-footer { display:flex; align-items:center; gap:3cqw; margin-top:4cqw; color:#6e776b; font-size:2.4cqw; line-height:1.6; }
.ui-confirm { animation:confirm 8s cubic-bezier(.2,.7,.2,1) infinite; }.mail-new { animation:mail-arrival 9s ease infinite; }.sync-mark { animation:sync 9s ease infinite; }.moving-lead { animation:lead 9s ease infinite; }
.product-preview :is(.ui-confirm,.typing-caret,.chat-answer,.mail-new,.sync-mark,.moving-lead) { animation-play-state:paused; }
.preview-awake :is(.ui-confirm,.typing-caret,.chat-answer,.mail-new,.sync-mark,.moving-lead) { animation-play-state:running; }
@keyframes confirm { 0%,9%{opacity:0;translate:0 7px} 22%,85%{opacity:1;translate:0 0} 97%,100%{opacity:0;translate:0 -3px} }
@keyframes caret { 0%,55%{opacity:1} 56%,100%{opacity:0} }
@keyframes reply { 0%,12%{opacity:.15;translate:0 5px} 28%,100%{opacity:1;translate:0 0} }
@keyframes mail-arrival { 0%,8%{opacity:.3;translate:0 -6px} 20%,100%{opacity:1;translate:0 0} }
@keyframes sync { 0%,65%{rotate:0deg} 85%,100%{rotate:360deg} }
@keyframes lead { 0%,12%{translate:0 5px;opacity:.4} 28%,100%{translate:0 0;opacity:1} }
@media(prefers-reduced-motion:reduce) { .product-preview * { animation:none!important; } }

/* Large product scenes fill the preview, with deliberate edge cropping. */
.domain-live-globe { width:108%; left:-4%; top:0; }
.domain-window { left:4%; right:4%; top:auto; bottom:6%; }
.domain-query { font-size:4cqw; }
.domain-result-preview { font-size:3.4cqw; }
.domain-extensions span { font-size:3cqw; }
.preview-brand { z-index:3; }
.booking-window { padding:6cqw; }
.calendar-week span { font-size:3.3cqw; }
.calendar-month { margin-block:6cqw 4cqw; font-size:3.8cqw; }
.booking-times span { font-size:3cqw; padding:2cqw 3cqw; }
.preview-booking .floating-note { bottom:6%; right:3%; padding:4cqw; }
.floating-note strong { font-size:3.5cqw; }.floating-note small { font-size:3cqw; }
.app-body { padding:4cqw; }.app-body>small { font-size:3cqw; }
.app-choice,.app-book { font-size:3.2cqw; padding-block:3cqw; }
.app-badge { top:auto; bottom:14%; right:3%; font-size:3.5cqw; }
.sms-live-stack { position:absolute; left:4%; right:4%; top:17%; }
.activity-caption { color:#172135; display:flex; align-items:center; gap:2cqw; font-size:3.5cqw; font-weight:600; margin:0 2cqw 4cqw; }
.live-notification { background:#faf9f5; padding:5cqw; border-radius:12px; box-shadow:0 3cqw 6cqw -3cqw #49362e44; }
.notification-top { display:flex; align-items:center; gap:2cqw; }
.notification-symbol { display:grid; place-items:center; width:7cqw; height:7cqw; border-radius:50%; background:#e6e8de; color:#58624b; }
.notification-top strong { font-size:3.4cqw; font-weight:600; }.notification-top small { font-size:2.6cqw; color:#767067; margin-left:auto; }
.live-notification p { font-size:3.7cqw; line-height:1.5; margin:3cqw 0; }
.notification-delivery { display:flex; align-items:center; gap:1cqw; font-size:2.7cqw; color:#626c56; }
.email-window { left:3%; right:3%; top:17%; padding:6cqw; }
.email-window .ui-title { font-size:4.2cqw; }.email-address { font-size:3.3cqw; margin-bottom:5cqw; }
.mail-row { padding:4cqw 0; }.mail-row strong { font-size:3.5cqw; }.mail-row small { font-size:2.9cqw; }
.mail-avatar { width:9cqw; height:9cqw; font-size:3.5cqw; }.mail-footer { font-size:2.7cqw; }
.pos-sync-diagram { position:relative; display:flex; align-items:center; justify-content:space-between; height:25cqw; }
.sync-node { z-index:1; display:grid; place-items:center; width:15cqw; height:15cqw; border-radius:12px; background:#eeece5; }
.pos-sync-diagram>small { z-index:1; font-size:2.7cqw; background:#fbfbf8; padding:1cqw; }
.pos-line { margin-block:7cqw; }.pos-line strong { font-size:3.7cqw; }.pos-pay { padding:4cqw; font-size:3.5cqw; }
.pos-note { bottom:6%; right:3%; }
.branch-hub { top:19%; left:27%; right:27%; padding-block:8cqw; }
.branch-hub strong { font-size:4cqw; }.branch-locations { bottom:12%; left:3%; right:3%; gap:2cqw; }.branch-locations>div { padding:5cqw 1cqw; }.branch-locations span { font-size:2.8cqw; }.branch-locations small { font-size:2.2cqw; }
.channels-window .ui-title,.hosting-window .ui-title { font-size:3.8cqw; }.channel-row { padding-block:5cqw; }.channel-row>span { font-size:3.2cqw; }.channel-row small { font-size:2.8cqw; }
.chat-window .ui-title { font-size:3.7cqw; }.chat-question,.chat-answer { font-size:4cqw; padding:4cqw; }.chat-input { font-size:3cqw; }
.crm-window .ui-title { font-size:3.7cqw; }.pipeline { margin-top:7cqw; }.pipeline-lead { padding-block:6cqw; }.pipeline-lead>strong { font-size:3.7cqw; }.pipeline-lead>span:last-child { font-size:2.5cqw; }.lead-source { font-size:2.5cqw; }.crm-footer { font-size:2.7cqw; margin-top:7cqw; }

/* Product demonstration sequences share one clock and pause outside the viewport. */
.demo-confirm { opacity:0; transform:translateY(8px) scale(.97); transition:opacity 250ms var(--hero-ease-out),transform 250ms var(--hero-ease-out); }
.demo-confirm.is-confirmed { opacity:1; transform:translateY(0) scale(1); }
.calendar-week span,.booking-times span { transition:background-color 200ms ease,color 200ms ease; }
.demo-pipeline { position:relative; margin-top:7cqw; height:49cqw; }
.demo-pipeline-head { display:grid; grid-template-columns:1fr 1fr; gap:3cqw; font-size:3cqw; padding-bottom:3cqw; color:#596674; }
.demo-pipeline-lanes { position:absolute; inset:7cqw 0 0; display:grid; grid-template-columns:1fr 1fr; gap:3cqw; }
.demo-pipeline-lanes>div { border-radius:7px; background:#eaf0f7; border:1px solid #dce5ef; }
.demo-lead { position:absolute; top:11cqw; left:2%; width:44%; padding:4cqw 2.5cqw; border-radius:7px; background:#fff; box-shadow:0 2cqw 5cqw #17213512; transition:transform 500ms var(--hero-ease-out); }
.demo-lead-progressed { transform:translateX(118%); }
.demo-lead strong { display:block; margin:3cqw 0; font-size:3.7cqw; line-height:1.35; }
.demo-lead>span:last-child { display:flex; align-items:center; gap:1cqw; font-size:2.5cqw; color:#45644f; }
.qr-scan-line { position:absolute; top:23%; left:14%; right:14%; height:2px; background:#3987ec; box-shadow:0 0 12px #3987ecaa; animation:qr-scan 7.2s var(--hero-ease-out) infinite; animation-play-state:paused; }
.preview-awake .qr-scan-line { animation-play-state:running; }
@keyframes qr-scan { 0%,10% { opacity:0; transform:translateY(0); } 20% { opacity:1; } 55% { opacity:1; transform:translateY(30cqw); } 65%,100% { opacity:0; transform:translateY(30cqw); } }
@media(prefers-reduced-motion:reduce) { .demo-confirm,.demo-lead,.calendar-week span,.booking-times span { transition:none; }.qr-scan-line { display:none; } }
.hosting-activity { margin-top:4cqw; }.hosting-activity>div { display:flex; justify-content:space-between; font-size:2.7cqw; color:#526078; }.hosting-activity small { font-size:2.4cqw; }.hosting-activity svg { width:100%; height:auto; margin-top:2cqw; }
.chat-answer { animation:none; min-height:26cqw; display:flex; align-items:center; }.demo-typing { display:flex; align-items:center; gap:1.4cqw; }.demo-typing i { width:1.5cqw; height:1.5cqw; border-radius:50%; background:#687d92; animation:demo-type 1.2s ease infinite; animation-play-state:paused; }.demo-typing i:nth-child(2) { animation-delay:120ms; }.demo-typing i:nth-child(3) { animation-delay:200ms; }.preview-awake .demo-typing i { animation-play-state:running; }@keyframes demo-type { 0%,80%,100% { opacity:.4; transform:translateY(0); } 40% { opacity:1; transform:translateY(-2px); } }
</style>
