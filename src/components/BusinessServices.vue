<script setup>
import { ref } from 'vue'
import { ArrowUpRight, ArrowRight, Check, CalendarDays, ShoppingBag, MessageCircle } from 'lucide-vue-next'
import SpecularButton from './specular/SpecularButton.vue'
const base = import.meta.env.BASE_URL
const notice = ref('')
const destinations = { start:import.meta.env.VITE_SIGNUP_URL, plans:import.meta.env.VITE_PLANS_URL }
function act(type) {
 if(destinations[type]) window.location.assign(destinations[type])
 else notice.value=type==='start'?'Free signup is coming soon.':'Plans and pricing are coming soon.'
}
</script>

<template>
 <section id="business-services" class="business-services" aria-labelledby="services-heading">
  <div class="services-inner">
   <header class="services-header">
    <div><p class="services-category">Website + business app</p><h2 id="services-heading">A website that<br>means business.</h2></div>
    <div class="services-intro"><p>Turn a visit into a booking, a sale or a conversation. Build a website with the business tools to take it from there.</p><div class="services-actions"><SpecularButton @click="act('start')">Start for free <ArrowUpRight :size="17" aria-hidden="true"/></SpecularButton><button class="services-plans" @click="act('plans')">See plans <ArrowUpRight :size="16" aria-hidden="true"/></button></div><p v-if="notice" class="services-notice" role="status">{{ notice }}</p></div>
   </header>
   <div class="business-stories">
    <article class="business-story booking-story">
     <div class="story-scene booking-scene">
      <img :src="`${base}images/business/salon.jpg`" alt="A stylist working with a client in a salon" width="800" height="900" loading="lazy">
      <div class="scene-shade" aria-hidden="true"></div>
      <span class="scene-label">Your time, well booked.</span>
      <div class="booking-preview" aria-hidden="true">
       <div class="preview-heading"><span class="preview-icon"><CalendarDays :size="19" stroke-width="1.5"/></span><span>Your next visit</span><span class="preview-tag">Online booking</span></div>
       <div class="booking-service"><strong>Cut & styling</strong><span>45 minutes</span></div>
       <div class="booking-week"><span>Mon<b>09</b></span><span>Tue<b>10</b></span><span>Wed<b>11</b></span><span class="chosen">Thu<b>12</b></span><span>Fri<b>13</b></span></div>
       <div class="booking-confirmation"><Check :size="15"/><span>Thursday, 12 November at 10:30</span></div>
      </div>
     </div>
     <div class="story-copy"><h3>Let your calendar fill itself.</h3><p>Appointments and stays, booked directly from your website. Give customers a simple way to find their next visit.</p><span class="story-use">Salons & spas <span>/</span> Hotels</span></div>
    </article>
    <article class="business-story commerce-story">
     <div class="story-scene commerce-scene">
      <img :src="`${base}images/business/store.jpg`" alt="Clothing displayed in an independent shop" width="800" height="900" loading="lazy">
      <div class="scene-shade" aria-hidden="true"></div>
      <span class="scene-label">Your shop, everywhere.</span>
      <div class="order-preview" aria-hidden="true"><span class="order-icon"><ShoppingBag :size="21" stroke-width="1.5"/></span><div><strong>Another order. All connected.</strong><span>Online checkout → In-store stock</span></div><span class="order-check"><Check :size="16"/></span></div>
     </div>
     <div class="story-copy"><h3>Make every sale feel simple.</h3><p>Connect your website, orders and POS. From the first checkout to the next pickup, keep everything in step.</p><span class="story-use">Online stores <span>/</span> Restaurants</span></div>
     <a class="story-explore" href="#industry-heading">Explore your business tools <ArrowUpRight :size="17" aria-hidden="true"/></a>
    </article>
    <article class="business-story relationships-story">
     <div class="story-scene relationships-scene">
      <div class="relationship-glass" aria-hidden="true"><i v-for="rib in 12" :key="rib"></i></div>
      <span class="scene-label">Good conversations grow.</span>
      <div class="conversation-preview" aria-hidden="true"><div class="conversation-top"><span class="conversation-avatar">J</span><div><strong>New website enquiry</strong><span>Ready for a conversation</span></div><MessageCircle :size="17" stroke-width="1.5"/></div><div class="message-in">Hi! I'd love to know more about your services.</div><div class="message-out">Of course. Let's find what works for you.<Check :size="12"/></div><div class="contact-saved"><span><Check :size="12"/></span>Customer details, saved in your CRM.</div></div>
     </div>
     <div class="story-copy"><h3>Stay close to your customers.</h3><p>Bring enquiries and conversations together. Follow up, build relationships and give people a reason to return.</p><span class="story-use">Car dealers <span>/</span> CRM & sales</span></div>
    </article>
   </div>
   <footer class="services-footer"><p>Your brand. Your website. The tools to run it.</p><span>Illustrative business previews</span><a href="#industry-heading">Find your industry <ArrowRight :size="16" aria-hidden="true"/></a></footer>
  </div>
 </section>
</template>

<style scoped>
.business-services { padding:clamp(52px,6vw,104px) var(--section-gutter) 0; background:linear-gradient(#fff 55%,#fafbf9); color:#111; color-scheme:light; }
.services-inner { max-width:var(--section-width); margin-inline:auto; }
.services-header { display:grid; grid-template-columns:1.2fr 1fr; gap:6vw; align-items:end; margin-bottom:clamp(36px,4vw,68px); }
.services-category { margin:0 0 18px; color:#626c78; font-size:13px; }
.services-header h2 { margin:0; font-size:var(--type-section-heading); font-weight:450; line-height:1.12; letter-spacing:-.04em; }
.services-intro { max-width:43ch; justify-self:end; }
.services-intro>p { margin:0 0 23px; font-size:var(--type-description); line-height:1.7; color:#59616c; }
.services-actions { display:flex; flex-wrap:wrap; align-items:center; gap:12px; }
.services-plans { display:flex; align-items:center; justify-content:center; gap:16px; min-height:54px; padding:0 22px; border-radius:999px; background:#111; color:white; font-size:13px; font-weight:500; }
.services-intro .services-notice { margin:14px 0 0; font-size:13px; }
.business-stories { display:grid; grid-template-columns:1.12fr 1fr .94fr; gap:clamp(20px,2.3vw,40px); align-items:start; }
.business-story { min-width:0; }.commerce-story { padding-top:clamp(32px,4vw,65px); }.relationships-story { padding-top:clamp(16px,2vw,32px); }
.story-scene { position:relative; overflow:hidden; border-radius:12px; isolation:isolate; background:#edf4fb; }
.booking-scene { aspect-ratio:.92; }.commerce-scene { aspect-ratio:1.08; }.relationships-scene { min-height:clamp(360px,28vw,480px); display:flex; flex-direction:column; }
.story-scene>img { width:100%; height:100%; position:absolute; inset:0; object-fit:cover; }.booking-scene>img { object-position:55% 35%; }.commerce-scene>img { object-position:50% 40%; }
.scene-shade { position:absolute; inset:0; background:linear-gradient(180deg,#0005,transparent 40%,#0002); }
.scene-label { position:absolute; top:clamp(20px,2vw,32px); left:clamp(20px,2vw,32px); right:20px; font-size:clamp(16px,1.4vw,22px); font-weight:450; letter-spacing:-.03em; color:white; line-height:1.3; }
.booking-preview { position:absolute; bottom:6%; left:6%; right:6%; padding:clamp(15px,1.5vw,24px); border:1px solid #fff; border-radius:12px; background:#ffffffeb; backdrop-filter:blur(16px); box-shadow:0 10px 30px -15px #0004; color:#273340; }
.preview-heading { display:flex; align-items:center; gap:9px; font-size:11px; }.preview-icon { color:#59738d; }.preview-tag { margin-left:auto; font-size:8px; color:#72808d; }
.booking-service { display:flex; justify-content:space-between; align-items:center; margin:17px 0; gap:10px; }.booking-service strong { font-size:clamp(15px,1.3vw,20px); font-weight:500; letter-spacing:-.02em; }.booking-service>span { font-size:10px; color:#75818e; }
.booking-week { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }.booking-week>span { display:flex; flex-direction:column; align-items:center; gap:8px; padding:10px 0; font-size:9px; color:#67778a; border:1px solid #dce3e9; border-radius:7px; background:#ffffff8a; }.booking-week b { font-size:15px; color:#243142; font-weight:500; }.booking-week .chosen { border-color:#44698c; background:#e6f1fd; color:#315b84; }
.booking-confirmation { display:flex; align-items:center; gap:7px; margin-top:17px; font-size:9px; color:#42658a; }
.order-preview { position:absolute; bottom:7%; left:6%; right:6%; display:flex; align-items:center; gap:10px; padding:16px 12px; border:1px solid #fff; border-radius:10px; background:#fffffff0; backdrop-filter:blur(12px); color:#273340; box-shadow:0 8px 25px -15px #0006; }.order-icon { flex-shrink:0; color:#59738d; }.order-preview strong { font-size:11px; font-weight:500; display:block; line-height:1.4; }.order-preview div>span { display:block; margin-top:5px; font-size:8px; color:#67778a; }.order-check { margin-left:auto; color:#537465; flex-shrink:0; }
.relationships-scene { background:radial-gradient(ellipse at 10% 20%,#f3faff 0,transparent 60%),radial-gradient(ellipse at 75% 100%,#5199df 0,transparent 75%),#d1e6fa; border:1px solid #d5e4f2; }.relationships-scene .scene-label { position:relative; inset:auto; margin:clamp(20px,2vw,32px) clamp(20px,2vw,32px) 0; color:#244668; }
.relationship-glass { position:absolute; inset:0; display:flex; opacity:.42; mask-image:linear-gradient(transparent 15%,black); }.relationship-glass i { flex:1; background:linear-gradient(90deg,#225d9915,transparent 40%,#ffffff9c 88%,#2f6fa133); border-right:1px solid #ffffffad; }
.conversation-preview { position:relative; margin:auto 7% 7%; margin-top:clamp(24px,3.5vw,56px); padding:clamp(16px,1.5vw,24px); background:#ffffffed; border:1px solid white; border-radius:12px; box-shadow:0 18px 35px -20px #19508077; }
.conversation-top { display:flex; align-items:center; gap:9px; padding-bottom:17px; border-bottom:1px solid #e3eaf1; }.conversation-avatar { width:30px; height:30px; border-radius:50%; background:#e7edf3; color:#4c647e; display:grid; place-items:center; font-size:11px; flex-shrink:0; }.conversation-top strong { display:block; font-size:10px; font-weight:500; }.conversation-top div>span { display:block; font-size:8px; color:#74818e; margin-top:4px; }.conversation-top>svg { margin-left:auto; color:#74818e; flex-shrink:0; }
.message-in,.message-out { font-size:clamp(10px,.8vw,13px); line-height:1.6; padding:12px; max-width:90%; }.message-in { background:#edf1f5; border-radius:9px 9px 9px 2px; margin-top:20px; }.message-out { position:relative; margin:12px 0 18px auto; background:#deebf8; color:#315372; border-radius:9px 9px 2px 9px; padding-bottom:20px; }.message-out>svg { position:absolute; bottom:5px; right:9px; }.contact-saved { display:flex; align-items:center; gap:6px; color:#637586; font-size:8px; line-height:1.6; }.contact-saved>span { color:#4e7b68; }
.story-copy { padding-top:clamp(22px,2vw,32px); }.story-copy h3 { margin:0 0 13px; font-size:clamp(20px,1.65vw,27px); line-height:1.25; letter-spacing:-.035em; font-weight:500; }.story-copy p { font-size:var(--type-description); line-height:1.7; margin:0; color:#636c77; max-width:39ch; }.story-use { display:flex; flex-wrap:wrap; gap:10px; margin-top:21px; font-size:11px; color:#384859; }.story-use>span { color:#b9c2cb; }
.story-explore { display:flex; align-items:center; justify-content:space-between; gap:16px; min-height:55px; margin-top:26px; border-top:1px solid #dbe2e9; border-bottom:1px solid #dbe2e9; color:#172135; font-size:12px; text-decoration:none; }
.services-footer { display:flex; align-items:center; flex-wrap:wrap; gap:15px 30px; margin-top:clamp(42px,5vw,80px); padding:24px 0 0; border-top:1px solid #dce3e9; }.services-footer p { margin:0; font-size:var(--type-description); letter-spacing:-.015em; }.services-footer>span { color:#74808e; font-size:10px; }.services-footer a { display:flex; align-items:center; gap:12px; min-height:44px; margin-left:auto; font-size:13px; text-decoration:none; color:#111; }
.business-services :is(button,a):focus-visible { outline:2px solid #315fbe; outline-offset:5px; }
@media(hover:hover) and (pointer:fine) { .services-plans:hover { background:#333; }.business-services a:hover { color:#315f8c; text-decoration:underline; text-underline-offset:5px; } }
@media(min-width:701px) and (max-width:1050px) { .business-stories { grid-template-columns:1fr 1fr; }.relationships-story { grid-column:1 / -1; padding-top:10px; display:grid; grid-template-columns:1fr 1fr; gap:5vw; align-items:center; }.relationships-story .story-copy { padding-top:0; }.services-header { gap:4vw; }.booking-scene { aspect-ratio:.85; }.commerce-scene { aspect-ratio:.95; } }
@media(max-width:700px) { .business-services { padding-top:14vw; }.services-header { grid-template-columns:1fr; gap:26px; margin-bottom:36px; }.services-intro { justify-self:start; }.business-stories { grid-template-columns:1fr; gap:38px; }.commerce-story,.relationships-story { padding-top:0; }.story-scene { max-height:490px; }.booking-scene { aspect-ratio:.96; }.commerce-scene { aspect-ratio:1.1; }.scene-label { font-size:21px; top:24px; left:24px; }.booking-preview { padding:20px; }.preview-heading { font-size:12px; }.preview-tag { font-size:9px; }.booking-service strong { font-size:19px; }.booking-week>span { font-size:10px; }.booking-week b { font-size:16px; }.booking-confirmation { font-size:10px; }.story-copy { padding-top:21px; }.story-copy h3 { font-size:24px; }.story-copy p { max-width:45ch; }.story-use { margin-top:15px; font-size:12px; }.order-preview { padding:18px 15px; }.order-preview strong { font-size:12px; }.order-preview div>span { font-size:9px; }.conversation-preview { padding:20px; margin-top:30px; }.conversation-top strong { font-size:11px; }.conversation-top div>span { font-size:9px; }.message-in,.message-out { font-size:11px; }.contact-saved { font-size:9px; }.services-footer { margin-top:38px; gap:10px; align-items:flex-start; flex-direction:column; }.services-footer a { margin-left:0; }.story-explore { margin-top:20px; } }
@media(max-width:370px) { .booking-scene { aspect-ratio:.85; }.conversation-preview { padding:16px; }.preview-tag { display:none; } }
</style>
