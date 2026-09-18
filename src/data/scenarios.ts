// ──────────────────────────────────────────────
// AFTERLIGHT — Scenario Room Configurations
// ──────────────────────────────────────────────

export interface ScenarioConfig {
  id: string;
  name: string;
  subtitle: string;
  capacity: number;
  layout: string;
  window: string;
  description: string;
  features: string[];
  color: string;
}

export const SCENARIOS: ScenarioConfig[] = [
  {
    id: 'skills',
    name: 'Evening Skills Program',
    subtitle: 'EDUCATION / 60 SEATS',
    capacity: 60,
    layout: 'classroom',
    window: '20:00 — 22:30',
    description: 'Rows of desks face a presentation wall. Warm downlights. A projector hums.',
    features: ['Presentation wall', 'Individual desks', 'Wi-Fi access', 'Climate controlled'],
    color: '#F4B860',
  },
  {
    id: 'dinner',
    name: 'Community Dinner',
    subtitle: 'COMMUNITY / 80 SEATS',
    capacity: 80,
    layout: 'banquet',
    window: '20:00 — 23:00',
    description: 'Round tables fill the space. String lights. The kitchen is already here.',
    features: ['Round tables', 'Kitchen access', 'Ambient lighting', 'Service entrance'],
    color: '#FFD58A',
  },
  {
    id: 'workshop',
    name: 'Creator Workshop',
    subtitle: 'WORKSHOP / 30 SEATS',
    capacity: 30,
    layout: 'studio',
    window: '21:00 — 23:00',
    description: 'Workbenches arranged in clusters. Tools mounted on walls. Natural ventilation.',
    features: ['Workbenches', 'Tool storage', 'Power outlets', 'Ventilation'],
    color: '#B8D8C0',
  },
  {
    id: 'market',
    name: 'Night Market',
    subtitle: 'MARKET / 100 CAPACITY',
    capacity: 100,
    layout: 'open',
    window: '20:00 — 00:00',
    description: 'Vendor stalls line the perimeter. Central aisle. Street-facing entrance opens.',
    features: ['Vendor bays', 'Central aisle', 'Street access', 'Electrical hookups'],
    color: '#D8A76A',
  },
];
