'use client';

import { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  fixedHeight?: boolean;
  footer?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children, fixedHeight, footer }: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={`relative w-full max-w-lg bg-white rounded-t-2xl animate-slide-up ${fixedHeight ? 'h-[70vh] flex flex-col' : ''}`}>
        <div className={`flex items-center justify-between p-4 border-b border-gray-100 ${fixedHeight ? 'shrink-0' : ''}`}>
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors ml-auto"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={`p-4 ${fixedHeight ? 'flex-1 overflow-y-auto' : ''}`}>{children}</div>
        {footer && (
          <div className="shrink-0 p-4 border-t border-gray-100 bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
