import type { FairStop } from './types';

export const asset = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

export const fairStops: FairStop[] = [
  {
    id: 'wheel',
    name: 'Sky-High Wheel',
    action: 'Take a ride',
    icon: 'wheel',
    position: { x: 79, y: 27 },
  },
  {
    id: 'games',
    name: 'Game Alley',
    action: 'Play now',
    icon: 'games',
    position: { x: 18, y: 60 },
  },
  {
    id: 'food',
    name: 'Jalebi Counter',
    action: 'Make a treat',
    icon: 'food',
    position: { x: 44, y: 73 },
  },
  {
    id: 'craft',
    name: 'Diya Studio',
    action: 'Paint & light',
    icon: 'craft',
    position: { x: 68, y: 76 },
  },
  {
    id: 'stage',
    name: 'Centre Stage',
    action: 'Feel the beat',
    icon: 'stage',
    position: { x: 43, y: 39 },
  },
];
