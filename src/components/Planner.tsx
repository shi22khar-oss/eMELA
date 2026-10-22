import { ArrowRight, CalendarDays, Download, MapPin, Music2, Trash2, X } from 'lucide-react';
import type { PlanEntry } from '../types';
import { Modal } from './Modal';

interface PlannerProps {
  open: boolean;
  entries: PlanEntry[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onDownload: () => void;
  onExplore: () => void;
}

export function Planner({ open, entries, onClose, onRemove, onClear, onDownload, onExplore }: PlannerProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="planner-title" variant="drawer">
      <div className="planner__header">
        <p className="eyebrow"><CalendarDays size={15} aria-hidden="true" /> Saved on this device</p>
        <h2 id="planner-title">My mela plan</h2>
        <p>{entries.length === 0 ? 'A little planning. A lot of possibility.' : `${entries.length} ${entries.length === 1 ? 'stop' : 'stops'} lined up for a very good time.`}</p>
      </div>

      {entries.length === 0 ? (
        <div className="planner__empty">
          <div className="planner__empty-art" aria-hidden="true"><MapPin /><span>✦</span></div>
          <h3>Your next favourite thing is out there.</h3>
          <p>Add places and performances as you wander. I will keep them together right here.</p>
          <button className="button button--dark" type="button" onClick={onExplore}>
            Explore the fairgrounds <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      ) : (
        <>
          <ul className="planner__list">
            {entries.map((entry, index) => (
              <li key={entry.id}>
                <span className="planner__item-number">{String(index + 1).padStart(2, '0')}</span>
                <span className={`planner__item-icon planner__item-icon--${entry.kind}`} aria-hidden="true">
                  {entry.kind === 'event' ? <Music2 /> : <MapPin />}
                </span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.meta}</p>
                </div>
                <button type="button" onClick={() => onRemove(entry.id)} aria-label={`Remove ${entry.title} from my plan`}>
                  <X aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <div className="planner__footer">
            <button className="button button--sun button--full" type="button" onClick={onDownload}>
              <Download size={18} aria-hidden="true" /> Download my plan
            </button>
            <button className="text-button planner__clear" type="button" onClick={onClear}>
              <Trash2 size={16} aria-hidden="true" /> Clear my plan
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
