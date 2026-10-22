import { useEffect, useState } from 'react';
import { ArrowRight, FerrisWheel as FerrisWheelIcon, RotateCcw, Sparkles } from 'lucide-react';
import { FerrisWheel } from './FerrisWheel';
import { Modal } from './Modal';

const viewMessages = [
  'Settle into your gondola. We’re moving gently upward.',
  'The food stalls are glowing just below you.',
  'You’re rising above the bunting and the bazaar.',
  'Look around—the whole shimmering mela is yours.',
];

type RideStatus = 'idle' | 'riding' | 'complete';

interface RideModalProps {
  open: boolean;
  onClose: () => void;
}

export function RideModal({ open, onClose }: RideModalProps) {
  const [status, setStatus] = useState<RideStatus>('idle');
  const [viewIndex, setViewIndex] = useState(0);

  useEffect(() => {
    if (status !== 'riding') return;
    const viewTimer = window.setInterval(() => {
      setViewIndex((current) => Math.min(current + 1, viewMessages.length - 1));
    }, 2400);
    const rideTimer = window.setTimeout(() => setStatus('complete'), 10000);
    return () => {
      window.clearInterval(viewTimer);
      window.clearTimeout(rideTimer);
    };
  }, [status]);

  const startRide = () => {
    setViewIndex(0);
    setStatus('riding');
  };

  const closeRide = () => {
    setStatus('idle');
    setViewIndex(0);
    onClose();
  };

  return (
    <Modal open={open} onClose={closeRide} labelledBy="ride-title">
      <div className={`ride-experience is-${status}`}>
        <div className="ride-experience__visual">
          <div className="ride-experience__sky" aria-hidden="true"><span /><span /><span /></div>
          <FerrisWheel />
          <div className="ride-experience__gondola" aria-hidden="true"><FerrisWheelIcon /></div>
        </div>
        <div className="ride-experience__content">
          <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> The Sky-High Wheel</p>
          <h2 id="ride-title">{status === 'complete' ? 'What a view, right?' : 'A little closer to the stars.'}</h2>
          {status === 'idle' && (
            <>
              <p>Take a ten-second ride above the lights, stalls, and happy commotion. No queue—your gondola is ready.</p>
              <button className="button button--dark button--large" type="button" onClick={startRide} data-autofocus>
                Start my ride <ArrowRight size={19} aria-hidden="true" />
              </button>
            </>
          )}
          {status === 'riding' && (
            <div className="ride-experience__progress">
              <p aria-live="polite">{viewMessages[viewIndex]}</p>
              <div className="ride-progress" aria-hidden="true"><span /></div>
              <small>Enjoy the view. Your gondola will return in a moment.</small>
            </div>
          )}
          {status === 'complete' && (
            <>
              <p aria-live="polite">You rode above the entire fair. Ready for another turn, or is Game Alley calling?</p>
              <button className="button button--dark button--large" type="button" onClick={startRide} data-autofocus>
                <RotateCcw size={18} aria-hidden="true" /> Ride again
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
