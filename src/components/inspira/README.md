# Inspira UI adaptations

Globe, AnimatedList and AnimatedBeam were downloaded from the Inspira UI registry on 2026-11-13:

- https://inspira-ui.com/r/globe.json
- https://inspira-ui.com/r/animated-list.json
- https://inspira-ui.com/r/animated-beam.json

Upstream: https://github.com/unovue/inspira-ui (MIT, included in LICENSE).

Adaptations use this project's Vue/JavaScript and Motion for Vue setup, without the Nuxt/plugin helpers. Motion pauses offscreen, in background tabs and for reduced motion. The list uses a bounded, cleaned-up timer; beams observe their container; the globe uses Cobe 0.6.5 with monochrome colors and a static fallback. These are illustrative product scenes, not live customer activity.
