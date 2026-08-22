import { useState, useCallback, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export function useModal(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, open, close };
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, labelledBy, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const el = ref.current;
    el?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab' || !ref.current) return;
      const focusable = ref.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      restoreRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative w-full max-w-sm bg-surface border border-border rounded-xl p-5 shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
}