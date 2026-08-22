import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, useModal } from '../lib/modal';

function Host({ initialOpen = true }: { initialOpen?: boolean }) {
  const m = useModal(initialOpen);
  return (
    <>
      <button onClick={m.open}>Open</button>
      <Modal isOpen={m.isOpen} onClose={m.close} labelledBy="t">
        <h2 id="t">Confirm</h2>
        <button>Cancel</button>
        <button>OK</button>
      </Modal>
    </>
  );
}

describe('Modal (React port)', () => {
  it('renders nothing when closed', () => {
    render(<Host initialOpen={false} />);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders dialog with aria-modal and labelled-by', () => {
    render(<Host />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 't');
  });

  it('closes on Escape', () => {
    render(<Host />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('traps focus between first and last focusable', () => {
    render(<Host />);
    const buttons = screen.getAllByRole('button').filter((b) => b.textContent !== 'Open');
    expect(buttons.length).toBe(2);
    const cancel = buttons[0]!;
    const ok = buttons[1]!;
    cancel.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(ok);
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(cancel);
  });

  it('restores focus to the trigger on close', () => {
    render(<Host initialOpen={false} />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(document.activeElement).toBe(trigger);
  });
});