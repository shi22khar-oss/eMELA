export type FairStopId = 'wheel' | 'games' | 'food' | 'craft' | 'stage';
export type FairStopIcon = 'wheel' | 'games' | 'food' | 'craft' | 'stage';

export interface FairStop {
  id: FairStopId;
  name: string;
  action: string;
  icon: FairStopIcon;
  position: { x: number; y: number };
}
