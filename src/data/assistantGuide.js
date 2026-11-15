import { industries } from './industryCatalog'

const industryTerms = [
  /\b(salon|spa|hair|beauty|saptify|appointment)\b/i,
  /\b(store|shop|retail|ecommerce|e-commerce|cartinno|pos)\b/i,
  /\b(restaurant|food|cafe|café|takeaway|menu|dining)\b/i,
  /\b(hotel|room|stay|saasbeds|hospitality)\b/i,
  /\b(car|cars|dealer|showroom|vehicle|veyogo)\b/i,
  /\b(crm|sales|lead|leads|saptivo|whatsapp)\b/i,
]
const action = (label, type, extra = {}) => ({ label, type, ...extra })

export function guideReply(question, previousIndustry = null) {
  const text = question.toLowerCase().trim()
  const domain = text.match(/\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|lk|io|net|co|org|dev|app)\b/)?.[0]
  // Only public catalogue information: no account access, availability or invented offers.
  if (/\b(refund|cancel|password|login|log in|invoice|account|human|support)\b/.test(text)) return {
    text: 'I can help you explore Finenic products, but I can’t access accounts, payments or support tickets. Support and contact options will be added as Finenic launches.',
    actions: [action('Explore our products', 'industry', { index: 0 })],
  }
  if (/\b(price|pricing|cost|costs|much|plan|plans|compare|free|cheapest|package)\b/.test(text)) return {
    text: 'Starter is designed for a first website. Business adds an app for your daily work. Scale is for multiple locations or a more tailored setup. The prices currently shown are sample content; final prices and signup aren’t available yet.',
    actions: [action('Compare the sample plans', 'pricing')],
    suggestions: ['Find an app for my business', 'Help me choose a domain'],
  }
  if (domain || /\b(domain|domains|dns|\.com|\.lk|transfer)\b/.test(text)) return {
    text: domain ? `Start with ${domain}. You can explore name suggestions in our domain search. Live availability, prices and registration aren’t connected yet, so I can’t confirm whether it’s available.` : 'Your domain is your address online. Keep it short, easy to spell, and close to your business name. Our domain search can suggest names and link to registration records; it doesn’t check live availability or register domains yet.',
    actions: [action(domain ? `Search ${domain}` : 'Find a domain', 'domain', { query: domain || '' })],
    suggestions: ['I also need a website', 'Explore business email'],
  }
  if (/\b(email|emails|sms|reminder|reminders|smardove|ipsova)\b/.test(text)) return {
    text: 'Smardove gives your team business email on your own domain. Ipsova covers bulk SMS, reminders and alerts under your sender name. Explore both in the product cards.',
    items: [{ brand: 'Smardove', title: 'Business email', copy: 'A professional address at your own domain.' }, { brand: 'Ipsova', title: 'SMS & reminders', copy: 'Keep customers up to date and remind them about appointments.' }],
    actions: [action('Explore email & SMS', 'messaging')],
  }
  // Specific industries take priority over a generic reference to a store/POS.
  const matches = industryTerms.map((terms, index) => terms.test(text) ? index : -1).filter(index => index >= 0)
  let index = matches.includes(2) ? 2 : matches[0]
  if (index === undefined && previousIndustry !== null && /\b(it|that|this|features|included|more|booking|bookings)\b/.test(text)) index = previousIndustry
  if (index !== undefined) {
    const industry = industries[index]
    return {
      industry: index,
      text: `Here’s a starting point for ${industry.label.toLowerCase()}. These tools cover the core work, and you can add a domain, email and SMS as you grow.`,
      items: industry.cards.filter(card => !['domain', 'email', 'sms'].includes(card.id)).map(card => ({ brand: card.brand, title: card.title, copy: card.copy })),
      actions: [action(`Explore ${industry.label}`, 'industry', { index })],
      suggestions: ['Compare the plans', 'Add email and SMS'],
    }
  }
  if (/\b(host|hosting|maintenance|website|websites|build|custom)\b/.test(text)) return {
    text: 'Start with a website for your business, then connect the tools you need: bookings, online orders, stock or customer follow-up. For a custom website, explore Other Industries; hosting and maintenance are listed there too.',
    actions: [action('Explore websites & hosting', 'industry', { index: 6 })],
    suggestions: ['I run a salon', 'I want an online store', 'I run a hotel'],
  }
  return {
    text: 'Tell me what kind of business you run, or what you’d like to do. I can point you to domains, websites, booking tools, stores, CRM, email and SMS from the Finenic catalogue.',
    suggestions: ['I run a salon', 'I want an online store', 'I run a restaurant', 'I run a hotel', 'I sell cars', 'I need a CRM'],
  }
}
