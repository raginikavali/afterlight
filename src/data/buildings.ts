// ──────────────────────────────────────────────
// AFTERLIGHT — Building Dataset
// SIMULATED DISTRICT / ILLUSTRATIVE DATA
// ──────────────────────────────────────────────

export interface Building {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  capacity: number;
  /** Minutes from 18:00 (0 = 18:00, 60 = 19:00, ..., 720 = 06:00) */
  availableFrom: number;
  /** Minutes from 18:00 */
  availableTo: number;
  access: 'public' | 'controlled' | 'staff-only';
  permittedUses: string[];
  distanceToNeeds: number; // km
  floors: number;
}

export const BUILDINGS: Building[] = [
  {
    id: '001',
    name: 'Central Library',
    type: 'library',
    x: 120, y: 80,
    width: 70, height: 50,
    capacity: 200,
    availableFrom: 120, // 20:00
    availableTo: 600,   // 04:00
    access: 'public',
    permittedUses: ['community', 'education', 'cultural'],
    distanceToNeeds: 0.2,
    floors: 3,
  },
  {
    id: '003',
    name: 'Civic Center Hall',
    type: 'community-hall',
    x: 260, y: 60,
    width: 80, height: 45,
    capacity: 150,
    availableFrom: 60,  // 19:00
    availableTo: 660,   // 05:00
    access: 'public',
    permittedUses: ['community', 'cultural', 'market'],
    distanceToNeeds: 0.3,
    floors: 2,
  },
  {
    id: '005',
    name: 'Tech Hub Cowork',
    type: 'coworking',
    x: 420, y: 90,
    width: 55, height: 40,
    capacity: 60,
    availableFrom: 180, // 21:00
    availableTo: 540,   // 03:00
    access: 'controlled',
    permittedUses: ['education', 'workshop'],
    distanceToNeeds: 0.5,
    floors: 4,
  },
  {
    id: '007',
    name: 'District School',
    type: 'classroom',
    x: 100, y: 200,
    width: 75, height: 55,
    capacity: 90,
    availableFrom: 60,  // 19:00
    availableTo: 600,   // 04:00
    access: 'controlled',
    permittedUses: ['education', 'community', 'workshop'],
    distanceToNeeds: 0.4,
    floors: 2,
  },
  {
    id: '009',
    name: 'Market Pavilion',
    type: 'retail',
    x: 300, y: 190,
    width: 65, height: 50,
    capacity: 120,
    availableFrom: 120, // 20:00
    availableTo: 540,   // 03:00
    access: 'public',
    permittedUses: ['market', 'cultural', 'community'],
    distanceToNeeds: 0.1,
    floors: 1,
  },
  {
    id: '011',
    name: 'Corporate Tower A',
    type: 'office',
    x: 460, y: 180,
    width: 50, height: 65,
    capacity: 180,
    availableFrom: 120, // 20:00
    availableTo: 480,   // 02:00
    access: 'staff-only',
    permittedUses: ['workshop'],
    distanceToNeeds: 0.7,
    floors: 12,
  },
  {
    id: '014',
    name: 'Office Lobby',
    type: 'office-lobby',
    x: 180, y: 300,
    width: 60, height: 45,
    capacity: 86,
    availableFrom: 120, // 20:00
    availableTo: 720,   // 06:00
    access: 'controlled',
    permittedUses: ['community', 'education'],
    distanceToNeeds: 0.4,
    floors: 1,
  },
  {
    id: '016',
    name: 'Cultural Center',
    type: 'cultural',
    x: 350, y: 310,
    width: 70, height: 50,
    capacity: 100,
    availableFrom: 0,   // 18:00
    availableTo: 720,   // 06:00
    access: 'public',
    permittedUses: ['community', 'cultural', 'education', 'market'],
    distanceToNeeds: 0.2,
    floors: 2,
  },
  {
    id: '018',
    name: 'Sports Facility',
    type: 'sports',
    x: 500, y: 300,
    width: 65, height: 55,
    capacity: 70,
    availableFrom: 180, // 21:00
    availableTo: 420,   // 01:00
    access: 'controlled',
    permittedUses: ['community', 'workshop'],
    distanceToNeeds: 0.6,
    floors: 1,
  },
  {
    id: '020',
    name: 'Residential Commons',
    type: 'community-room',
    x: 60, y: 380,
    width: 50, height: 40,
    capacity: 40,
    availableFrom: 120, // 20:00
    availableTo: 660,   // 05:00
    access: 'controlled',
    permittedUses: ['community', 'education'],
    distanceToNeeds: 0.3,
    floors: 1,
  },
  {
    id: '022',
    name: 'University Annex',
    type: 'classroom',
    x: 240, y: 400,
    width: 65, height: 50,
    capacity: 110,
    availableFrom: 90,  // 19:30
    availableTo: 600,   // 04:00
    access: 'controlled',
    permittedUses: ['education', 'workshop', 'community'],
    distanceToNeeds: 0.3,
    floors: 3,
  },
  {
    id: '024',
    name: 'Wellness Studio',
    type: 'studio',
    x: 430, y: 400,
    width: 45, height: 35,
    capacity: 30,
    availableFrom: 180, // 21:00
    availableTo: 540,   // 03:00
    access: 'public',
    permittedUses: ['workshop', 'community', 'cultural'],
    distanceToNeeds: 0.5,
    floors: 1,
  },
];

// Roads for the district map
export interface Road {
  x1: number; y1: number;
  x2: number; y2: number;
  width: number;
}

export const ROADS: Road[] = [
  // Horizontal roads
  { x1: 0, y1: 155, x2: 600, y2: 155, width: 12 },
  { x1: 0, y1: 275, x2: 600, y2: 275, width: 14 },
  { x1: 0, y1: 370, x2: 600, y2: 370, width: 10 },
  // Vertical roads
  { x1: 210, y1: 0, x2: 210, y2: 480, width: 12 },
  { x1: 395, y1: 0, x2: 395, y2: 480, width: 12 },
];
