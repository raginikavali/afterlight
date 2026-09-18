# PREMIUM FRONTEND

Build like a senior product engineer.

Requirements:
- React + TypeScript
- reusable components
- clear state ownership
- deterministic local data
- semantic HTML
- maintainable Tailwind/CSS
- no giant monolithic component
- no duplicated interaction logic

Treat visual state as real product state.

Important states:
currentTime
selectedBuilding
selectedScenario
selectedNeed
selectedConstraints
matchResult
operatorDecision

Do not create fake animations that contradict application state.

Keep components composable:
Navigation
Hero
CityMap
TimeScrubber
CityStats
BuildingInspector
InsightSection
DistrictSimulation
DemandPanel
MatchVisualizer
ScenarioRoom
ConstraintPanel
OperatorReview
SystemModel
PilotSection
FinalCTA

Use constants/data files for simulated district data.

Avoid overengineering. No backend is required unless the project already demands it.
