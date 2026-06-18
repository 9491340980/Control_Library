import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Loading spinner.
 *
 *   <ch-spinner size="lg" />
 */
@Component({
  selector: 'ch-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span class="ch-spinner" [class]="'ch-spinner--' + size()" role="status" aria-label="Loading"></span> `,
  styles: [
    `
      .ch-spinner {
        display: inline-block;
        border-radius: 50%;
        border-style: solid;
        border-color: var(--ch-color-border);
        border-top-color: var(--ch-color-primary);
        animation: ch-spin 0.6s linear infinite;
      }
      .ch-spinner--sm {
        width: 1rem;
        height: 1rem;
        border-width: 2px;
      }
      .ch-spinner--md {
        width: 1.75rem;
        height: 1.75rem;
        border-width: 3px;
      }
      .ch-spinner--lg {
        width: 2.75rem;
        height: 2.75rem;
        border-width: 4px;
      }
      @keyframes ch-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class ChSpinner {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}
