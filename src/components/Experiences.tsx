import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../data';
import type { ZoneId } from '../types';

interface ExperiencesProps {
  onExplore: (id: ZoneId) => void;
}

export function Experiences({ onExplore }: ExperiencesProps) {
  return (
    <section className="experiences section" id="experiences" aria-labelledby="experiences-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow">Something for every kind of happy</p>
            <h2 id="experiences-title">Find your kind of <em>fun.</em></h2>
          </div>
          <p>Go where your curiosity goes. Every corner has a different story, and there is always room for one more.</p>
        </div>
        <div className="experience-grid">
          {experiences.map((experience, index) => (
            <article className={`experience-card experience-card--${experience.accent}`} key={experience.id}>
              <div className="experience-card__image">
                <img
                  src={experience.image}
                  srcSet={`${experience.image.replace('.webp', '-640.webp')} 640w, ${experience.image} 928w`}
                  sizes="(max-width: 600px) calc(100vw - 28px), (max-width: 820px) 40vw, (max-width: 1400px) 30vw, 430px"
                  alt={experience.imageAlt}
                  width="928"
                  height="1152"
                  loading="lazy"
                />
                <span className="experience-card__index">0{index + 1}</span>
                <span className="experience-card__category">{experience.category}</span>
              </div>
              <div className="experience-card__body">
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <div className="experience-card__footer">
                  <span>{experience.note}</span>
                  <button type="button" onClick={() => onExplore(experience.id)} aria-label={`Explore ${experience.title}`}>
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
