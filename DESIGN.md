# finenic — Prism steps revision

Visual authority: the user-supplied black hero screenshot with nine stepped columns and thin iridescent upper edges. This supersedes the prior Aurora direction. Preserve finenic, Manrope, Vue, Tailwind and the centered domain search.

Full-width black canvas #030303; white display text #F7F7F7; secondary text #A6A6A6; dark form #141414; white search button #F5F5F5. Nine black columns descend symmetrically toward the center. Their upper edges use narrow spectral highlights, with faint vertical seams. Desktop display text 68px, weight 450, tracking -0.04em; mobile 35–52px. The form is centered at a maximum 640px. No testimonial or customer logos are invented.

Motion for Vue animates the columns and content into place once, with reduced-motion support. The composition is static after the entrance. Mobile steps move below the main content. Existing navigation and domain validation remain functional; availability and pricing remain unconnected.

Validation: production build and domain unit tests. Browser visual QA is unverified because browser-control tools are not exposed in this environment.

## Description below the hero - current revision

The description shares the hero's icy-blue joining color (#e3f2fd), fading through white into the silver business section. A bottom veil on the glass bars removes the saturated horizontal boundary; no separately animated bands cross the join. Manrope remains at clamp(24px, 2.6vw, 44px), capped to a 1000px reading width, with 1.55 line height. Desktop padding is 11vw above and 12vw below; phones use 26vw and 28vw with clamp(20px, 6vw, 32px) type. The existing word-by-word scroll reveal remains, with readable slate text settling into deep ink. Reduced motion presents the complete paragraph.

## Business services section

Added below the black brand statement using the user's ruled-row reference. A cool silver surface (#f0f1f3), existing Manrope type, graphite text and thin column guides match the established palette. The heading uses 4.1vw, maximum 68px, with a smaller mobile scale. Six evenly spaced vertical guide columns extend through the desktop section; three quieter columns remain on mobile. The primary CTA uses the actual React Bits SpecularButton shader and rim-light controller, adapted to Vue. A cursor-following silver edge sits on a dark surface; a static edge supports reduced motion and unavailable WebGL. Source attribution and the upstream license are retained in src/components/specular. Main spacing uses vw with readable minimums.

Four editorial rows cover bookings (salons and hotels), online store/POS, food ordering, and CRM/leads. Each pairs a title with an existing illustrative photograph and practical copy. Mobile stacks the title and description beside a small thumbnail. No customer statistics or awards are invented.

Start for free and See plans use VITE_SIGNUP_URL and VITE_PLANS_URL when configured; otherwise they show the existing coming-soon status pattern. Verified at 320, 390, 768 and 1440 pixels, including image loading, both CTA states, dark-theme compatibility and no page overflow. Production build passes.

## Current palette and buttons

The latest user direction supersedes all earlier blue/sapphire styling. Active surfaces use white, black and silver; the industry cards retain warm rose, sage, sand and stone pastels. Hero ribbon particles and dark hero step edges are neutral silver. PremiumButton uses white on dark hero/header surfaces and black on light surfaces. Business and product CTAs are black on light sections. Focus, selection, hover and form states use neutral colors.

## Industry product carousel

Added below BusinessServices, using the user's Nova recording and pastel panel reference. Seven industry tabs organize the supplied product catalog. A single horizontal row shows four cards on desktop, two on tablets, and one with a next-card preview on phones. Native scroll snapping, previous/next controls, a visible range counter, keyboard navigation and touch scrolling keep every product reachable. Selecting an industry resets its carousel. No second row is rendered.

Large product scenes fill the pastel frames with deliberate edge cropping. Inspira UI Globe, AnimatedList and AnimatedBeam components are adapted in src/components/inspira, with the upstream MIT license. A Cobe globe rotates in the domain card; SMS and email activity loops through illustrative messages; animated paths connect branches and POS stock. Other previews retain booking confirmations, app reminders and chat sequences. Motion pauses outside view and in background tabs and respects reduced motion. Existing Manrope and vw spacing remain.

Catalog content and configurable product destinations live in src/data/industryCatalog.js. Domain actions focus the existing search. Other actions display an inline coming-soon message until their VITE_*_URL is configured. No placeholder pricing is published. The Salon & Spa package uses the existing SpecularButton.

Verified all seven tab contents, a single row at desktop and mobile widths, carousel controls and boundaries, tab resets, animated notification updates, reduced-motion stopping, and no overflow at 320, 390, 768 and 1440 pixels. Desktop, mobile and both hero themes were reviewed in Chrome.

## White and blue gradient-bar hero — November 14

The user's supplied GradientBars React component is the authority for this replacement hero. Its fifteen bars form a U-shaped silhouette. The latest supplied palette moves from cobalt #0d47a1, ocean #1565c0 and blue #1976d2 at the base through #1e88e5, #2196f3, #42a5f5 and #64b5f6, then #90caf9, #bbdefb and #e3f2fd toward white. Each bar ends in a translucent glass cap with a white rim, diagonal reflection and bounded backdrop blur. This supersedes the earlier dark-only hero and neutral palette for the header and hero. Other sections retain their existing surfaces.

The supplied component is adapted to native Vue in src/components/ui/GradientBarHero.vue; no React runtime, waitlist form, fake customer counts or new font family is introduced. Existing Manrope, navigation, domain search and black buttons remain. The header and resting hero share one viewport. White clearance keeps the headline and search legible, and the blue reaches the lower edge of the hero. On mobile the colored bars start lower to preserve a clear reading area.

The bars arrive once over 2.8 seconds with a center-out stagger, then stay still. Motion pauses offscreen and in background tabs, and reduced motion displays the completed static composition. The old PrismSteps and GradientBackdrop source files remain available. The theme switch remains hidden.

## Hero refinement - November 14

Retain the fifteen blue glass bars as the signature visual. The Manrope headline uses weight 450, 5.3vw capped at 84px, tight tracking and a 1.12 line height. The search surface uses a restrained cool shadow, readable 15px input and 12px supporting labels. Black buttons retain visible deep-ink focus rings on the white background. Keep the header plus resting hero within one viewport; allow results to expand the section. The bottom glass-bar colors dissolve into a shared icy-blue surface before the description, preserving natural scrolling and avoiding a hard color seam.

## Glass separators and avatar pill

Narrow translucent seams between the fifteen bars add frosted refraction, a fine white highlight and restrained blue shadow. The seams taper into the existing icy-blue transition. A native Vue adaptation of the supplied avatar pill sits above the heading: four locally served decorative Unsplash portraits, white overlapping rims, a silver border, and the label "For people with big ideas". No customer count or endorsement is asserted. Failed images use a neutral person icon. Desktop composition starts higher to leave room for the pill; mobile preserves readable search and headline spacing.

## Emil design-engineering refinement

Headline and supporting sentence enter as one group (600ms, 12px, strong ease-out); the search follows at 90ms (500ms, 6px). Their parent, header, avatar pill and hosting link stay still. No child stagger inside the search. Focusing the search permanently finishes its entrance so keyboard users can act immediately without replays. The bars preserve the requested slow arrival (2.2s), with shrinking center-out delays of 0/70/125/170/205/230/250/260ms and only 36px travel, scale .96 to 1. Blue tones mirror around the center. Thinner cap highlights and softened refractive seams replace the heavy glass outlines. Pill and search use translucent shadow outlines. Button press feedback is 160ms; hover movement is restricted to fine pointers. Reduced motion collapses the entrance to its final state.

Desktop bar density: 25 columns at widths of 1024px and above, retaining 15 on tablet and mobile. The same mirrored U silhouette, glass seams, and 260ms maximum entrance stagger adapt to both counts.

## Sections two and three - service explorer revision

Section two now separates the main brand statement from its supporting sentence. Its scroll reveal changes text color only; three functional links lead to domain search, business services and industry tools. The shared icy-blue to silver transition remains, with generous 9.5vw vertical space.

Section three replaces the small-photo rows with four exclusive, collapsible service panels and one large photographic preview. Native buttons expose expanded state and control labelled detail regions; keyboard changes are immediate. The preview retains the selected illustration when a panel closes. Locally hosted photography and a frosted feature summary show booking, commerce, food and CRM tools without invented metrics or customer claims. Keep black text, black CTAs, quiet column guides, Manrope and vw spacing. Desktop uses two columns; mobile stacks the service list and visual. No auto-rotation, entrance stagger, scroll pinning or delayed keyboard interaction. Signup and plans retain configured URLs or explicit coming-soon feedback.

## Shared type and blue glass card surfaces

All four primary marketing headings/statements use --type-heading from src/typography.css: 5.3vw with a 96px desktop cap and a shared mobile/short-screen scale. All primary descriptions and product-card body copy use --type-description (1.2vw, 15-20px desktop; 16px mobile). Controls and miniature illustrative UI retain their own smaller roles. The second statement now uses a 1440px maximum width and the same heading scale rather than its previous 44px cap. Last-section product and package previews share nine static, low-opacity blue glass bars over an icy-blue surface via GlassBarBackdrop.vue. Keep four desktop cards in one carousel row and all existing preview motion.

Typography correction: matching every heading to the hero was too large. Use separate shared roles: hero capped at 80px, section headings 56px, statement 48px, and body 17px. Mobile uses 30px+ section headings, 24px+ statement and 15px body. Card glass bars use 72% opacity with visible sky-to-ocean blue faces and white edges, replacing the overly faint 34% treatment.

Card background revision: replace stepped glass bars with OrbitalCardBackdrop.vue, a deep cobalt gradient, fine luminous elliptical arcs, faint perspective grid and diagonal glass reflection. Keep the treatment static behind existing product animation. Exposed brand labels and package copy use white for contrast; product windows retain light surfaces.

Card background correction: orbital treatment rejected. Use overlapping frosted vertical glass panels at staggered heights over mixed ice, sky and cobalt blue gradients, with translucent white bevels and subtle background variations per card. Keep exposed labels navy and product interfaces light.

Card glass refinement: increase to 15 narrower overlapping panels at 46% opacity. Use muted sapphire (#718dc7), silver-blue (#b9c9e5), and porcelain (#f3f5fa), with softer white bevels; avoid the previous saturated sky-blue cast.

Reference correction: the user's lock-screen image specifies continuous fluted/ribbed glass, not staggered rectangular panels. Card backgrounds now use 18 full-height ribs sampling shifted slices of a shared sky-blue/true-blue color field, with curved white highlights and darker refractive edges. No stepped tops, orbital rings or muted lavender palette.

Product demo refinement: strengthen the continuous glass ribs with brighter curved bevels, deeper refractive edges and a static diagonal reflection. Product previews show four readable stages at 1.8-second intervals: booking selection and confirmation, app rebooking, sale and stock sync, lead follow-up, QR order confirmation and chat replies. Keep the existing Cobe globe, notification lists and connection beams. Activity is explicitly illustrative, not connected business data. Pause all previews when offscreen, the document is hidden or the user pauses them. Reduced motion shows completed static states. Provide one Pause/Play demos control. Hosting includes a labelled demo activity graph. Verified production build, phase progression, pause/resume, reduced motion, seven tabs and mobile overflow.

Sections two and three, connected-business revision: section two now uses an asymmetric brand statement and three functional steps from domain to website to business tools. Retain color-only scroll reveal. Section three replaces the accordion/photo layout with a connected customer website and business operations preview, switchable between bookings, commerce and food ordering. Keep preview business names and activity explicitly illustrative. Use keyboard-accessible tabs, existing SpecularButton, black CTAs, Manrope and existing type roles. Section backgrounds transition from the hero blue to white, then into the fourth section's off-white. All three sections use shared --section-gutter (5vw desktop, 6vw mobile) and --section-width (1680px). Production build and desktop/mobile browser checks passed for tabs, CTA feedback, matching alignment and overflow. 21st CLI unavailable due environment EACCES; no catalog components claimed or installed.

Third section editorial revision: keep the approved second section unchanged. Replace the side-by-side website/operations tab demo with three always-visible business stories in unequal columns and staggered heights. Booking and commerce use existing local photography with small frosted product illustrations; customer relationships use a blue ribbed-glass conversation scene. Keep concise benefit copy outside the visuals, black CTAs, shared Manrope type, and section-four gutters. Tablet uses two columns plus a horizontal relationship story; mobile stacks the stories. No new automatic motion, duplicate product tabs or simulated metrics. Verified 320/390/768/1024/1920 widths, no clipped chat, aligned gutters and CTA feedback.

Marketing motion: useSiteMotion adds one-shot heading wipes (600ms), booking date emphasis (400ms at 200ms) followed by confirmation (400ms at 550ms), an order notification (600ms at 150ms), and a conversation sequence (message 400ms, reply at 500ms, CRM acknowledgement at 850ms). Existing hero and second-section motion remain. Native WAAPI uses the existing hero ease-out token; only transform/opacity and heading clip-path animate. Scene containers, photos, descriptive text and controls stay still. IntersectionObserver pauses unfinished sequences offscreen; document visibility pauses them in background; reduced motion restores final states immediately. Finished animations release their effects and never replay. CSS arrow feedback is pointer-gated, excludes keyboard focus and respects reduced motion. No added dependencies. Build and browser checks passed for sequence ordering, replay prevention, reduced motion, hover and mobile layout.

Site-wide GSAP scroll layer: usePageScrollMotion coordinates hero bar depth on scroll exit, section-two aside/navigation entrances, section-three heading/support/captions, subtle photographic parallax and the initial catalogue descriptions. Preserve the original hero entrance, second-section word-color reveal and product demo sequences. Heading wipes move from WAAPI to GSAP to prevent competing animations. Scroll entrances run once, use the existing ease-out token through CustomEase, and clear inline styles on completion. Desktop-only parallax uses transform with scrub; mobile omits parallax. Keep native scrolling without pinning. Keyboard focus immediately completes any containing entrance. matchMedia/context cleanup restores final styles for reduced motion; resize/font/layout changes refresh triggers. Verified all four sections, reduced-motion changes, desktop/mobile layout, tabs and CTA interactions; production build passes.
