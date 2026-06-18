import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ChToastService } from './toast.service';

/**
 * Renders active toasts. Place once near the app root:
 *
 *   <ch-toaster />
 */
@Component({
  selector: 'ch-toaster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-toaster" aria-live="polite">
      @for (toast of service.toasts(); track toast.id) {
        <div class="ch-toast" [class]="'ch-toast--' + toast.variant" role="status">
          <div class="ch-toast__body">
            @if (toast.title) {
              <p class="ch-toast__title">{{ toast.title }}</p>
            }
            <p class="ch-toast__message">{{ toast.message }}</p>
          </div>
          <button type="button" class="ch-toast__close" (click)="service.dismiss(toast.id)" aria-label="Dismiss">
            &times;
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-toaster {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1100;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 22rem;
        font-family: var(--ch-font-family-base);
      }
      .ch-toast {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        background-color: var(--ch-color-surface);
        border-left: 4px solid var(--ch-color-info);
        border-radius: var(--ch-radius-md);
        box-shadow: var(--ch-shadow-lg);
        padding: 0.75rem 1rem;
      }
      .ch-toast--success {
        border-left-color: var(--ch-color-success);
      }
      .ch-toast--warning {
        border-left-color: var(--ch-color-warning);
      }
      .ch-toast--danger {
        border-left-color: var(--ch-color-danger);
      }
      .ch-toast__body {
        flex: 1 1 auto;
      }
      .ch-toast__title {
        margin: 0 0 0.15rem;
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-strong);
      }
      .ch-toast__message {
        margin: 0;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-toast__close {
        border: none;
        background: transparent;
        font-size: 1.1rem;
        line-height: 1;
        cursor: pointer;
        color: var(--ch-color-text-muted);
      }
    `,
  ],
})
export class ChToaster {
  readonly service = inject(ChToastService);
}
