import { ArrowDownRight, ArrowRight, Sparkles, Ticket } from 'lucide-react';
import { asset } from '../data';

interface HeroProps {
  hasPass: boolean;
  onEnter: () => void;
  onOpenPass: () => void;
}

export function Hero({ hasPass, onEnter, onOpenPass }: HeroProps) {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <img
          src={asset('mela-hero.webp')}
          srcSet={`${asset('mela-hero-640.webp')} 640w, ${asset('mela-hero-960.webp')} 960w, ${asset('mela-hero.webp')} 1376w`}
          sizes="(max-width: 1400px) calc(100vw - 64px), 1400px"
          alt=""
          width="1376"
          height="768"
          fetchPriority="high"
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content">
        <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> Your invitation to a happier place</p>
        <h1 id="hero-title">All the joy.<br /><em>None of the queues.</em></h1>
        <p className="hero__intro">
          Step into a world of bright lights, bold flavours, handmade treasures, and the kind of fun you did not plan for.
        </p>
        <div className="hero__actions">
          <button className="button button--sun button--large" type="button" onClick={onEnter}>
            Step inside <ArrowRight size={20} aria-hidden="true" />
          </button>
          <button className="button button--glass button--large" type="button" onClick={onOpenPass}>
            <Ticket size={19} aria-hidden="true" />
            {hasPass ? 'View my pass' : 'Get your free pass'}
          </button>
        </div>
      </div>
      <div className="hero__seal" aria-hidden="true">
        <span>COME ONE · COME ALL ·</span>
        <Sparkles />
      </div>
      <div className="hero__footer">
        <div><span>ENTRY</span><strong>Free, always</strong></div>
        <div><span>WHEN</span><strong>Whenever you need a little joy</strong></div>
        <div><span>WHERE</span><strong>Right here. Right now.</strong></div>
        <button type="button" onClick={onEnter} aria-label="Explore the fairgrounds">
          Explore the grounds <ArrowDownRight size={21} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
