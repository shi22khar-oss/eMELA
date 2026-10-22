import { useEffect, useState } from 'react';
import { ChefHat, Flame, RotateCcw, Sparkles } from 'lucide-react';
import { asset } from '../data';

const toppings = [
  { id: 'classic', name: 'Classic', colour: '#ffc94f' },
  { id: 'pistachio', name: 'Pistachio', colour: '#7eaa70' },
  { id: 'rose', name: 'Rose', colour: '#e98ca7' },
] as const;

type ToppingId = typeof toppings[number]['id'];
type CookingStatus = 'idle' | 'frying' | 'ready';

function JalebiArt({ status, topping }: { status: CookingStatus; topping: ToppingId }) {
  return (
    <div className={`jalebi-art is-${status} is-${topping}`} aria-hidden="true">
      <div className="jalebi-art__steam"><i /><i /><i /></div>
      <div className="jalebi-art__plate">
        {[0, 1, 2].map((item) => (
          <svg key={item} viewBox="0 0 100 100" className={`jalebi jalebi--${item + 1}`}>
            <path d="M50 50c0-5 8-5 8 0 0 9-16 9-16 0 0-14 24-14 24 0 0 19-32 19-32 0 0-24 40-24 40 0 0 29-48 29-48 0 0-34 56-34 56 0" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          </svg>
        ))}
        {status === 'ready' && topping !== 'classic' && <div className="jalebi-art__garnish">· · ·<br /> · · · ·</div>}
      </div>
    </div>
  );
}

export function FoodStall() {
  const [status, setStatus] = useState<CookingStatus>('idle');
  const [topping, setTopping] = useState<ToppingId>('classic');
  const [batches, setBatches] = useState(0);

  useEffect(() => {
    if (status !== 'frying') return;
    const timer = window.setTimeout(() => {
      setStatus('ready');
      setBatches((current) => current + 1);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [status]);

  const chooseTopping = (id: ToppingId) => {
    if (status === 'frying') return;
    setTopping(id);
    setStatus('idle');
  };

  return (
    <article className="stall-card stall-card--food" id="food" aria-labelledby="food-title">
      <div className="stall-card__image">
        <img
          src={asset('food-stall.webp')}
          srcSet={`${asset('food-stall-640.webp')} 640w, ${asset('food-stall.webp')} 928w`}
          sizes="(max-width: 900px) 100vw, 50vw"
          alt="A joyful food vendor making fresh jalebi at a warmly lit fairground stall"
          width="928"
          height="1152"
          loading="lazy"
        />
        <span><ChefHat size={16} aria-hidden="true" /> Food street · Fresh & hot</span>
      </div>
      <div className="stall-card__body">
        <p className="eyebrow"><Flame size={15} aria-hidden="true" /> The jalebi counter</p>
        <h3 id="food-title">Hot, crisp, and made by you.</h3>
        <p>Choose your finish, fry a fresh batch, and watch it turn golden. This little treat is made entirely on your screen.</p>

        <div className="stall-activity">
          <JalebiArt status={status} topping={topping} />
          <div className="jalebi-controls">
            <span className="control-label">Pick your finish</span>
            <div className="choice-buttons" role="group" aria-label="Jalebi toppings">
              {toppings.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={topping === item.id ? 'is-selected' : ''}
                  onClick={() => chooseTopping(item.id)}
                  aria-pressed={topping === item.id}
                  disabled={status === 'frying'}
                >
                  <span style={{ backgroundColor: item.colour }} aria-hidden="true" /> {item.name}
                </button>
              ))}
            </div>
            <button className="button button--dark button--full" type="button" onClick={() => setStatus('frying')} disabled={status === 'frying'}>
              {status === 'ready' ? <RotateCcw size={17} aria-hidden="true" /> : <Flame size={17} aria-hidden="true" />}
              {status === 'frying' ? 'Frying your jalebis…' : status === 'ready' ? 'Make another batch' : 'Fry fresh jalebis'}
            </button>
            <p className="activity-status" aria-live="polite">
              {status === 'frying' && 'Sizzling, swirling, turning golden…'}
              {status === 'ready' && `Fresh ${toppings.find((item) => item.id === topping)?.name.toLowerCase()} jalebis are ready!`}
              {status === 'idle' && 'The kadhai is hot and ready.'}
            </p>
            <small><Sparkles size={13} aria-hidden="true" /> Batches made here: {batches}</small>
          </div>
        </div>
      </div>
    </article>
  );
}
