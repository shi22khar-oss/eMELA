import { ArrowUp, Github, Sparkles } from 'lucide-react';
import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__main">
        <div className="site-footer__brand">
          <Brand />
          <p>A little colour. A little chaos.<br />A whole lot of happy.</p>
        </div>
        <div className="site-footer__links">
          <div>
            <h2>Wander around</h2>
            <a href="#fairgrounds">The fairgrounds</a>
            <a href="#experiences">Things to love</a>
            <a href="#lineup">On stage</a>
          </div>
          <div>
            <h2>Good to know</h2>
            <a href="#visit">Your free pass</a>
            <a href="https://github.com/shi22khar-oss/eMELA" target="_blank" rel="noreferrer">About this project</a>
            <a href="https://github.com/shi22khar-oss/eMELA/issues" target="_blank" rel="noreferrer">Report an issue</a>
          </div>
        </div>
        <a className="social-button" href="https://github.com/shi22khar-oss/eMELA" target="_blank" rel="noreferrer" aria-label="View eMELA on GitHub">
          <Github aria-hidden="true" />
        </a>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} eMELA. Made for the joy of it.</span>
        <span className="site-footer__wish"><Sparkles size={14} aria-hidden="true" /> Stay curious. Stay playful.</span>
        <a href="#top">Back to top <ArrowUp size={15} aria-hidden="true" /></a>
      </div>
    </footer>
  );
}
