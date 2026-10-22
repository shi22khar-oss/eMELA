import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('eMELA experience', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('adds a fairground zone to the plan and removes it from the planner', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Explore The Food Street' }));
    expect(screen.getByRole('heading', { name: 'The Food Street', level: 3 })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Add to my mela' }));
    expect(screen.getByRole('button', { name: 'Added to my mela' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Open my mela plan, 1 items' }));
    const planner = screen.getByRole('dialog', { name: 'My mela plan' });
    expect(within(planner).getByRole('heading', { name: 'The Food Street' })).toBeVisible();

    await user.click(within(planner).getByRole('button', { name: 'Remove The Food Street from my plan' }));
    expect(within(planner).getByText('Your next favourite thing is out there.')).toBeVisible();
  });

  it('filters the stage line-up and saves a performance', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Dance' }));
    expect(screen.getByRole('heading', { name: 'Ghungroo & Groove' })).toBeVisible();
    expect(screen.queryByRole('heading', { name: 'Dhol at the Door' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Add Ghungroo & Groove to my plan' }));
    await user.click(screen.getByRole('button', { name: 'Open my mela plan, 1 items' }));
    expect(screen.getByRole('dialog', { name: 'My mela plan' })).toHaveTextContent('7:00 PM · 35 min · Centre Stage');
  });

  it('creates a personalized pass without requiring an email address', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Get free pass' }));
    const dialog = screen.getByRole('dialog', { name: 'Your free pass to a happier place.' });
    await user.type(within(dialog).getByLabelText('What should we call you?'), 'Asha and friends');
    await user.selectOptions(within(dialog).getByLabelText('Who are you bringing along?'), '3');
    await user.click(within(dialog).getByRole('button', { name: 'Create my free pass' }));

    expect(screen.getByRole('heading', { name: 'Let the good times begin.' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Asha and friends' })).toBeVisible();
    expect(screen.getByText('3 people')).toBeVisible();
    expect(screen.getByText(/EM-[A-Z0-9]{7}/)).toBeVisible();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });

  it('closes dialogs with the Escape key', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'Get free pass' }));
    expect(screen.getByRole('dialog')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
