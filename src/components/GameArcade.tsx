import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CircleDot, Gamepad2, Sparkles } from 'lucide-react';
import { BalloonGame } from './BalloonGame';
import { RingTossGame } from './RingTossGame';

type GameId = 'balloons' | 'rings';

export function GameArcade() {
  const [game, setGame] = useState<GameId>('balloons');

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextGame: GameId = event.key === 'Home'
      ? 'balloons'
      : event.key === 'End'
        ? 'rings'
        : game === 'balloons' ? 'rings' : 'balloons';
    setGame(nextGame);
    document.getElementById(`${nextGame}-tab`)?.focus();
  };

  return (
    <section className="games section" id="games" aria-labelledby="games-title">
      <div className="shell">
        <div className="section-heading section-heading--split">
          <div>
            <p className="eyebrow"><Gamepad2 size={16} aria-hidden="true" /> Welcome to Game Alley</p>
            <h2 id="games-title">No tokens. No queue.<br /><em>Just play.</em></h2>
          </div>
          <p>Two fairground favourites, made for touchscreens, keyboards, and your most competitive friend.</p>
        </div>

        <div className="arcade">
          <div className="arcade__topbar">
            <span className="arcade__brand"><Sparkles size={17} aria-hidden="true" /> eMELA GAME ALLEY</span>
            <div className="game-tabs" role="tablist" aria-label="Choose a fairground game">
              <button
                id="balloons-tab"
                type="button"
                role="tab"
                aria-selected={game === 'balloons'}
                aria-controls="balloons-panel"
                tabIndex={game === 'balloons' ? 0 : -1}
                onKeyDown={handleTabKeyDown}
                onClick={() => setGame('balloons')}
              >
                <CircleDot size={17} aria-hidden="true" /> Balloon pop
              </button>
              <button
                id="rings-tab"
                type="button"
                role="tab"
                aria-selected={game === 'rings'}
                aria-controls="rings-panel"
                tabIndex={game === 'rings' ? 0 : -1}
                onKeyDown={handleTabKeyDown}
                onClick={() => setGame('rings')}
              >
                <CircleDot size={17} aria-hidden="true" /> Ring toss
              </button>
            </div>
          </div>
          <div className="arcade__panel" id="balloons-panel" role="tabpanel" aria-labelledby="balloons-tab" hidden={game !== 'balloons'}>
            {game === 'balloons' && <BalloonGame />}
          </div>
          <div className="arcade__panel" id="rings-panel" role="tabpanel" aria-labelledby="rings-tab" hidden={game !== 'rings'}>
            {game === 'rings' && <RingTossGame />}
          </div>
        </div>
      </div>
    </section>
  );
}
