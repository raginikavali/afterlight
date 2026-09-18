# INTERACTION AND MOTION

Motion must communicate causality.

Motion language:
CITY = slow
DATA = quick
USER ACTION = immediate
IMPORTANT EVENT = pause/light
TRANSITION = physical

Preferred:
- transform and opacity
- SVG path drawing
- subtle scale
- brightness/glow transitions
- masked typography reveals
- timeline interpolation
- scroll-triggered state changes
- restrained parallax

Avoid:
- bounce everywhere
- constant looping animation
- excessive particle effects
- spinning UI
- random floating objects
- huge blur transitions

Key interactions:
1. Time scrubber changes building states.
2. Hovering a building reveals architectural metadata.
3. Clicking a building opens inspection.
4. Valid matching draws a connection line and pulse.
5. Invalid matching explains why it is blocked.
6. Scenario selection transforms the same room.
7. Operator review changes match state.
8. Final scroll leaves one building illuminated.

Implement reduced-motion behavior with prefers-reduced-motion.
