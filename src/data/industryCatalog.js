// Product destinations can be connected without changing the showcase layout.
const urls = {
  saptify: import.meta.env.VITE_SAPTIFY_URL,
  cartinno: import.meta.env.VITE_CARTINNO_URL,
  ipsova: import.meta.env.VITE_IPSOVA_URL,
  smardove: import.meta.env.VITE_SMARDOVE_URL,
  saasbeds: import.meta.env.VITE_SAASBEDS_URL,
  veyogo: import.meta.env.VITE_VEYOGO_URL,
  saptivo: import.meta.env.VITE_SAPTIVO_URL,
  websites: import.meta.env.VITE_WEBSITE_QUOTE_URL,
  hosting: import.meta.env.VITE_HOSTING_PLANS_URL,
}
const product = (id, brand, title, copy, action, visual, tone, urlKey) => ({
  id, brand, title, copy, action, visual, tone, href: urls[urlKey],
})
const domain = product('domain', 'Domains', 'Domain name', 'Your own .com or .lk address. Give your business a name that is yours.', 'Search domains', 'domain', 'rose')
const sms = (reminders = false) => product('sms', 'Ipsova', reminders ? 'SMS reminders' : 'SMS', reminders ? 'Automatic reminders that help clients remember their appointments.' : 'Bulk SMS and alerts under your own sender name.', 'See SMS pricing', 'sms', 'peach', 'ipsova')
const email = product('email', 'Smardove', 'Emails', 'Secure business email at you@yourbusiness.com.', 'See email plans', 'email', 'stone', 'smardove')

export const industries = [
  {
    id: 'salon', label: 'Salon & Spa', shortName: 'Your salon',
    cards: [domain,
      product('booking', 'Saptify', 'Online booking', 'Clients book appointments 24/7 from your website.', 'Explore Saptify', 'booking', 'sage', 'saptify'),
      product('app', 'Saptify', 'Salon app', 'Your own branded app for clients to book and rebook.', 'Learn more', 'app', 'sand', 'saptify'),
      sms(true), email,
    ],
  },
  {
    id: 'store', label: 'Online Store', shortName: 'Your store',
    cards: [domain,
      product('store', 'Cartinno', 'Website', 'An ecommerce website to sell online.', 'Explore Cartinno', 'store', 'sage', 'cartinno'),
      product('pos', 'Cartinno', 'POS', 'Sell in-store with stock synced to your website.', 'See POS', 'pos', 'sand', 'cartinno'),
      sms(), email,
    ],
  },
  {
    id: 'restaurant', label: 'Restaurants', shortName: 'Your restaurant',
    cards: [domain,
      product('food', 'Cartinno', 'Food website', 'Online ordering for delivery and pickup.', 'Explore', 'food', 'peach', 'cartinno'),
      product('qr', 'Cartinno', 'QR menu & table ordering', 'Guests scan, order and pay from the table.', 'Learn more', 'qr', 'sage', 'cartinno'),
      product('restaurant-pos', 'Cartinno', 'Restaurant POS', 'Run the counter and kitchen from one menu.', 'See POS', 'pos', 'sand', 'cartinno'),
      sms(), email,
    ],
  },
  {
    id: 'hotel', label: 'Hotels', shortName: 'Your hotel',
    cards: [domain,
      product('hotel', 'SaaSBeds', 'Hotel website & booking engine', 'Take direct bookings on your own site.', 'Explore SaaSBeds', 'hotel', 'sand', 'saasbeds'),
      product('channels', 'SaaSBeds', 'Channel manager & PMS', 'Keep rooms and rates in sync everywhere.', 'Learn more', 'channels', 'sage', 'saasbeds'),
      product('front-desk', 'SaaSBeds', 'AI Front Desk', 'A website chat assistant for guest questions.', 'Learn more', 'chat', 'rose', 'saasbeds'),
      sms(), email,
    ],
  },
  {
    id: 'cars', label: 'Car Dealers', shortName: 'Your showroom',
    cards: [domain,
      product('cars', 'Veyogo', 'Car dealer website', 'Show your vehicle stock online.', 'Explore Veyogo', 'cars', 'stone', 'veyogo'),
      product('dealer-crm', 'Veyogo', 'Dealer CRM', 'Facebook leads, WhatsApp and inquiries in one place.', 'Learn more', 'crm', 'sage', 'veyogo'),
      product('branches', 'Veyogo', 'Multi-branch', 'Manage every showroom from one account.', 'Learn more', 'branches', 'sand', 'veyogo'),
      sms(), email,
    ],
  },
  {
    id: 'crm', label: 'CRM & Sales', shortName: 'Your business',
    cards: [domain,
      product('crm', 'Saptivo', 'CRM', 'Customers, sales and marketing in one system.', 'Explore Saptivo', 'crm', 'sage', 'saptivo'),
      product('leads', 'Saptivo', 'Lead manager', 'Capture Facebook leads and follow up fast.', 'Learn more', 'leads', 'sand', 'saptivo'),
      product('whatsapp', 'Saptivo', 'WhatsApp Business API', 'Chat with customers on WhatsApp from your CRM.', 'Learn more', 'whatsapp', 'mint', 'saptivo'),
      sms(), email,
    ],
  },
  {
    id: 'other', label: 'Other Industries', shortName: 'Your business',
    cards: [domain,
      product('custom', 'Websites', 'Custom website', 'A website designed and built for your business.', 'Get a quote', 'custom', 'sage', 'websites'),
      email,
      product('hosting', 'Hosting', 'Hosting & maintenance', 'Secure hosting with updates and support handled for you.', 'See hosting plans', 'hosting', 'sand', 'hosting'),
    ],
  },
]

export const salonPackageUrl = import.meta.env.VITE_SALON_PACKAGE_URL
