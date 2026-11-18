<script setup>
import { ArrowUpRight, Globe2, Mail, ShieldCheck } from 'lucide-vue-next'

const emit = defineEmits(['search-domain'])
const photo = import.meta.env.BASE_URL + 'images/business/store.jpg'
const domainTools = [
  { icon: Globe2, title: 'Your domain', detail: 'An address customers remember' },
  { icon: ShieldCheck, title: 'DNS & privacy', detail: 'Manage your domain settings' },
  { icon: Mail, title: 'Business email', detail: 'Use your name in every email' },
]
const appTools = ['Bookings', 'Online orders', 'Point of sale', 'Room inventory', 'Sales leads', 'SMS reminders']
</script>

<template>
  <section class="brand-statement" aria-labelledby="journey-heading">
    <div class="statement-inner">
      <h2 id="journey-heading">From your first domain<br>to your next customer.</h2>
      <div class="story-grid">
        <article class="story-card">
          <h3>Start with a name.</h3>
          <p>Give customers an address they can remember. Register a new domain or bring the one you already own.</p>
          <button class="story-link" type="button" @click="emit('search-domain')">Find your domain <ArrowUpRight/></button>
          <div class="inset">
            <h4>Your online identity</h4>
            <ul class="identity-list">
              <li v-for="tool in domainTools" :key="tool.title">
                <component :is="tool.icon" aria-hidden="true"/>
                <div>{{ tool.title }}<small>{{ tool.detail }}</small></div>
              </li>
            </ul>
          </div>
        </article>
        <article class="story-card photo-card">
          <img :src="photo" alt="" loading="lazy">
          <h3>Open your doors online.</h3>
          <p>Give people a place to browse your products, book a service or get in touch.</p>
          <a class="story-link" href="#business-services">Build your website <ArrowUpRight/></a>
        </article>
        <article class="story-card">
          <h3>Keep business moving.</h3>
          <p>Choose the tools that fit your day, whether you’re taking salon appointments, filling rooms or following up with a lead.</p>
          <a class="story-link" href="#industry-heading">Explore business apps <ArrowUpRight/></a>
          <div class="inset">
            <h4>Business tools</h4>
            <ol class="tool-list">
              <li v-for="(tool, i) in appTools" :key="tool"><small aria-hidden="true">0{{ i + 1 }}</small>{{ tool }}</li>
            </ol>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-statement { padding:clamp(64px,7vw,124px) var(--section-gutter) clamp(44px,5vw,90px); background:linear-gradient(var(--hero-join),white 35%); color:#172135; }
.statement-inner { max-width:var(--section-width); margin:auto; }
h2 { margin:0 auto clamp(30px,3.6vw,64px); text-align:center; color:#000; font-size:var(--type-section-heading); line-height:1.13; font-weight:500; letter-spacing:-.045em; }
.story-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(14px,1.35vw,24px); }
.story-card { position:relative; display:flex; flex-direction:column; align-items:flex-start; min-height:clamp(425px,34vw,580px); padding:clamp(20px,2vw,36px); border-radius:clamp(20px,2vw,32px); background:linear-gradient(155deg,#f0f7fb,#dcecf9); }
h3 { margin:0; font-weight:500; line-height:1.08; font-size:clamp(24px,2vw,36px); letter-spacing:-.045em; }
p { margin:14px 0; color:#47586c; font-size:clamp(14px,.98vw,17px); line-height:1.65; }
.story-link { display:inline-flex; align-items:center; gap:6px; color:inherit; font:inherit; font-size:.85rem; font-weight:600; background:none; border:0; padding:4px 0; text-decoration:none; cursor:pointer; }
.story-link svg { width:15px; height:15px; }
.story-link:hover { text-decoration:underline; }
.story-link:focus-visible { outline:2px solid currentColor; outline-offset:4px; }
.inset { width:100%; box-sizing:border-box; margin-top:auto; position:relative; top:0; padding:16px; border-radius:16px; background:white; box-shadow:0 8px 24px -16px #49698470; }
.story-card:has(.inset) .story-link { margin-bottom:24px; }
h4 { margin:0 0 9px; font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:.12em; color:#536579; }
ul,ol { list-style:none; margin:0; padding:0; }
li { display:flex; align-items:center; gap:9px; border-top:1px solid #dde5ec; padding:9px 0; color:#28394b; font-size:13px; }
.identity-list svg { flex:none; box-sizing:content-box; width:15px; height:15px; padding:7px; border-radius:9px; color:#26659b; background:#edf5fc; }
.identity-list small { display:block; margin-top:2px; color:#59697a; }
.tool-list { display:grid; grid-template-columns:1fr 1fr; gap:0 9px; }
.tool-list small { color:#326798; font-variant-numeric:tabular-nums; }
.photo-card { overflow:hidden; isolation:isolate; justify-content:flex-end; background:#18232d; color:white; }
.photo-card img,.photo-card::after { position:absolute; inset:0; width:100%; height:100%; z-index:-2; object-fit:cover; }
.photo-card::after { content:''; z-index:-1; background:linear-gradient(180deg,transparent 12%,#10192340 43%,#0b121cee 100%); }
.photo-card p { color:#f6f8fb; }
@media(max-width:850px) {
  .story-grid { grid-template-columns:1fr; }
  .story-card { min-height:0; }
  .photo-card { min-height:340px; }
}
</style>
