// ──────────────────────────────────────────────
// AFTERLIGHT — Demand / Needs Dataset
// SIMULATED DISTRICT / ILLUSTRATIVE DATA
// ──────────────────────────────────────────────

export interface Need {
  id: string;
  name: string;
  requiredCapacity: [number, number]; // min, max
  duration: number; // minutes
  preferredTypes: string[];
  requiredAccess: ('public' | 'controlled' | 'staff-only')[];
  /** [startMinutes, endMinutes] from 18:00 base */
  permittedWindow: [number, number];
  location: { x: number; y: number };
  maxDistance: number; // km
  description: string;
}

export const NEEDS: Need[] = [
  {
    id: 'need-01',
    name: 'Evening Skills Program',
    requiredCapacity: [60, 80],
    duration: 150, // 2h 30m
    preferredTypes: ['classroom', 'community-hall', 'community-room'],
    requiredAccess: ['public', 'controlled'],
    permittedWindow: [120, 360], // 20:00 – 00:00
    location: { x: 150, y: 250 },
    maxDistance: 0.5,
    description: 'Adult education program requiring classroom-style seating with presentation capabilities.',
  },
  {
    id: 'need-02',
    name: 'Community Dinner',
    requiredCapacity: [80, 120],
    duration: 180, // 3h
    preferredTypes: ['community-hall', 'cultural', 'retail'],
    requiredAccess: ['public'],
    permittedWindow: [120, 420], // 20:00 – 01:00
    location: { x: 300, y: 200 },
    maxDistance: 0.4,
    description: 'Weekly neighborhood gathering requiring open floor plan with kitchen proximity.',
  },
  {
    id: 'need-03',
    name: 'Creator Workshop',
    requiredCapacity: [20, 40],
    duration: 120, // 2h
    preferredTypes: ['studio', 'coworking', 'classroom'],
    requiredAccess: ['public', 'controlled'],
    permittedWindow: [180, 480], // 21:00 – 02:00
    location: { x: 420, y: 350 },
    maxDistance: 0.6,
    description: 'Hands-on creative session requiring flexible furniture and good lighting.',
  },
  {
    id: 'need-04',
    name: 'Night Market',
    requiredCapacity: [100, 200],
    duration: 240, // 4h
    preferredTypes: ['retail', 'community-hall', 'cultural'],
    requiredAccess: ['public'],
    permittedWindow: [120, 480], // 20:00 – 02:00
    location: { x: 280, y: 150 },
    maxDistance: 0.3,
    description: 'Pop-up vendor event requiring open floor space, electrical access, and street visibility.',
  },
];
