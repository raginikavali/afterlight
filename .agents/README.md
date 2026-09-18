# AFTERLIGHT — Antigravity / Claude Opus 4.6 Build Pack

Purpose: a focused agent-skill pack for building the AFTERLIGHT frontend internship submission.

Recommended stack:
- React + TypeScript
- Tailwind CSS
- Framer Motion
- SVG for the simulated city
- Playwright MCP for browser verification

How to use:
1. Put the `skills/` folder where your Antigravity/agent workflow loads project skills, or copy the individual SKILL.md files into the project's skill location.
2. Keep `rules/afterlight-rules.md` available to the agent as project-level guidance.
3. Start with `prompts/initial-build.md` after providing the internship assignment PDF and the master build prompt.
4. After the first working build, run the audit prompts one at a time.
5. If Playwright MCP is available, use it for actual browser interaction and regression checks.

Important:
- The internship assignment remains the source of truth for submission constraints.
- AFTERLIGHT is a concept prototype. Never invent customers, partnerships, ROI, deployment results, or testimonials.
- Any simulated metrics must be explicitly labeled.
- Do not replace core interactions with decorative animation.
