import { useEffect, useState } from 'react';
import { Menu, NotebookPen, Ticket, X } from 'lucide-react';
import { Brand } from './Brand';

interface HeaderProps {
  planCount: number;
  hasPass: boolean;
  onOpenPlan: () => void;
  onOpenPass: () => void;
}

const links = [
  { href: '#fairgrounds', label: 'The fairgrounds' },
  { href: '#experiences', label: 'Things to love' },
  { href: '#lineup', label: 'On stage' },
];

export function Header({ planCount, hasPass, onOpenPlan, onOpenPass }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>A little wonder goes a long way</span>
        <span className="announcement__right">The gates are open · Come as you are</span>
      </div>
      <header className="site-header">
        <div className="site-header__inner shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="plan-button" type="button" onClick={onOpenPlan} aria-label={`Open my mela plan, ${planCount} items`}>
              <NotebookPen size={18} aria-hidden="true" />
              <span>My mela</span>
              <span className="plan-button__count" aria-hidden="true">{planCount}</span>
            </button>
            <button className="button button--dark header-pass" type="button" onClick={onOpenPass}>
              <Ticket size={17} aria-hidden="true" />
              {hasPass ? 'My pass' : 'Get free pass'}
            </button>
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
        <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Mobile navigation" hidden={!menuOpen}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
          ))}
          <button type="button" onClick={() => { closeMenu(); onOpenPlan(); }}>
            My mela plan <span>{planCount}</span>
          </button>
          <button className="button button--dark" type="button" onClick={() => { closeMenu(); onOpenPass(); }}>
            <Ticket size={18} aria-hidden="true" />
            {hasPass ? 'View my pass' : 'Get my free pass'}
          </button>
        </nav>
      </header>
    </>
  );
}
