import { useState } from 'react';
import { Check, Music2, Plus } from 'lucide-react';
import { events } from '../data';
import type { EventCategory, FairEvent } from '../types';

type Filter = 'All' | EventCategory;
const filters: Filter[] = ['All', 'Music', 'Dance', 'Family'];

interface LineupProps {
  plannedIds: string[];
  onAdd: (event: FairEvent) => void;
}

export function Lineup({ plannedIds, onAdd }: LineupProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const visibleEvents = filter === 'All' ? events : events.filter((event) => event.category === filter);

  return (
    <section className="lineup section" id="lineup" aria-labelledby="lineup-title">
      <div className="shell">
        <div className="lineup__heading">
          <div>
            <p className="eyebrow eyebrow--light"><Music2 size={15} aria-hidden="true" /> The centre stage · Every evening</p>
            <h2 id="lineup-title">Stay for <em>one more song.</em></h2>
          </div>
          <p>From the first dhol to the last singalong, there is always something worth gathering around.</p>
        </div>
        <div className="lineup__filters" role="group" aria-label="Filter stage events">
          {filters.map((item) => (
            <button key={item} type="button" className={filter === item ? 'is-active' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item === 'All' ? 'Full line-up' : item}
            </button>
          ))}
        </div>
        <ol className="event-list">
          {visibleEvents.map((event) => {
            const isPlanned = plannedIds.includes(event.id);
            return (
              <li className="event-row" key={event.id}>
                <time>{event.time}</time>
                <div className="event-row__details">
                  <div className="event-row__title">
                    <h3>{event.title}</h3>
                    <span>{event.category}</span>
                  </div>
                  <p>{event.description}</p>
                </div>
                <span className="event-row__duration">{event.duration}</span>
                <button
                  className={`event-row__add ${isPlanned ? 'is-added' : ''}`}
                  type="button"
                  onClick={() => onAdd(event)}
                  aria-label={isPlanned ? `${event.title} is in my plan` : `Add ${event.title} to my plan`}
                >
                  {isPlanned ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
                  <span>{isPlanned ? 'In my plan' : 'Add to plan'}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="lineup__note">A little spontaneity encouraged. Line-up shown is our sample daily programme.</p>
      </div>
    </section>
  );
}
