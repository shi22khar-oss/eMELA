import type { Experience, FairEvent, Zone } from './types';

export const asset = (filename: string) => `${import.meta.env.BASE_URL}images/${filename}`;

export const zones: Zone[] = [
  {
    id: 'wheel',
    name: 'The Sky-High Wheel',
    shortName: 'The Wheel',
    category: 'Rides & little thrills',
    description:
      'The classic mela view, without the wait. Watch the fair light up beneath you and find a quiet moment above all the happy commotion.',
    duration: '12 min experience',
    bestTime: 'Best at sunset',
    goodToKnow: 'A gentle experience for all ages',
    position: { x: 76, y: 25 },
  },
  {
    id: 'stage',
    name: 'The Centre Stage',
    shortName: 'Centre Stage',
    category: 'Music & performances',
    description:
      'Follow the dhol and you will find us. Folk rhythms, contemporary sounds, and spontaneous dancing come together under one very colourful roof.',
    duration: 'Daily from 5 PM',
    bestTime: 'Liveliest after dark',
    goodToKnow: 'Drop in whenever the music moves you',
    position: { x: 43, y: 30 },
  },
  {
    id: 'games',
    name: 'The Game Alley',
    shortName: 'Game Alley',
    category: 'Games & playful competition',
    description:
      'Ring toss, lucky spins, and the timeless belief that your next try is the winning one. Bring your best aim and your most gracious victory dance.',
    duration: 'Play at your pace',
    bestTime: 'Fun all evening',
    goodToKnow: 'Easy to play, hard to leave',
    position: { x: 20, y: 25 },
  },
  {
    id: 'food',
    name: 'The Food Street',
    shortName: 'Food Street',
    category: 'Flavours & food stories',
    description:
      'Hot jalebis, tangy chaat, smoky tikkas, and recipes with a story. Meet the flavours that make every mela deliciously unforgettable.',
    duration: 'A delicious detour',
    bestTime: 'Come hungry',
    goodToKnow: 'Something for every appetite',
    position: { x: 23, y: 70 },
  },
  {
    id: 'bazaar',
    name: 'The Artisan Bazaar',
    shortName: 'The Bazaar',
    category: 'Craft & handmade treasures',
    description:
      'Wander through colour, texture, and craft. Discover the hands behind handwoven textiles, terracotta keepsakes, bangles, and beautiful little things.',
    duration: 'Browse at your pace',
    bestTime: 'Every corner has a story',
    goodToKnow: 'Meet makers and their craft',
    position: { x: 73, y: 73 },
  },
];

export const experiences: Experience[] = [
  {
    id: 'wheel',
    category: 'Rides',
    title: 'A little closer to the stars',
    description:
      'Take the scenic route. Our favourite wheel serves up golden-hour views and just enough butterflies.',
    image: asset('ferris-wheel.webp'),
    imageAlt: 'An ornate Ferris wheel glowing above a colourful evening fair',
    note: 'Slow views. Big feelings.',
    accent: 'saffron',
  },
  {
    id: 'food',
    category: 'Flavours',
    title: 'Follow something delicious',
    description:
      'One more bite is always a good idea. Explore beloved mela flavours and the people who make them special.',
    image: asset('food-stall.webp'),
    imageAlt: 'A joyful food vendor making fresh jalebi at a warmly lit stall',
    note: 'Come curious. Leave happy.',
    accent: 'rose',
  },
  {
    id: 'bazaar',
    category: 'Craft',
    title: 'Take a story home',
    description:
      'Meet handmade treasures and their makers. Every weave, brushstroke, and tiny imperfection has a tale.',
    image: asset('artisan-bazaar.webp'),
    imageAlt: 'A colourful artisan lane filled with textiles, bangles, lamps, and pottery',
    note: 'Made by hand. Loved for keeps.',
    accent: 'mint',
  },
];

export const events: FairEvent[] = [
  {
    id: 'dhol-opening',
    time: '4:30 PM',
    title: 'Dhol at the Door',
    description: 'A high-energy welcome led by traditional dhol performers.',
    category: 'Music',
    duration: '25 min',
  },
  {
    id: 'little-stars',
    time: '5:15 PM',
    title: 'Little Stars, Big Stories',
    description: 'An interactive storytelling session for young dreamers.',
    category: 'Family',
    duration: '35 min',
  },
  {
    id: 'folk-fusion',
    time: '6:00 PM',
    title: 'Folk, With a Twist',
    description: 'Classical melodies meet a wonderfully modern groove.',
    category: 'Music',
    duration: '45 min',
  },
  {
    id: 'ghungroo',
    time: '7:00 PM',
    title: 'Ghungroo & Groove',
    description: 'A joyful celebration of movement, rhythm, and expression.',
    category: 'Dance',
    duration: '35 min',
  },
  {
    id: 'family-antakshari',
    time: '8:00 PM',
    title: 'The Great Family Antakshari',
    description: 'All generations welcome. Knowing the lyrics is optional.',
    category: 'Family',
    duration: '40 min',
  },
  {
    id: 'moonlight-finale',
    time: '9:15 PM',
    title: 'The Moonlight Finale',
    description: 'One last singalong under a sky full of fair lights.',
    category: 'Music',
    duration: '50 min',
  },
];
