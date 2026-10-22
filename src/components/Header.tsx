import { useEffect, useState } from 'react';
import { Menu, Volume2, VolumeX, X } from 'lucide-react';
import { Brand } from './Brand';

interface HeaderProps {
  soundOn: boolean;
  onToggleSound: () => void;
}

const links = [
  { href: '#fairground', label: 'Fairground' },
  { href: '#games', label: 'Game alley' },
  { href: '#stalls', label: 'Food & craft' },
  { href: '#stage', label: 'Live stage' },
];

export function Header({ soundOn, onToggleSound }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className={`sound-toggle ${soundOn ? 'is-on' : ''}`}
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? 'Sound on Turn fair sound off' : 'Sound off Turn fair sound on'}
          >
            {soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
            <span>{soundOn ? 'Sound on' : 'Sound off'}</span>
          </button>
          <a className="button button--sun header-cta" href="#games">Let’s play</a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
        ))}
      </nav>
    </header>
  );
}
