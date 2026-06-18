import { Injectable, signal } from '@angular/core';

export type ChToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ChToast {
  id: number;
  message: string;
  title?: string;
  variant: ChToastVariant;
}

export interface ChToastOptions {
  title?: string;
  variant?: ChToastVariant;
  /** Auto-dismiss after this many ms (0 = sticky). Default 4000. */
  duration?: number;
}

/**
 * Toast notifications. Inject and call from anywhere; render `<ch-toaster>` once
 * near your app root.
 *
 *   private toast = inject(ChToastService);
 *   this.toast.success('Saved!');
 */
@Injectable({ providedIn: 'root' })
export class ChToastService {
  private nextId = 0;
  readonly toasts = signal<ChToast[]>([]);

  show(message: string, options: ChToastOptions = {}): number {
    const id = ++this.nextId;
    const toast: ChToast = {
      id,
      message,
      title: options.title,
      variant: options.variant ?? 'info',
    };
    this.toasts.update((list) => [...list, toast]);
    const duration = options.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  }

  success(message: string, options: ChToastOptions = {}): number {
    return this.show(message, { ...options, variant: 'success' });
  }
  error(message: string, options: ChToastOptions = {}): number {
    return this.show(message, { ...options, variant: 'danger' });
  }
  warning(message: string, options: ChToastOptions = {}): number {
    return this.show(message, { ...options, variant: 'warning' });
  }
  info(message: string, options: ChToastOptions = {}): number {
    return this.show(message, { ...options, variant: 'info' });
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
