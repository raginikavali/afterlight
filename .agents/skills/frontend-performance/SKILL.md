# FRONTEND PERFORMANCE

Prioritize smooth interaction.

Prefer:
- SVG over large raster assets
- CSS transforms for animation
- opacity/transform transitions
- lightweight local data
- minimal dependencies

Avoid:
- unnecessary WebGL
- giant images
- expensive continuous JS loops
- layout thrashing
- needless network requests

Check:
- initial render
- scroll smoothness
- timeline responsiveness
- SVG update cost
- mobile performance

If an effect is expensive and decorative, remove it.
