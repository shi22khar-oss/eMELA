import { useCallback, useEffect, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Fairground } from './components/Fairground';
import { Footer } from './components/Footer';
import { GameArcade } from './components/GameArcade';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RideModal } from './components/RideModal';
import { StageSection } from './components/StageSection';
import { Stalls } from './components/Stalls';
import { useFairAudio } from './hooks/useFairAudio';
import type { FairStopId } from './types';

const joyStrip = ['Ride the wheel', 'Pop a balloon', 'Fry something sweet', 'Paint a diya', 'Follow the music'];

function scrollToSection(id: string) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
}

export default function App() {
  const [rideOpen, setRideOpen] = useState(false);
  const [toast, setToast] = useState('');
  const { soundOn, toggleSound } = useFairAudio();

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const explore = (id: FairStopId) => {
    if (id === 'wheel') {
      setRideOpen(true);
      return;
    }
    scrollToSection(id);
  };

  const handleSoundToggle = useCallback(async () => {
    try {
      const enabled = await toggleSound();
      setToast(enabled ? 'The mela soundscape is playing' : 'The mela soundscape is paused');
    } catch {
      setToast('Sound is not available in this browser. The fair is still yours to explore.');
    }
  }, [toggleSound]);

  const onToggleSound = () => { void handleSoundToggle(); };

  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header soundOn={soundOn} onToggleSound={onToggleSound} />
      <main id="main-content">
        <Hero onEnter={() => scrollToSection('fairground')} onPlay={() => scrollToSection('games')} onRide={() => setRideOpen(true)} />

        <div className="joy-strip" aria-hidden="true">
          <div>
            {[0, 1].map((group) => (
              <span key={group}>{joyStrip.map((item) => <span key={item}>{item}<Sparkles /></span>)}</span>
            ))}
          </div>
        </div>

        <Fairground onExplore={explore} />
        <GameArcade />
        <Stalls />
        <StageSection soundOn={soundOn} onToggleSound={onToggleSound} />
      </main>
      <Footer />
      <RideModal open={rideOpen} onClose={() => setRideOpen(false)} />
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status" aria-live="polite">
        <Check size={18} aria-hidden="true" /> {toast}
      </div>
    </div>
  );
}
