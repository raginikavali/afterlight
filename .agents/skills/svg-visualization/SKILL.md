# SVG CITY VISUALIZATION

Build the fictional district from structured data.

Each building should have:
id
x
y
width
height
type
capacity
availableFrom
availableTo
access
permittedUses
distanceToNeeds

Render:
- blocks
- roads
- intersections
- building footprints
- outlines
- tiny labels
- activity points
- available-space glow

Do not use Google Maps, Mapbox, stock maps, or raster city images.

All visual states must derive from currentTime.

Use SVG transforms and opacity/brightness for smooth transitions.

Keep the dataset deterministic so browser tests are repeatable.
