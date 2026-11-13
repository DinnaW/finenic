# finenic — Prism steps revision

Visual authority: the user-supplied black hero screenshot with nine stepped columns and thin iridescent upper edges. This supersedes the prior Aurora direction. Preserve finenic, Manrope, Vue, Tailwind and the centered domain search.

Full-width black canvas #030303; white display text #F7F7F7; secondary text #A6A6A6; dark form #141414; white search button #F5F5F5. Nine black columns descend symmetrically toward the center. Their upper edges use narrow spectral highlights, with faint vertical seams. Desktop display text 68px, weight 450, tracking -0.04em; mobile 35–52px. The form is centered at a maximum 640px. No testimonial or customer logos are invented.

Motion for Vue animates the columns and content into place once, with reduced-motion support. The composition is static after the entrance. Mobile steps move below the main content. Existing navigation and domain validation remain functional; availability and pricing remain unconnected.

Validation: production build and domain unit tests. Browser visual QA is unverified because browser-control tools are not exposed in this environment.

## Brand statement below the hero - November 2026

Current authority: the user-provided SwiftHost reference. The previous cinema and white carousel sections have been replaced by a single black section with a centered description.

- Copy: Finenic brings your domains, websites and business apps together. One place to launch your idea and grow your business.
- Manrope at 4.25vw, capped at 78px on desktop; 26-39px on mobile. Three wider composed lines on desktop, a 1600px maximum composition, 5vw side spacing, and natural wrapping on small screens.
- The supplied MP4 fills a larger 4:5 portrait frame using a centered crop. It sits behind the first two lines and extends above the paragraph. Difference blending affects only the text glyphs, preserving the reference's inverted overlap.
- GSAP changes the words progressively from muted silver to bright silver on scroll. The video gently settles into place. Native page scrolling remains intact.
- The film loops muted while visible. Reduced motion disables automatic playback and scroll effects, leaving a static poster and bright text.
- Verified in headless Chrome at 1440px, 390px and 320px: no horizontal overflow, old sections removed, video playing, no runtime errors, and reduced-motion playback stopped. Production build passes.

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
