import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Check,
  Clock3,
  Dices,
  FerrisWheel,
  Info,
  MapPin,
  Music2,
  Plus,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { zones } from '../data';
import type { Zone, ZoneId } from '../types';

const zoneIcons: Record<ZoneId, LucideIcon> = {
  wheel: FerrisWheel,
  stage: Music2,
  games: Dices,
  food: UtensilsCrossed,
  bazaar: ShoppingBag,
};

interface FairMapProps {
  selectedId: ZoneId;
  plannedIds: string[];
  onSelect: (id: ZoneId) => void;
  onAdd: (zone: Zone) => void;
}

export function FairMap({ selectedId, plannedIds, onSelect, onAdd }: FairMapProps) {
  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const SelectedIcon = zoneIcons[selected.id];
  const isPlanned = plannedIds.includes(selected.id);

  const nextZone = () => {
    const index = zones.findIndex((zone) => zone.id === selected.id);
    onSelect(zones[(index + 1) % zones.length].id);
  };

  return (
    <section className="fairgrounds section" id="fairgrounds" aria-labelledby="fairgrounds-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><MapPin size={15} aria-hidden="true" /> Your fair, your way</p>
            <h2 id="fairgrounds-title">Choose your own <em>detour.</em></h2>
          </div>
          <p>There is no right way to mela. Pick a spot on the map and see where the mood takes you.</p>
        </div>

        <div className="fairgrounds__layout">
          <div className="map-board" aria-label="Interactive map of the eMELA fairgrounds">
            <svg className="map-board__drawing" viewBox="0 0 800 570" preserveAspectRatio="none" aria-hidden="true">
              <path className="map-path map-path--wide" d="M-30 420C150 390 160 180 350 225S520 510 830 355" />
              <path className="map-path" d="M-30 420C150 390 160 180 350 225S520 510 830 355" />
              <path className="map-path map-path--wide" d="M380-30C370 100 290 120 340 225S510 280 485 600" />
              <path className="map-path" d="M380-30C370 100 290 120 340 225S510 280 485 600" />
              <path className="map-path map-path--wide" d="M60 50C180 120 170 200 260 260M620 30C590 120 620 180 550 250" />
              <path className="map-path" d="M60 50C180 120 170 200 260 260M620 30C590 120 620 180 550 250" />
              <g className="map-trees">
                <path d="M90 335l18-38 18 38h-11l15 28H85l15-28zm585 120 14-30 14 30h-8l12 24h-38l12-24zM580 95l14-30 14 30h-8l12 24h-38l12-24zM240 500l12-25 12 25h-7l10 20h-31l10-20z" />
                <circle cx="720" cy="180" r="17" /><circle cx="748" cy="190" r="11" /><circle cx="65" cy="155" r="14" />
              </g>
              <g className="map-tents">
                <path d="M95 480l35-55 35 55zm-8 0h86v40H87zM620 285l28-44 28 44zm-7 0h70v34h-70z" />
                <path d="M130 425v95M648 241v78" />
              </g>
              <g className="map-sparkles">
                <path d="M200 90v22m-11-11h22M540 450v22m-11-11h22M730 310v18m-9-9h18" />
                <circle cx="280" cy="90" r="4" /><circle cx="530" cy="145" r="4" /><circle cx="170" cy="275" r="4" />
              </g>
            </svg>
            <div className="map-board__compass" aria-hidden="true"><span>N</span>✦</div>
            <p className="map-board__hint"><Sparkles size={14} aria-hidden="true" /> Tap a marker to wander</p>
            {zones.map((zone) => {
              const Icon = zoneIcons[zone.id];
              const active = zone.id === selected.id;
              return (
                <button
                  key={zone.id}
                  className={`map-marker map-marker--${zone.id} ${active ? 'is-active' : ''}`}
                  style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
                  type="button"
                  aria-label={`Explore ${zone.name}`}
                  aria-pressed={active}
                  onClick={() => onSelect(zone.id)}
                >
                  <span className="map-marker__icon"><Icon aria-hidden="true" /></span>
                  <span className="map-marker__label">{zone.shortName}</span>
                </button>
              );
            })}
            <div className="map-entrance" aria-hidden="true"><span />YOU ENTER HERE<span /></div>
          </div>

          <article className={`zone-card zone-card--${selected.id}`} aria-live="polite">
            <div className="zone-card__top">
              <span className="zone-card__number">0{zones.findIndex((zone) => zone.id === selected.id) + 1}</span>
              <span className="zone-card__icon"><SelectedIcon aria-hidden="true" /></span>
            </div>
            <p className="eyebrow">{selected.category}</p>
            <h3>{selected.name}</h3>
            <p className="zone-card__description">{selected.description}</p>
            <div className="zone-card__facts">
              <span><Clock3 size={17} aria-hidden="true" />{selected.duration}</span>
              <span><Sparkles size={17} aria-hidden="true" />{selected.bestTime}</span>
              <span><Info size={17} aria-hidden="true" />{selected.goodToKnow}</span>
            </div>
            <button
              className={`button button--dark button--full ${isPlanned ? 'is-added' : ''}`}
              type="button"
              onClick={() => onAdd(selected)}
            >
              {isPlanned ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
              {isPlanned ? 'Added to my mela' : 'Add to my mela'}
            </button>
            <button className="text-button zone-card__next" type="button" onClick={nextZone}>
              Where to next? <ArrowRight size={17} aria-hidden="true" />
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
