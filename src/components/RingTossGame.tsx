import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const TOTAL_RINGS = 6;
const bottlePoints = [3, 3, 3, 2, 2, 2, 1, 1, 1];

type GameStatus = 'idle' | 'playing' | 'ended';

interface ThrowResult {
  id: number;
  target: number;
  hit: boolean;
}

export function RingTossGame() {
  const [status, setStatus] = useState<GameStatus>('idle');
  const [ringsLeft, setRingsLeft] = useState(TOTAL_RINGS);
  const [score, setScore] = useState(0);
  const [throwing, setThrowing] = useState(false);
  const [lastThrow, setLastThrow] = useState<ThrowResult | null>(null);
  const [message, setMessage] = useState('Six rings. Nine bottles. Pick your target.');
  const throwTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(throwTimer.current), []);

  const startGame = () => {
    window.clearTimeout(throwTimer.current);
    setStatus('playing');
    setRingsLeft(TOTAL_RINGS);
    setScore(0);
    setThrowing(false);
    setLastThrow(null);
    setMessage('Choose a bottle and toss your first ring.');
  };

  const throwRing = (target: number) => {
    if (status !== 'playing' || throwing) return;
    const hit = Math.random() < (target < 3 ? 0.4 : target < 6 ? 0.55 : 0.7);
    const points = hit ? bottlePoints[target] : 0;
    const remaining = ringsLeft - 1;
    setThrowing(true);
    setLastThrow({ id: Date.now(), target, hit });
    setMessage('Your ring is in the air…');

    throwTimer.current = window.setTimeout(() => {
      setScore((current) => current + points);
      setRingsLeft(remaining);
      setThrowing(false);
      if (remaining === 0) {
        setStatus('ended');
        setMessage(hit ? `A scoring finish—${points} points!` : 'So close! That was your last ring.');
      } else {
        setMessage(hit ? `Right on the bottle—${points} points!` : 'So close! Adjust your aim and try again.');
      }
    }, 560);
  };

  return (
    <div className={`mini-game ring-game is-${status}`}>
      <div className="mini-game__stats">
        <span>Score <output aria-label="Ring toss score">{score}</output></span>
        <span>Rings <output aria-label="Rings remaining">{ringsLeft}</output>/{TOTAL_RINGS}</span>
      </div>
      <div className="ring-game__board">
        <div className="bottle-grid" role="group" aria-label="Ring toss bottles">
          {bottlePoints.map((points, index) => (
            <button
              key={index}
              className={`bottle bottle--${index + 1}`}
              type="button"
              onClick={() => throwRing(index)}
              disabled={status !== 'playing' || throwing}
              aria-label={`Throw a ring at bottle ${index + 1}, worth ${points} ${points === 1 ? 'point' : 'points'}`}
            >
              <span className="bottle__cap" aria-hidden="true" />
              <span className="bottle__body" aria-hidden="true"><i>{points}</i></span>
            </button>
          ))}
        </div>
        {lastThrow && throwing && (
          <span
            key={lastThrow.id}
            className={`flying-ring ${lastThrow.hit ? 'is-hit' : ''}`}
            style={{
              '--target-x': `${16.5 + (lastThrow.target % 3) * 33.5}%`,
              '--target-y': `${18 + Math.floor(lastThrow.target / 3) * 31}%`,
            } as CSSProperties}
            aria-hidden="true"
          />
        )}
        {status !== 'playing' && (
          <div className="game-overlay">
            <Trophy aria-hidden="true" />
            <h3>{status === 'ended' ? `${score} points—nice throwing!` : 'Step up to the stall.'}</h3>
            <p>{status === 'ended' ? message : 'You have six rings. The back row is harder, but it earns more points.'}</p>
            <button className="button button--sun" type="button" onClick={startGame}>
              {status === 'ended' ? <RotateCcw size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
              {status === 'ended' ? 'Try again' : 'Pick up the rings'}
            </button>
          </div>
        )}
      </div>
      <p className="mini-game__hint" aria-live="polite">{message}</p>
    </div>
  );
}
