import { Music2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { StringLights } from './StringLights';

interface StageSectionProps {
  soundOn: boolean;
  onToggleSound: () => void;
}

export function StageSection({ soundOn, onToggleSound }: StageSectionProps) {
  return (
    <section className={`stage-section ${soundOn ? 'is-playing' : ''}`} id="stage" aria-labelledby="stage-title">
      <StringLights count={24} />
      <div className="stage-section__beam stage-section__beam--left" aria-hidden="true" />
      <div className="stage-section__beam stage-section__beam--right" aria-hidden="true" />
      <div className="shell stage-section__content">
        <p className="eyebrow eyebrow--light"><Music2 size={16} aria-hidden="true" /> Live from Centre Stage</p>
        <h2 id="stage-title">Follow the dhol.<br /><em>Find your rhythm.</em></h2>
        <p>Switch on a playful instrumental soundscape with a gentle beat and fairground melody, generated live in your browser. Sound is always your choice.</p>
        <button className="button button--sun button--large" type="button" onClick={onToggleSound} aria-pressed={soundOn}>
          {soundOn ? <VolumeX size={19} aria-hidden="true" /> : <Volume2 size={19} aria-hidden="true" />}
          {soundOn ? 'Pause the mela music' : 'Play the mela music'}
        </button>
        <div className="stage-equalizer" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => <span key={index} style={{ animationDelay: `${index * -0.09}s` }} />)}
        </div>
        <small><Sparkles size={13} aria-hidden="true" /> Headphones optional. A little dancing encouraged.</small>
      </div>
    </section>
  );
}
