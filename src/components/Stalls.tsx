import { Store } from 'lucide-react';
import { CraftStall } from './CraftStall';
import { FoodStall } from './FoodStall';

export function Stalls() {
  return (
    <section className="stalls section" id="stalls" aria-labelledby="stalls-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><Store size={16} aria-hidden="true" /> Follow the aromas · Meet the makers</p>
            <h2 id="stalls-title">Every stall has<br /><em>something to try.</em></h2>
          </div>
          <p>Not a menu. Not a catalogue. Step behind the counter and make a small piece of the mela yourself.</p>
        </div>
        <div className="stalls__grid">
          <FoodStall />
          <CraftStall />
        </div>
      </div>
    </section>
  );
}
