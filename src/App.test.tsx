import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./utils/soundscape', () => ({
  FairSoundscape: class {
    start() { return Promise.resolve(); }
    stop() { return undefined; }
  },
}));

describe('eMELA interactive fair', () => {
  it('opens with experiences instead of planner and pass controls', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Step into the mela.' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Enter the fairground' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Start popping' })).toBeVisible();
    expect(screen.queryByRole('button', { name: /plan|pass/i })).not.toBeInTheDocument();
  });

  it('starts the wheel ride and closes the accessibly labelled dialog with Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Sky-High Wheel Take a ride' }));
    expect(screen.getByRole('dialog', { name: 'A little closer to the stars.' })).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Start my ride' }));
    expect(screen.getByText(/Settle into your gondola/)).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('plays balloon pop and increments the score', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Start popping' }));
    await user.click(screen.getByRole('button', { name: 'Pop coral balloon 1' }));
    expect(screen.getByLabelText('Balloon score')).toHaveTextContent('1');
    expect(screen.getByRole('button', { name: 'Pop coral balloon 1' })).toBeDisabled();
  });

  it('throws a ring and uses one of the available rings', async () => {
    const user = userEvent.setup();
    render(<App />);

    screen.getByRole('tab', { name: 'Balloon pop' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Ring toss' })).toHaveAttribute('aria-selected', 'true');
    await user.click(screen.getByRole('button', { name: 'Pick up the rings' }));
    await user.click(screen.getByRole('button', { name: 'Throw a ring at bottle 9, worth 1 point' }));
    await waitFor(() => expect(screen.getByLabelText('Rings remaining')).toHaveTextContent('5'));
  });

  it('fries a fresh pistachio jalebi batch', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Pistachio' }));
    await user.click(screen.getByRole('button', { name: 'Fry fresh jalebis' }));
    expect(screen.getByRole('button', { name: 'Frying your jalebis…' })).toBeDisabled();
    expect(await screen.findByText('Fresh pistachio jalebis are ready!', {}, { timeout: 3500 })).toBeVisible();
  });

  it('paints, patterns, and lights a diya', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Paint diya Neem green' }));
    await user.click(screen.getByRole('button', { name: 'stars' }));
    await user.click(screen.getByRole('button', { name: 'Light my diya' }));
    expect(screen.getByText('Your neem green diya with stars is glowing!')).toBeVisible();
  });

  it('only enables the soundscape after a visitor asks for it', async () => {
    const user = userEvent.setup();
    render(<App />);

    const soundOff = screen.getByRole('button', { name: /Turn fair sound on/i });
    expect(soundOff).toHaveAttribute('aria-pressed', 'false');
    await user.click(soundOff);
    const soundOn = await screen.findByRole('button', { name: /Turn fair sound off/i });
    expect(soundOn).toHaveAttribute('aria-pressed', 'true');

    await user.click(soundOn);
    expect(await screen.findByRole('button', { name: /Turn fair sound on/i })).toHaveAttribute('aria-pressed', 'false');
  });
});
