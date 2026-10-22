import { ArrowDown, ArrowRight, FerrisWheel, Gamepad2, MousePointer2, Sparkles } from 'lucide-react';
import { asset } from '../data';
import { StringLights } from './StringLights';

interface HeroProps {
  onEnter: () => void;
  onPlay: () => void;
  onRide: () => void;
}

export function Hero({ onEnter, onPlay, onRide }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <img
          src={asset('mela-hero.webp')}
          srcSet={`${asset('mela-hero-640.webp')} 640w, ${asset('mela-hero-960.webp')} 960w, ${asset('mela-hero.webp')} 1376w`}
          sizes="100vw"
          alt=""
          width="1376"
          height="768"
          fetchPriority="high"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <StringLights className="hero__lights" count={22} />
      <button className="hero__ride-marker" type="button" onClick={onRide} aria-label="Ride the wheel">
        <span><FerrisWheel aria-hidden="true" /></span>
        <strong>Ride the wheel</strong>
      </button>
      <div className="hero__content shell">
        <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> The gates are open · Come on in</p>
        <h1 id="hero-title">Step into<br />the <em>mela.</em></h1>
        <p className="hero__intro">Ride above the lights. Pop a balloon. Make something delicious. Follow the music and see where the night takes you.</p>
        <div className="hero__actions">
          <button className="button button--sun button--large" type="button" onClick={onEnter}>
            Enter the fairground <ArrowRight size={20} aria-hidden="true" />
          </button>
          <button className="button button--glass button--large" type="button" onClick={onPlay}>
            <Gamepad2 size={20} aria-hidden="true" /> I want to play
          </button>
        </div>
      </div>
      <div className="hero__bottom shell">
        <span><MousePointer2 size={17} aria-hidden="true" /> Don’t just look around. Join in.</span>
        <button type="button" onClick={onEnter} aria-label="Scroll into the fairground"><ArrowDown aria-hidden="true" /></button>
      </div>
    </section>
  );
}
