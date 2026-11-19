<script setup>
import { ArrowUpRight } from 'lucide-vue-next'

const baseUrl = import.meta.env.BASE_URL
const posts = [
  {
    category: 'Domains',
    title: 'Choose a domain name people remember',
    excerpt: 'A clear, distinctive domain makes it easier for customers to find you, remember you, and come back.',
    image: 'images/editorial/studio-desk.jpg',
    imageAlt: 'A person working at a laptop with an open notebook',
    readTime: '4 min read'
  },
  {
    category: 'Websites',
    title: 'What a small-business website needs on day one',
    excerpt: 'Start with a clear offer, the answers customers need, and a simple next step.',
    image: 'images/editorial/domain-notebook.jpg',
    imageAlt: 'A hand-drawn website layout in a spiral notebook',
    readTime: '6 min read'
  },
  {
    category: 'Growth',
    title: 'Bring your shop to life online',
    excerpt: 'Bring your products, brand, and customer experience together in a practical online storefront.',
    image: 'images/editorial/boutique-team.jpg',
    imageAlt: 'Two florists preparing flowers at their shop counter',
    readTime: '5 min read'
  }
]
</script>

<template>
  <section id="blog" class="blog-section" aria-labelledby="blog-heading">
    <div class="blog-inner">
      <header class="blog-heading">
        <div>
          <p class="blog-eyebrow">Finenic journal</p>
          <h2 id="blog-heading">Ideas for your next step.</h2>
        </div>
        <p>Practical reads to help you build your next chapter online.</p>
      </header>
      <div class="blog-grid">
        <article v-for="post in posts" :key="post.title" class="blog-card">
          <img
            class="blog-image"
            :src="`${baseUrl}${post.image}`"
            :alt="post.imageAlt"
            loading="lazy"
            decoding="async"
          >
          <div class="blog-card-content">
            <span class="blog-category">{{ post.category }}</span>
            <h3>
              <span>{{ post.title }}</span>
              <ArrowUpRight :size="18" aria-hidden="true" />
            </h3>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <div class="blog-byline">
              <span class="blog-mark" aria-hidden="true">F</span>
              <span class="blog-byline-copy">
                <strong>Finenic journal</strong>
                <small>{{ post.readTime }}</small>
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blog-section { padding:clamp(56px,6vw,88px) var(--section-gutter) clamp(52px,5vw,76px); background:#f4f8fb; color:#172135; }
.blog-inner { max-width:var(--section-width); margin-inline:auto; }
.blog-heading { display:flex; justify-content:space-between; align-items:end; gap:32px; margin-bottom:clamp(30px,3.5vw,52px); }
.blog-eyebrow { margin:0 0 12px; color:#315fbe; font-size:11px; font-weight:650; letter-spacing:.1em; text-transform:uppercase; }
.blog-heading h2 { margin:0; font-size:var(--type-section-heading); font-weight:500; letter-spacing:-.045em; line-height:1.12; }
.blog-heading>p { max-width:38ch; margin:0 0 4px; color:#6a7581; font-size:var(--type-description); line-height:1.7; }
.blog-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(16px,2vw,28px); }
.blog-card { display:flex; min-width:0; flex-direction:column; overflow:hidden; border:1px solid #e5ebf0; border-radius:14px; background:#fff; box-shadow:0 12px 28px #17324b0b,0 2px 6px #17324b08; transition:transform .2s ease,box-shadow .2s ease; }
.blog-card:hover { transform:translateY(-4px); box-shadow:0 18px 36px #17324b14,0 3px 8px #17324b0a; }
.blog-image { display:block; width:100%; aspect-ratio:1.72; object-fit:cover; background:#e9f1f7; }
.blog-card-content { display:flex; flex:1; flex-direction:column; padding:clamp(20px,2vw,28px); }
.blog-category { color:#315fbe; font-size:11px; font-weight:600; }
.blog-card h3 { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; margin:10px 0 0; font-size:clamp(19px,1.35vw,24px); font-weight:600; letter-spacing:-.03em; line-height:1.35; }
.blog-card h3 svg { flex:none; margin-top:3px; color:#42536a; }
.blog-excerpt { margin:10px 0 0; color:#6a7581; font-size:var(--type-description); line-height:1.7; }
.blog-byline { display:flex; align-items:center; gap:11px; margin-top:auto; padding-top:clamp(22px,2.2vw,32px); }
.blog-mark { display:grid; width:34px; height:34px; flex:none; place-items:center; border:1px solid #d5e4f0; border-radius:50%; background:linear-gradient(145deg,#e3f2fd,#fff); color:#315fbe; font-size:14px; font-weight:700; }
.blog-byline-copy { display:grid; gap:3px; }
.blog-byline-copy strong { color:#293647; font-size:11px; font-weight:600; }
.blog-byline-copy small { color:#8290a0; font-size:10px; }
.blog-section :is(a,button):focus-visible { outline:2px solid #69869e; outline-offset:4px; }
@media(max-width:900px) { .blog-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }.blog-card:last-child { grid-column:1/-1; } }
@media(max-width:600px) { .blog-heading { display:block; }.blog-heading>p { margin-top:16px; }.blog-grid { grid-template-columns:1fr; }.blog-card:last-child { grid-column:auto; }.blog-image { aspect-ratio:1.8; } }
@media(prefers-reduced-motion:reduce) { .blog-card { transition:none; }.blog-card:hover { transform:none; } }
</style>
