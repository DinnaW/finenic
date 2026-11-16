const group = (id, label, questions) => ({ id, label, questions: questions.map(([question, answer]) => ({ question, answer })) })
export const faqGroups = [
  group('general', 'General', [
    ['What can I buy on finenic?', 'Domain names, websites, business apps for salons, shops, restaurants, hotels and car dealers, Saptivo CRM, business email and SMS — individually or as a package.'],
    ['Can I transfer a domain I already own?', 'Yes. Start a transfer from the Domains page and follow the steps to move it into your finenic account. Domain transfers are not yet connected in this website preview.'],
    ['Do I need a domain to use the business apps?', 'A domain is recommended so customers find you at your own address. You can add one at checkout when ordering becomes available.'],
    ['How long does setup take?', 'It depends on the product and what you need to bring across. A new website, domain transfer and business app each have different setup steps. Your scope and timeline should be confirmed before you proceed.'],
  ]),
  group('salon', 'Salon & Spa', [
    ['Can clients book appointments from my website?', 'Yes. Saptify lets clients book appointments online, so they can find a time without calling your salon.'],
    ['Can my salon have its own app?', 'Saptify includes a branded salon app option that lets clients book and rebook. Explore the Salon & Spa products to find the right setup.'],
    ['Can I send appointment reminders?', 'Ipsova provides SMS reminders and alerts to help clients remember their appointments. Confirm messaging costs and setup requirements before choosing your package.'],
    ['What should I prepare before setup?', 'Have your service list, prices, team details, opening hours and brand assets ready. These help shape your booking experience around the way your salon works.'],
  ]),
  group('store', 'Online Store', [
    ['Can I sell online and in my physical store?', 'Cartinno combines an ecommerce website with POS, with stock synced between your website and in-store sales.'],
    ['What do I need to start my online store?', 'Prepare your product names, descriptions, photos, prices and stock details. You will also need to decide how you want to handle delivery, pickup and payments.'],
    ['Can I use my own domain?', 'Yes. Your store can use your business domain, helping customers find you at an address that matches your brand.'],
    ['Can I add customer messages and business email?', 'Yes. Explore Ipsova for SMS and Smardove for email on your domain alongside your Cartinno store.'],
  ]),
  group('restaurants', 'Restaurants', [
    ['Can customers order delivery or pickup online?', 'Cartinno provides a food website for online delivery and pickup orders. Your menu becomes the starting point for the ordering experience.'],
    ['Do you offer QR menus and table ordering?', 'Yes. Cartinno includes QR menu and table ordering options so guests can scan, order and pay from the table.'],
    ['Can I connect the counter and kitchen?', 'Cartinno Restaurant POS helps run the counter and kitchen from one menu. Confirm the hardware and workflow requirements for your restaurant before setup.'],
    ['What information should I prepare?', 'Start with your menu, prices, photos, opening hours and delivery or pickup details. Include any options or variations customers need to choose when ordering.'],
  ]),
  group('hotels', 'Hotels', [
    ['Can guests book directly on my hotel website?', 'SaaSBeds provides a hotel website and booking engine so guests can book directly with you.'],
    ['How do I keep rooms and rates in sync?', 'SaaSBeds includes a channel manager and property management system to keep rooms and rates in sync. Confirm support for your existing booking channels before moving across.'],
    ['What does the AI Front Desk do?', 'The SaaSBeds AI Front Desk is a website chat assistant for guest questions. It helps visitors find information while exploring your hotel online.'],
    ['What do I need for a hotel website?', 'Prepare room types, rates, photos, amenities and your booking policies. Existing reservation and channel details will also help define your setup requirements.'],
  ]),
  group('cars', 'Car Dealers', [
    ['Can I showcase my vehicle stock online?', 'Veyogo provides a car dealer website to display your vehicles and help prospective buyers find your showroom online.'],
    ['Can I manage enquiries in one place?', 'Veyogo Dealer CRM brings Facebook leads, WhatsApp and vehicle enquiries together so your team can follow up from one place.'],
    ['Does it support more than one showroom?', 'Veyogo offers multi-branch management so you can manage showrooms from one account. Discuss your branch structure when choosing your setup.'],
    ['What should I prepare for my dealer website?', 'Gather vehicle photos, specifications, prices, showroom details and your branding. Consistent listings help buyers compare vehicles and make an enquiry.'],
  ]),
  group('crm', 'CRM & Sales', [
    ['What is Saptivo CRM for?', 'Saptivo brings customers, sales and marketing into one system, helping your team keep customer information and follow-up work together.'],
    ['Can I capture Facebook leads?', 'Yes. Saptivo Lead Manager is designed to capture Facebook leads and help your team follow up quickly.'],
    ['Can my team use WhatsApp from the CRM?', 'Saptivo offers a WhatsApp Business API option for customer conversations from your CRM. Account eligibility, approvals and messaging charges should be confirmed during setup.'],
    ['Can I bring my existing customer information?', 'Discuss your current data format and migration requirements before setup. Available import options and any data preparation need to be confirmed for your project.'],
  ]),
  group('messaging', 'Email & SMS', [
    ['Can I get email on my own domain?', 'Smardove provides business email at an address such as you@yourbusiness.com, giving your team an address that matches your brand.'],
    ['What can I use Ipsova SMS for?', 'Ipsova supports bulk SMS, appointment reminders and alerts under your own sender name. Use messages that customers expect and have agreed to receive.'],
    ['Are email and SMS included in every package?', 'Inclusions depend on the package you choose. Confirm mailbox quantities, messaging allowances and any additional charges before ordering.'],
    ['Can I keep my existing domain for email?', 'Your existing domain can be part of your email setup. Access to its DNS settings is needed to configure the email records. Plan any migration before changing existing records.'],
  ]),
  group('other', 'Other Industries', [
    ['Can you build a website for a different type of business?', 'Yes. The Other Industries category includes custom websites designed around your business rather than a specific industry app.'],
    ['Is hosting and maintenance available?', 'Yes. Hosting and maintenance are listed for custom websites, with updates and support included in the proposed service. Confirm the exact scope for your project.'],
    ['Can I add email or CRM to a custom website?', 'Explore Smardove for business email and Saptivo for CRM. Any connections between a custom website and your chosen tools should be agreed as part of the project scope.'],
    ['What should I include in my website brief?', 'Describe your business, audience, pages and the actions visitors should be able to take. Add your branding, content, examples you like and any tools you already use.'],
  ]),
]
