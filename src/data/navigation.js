import { industries } from './industryCatalog'

const item = (label, action, detail) => ({ label, action, detail })
const section = (title, ...items) => ({ title, items })

export const navigation = [
  { name:'Domains', title:'Domains', description:'Find and register the perfect name for your business.', cta:'Search domains', action:'domain', image:'domain-notebook', sections:[
    section('Find a domain', item('Domain Search','domain'), item('Bulk Search',null,'Bulk domain search is not available in this preview. Use Search domains to check one name at a time.'), item('Domain Transfer','faq'), item('Domain Pricing',null,'Registration prices depend on the extension. Final domain pricing is not yet published.')),
    section('Manage', item('DNS Management',null,'DNS records connect your domain to your website and email.'), item('Domain Privacy',null,'Domain privacy helps limit the personal details visible in public registration records.'), item('WHOIS Lookup','lookup')) ] },
  { name:'Websites', title:'Websites', description:'A website and the tools to run it, tailored to your industry.', cta:'See all packages', action:'pricing', image:'shop-opening', sections:industries.map((industry,index)=>section(industry.label,...industry.cards.filter(card=>card.id!=='domain').map(card=>item(card.title,{industry:index,card:card.id})))) },
  { name:'Email', title:'Business email', description:'Give your team a secure inbox at your own domain.', cta:'Explore Smardove', action:{industry:0,card:'email'}, image:'studio-desk', sections:[
    section('Smardove Email',item('Email Plans',{industry:0,card:'email'}),item('Security Features',null,'Talk to support about mailbox protection and account security.'),item('Mobile Apps',null,'Ask support about accessing your mailbox from your phone.'),item('Email Migration',null,'Moving an existing inbox? Ask about transferring your mail and updating your domain records.')) ] },
  { name:'SMS', title:'Business SMS', description:'Reach customers with alerts, appointment reminders and bulk messages.', cta:'Explore Ipsova', action:'messaging', image:'stylist', sections:[
    section('Ipsova SMS',item('Bulk SMS','messaging'),item('SMS API',null,'Connect automated text notifications to your business software. Ask support about API access.'),item('Sender ID',null,'Use a sender name that customers recognise. Contact support about registration.'),item('SMS Pricing',null,'Contact support for rates based on your destination and message volume.')) ] },
  { name:'Cloud PBX', title:'Voxinnova Cloud PBX', description:'A cloud phone system for your business, with international numbers.', cta:'Explore Cloud PBX', action:'pbx', image:'studio-desk', sections:[
    section('Cloud PBX',item('Cloud PBX','pbx'),item('3CX Phone System',null,'Ask about connecting your team with a 3CX phone system.'),item('CRM Integration',null,'Discuss linking customer records with incoming and outgoing calls.'),item('PBX Pricing',null,'Ask support for a quote for your phone system.')),
    section('Numbers',item('International Numbers',null,'Ask which countries have business numbers available.'),item('Local Numbers',null,'Check number availability for your area.'),item('Number Pricing',null,'Number pricing varies by country and number type.')) ] },
  { name:'Hosting', title:'Website hosting', description:'Give your website a secure home with room to grow.', cta:'Explore hosting', action:'hosting', image:'domain-notebook', sections:[
    section('Hosting',item('Website Hosting','hosting'),item('Cloud Hosting',null,'Explore hosting across cloud infrastructure with our team.'),item('VPS',null,'Discuss a virtual server with dedicated resources for your applications.'),item('Dedicated Servers',null,'Ask about a physical server reserved for your business.')),
    section('Plans',item('Developer',null,'Discuss the environments and tools your project needs.'),item('Corporate',null,'Talk through hosting for your business websites and applications.'),item('Enterprise',null,'Discuss infrastructure and support for a larger deployment.'),item('Hosting & Maintenance','maintenance')) ] },
]
