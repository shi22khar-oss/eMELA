import { ArrowUp, Github, Sparkles } from 'lucide-react';
import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__main">
        <div className="site-footer__brand">
          <Brand />
          <p>Come for the lights.<br />Stay for one more game.</p>
        </div>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <a href="#fairground">The fairground</a>
          <a href="#games">Game alley</a>
          <a href="#food">Jalebi counter</a>
          <a href="#craft">Diya studio</a>
          <a href="#stage">Centre stage</a>
        </nav>
        <a className="social-button" href="https://github.com/shi22khar-oss/eMELA" target="_blank" rel="noreferrer" aria-label="View eMELA on GitHub">
          <Github aria-hidden="true" />
        </a>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} eMELA. Made for the joy of it.</span>
        <span><Sparkles size={14} aria-hidden="true" /> Stay curious. Stay playful.</span>
        <a href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
