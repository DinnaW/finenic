<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp, ArrowUpRight, ChevronDown, X, Plus, Globe2, PanelsTopLeft, Layers3, MessageCircle, ArrowRight } from 'lucide-vue-next'
import { guideReply } from '../data/assistantGuide'

const emit = defineEmits(['navigate'])
const afterHero = ref(false), minimized = ref(false), opened = ref(false)
const dialog = ref(null), composer = ref(null), conversation = ref(null), launcher = ref(null)
const draft = ref(''), messages = ref([]), context = ref('general')
const viewportHeight = ref(0), viewportTop = ref(0)
let previousIndustry = null, returnFocus, frame, mobile, priorOverflow, resizeObserver
let hero, sections = []
const prompts = {
  general: 'What would you like to build?',
  services: 'Find the right tools for your business',
  catalogue: 'Need a hand choosing your business apps?',
  journey: 'Let’s find your next step',
  pricing: 'Not sure which plan? Let’s compare',
}
const launcherText = computed(() => messages.value.length ? 'Continue your conversation' : prompts[context.value])
const suggestions = [
  { text: 'Find a domain for my business', label: 'Find my perfect domain', icon: Globe2 },
  { text: 'Find an app for my business', label: 'Find the right business app', icon: PanelsTopLeft },
  { text: 'Compare the plans', label: 'Help me compare plans', icon: Layers3 },
  { text: 'Explore business email and SMS', label: 'Explore email & SMS', icon: MessageCircle },
]
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
function measure() {
  frame = null
  afterHero.value = !!hero && hero.getBoundingClientRect().bottom <= (document.querySelector('.header-wrap')?.offsetHeight || 96)
  const middle = window.innerHeight * .55
  context.value = sections.find(({ element }) => {
    const box = element.getBoundingClientRect()
    return box.top <= middle && box.bottom > middle
  })?.name || 'general'
  viewportHeight.value = window.visualViewport?.height || window.innerHeight
  viewportTop.value = window.visualViewport?.offsetTop || 0
}
function scheduleMeasure() { if (!frame) frame = requestAnimationFrame(measure) }
async function openChat() {
  if (opened.value) return
  returnFocus = document.activeElement
  opened.value = true
  await nextTick()
  if (mobile.matches) {
    priorOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.value.showModal()
    // Keep the mobile keyboard closed until the visitor chooses to type.
    dialog.value.querySelector('.assistant-close')?.focus({ preventScroll: true })
  } else {
    dialog.value.show()
    composer.value?.focus({ preventScroll: true })
  }
  measure()
  scrollConversation(false)
}
function closeChat(restore = true) {
  if (!opened.value) return
  dialog.value?.close()
  opened.value = false
  if (priorOverflow !== undefined) { document.body.style.overflow = priorOverflow; priorOverflow = undefined }
  if (restore) nextTick(() => {
    if (returnFocus?.isConnected && returnFocus.getBoundingClientRect().height) returnFocus.focus({ preventScroll: true })
    else launcher.value?.focus({ preventScroll: true })
  })
}
async function scrollConversation(smooth = true) {
  await nextTick()
  conversation.value?.scrollTo({ top: conversation.value.scrollHeight, behavior: smooth && !reduced() ? 'smooth' : 'instant' })
}
function resizeComposer() {
  if (!composer.value) return
  composer.value.style.height = 'auto'
  composer.value.style.height = `${Math.min(composer.value.scrollHeight, 112)}px`
}
async function send(value = draft.value) {
  const text = value.trim().slice(0, 500)
  if (!text) return
  const reply = guideReply(text, previousIndustry)
  if (reply.industry !== undefined) previousIndustry = reply.industry
  messages.value.push({ role: 'user', text }, { role: 'assistant', ...reply })
  draft.value = ''
  await nextTick()
  resizeComposer()
  scrollConversation()
}
function onEnter(event) {
  if (event.isComposing || event.shiftKey) return
  event.preventDefault()
  send()
}
function resetChat() { messages.value = []; draft.value = ''; previousIndustry = null; nextTick(resizeComposer) }
async function navigate(action) { closeChat(false); await nextTick(); emit('navigate', action) }
function keyboard(event) { if (event.key === 'Escape' && opened.value) { event.preventDefault(); closeChat() } }
function changeLayout() { if (opened.value) { closeChat(false); openChat() } }
onMounted(() => {
  hero = document.querySelector('.hero')
  sections = [['services', '#business-services'], ['catalogue', '.industry-showcase'], ['journey', '#business-journey'], ['pricing', '#pricing']].map(([name, selector]) => ({ name, element: document.querySelector(selector) })).filter(item => item.element)
  mobile = window.matchMedia('(max-width: 600px)')
  mobile.addEventListener('change', changeLayout)
  window.addEventListener('scroll', scheduleMeasure, { passive: true })
  window.addEventListener('resize', scheduleMeasure)
  window.visualViewport?.addEventListener('resize', scheduleMeasure)
  window.visualViewport?.addEventListener('scroll', scheduleMeasure)
  document.addEventListener('keydown', keyboard)
  resizeObserver = new ResizeObserver(scheduleMeasure)
  if (hero) resizeObserver.observe(hero)
  measure()
})
onUnmounted(() => {
  closeChat(false)
  cancelAnimationFrame(frame)
  resizeObserver?.disconnect()
  mobile?.removeEventListener('change', changeLayout)
  window.removeEventListener('scroll', scheduleMeasure)
  window.removeEventListener('resize', scheduleMeasure)
  window.visualViewport?.removeEventListener('resize', scheduleMeasure)
  window.visualViewport?.removeEventListener('scroll', scheduleMeasure)
  document.removeEventListener('keydown', keyboard)
})
</script>

<template>
  <div class="finenic-assistant">
    <Transition name="assistant-dock">
      <div v-if="afterHero && !opened" class="assistant-dock" :class="{ 'is-minimized': minimized }">
        <button v-if="minimized" ref="launcher" class="assistant-bubble" aria-label="Open Finenic assistant" aria-controls="finenic-assistant-dialog" :aria-expanded="opened" @click="openChat"><MessageCircle :size="22" /><span>Ask Finenic</span></button>
        <template v-else>
          <button ref="launcher" class="assistant-launcher" aria-label="Ask Finenic assistant" aria-controls="finenic-assistant-dialog" :aria-expanded="opened" @click="openChat">
            <svg class="assistant-mark" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(45 20 20)"/><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(-45 20 20)"/><circle cx="20" cy="20" r="3" fill="white"/></svg>
            <span class="assistant-launcher-copy">{{ launcherText }}</span><span class="assistant-launcher-label">Ask Finenic</span><span class="assistant-send-disc"><ArrowUp :size="18" /></span>
          </button>
          <button class="assistant-dismiss" aria-label="Minimize assistant bar" @click="minimized = true"><X :size="15" /></button>
        </template>
      </div>
    </Transition>

    <dialog id="finenic-assistant-dialog" ref="dialog" class="assistant-dialog" aria-labelledby="assistant-title" :style="{ '--assistant-viewport': `${viewportHeight}px`, '--assistant-offset': `${viewportTop}px` }" @cancel.prevent="closeChat()">
      <header class="assistant-header">
        <div class="assistant-identity"><svg class="assistant-mark" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(45 20 20)"/><ellipse cx="20" cy="20" rx="5.5" ry="18" transform="rotate(-45 20 20)"/><circle cx="20" cy="20" r="3" fill="white"/></svg><div><h2 id="assistant-title">Finenic assistant</h2><p>Your product guide</p></div></div>
        <div class="assistant-header-actions"><button v-if="messages.length" aria-label="Start a new conversation" title="New conversation" @click="resetChat"><Plus :size="19" /></button><button class="assistant-close" aria-label="Close assistant" @click="closeChat()"><ChevronDown :size="21" /></button></div>
      </header>

      <div ref="conversation" class="assistant-conversation">
        <div v-if="!messages.length" class="assistant-welcome">
          <div class="assistant-emblem" aria-hidden="true"><svg viewBox="0 0 80 80"><defs><linearGradient id="assistant-silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".25" stop-color="#afbfce"/><stop offset=".48" stop-color="#f8fcff"/><stop offset=".68" stop-color="#8397aa"/><stop offset="1" stop-color="#e6f2fc"/></linearGradient></defs><g fill="url(#assistant-silver)" stroke="#aebdca" stroke-width=".8"><ellipse cx="40" cy="40" rx="10" ry="34" transform="rotate(45 40 40)"/><ellipse cx="40" cy="40" rx="10" ry="34" transform="rotate(-45 40 40)"/></g><circle cx="40" cy="40" r="6" fill="#fff"/></svg></div>
          <h3>A little guidance.<br>Your next big idea.</h3>
          <p class="assistant-welcome-copy">Let’s find the right place to start.</p>
          <button class="assistant-start" @click="send('Help me get started')"><span><strong>Tell us about your business</strong><small>Find the tools that fit the way you work.</small></span><ArrowUpRight :size="20" /></button>
          <div class="assistant-starters"><button v-for="suggestion in suggestions" :key="suggestion.text" @click="send(suggestion.text)"><component :is="suggestion.icon" :size="18" stroke-width="1.6"/><span>{{ suggestion.label }}</span><ArrowUpRight :size="15" /></button></div>
        </div>

        <div v-else class="assistant-messages" role="log" aria-label="Conversation with Finenic product guide" aria-live="polite" aria-relevant="additions">
          <div v-for="(message, index) in messages" :key="index" class="assistant-message" :class="`assistant-message--${message.role}`">
            <span class="assistant-speaker">{{ message.role === 'user' ? 'You' : 'Finenic' }}</span>
            <p>{{ message.text }}</p>
            <div v-if="message.items" class="assistant-recommendations"><div v-for="item in message.items" :key="item.title"><span>{{ item.brand }}</span><strong>{{ item.title }}</strong><p>{{ item.copy }}</p></div></div>
            <div v-if="message.actions" class="assistant-result-actions"><button v-for="action in message.actions" :key="action.label" @click="navigate(action)">{{ action.label }}<ArrowRight :size="15" /></button></div>
            <div v-if="index === messages.length - 1 && message.suggestions" class="assistant-followups"><button v-for="suggestion in message.suggestions" :key="suggestion" @click="send(suggestion)">{{ suggestion }}<ArrowUpRight :size="13" /></button></div>
          </div>
        </div>
      </div>

      <footer class="assistant-composer-wrap">
        <form class="assistant-composer" @submit.prevent="send()"><label for="assistant-question" class="sr-only">Ask about Finenic products</label><textarea id="assistant-question" ref="composer" v-model="draft" rows="1" maxlength="500" placeholder="Ask anything about Finenic…" @input="resizeComposer" @keydown.enter="onEnter"></textarea><button type="submit" :disabled="!draft.trim()" aria-label="Send message"><ArrowUp :size="19" /></button></form>
        <p class="assistant-disclosure">Guidance from our catalogue. No live account access.</p>
      </footer>
    </dialog>
  </div>
</template>

<style scoped>
.finenic-assistant { color:#172135; font-family:inherit; font-size:14px; }
.assistant-dock { position:fixed; z-index:70; bottom:max(22px,env(safe-area-inset-bottom)); left:50%; width:min(620px,calc(100% - 80px)); transform:translateX(-50%); }
.assistant-launcher { width:100%; min-height:62px; display:flex; gap:14px; align-items:center; padding:8px 10px 8px 21px; border:1px solid #d3e2ed; border-radius:100px; background:linear-gradient(115deg,#fff 25%,#f1f8fd); box-shadow:0 9px 35px #203f6020,0 2px 5px #203f6008,inset 0 1px 0 #fff; text-align:left; }
.assistant-launcher:hover { border-color:#aabfce; box-shadow:0 10px 35px #203f602b; }
.assistant-mark { width:26px; height:26px; fill:#172135; flex:none; }
.assistant-launcher-copy { flex:1; color:#596676; font-size:13px; min-width:0; white-space:nowrap; text-overflow:ellipsis; overflow:hidden; }
.assistant-launcher-label { font-size:11px; font-weight:650; padding-left:10px; border-left:1px solid #dce5ec; }
.assistant-send-disc { display:grid; place-items:center; width:42px; height:42px; flex:none; border-radius:50%; color:white; background:linear-gradient(#292929,#080808); box-shadow:inset 0 1px 0 #ffffff40; }
.assistant-dismiss { position:absolute; top:15px; right:-35px; width:30px; height:30px; display:grid; place-items:center; background:#fff; border:1px solid #e1e7ec; border-radius:50%; color:#657180; box-shadow:0 3px 9px #203f6014; }
.assistant-dismiss:hover { color:#111; background:#f3f6f8; }
.assistant-dock.is-minimized { width:auto; left:auto; right:24px; transform:none; }
.assistant-bubble { display:flex; align-items:center; gap:9px; height:48px; padding:0 18px; border:1px solid #d3e2ed; border-radius:100px; background:#fff; box-shadow:0 6px 24px #203f6020; font-size:12px; font-weight:600; }
.assistant-dialog { position:fixed; z-index:90; inset:auto 22px 20px auto; margin:0; width:410px; max-width:calc(100vw - 32px); height:min(780px,calc(100dvh - var(--header-height,96px) - 40px)); max-height:none; padding:0; border:1px solid #dfe6eb; border-radius:26px; color:#172135; background:#fff; box-shadow:0 16px 70px #142f4e26,0 2px 10px #142f4e0c; overflow:hidden; }
.assistant-dialog[open] { display:flex; flex-direction:column; animation:assistant-open .28s cubic-bezier(.22,1,.36,1); }
.assistant-dialog::backdrop { background:#14203024; }
.assistant-header { display:flex; align-items:center; justify-content:space-between; flex:none; padding:19px 19px 16px 22px; border-bottom:1px solid #edf0f3; }
.assistant-identity { display:flex; align-items:center; gap:10px; }.assistant-identity .assistant-mark { width:25px; height:25px; }
.assistant-identity h2 { margin:0; font-size:13px; letter-spacing:-.02em; font-weight:650; line-height:1.4; }.assistant-identity p { margin:2px 0 0; color:#74808d; font-size:10px; }
.assistant-header-actions { display:flex; gap:3px; }.assistant-header-actions button { display:grid; place-items:center; width:36px; height:36px; border-radius:50%; color:#596676; }.assistant-header-actions button:hover { background:#f0f5f9; color:#111; }
.assistant-conversation { flex:1; min-height:0; overflow-y:auto; overscroll-behavior:contain; scrollbar-width:thin; scrollbar-color:#cdd8e1 transparent; }
.assistant-welcome { min-height:100%; padding:clamp(18px,4vh,48px) 20px 24px; display:flex; flex-direction:column; justify-content:center; }
.assistant-emblem { width:74px; height:74px; margin:0 auto 18px; filter:drop-shadow(0 5px 8px #718ca02b); }.assistant-emblem svg { width:100%; height:100%; }
.assistant-welcome h3 { margin:0; font-size:30px; line-height:1.2; letter-spacing:-.045em; font-weight:500; text-align:center; }.assistant-welcome-copy { margin:12px 0 26px; color:#6c7986; font-size:12px; text-align:center; line-height:1.6; }
.assistant-start { display:flex; gap:12px; align-items:center; justify-content:space-between; text-align:left; padding:19px 18px; border:1px solid #292d33; border-radius:16px; background:radial-gradient(ellipse at 100% 0,#697e8d66,transparent 80%),#111; color:#fff; box-shadow:inset 0 1px 0 #ffffff26; }
.assistant-start strong { display:block; font-size:13px; font-weight:600; }.assistant-start small { display:block; margin-top:5px; font-size:11px; line-height:1.6; color:#cbd3db; }.assistant-start:hover { background-color:#24282c; }
.assistant-starters { margin-top:12px; background:#f5f8fa; border:1px solid #eaf0f5; border-radius:16px; padding:0 15px; }
.assistant-starters button { width:100%; display:flex; align-items:center; gap:11px; min-height:53px; text-align:left; font-size:12px; border-bottom:1px solid #e1e8ed; }.assistant-starters button:last-child { border:0; }.assistant-starters button>span { flex:1; }.assistant-starters button>svg:last-child { color:#8b98a3; }.assistant-starters button:hover { color:#000; }.assistant-starters button:hover>svg:last-child { color:#172135; }
.assistant-composer-wrap { padding:12px 15px 13px; flex:none; background:#fff; }
.assistant-composer { display:flex; align-items:flex-end; gap:8px; border:1px solid #cbdbe7; border-radius:26px; padding:7px 7px 7px 16px; box-shadow:0 0 0 3px #edf5fa; transition:border-color .2s; }.assistant-composer:focus-within { border-color:#7d9bb2; box-shadow:0 0 0 3px #e6f1fa; }
.assistant-composer textarea { display:block; flex:1; min-width:0; padding:9px 0; background:none; border:0; font:inherit; color:#172135; caret-color:#172135; font-size:13px; line-height:20px; resize:none; max-height:112px; outline:none; }.assistant-composer textarea::placeholder { color:#77838f; }
.assistant-composer button { width:36px; height:36px; display:grid; place-items:center; flex:none; margin-bottom:1px; border-radius:50%; background:#111; color:#fff; }.assistant-composer button:disabled { background:#e6edf2; color:#91a0ae; cursor:default; }
.assistant-disclosure { margin:10px 0 0; text-align:center; font-size:9px; color:#7b8692; line-height:1.5; }
.assistant-messages { padding:24px 21px; }.assistant-message { margin-bottom:24px; overflow-wrap:anywhere; animation:assistant-message .2s ease-out; }.assistant-message:last-child { margin:0; }
.assistant-speaker { display:block; font-size:10px; font-weight:650; margin-bottom:7px; color:#74808d; }.assistant-message>p { font-size:13px; line-height:1.8; margin:0; white-space:pre-wrap; }
.assistant-message--user { margin-left:34px; border-radius:18px 18px 5px 18px; padding:12px 15px; background:#edf5fb; }.assistant-message--user .assistant-speaker { display:none; }.assistant-message--user>p { line-height:1.6; }
.assistant-recommendations { margin-top:15px; border:1px solid #e2eaf0; border-radius:14px; overflow:hidden; }.assistant-recommendations>div { padding:13px 14px; border-bottom:1px solid #e2eaf0; background:linear-gradient(115deg,#fff,#f7fafd); }.assistant-recommendations>div:last-child { border:0; }.assistant-recommendations span { display:block; color:#708295; font-size:10px; margin-bottom:4px; }.assistant-recommendations strong { display:block; font-size:13px; font-weight:600; }.assistant-recommendations p { margin:5px 0 0; font-size:11px; line-height:1.7; color:#6b7885; }
.assistant-result-actions { margin-top:14px; }.assistant-result-actions button { display:flex; align-items:center; justify-content:space-between; gap:13px; width:100%; padding:12px 15px; min-height:43px; background:#111; border-radius:100px; color:#fff; font-size:12px; text-align:left; }.assistant-result-actions button:hover { background:#2d3237; }
.assistant-followups { display:flex; flex-wrap:wrap; gap:7px; margin-top:17px; }.assistant-followups button { display:flex; align-items:center; gap:7px; text-align:left; font-size:11px; min-height:36px; padding:8px 11px; border:1px solid #dbe5ed; border-radius:100px; }.assistant-followups button:hover { background:#eef5fa; }
.finenic-assistant button:focus-visible { outline:2px solid #567995; outline-offset:3px; }
.assistant-dock-enter-active,.assistant-dock-leave-active { transition:opacity .22s ease,translate .28s cubic-bezier(.22,1,.36,1); }.assistant-dock-enter-from,.assistant-dock-leave-to { opacity:0; translate:0 12px; }
@keyframes assistant-open { from { opacity:0; transform:translateY(12px) scale(.985); } to { opacity:1; transform:none; } }
@keyframes assistant-message { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:none; } }
@media(max-width:600px) {
  .assistant-dock { width:calc(100% - 60px); left:14px; transform:none; bottom:max(14px,env(safe-area-inset-bottom)); }.assistant-launcher { min-height:56px; gap:10px; padding:7px 8px 7px 15px; }.assistant-launcher-copy { font-size:12px; }.assistant-launcher-label { display:none; }.assistant-mark { width:22px; height:22px; }.assistant-send-disc { width:38px; height:38px; }.assistant-dismiss { top:13px; right:-36px; }.assistant-dock.is-minimized { left:auto; right:14px; }
  .assistant-dialog { inset:var(--assistant-offset,0px) 0 auto; width:100%; max-width:none; height:var(--assistant-viewport,100dvh); border:0; border-radius:0; }.assistant-header { padding:calc(14px + env(safe-area-inset-top)) 16px 14px 20px; }.assistant-header-actions button { width:40px; height:40px; }.assistant-composer-wrap { padding-bottom:max(12px,env(safe-area-inset-bottom)); }.assistant-composer textarea { font-size:16px; }.assistant-welcome { padding:22px 20px; }.assistant-welcome h3 { font-size:29px; }.assistant-conversation { -webkit-overflow-scrolling:touch; }
}
@media(prefers-reduced-motion:reduce) { .assistant-dialog[open],.assistant-message { animation:none; }.assistant-dock-enter-active,.assistant-dock-leave-active { transition:none; } }
</style>
