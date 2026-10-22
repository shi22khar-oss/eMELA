import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Play, RotateCcw, Timer, Trophy } from 'lucide-react';

const GAME_SECONDS = 30;
const balloonColours = [
  { name: 'coral', value: '#f06b5e' },
  { name: 'yellow', value: '#ffc94f' },
  { name: 'mint', value: '#68bfa9' },
  { name: 'pink', value: '#e99bb6' },
  { name: 'blue', value: '#72a9dc' },
  { name: 'orange', value: '#ef914e' },
  { name: 'purple', value: '#a78ad2' },
  { name: 'lime', value: '#a8c96d' },
  { name: 'rose', value: '#e45478' },
];

type GameStatus = 'idle' | 'playing' | 'ended';

export function BalloonGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [popped, setPopped] = useState<boolean[]>(balloonColours.map(() => false));
  const respawnTimers = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (status !== 'playing') return;
    if (timeLeft === 0) {
      setStatus('ended');
      return;
    }
    const timer = window.setTimeout(() => setTimeLeft((time) => time - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [status, timeLeft]);

  useEffect(() => () => {
    respawnTimers.current.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const startGame = () => {
    respawnTimers.current.forEach((timer) => window.clearTimeout(timer));
    respawnTimers.current.clear();
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setPopped(balloonColours.map(() => false));
    setStatus('playing');
  };

  const popBalloon = (index: number) => {
    if (status !== 'playing' || popped[index]) return;
    setPopped((current) => current.map((value, item) => item === index ? true : value));
    setScore((current) => current + 1);
    const timer = window.setTimeout(() => {
      setPopped((current) => current.map((value, item) => item === index ? false : value));
      respawnTimers.current.delete(timer);
    }, 480 + (index % 3) * 100);
    respawnTimers.current.add(timer);
  };

  return (
    <div className={`mini-game balloon-game is-${status}`}>
      <div className="mini-game__stats">
        <span>Score <output aria-label="Balloon score">{score}</output></span>
        <span><Timer size={16} aria-hidden="true" /> <output aria-label="Balloon game seconds remaining">{timeLeft}</output>s</span>
      </div>
      <div className="balloon-game__board">
        <div className="balloon-grid" role="group" aria-label="Balloon popping board">
          {balloonColours.map((balloon, index) => (
            <button
              key={balloon.name}
              className={`balloon ${popped[index] ? 'is-popped' : ''}`}
              style={{ '--balloon-colour': balloon.value, '--balloon-index': index } as CSSProperties}
              type="button"
              onClick={() => popBalloon(index)}
              disabled={status !== 'playing' || popped[index]}
              aria-label={`Pop ${balloon.name} balloon ${index + 1}`}
            >
              <span className="balloon__shape" aria-hidden="true" />
              <span className="balloon__string" aria-hidden="true" />
              <span className="balloon__pop" aria-hidden="true">✦</span>
            </button>
          ))}
        </div>
        {status !== 'playing' && (
          <div className="game-overlay">
            {status === 'ended' ? <Trophy aria-hidden="true" /> : <span className="game-overlay__balloon" aria-hidden="true" />}
            <h3>{status === 'ended' ? `You popped ${score} balloons!` : 'Ready, aim, pop!'}</h3>
            <p>{status === 'ended' ? 'The stall keeper is impressed. One more round?' : 'Pop as many as you can in 30 seconds. They come back—keep tapping!'}</p>
            <button className="button button--sun" type="button" onClick={startGame}>
              {status === 'ended' ? <RotateCcw size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              {status === 'ended' ? 'Play again' : 'Start popping'}
            </button>
          </div>
        )}
      </div>
      <p className="mini-game__hint" aria-live="polite">
        {status === 'playing' ? 'Quick—tap a balloon before another one floats back!' : 'A classic mela game, made for your screen.'}
      </p>
    </div>
  );
}
