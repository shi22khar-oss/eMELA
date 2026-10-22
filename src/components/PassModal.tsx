import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Download, PartyPopper, ShieldCheck, Sparkles, Ticket, Users } from 'lucide-react';
import type { MelaPass } from '../types';
import { Brand } from './Brand';
import { Modal } from './Modal';

interface PassModalProps {
  open: boolean;
  pass: MelaPass | null;
  onClose: () => void;
  onCreate: (name: string, guests: number) => void;
  onDownload: () => void;
}

export function PassModal({ open, pass, onClose, onCreate, onDownload }: PassModalProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(pass?.name ?? '');
  const [guests, setGuests] = useState(pass?.guests ?? 1);

  useEffect(() => {
    if (open) {
      setEditing(false);
      setName(pass?.name ?? '');
      setGuests(pass?.guests ?? 1);
    }
  }, [open, pass]);

  const showForm = !pass || editing;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(name.trim(), guests);
    setEditing(false);
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy="pass-title">
      {showForm ? (
        <div className="pass-form">
          <span className="pass-form__icon"><Ticket aria-hidden="true" /></span>
          <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Come one. Come all.</p>
          <h2 id="pass-title">Your free pass to a happier place.</h2>
          <p>Make it yours. No payment, no inbox clutter—just a little something to begin your mela adventure.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="pass-name">What should we call you?</label>
            <input
              id="pass-name"
              name="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name or your crew’s name"
              autoComplete="name"
              maxLength={40}
              required
              data-autofocus
            />
            <label htmlFor="pass-guests">Who are you bringing along?</label>
            <div className="select-wrap">
              <Users size={18} aria-hidden="true" />
              <select id="pass-guests" name="guests" value={guests} onChange={(event) => setGuests(Number(event.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>{count === 1 ? 'Just me' : `${count} of us`}</option>
                ))}
              </select>
            </div>
            <button className="button button--sun button--full button--large" type="submit">
              Create my free pass <ArrowRight size={19} aria-hidden="true" />
            </button>
          </form>
          <p className="pass-form__privacy"><ShieldCheck size={16} aria-hidden="true" /> Your pass is stored only in this browser.</p>
        </div>
      ) : (
        <div className="pass-success">
          <div className="pass-success__heading">
            <span><PartyPopper aria-hidden="true" /></span>
            <div>
              <p className="eyebrow">And just like that, you’re in</p>
              <h2 id="pass-title">Let the good times begin.</h2>
            </div>
          </div>
          <div className="digital-pass">
            <div className="digital-pass__top">
              <Brand linked={false} />
              <span>FREE ENTRY</span>
            </div>
            <p>THIS LITTLE PASS BELONGS TO</p>
            <h3>{pass.name}</h3>
            <div className="digital-pass__details">
              <div><span>PARTY</span><strong>{pass.guests} {pass.guests === 1 ? 'person' : 'people'}</strong></div>
              <div><span>ACCESS</span><strong>Every little joy</strong></div>
            </div>
            <div className="digital-pass__bottom">
              <span>{pass.id}</span>
              <Sparkles aria-hidden="true" />
            </div>
          </div>
          <button className="button button--sun button--full button--large" type="button" onClick={onDownload}>
            <Download size={19} aria-hidden="true" /> Download my pass
          </button>
          <button className="button button--outline button--full" type="button" onClick={onClose}>Done — let’s explore</button>
          <button className="text-button pass-success__edit" type="button" onClick={() => setEditing(true)}>Make a new pass</button>
        </div>
      )}
    </Modal>
  );
}
