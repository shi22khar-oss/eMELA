export type ZoneId = 'wheel' | 'stage' | 'games' | 'food' | 'bazaar';
export type ExperienceCategory = 'Rides' | 'Flavours' | 'Craft';
export type EventCategory = 'Music' | 'Dance' | 'Family';

export interface Zone {
  id: ZoneId;
  name: string;
  shortName: string;
  category: string;
  description: string;
  duration: string;
  bestTime: string;
  goodToKnow: string;
  position: { x: number; y: number };
}

export interface Experience {
  id: ZoneId;
  category: ExperienceCategory;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  note: string;
  accent: 'saffron' | 'rose' | 'mint';
}

export interface FairEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  category: EventCategory;
  duration: string;
}

export interface PlanEntry {
  id: string;
  title: string;
  meta: string;
  kind: 'place' | 'event';
}

export interface MelaPass {
  id: string;
  name: string;
  guests: number;
}
