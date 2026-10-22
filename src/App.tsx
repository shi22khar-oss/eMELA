import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Check, NotebookPen, Sparkles, Ticket } from 'lucide-react';
import { FairMap } from './components/FairMap';
import { Experiences } from './components/Experiences';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Lineup } from './components/Lineup';
import { PassModal } from './components/PassModal';
import { Planner } from './components/Planner';
import { zones } from './data';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { FairEvent, MelaPass, PlanEntry, Zone, ZoneId } from './types';
import { downloadFile, passAsSvg } from './utils/download';

const tickerItems = ['Rides & laughter', 'Flavours & stories', 'Music & dancing', 'Craft & curiosity'];

function scrollToSection(id: string) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
}

export default function App() {
  const [selectedZone, setSelectedZone] = useState<ZoneId>('wheel');
  const [plan, setPlan] = useLocalStorage<PlanEntry[]>('emela-plan-v1', []);
  const [pass, setPass] = useLocalStorage<MelaPass | null>('emela-pass-v1', null);
  const [openModal, setOpenModal] = useState<'plan' | 'pass' | null>(null);
  const [toast, setToast] = useState('');

  const notify = useCallback((message: string) => setToast(message), []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const addEntry = useCallback((entry: PlanEntry) => {
    if (plan.some((item) => item.id === entry.id)) {
      notify('Already saved in your mela plan');
      return;
    }
    setPlan((current) => [...current, entry]);
    notify(`${entry.title} added to your mela plan`);
  }, [notify, plan, setPlan]);

  const addZone = (zone: Zone) => addEntry({
    id: zone.id,
    title: zone.name,
    meta: `${zone.duration} · ${zone.bestTime}`,
    kind: 'place',
  });

  const addEvent = (event: FairEvent) => addEntry({
    id: event.id,
    title: event.title,
    meta: `${event.time} · ${event.duration} · Centre Stage`,
    kind: 'event',
  });

  const exploreZone = (id: ZoneId) => {
    setSelectedZone(id);
    scrollToSection('fairgrounds');
  };

  const createPass = (name: string, guests: number) => {
    const values = new Uint32Array(1);
    window.crypto.getRandomValues(values);
    const id = `EM-${values[0].toString(36).toUpperCase().padStart(7, '0').slice(0, 7)}`;
    setPass({ id, name, guests });
    notify('Your free eMELA pass is ready');
  };

  const downloadPass = () => {
    if (!pass) return;
    downloadFile(passAsSvg(pass.name, pass.guests, pass.id), 'my-emela-pass.svg', 'image/svg+xml;charset=utf-8');
    notify('Your pass has been downloaded');
  };

  const downloadPlan = () => {
    const lines = [
      'eMELA — MY MELA PLAN',
      'Come as you are. Leave a little happier.',
      '',
      ...plan.flatMap((entry, index) => [
        `${String(index + 1).padStart(2, '0')}. ${entry.title}`,
        `    ${entry.meta}`,
      ]),
      '',
      'Saved from eMELA. See you at the fair!',
    ];
    downloadFile(lines.join('\n'), 'my-emela-plan.txt', 'text/plain;charset=utf-8');
    notify('Your mela plan has been downloaded');
  };

  const clearPlan = () => {
    setPlan([]);
    notify('Your mela plan is now clear');
  };

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header
        planCount={plan.length}
        hasPass={Boolean(pass)}
        onOpenPlan={() => setOpenModal('plan')}
        onOpenPass={() => setOpenModal('pass')}
      />
      <main id="main-content">
        <Hero hasPass={Boolean(pass)} onEnter={() => scrollToSection('fairgrounds')} onOpenPass={() => setOpenModal('pass')} />

        <div className="ticker">
          <span className="sr-only">Rides and laughter, flavours and stories, music and dancing, craft and curiosity.</span>
          <div className="ticker__track" aria-hidden="true">
            {[0, 1].map((group) => (
              <div className="ticker__group" key={group}>
                {tickerItems.map((item) => <span key={item}>{item}<Sparkles /></span>)}
              </div>
            ))}
          </div>
        </div>

        <section className="intro section shell" aria-labelledby="intro-title">
          <div className="intro__doodle" aria-hidden="true">✦<span>✧</span></div>
          <p className="eyebrow">Remember that feeling?</p>
          <h2 id="intro-title">The fair came to town.<br /><em>And anything felt possible.</em></h2>
          <div className="intro__bottom">
            <p>That is the feeling we are bringing back. A little nostalgia, a little discovery, and plenty of reasons to smile—wrapped into one joyful digital mela.</p>
            <div className="intro__promises">
              <span><Check size={16} aria-hidden="true" /> No wrong turns</span>
              <span><Check size={16} aria-hidden="true" /> No long queues</span>
              <span><Check size={16} aria-hidden="true" /> No rushing the fun</span>
            </div>
          </div>
        </section>

        <FairMap selectedId={selectedZone} plannedIds={plan.map((entry) => entry.id)} onSelect={setSelectedZone} onAdd={addZone} />
        <Experiences onExplore={exploreZone} />
        <Lineup plannedIds={plan.map((entry) => entry.id)} onAdd={addEvent} />

        <section className="visit section shell" id="visit" aria-labelledby="visit-title">
          <div className="visit__art" aria-hidden="true">
            <svg viewBox="0 0 240 240">
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="120" cy="100" r="77" /><circle cx="120" cy="100" r="10" />
                <path d="M120 23v67m0 20v67M43 100h67m20 0h67M66 46l47 47m14 14 47 47M174 46l-47 47m-14 14-47 47M78 220l42-100 42 100M66 220h108" />
              </g>
            </svg>
          </div>
          <div className="visit__content">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Your happiest plans start here</p>
            <h2 id="visit-title">Bring your people.<br /><em>We’ll bring the mela.</em></h2>
            <p>Make a free pass, save your favourite corners, and get ready for a very good time.</p>
            <div className="visit__actions">
              <button className="button button--dark button--large" type="button" onClick={() => setOpenModal('pass')}>
                <Ticket size={19} aria-hidden="true" /> {pass ? 'View my free pass' : 'Get my free pass'}
              </button>
              <button className="button button--outline button--large" type="button" onClick={() => setOpenModal('plan')}>
                <NotebookPen size={19} aria-hidden="true" /> Build my mela plan
              </button>
            </div>
          </div>
          <button className="visit__arrow" type="button" onClick={() => scrollToSection('fairgrounds')} aria-label="Start exploring the fairgrounds">
            <ArrowRight aria-hidden="true" />
          </button>
        </section>
      </main>
      <Footer />

      <Planner
        open={openModal === 'plan'}
        entries={plan}
        onClose={() => setOpenModal(null)}
        onRemove={(id) => setPlan((current) => current.filter((entry) => entry.id !== id))}
        onClear={clearPlan}
        onDownload={downloadPlan}
        onExplore={() => { setOpenModal(null); scrollToSection('fairgrounds'); }}
      />
      <PassModal
        open={openModal === 'pass'}
        pass={pass}
        onClose={() => setOpenModal(null)}
        onCreate={createPass}
        onDownload={downloadPass}
      />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        <Check size={18} aria-hidden="true" /> {toast}
      </div>
      <span className="sr-only">{zones.length} fairground zones available to explore.</span>
    </div>
  );
}
