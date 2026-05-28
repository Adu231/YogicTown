import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  accentColor?: string;
}

export function Modal({ open, onClose, title, subtitle, children, size = 'md', accentColor = 'hsl(133 18% 59%)' }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  const sizeClass = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-2xl' : 'max-w-lg';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizeClass} bg-background rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col`}
        style={{ animation: 'modal-in 0.2s ease-out' }}>
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-1.5 h-5 rounded-full" style={{ background: accentColor }} />
              <h2 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{title}</h2>
            </div>
            {subtitle && <p className="text-xs text-muted-foreground ml-4">{subtitle}</p>}
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground shrink-0 ml-4">
            <X size={16} />
          </button>
        </div>
        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
      <style>{`@keyframes modal-in { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
    </div>
  );
}

// Reusable form field components
export function FormField({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 flex items-center gap-1 block">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export const inputClass = 'w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all';
export const selectClass = 'w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all';
export const textareaClass = 'w-full px-3 py-2.5 rounded-xl bg-muted border border-transparent focus:outline-none focus:ring-2 focus:ring-primary text-sm transition-all resize-none';
