import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { FerrisWheel as FerrisWheelIcon, Gamepad2, Music2, Palette, Sparkles, Utensils } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { fairStops } from '../data';
import type { FairStopIcon, FairStopId } from '../types';
import { FerrisWheel } from './FerrisWheel';
import { StringLights } from './StringLights';

const icons: Record<FairStopIcon, LucideIcon> = {
  wheel: FerrisWheelIcon,
  games: Gamepad2,
  food: Utensils,
  craft: Palette,
  stage: Music2,
};

const stars = Array.from({ length: 42 }, (_, index) => ({
  x: (index * 83 + 37) % 1180 + 10,
  y: (index * 47 + 19) % 290 + 15,
  r: index % 5 === 0 ? 2 : 1,
}));

interface FairgroundProps {
  onExplore: (id: FairStopId) => void;
}

export function Fairground({ onExplore }: FairgroundProps) {
  const [celebration, setCelebration] = useState(0);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const lightTheSky = () => {
    window.clearTimeout(timerRef.current);
    setCelebration((current) => current + 1);
    timerRef.current = window.setTimeout(() => setCelebration(0), 2800);
  };

  return (
    <section className="fairground section" id="fairground" aria-labelledby="fairground-title">
      <div className="shell">
        <div className="section-heading section-heading--split section-heading--light">
          <div>
            <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> The fairground is alive</p>
            <h2 id="fairground-title">Pick a corner.<br /><em>Join the fun.</em></h2>
          </div>
          <p>Tap a glowing marker to ride, play, make, and move to the music. There is no right route through a mela.</p>
        </div>

        <div className="fair-scene">
          <svg className="fair-scene__landscape" viewBox="0 0 1200 660" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="fair-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#130e2b" />
                <stop offset="0.58" stopColor="#442044" />
                <stop offset="1" stopColor="#b64f4e" />
              </linearGradient>
              <linearGradient id="fair-ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#45243d" />
                <stop offset="1" stopColor="#160f25" />
              </linearGradient>
              <radialGradient id="stall-glow">
                <stop offset="0" stopColor="#ffd872" stopOpacity=".65" />
                <stop offset="1" stopColor="#ffd872" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1200" height="660" fill="url(#fair-sky)" />
            {stars.map((star, index) => <circle className="scene-star" key={index} cx={star.x} cy={star.y} r={star.r} fill="#fff4ce" style={{ '--star-index': index } as CSSProperties} />)}
            <circle cx="104" cy="105" r="43" fill="#ffe8aa" opacity=".9" />
            <circle cx="123" cy="88" r="43" fill="#1b1131" />
            <path d="M0 355 120 260l85 64 110-102 95 98 125-85 96 98 125-111 115 104 129-83 120 92v325H0Z" fill="#25172f" opacity=".8" />
            <path d="M0 420h1200v240H0z" fill="url(#fair-ground)" />
            <ellipse cx="585" cy="518" rx="450" ry="150" fill="url(#stall-glow)" opacity=".4" />

            <g className="scene-stage" transform="translate(425 268)">
              <path d="M0 70 100 0l100 70Z" fill="#e45b55" stroke="#ffc94f" strokeWidth="4" />
              <path d="M20 70h160v135H20z" fill="#32152e" stroke="#e9a84d" strokeWidth="4" />
              <path d="M20 70h160v25H20z" fill="#ffc94f" />
              <path d="M45 205V95h110v110" fill="#692744" />
              <circle cx="100" cy="128" r="26" fill="#f2a7b5" opacity=".85" />
              <path d="M100 154v42M72 196l28-42 28 42" stroke="#f2a7b5" strokeWidth="9" strokeLinecap="round" />
              <g className="scene-stage__equalizer" fill="#ffc94f">
                {[0, 1, 2, 3, 4].map((bar) => <rect key={bar} x={43 + bar * 24} y="176" width="9" height="18" rx="4" style={{ '--bar-index': bar } as CSSProperties} />)}
              </g>
            </g>

            <g className="scene-carousel" transform="translate(88 370)">
              <path d="M0 75 120 0l120 75Z" fill="#ef6654" stroke="#ffd361" strokeWidth="4" />
              <path d="M20 75h200l-18 32H38Z" fill="#ffc94f" />
              <path d="M45 106v125M195 106v125M120 106v125" stroke="#ffd361" strokeWidth="5" />
              <path d="M20 230h200v22H20z" fill="#b23e4b" stroke="#ffc94f" strokeWidth="4" />
              <g className="scene-carousel__horse" fill="none" stroke="#fff1c1" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M65 165c15-24 40-15 45 0l22 8-12 17-20-4-12 20M75 187l-12 22M107 187l10 22" />
              </g>
            </g>

            <g className="scene-stall scene-stall--food" transform="translate(390 465)">
              <path d="M0 40h210v145H0z" fill="#254f47" stroke="#ffc94f" strokeWidth="4" />
              <path d="M-12 40 20 0h170l32 40Z" fill="#f5e1b0" />
              <path d="m20 0 20 40m40-40 10 40m50-40-10 40m60-40-20 40" stroke="#e65f50" strokeWidth="26" />
              <path d="M22 72h166v66H22z" fill="#ffcf62" opacity=".85" />
              <circle cx="65" cy="105" r="18" fill="none" stroke="#e66c3f" strokeWidth="8" />
              <circle cx="115" cy="105" r="18" fill="none" stroke="#e66c3f" strokeWidth="8" />
              <circle cx="155" cy="105" r="18" fill="none" stroke="#e66c3f" strokeWidth="8" />
            </g>

            <g className="scene-stall scene-stall--craft" transform="translate(720 480)">
              <path d="M0 35h190v140H0z" fill="#71324d" stroke="#ffc94f" strokeWidth="4" />
              <path d="M-10 35 18 0h154l28 35Z" fill="#f5e1b0" />
              <path d="m18 0 20 35m42-35 8 35m44-35-8 35m48-35-20 35" stroke="#347d72" strokeWidth="24" />
              <path d="M25 65h140v65H25z" fill="#ffcf62" opacity=".75" />
              <path d="M50 112q20-55 40 0M100 112q20-55 40 0" fill="#e45b55" stroke="#fff0b0" strokeWidth="3" />
            </g>

            <g className="scene-crowd" fill="#120d20">
              {[35, 270, 335, 630, 675, 960, 1030, 1110].map((x, index) => (
                <g key={x} transform={`translate(${x} ${555 + (index % 3) * 16})`}>
                  <circle cx="0" cy="0" r="12" />
                  <path d="M-15 70 0 15 15 70Z" />
                </g>
              ))}
            </g>
          </svg>

          <div className="fair-scene__wheel"><FerrisWheel /></div>
          <StringLights className="fair-scene__lights" count={20} />

          {fairStops.map((stop) => {
            const Icon = icons[stop.icon];
            return (
              <button
                key={stop.id}
                className={`fair-stop fair-stop--${stop.id}`}
                style={{ left: `${stop.position.x}%`, top: `${stop.position.y}%` }}
                type="button"
                onClick={() => onExplore(stop.id)}
              >
                <span className="fair-stop__icon"><Icon aria-hidden="true" /></span>
                <span className="fair-stop__label"><strong>{stop.name}</strong><small>{stop.action}</small></span>
              </button>
            );
          })}

          {celebration > 0 && (
            <div className="fireworks" key={celebration} aria-hidden="true">
              {[0, 1, 2].map((firework) => (
                <span className={`firework firework--${firework + 1}`} key={firework}>
                  {Array.from({ length: 12 }, (_, spark) => <i key={spark} style={{ '--spark-index': spark } as CSSProperties} />)}
                </span>
              ))}
            </div>
          )}

          <button className="button button--sun fair-scene__fireworks-button" type="button" onClick={lightTheSky}>
            <Sparkles size={18} aria-hidden="true" /> Light up the sky
          </button>
          <span className="fair-scene__hint">Glowing markers are interactive</span>
        </div>
      </div>
    </section>
  );
}
