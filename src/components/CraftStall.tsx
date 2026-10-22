import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Flame, Palette, Sparkles } from 'lucide-react';
import { asset } from '../data';

const colours = [
  { name: 'Gulabi pink', value: '#d85478' },
  { name: 'Haldi yellow', value: '#e9a832' },
  { name: 'Neem green', value: '#3d8b74' },
  { name: 'Neel blue', value: '#526fa9' },
];
const patterns = ['dots', 'stripes', 'stars'] as const;
type Pattern = typeof patterns[number];

export function CraftStall() {
  const [colour, setColour] = useState(colours[0]);
  const [pattern, setPattern] = useState<Pattern>('dots');
  const [lit, setLit] = useState(false);

  return (
    <article className="stall-card stall-card--craft" id="craft" aria-labelledby="craft-title">
      <div className="stall-card__image">
        <img
          src={asset('artisan-bazaar.webp')}
          srcSet={`${asset('artisan-bazaar-640.webp')} 640w, ${asset('artisan-bazaar.webp')} 928w`}
          sizes="(max-width: 900px) 100vw, 50vw"
          alt="A colourful artisan lane filled with textiles, bangles, lamps, and pottery"
          width="928"
          height="1152"
          loading="lazy"
        />
        <span><Palette size={16} aria-hidden="true" /> Artisan bazaar · Made by hand</span>
      </div>
      <div className="stall-card__body">
        <p className="eyebrow"><Palette size={15} aria-hidden="true" /> The diya studio</p>
        <h3 id="craft-title">Paint a little light of your own.</h3>
        <p>Pick a colour, add a pattern, then light your diya. A tiny creative corner inspired by the artisans of the mela.</p>

        <div className="stall-activity craft-activity">
          <div className={`diya-preview ${lit ? 'is-lit' : ''}`} style={{ '--diya-colour': colour.value } as CSSProperties}>
            <div className="diya-preview__glow" aria-hidden="true" />
            <svg viewBox="0 0 260 190" role="img" aria-label={`${colour.name} diya with ${pattern} pattern${lit ? ', glowing brightly' : ''}`}>
              <path className="diya__flame" d="M130 73C105 50 132 21 136 8c25 34 21 53-6 65Z" fill="#ffc94f" />
              <path d="M128 78q2-17 8-26" fill="none" stroke="#3b2432" strokeWidth="4" strokeLinecap="round" />
              <path className="diya__bowl" d="M34 82h192c-8 69-46 91-96 91S42 151 34 82Z" fill="var(--diya-colour)" stroke="#762f3f" strokeWidth="5" />
              <path d="M34 82q96 35 192 0" fill="none" stroke="#ffd77c" strokeWidth="7" />
              <g className="diya__pattern" fill="#ffe8a6" stroke="#ffe8a6" strokeWidth="4">
                {pattern === 'dots' && [70, 100, 130, 160, 190].map((x) => <circle key={x} cx={x} cy={116 + Math.abs(130 - x) / 7} r="5" />)}
                {pattern === 'stripes' && [64, 94, 124, 154, 184].map((x) => <path key={x} d={`M${x} 101l10 38`} />)}
                {pattern === 'stars' && [70, 105, 140, 175].map((x) => <path key={x} d={`M${x} 106l4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1Z`} stroke="none" />)}
              </g>
              <ellipse cx="130" cy="174" rx="70" ry="7" fill="#321528" opacity=".16" />
            </svg>
            {lit && <Sparkles className="diya-preview__sparkles" aria-hidden="true" />}
          </div>
          <div className="craft-controls">
            <span className="control-label">Choose a colour</span>
            <div className="colour-swatches" role="group" aria-label="Diya paint colours">
              {colours.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  className={colour.name === item.name ? 'is-selected' : ''}
                  style={{ '--swatch-colour': item.value } as CSSProperties}
                  onClick={() => { setColour(item); setLit(false); }}
                  aria-label={`Paint diya ${item.name}`}
                  aria-pressed={colour.name === item.name}
                />
              ))}
            </div>
            <span className="control-label">Add a pattern</span>
            <div className="choice-buttons" role="group" aria-label="Diya patterns">
              {patterns.map((item) => (
                <button key={item} type="button" className={pattern === item ? 'is-selected' : ''} onClick={() => { setPattern(item); setLit(false); }} aria-pressed={pattern === item}>
                  {item}
                </button>
              ))}
            </div>
            <button className="button button--dark button--full" type="button" onClick={() => setLit((current) => !current)}>
              <Flame size={17} aria-hidden="true" /> {lit ? 'Blow out the flame' : 'Light my diya'}
            </button>
            <p className="activity-status" aria-live="polite">
              {lit ? `Your ${colour.name.toLowerCase()} diya with ${pattern} is glowing!` : 'Your diya is ready for its finishing touch.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
