import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

export type ChAlertVariant = 'info' | 'success' | 'warning' | 'danger';

/**
 * Inline alert / banner.
 *
 *   <ch-alert variant="success" title="Saved" [dismissible]="true">Your changes were saved.</ch-alert>
 */
@Component({
  selector: 'ch-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-alert" [class]="'ch-alert--' + variant()" role="alert">
      <div class="ch-alert__body">
        @if (title()) {
          <p class="ch-alert__title">{{ title() }}</p>
        }
        <div class="ch-alert__content"><ng-content></ng-content></div>
      </div>
      @if (dismissible()) {
        <button type="button" class="ch-alert__close" (click)="dismissed.emit()" aria-label="Dismiss">
          &times;
        </button>
      }
    </div>
  `,
  styles: [
    `
      .ch-alert {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        border: 1px solid transparent;
        border-radius: var(--ch-radius-md);
        padding: 0.75rem 1rem;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
      }
      .ch-alert__body {
        flex: 1 1 auto;
      }
      .ch-alert__title {
        margin: 0 0 0.15rem;
        font-weight: var(--ch-font-weight-semibold);
      }
      .ch-alert__content {
        opacity: 0.95;
      }
      .ch-alert__close {
        border: none;
        background: transparent;
        color: inherit;
        font-size: 1.1rem;
        line-height: 1;
        cursor: pointer;
        opacity: 0.7;
      }
      .ch-alert__close:hover {
        opacity: 1;
      }
      .ch-alert--info {
        background-color: var(--ch-color-info-soft);
        color: var(--ch-color-info);
        border-color: var(--ch-color-info);
      }
      .ch-alert--success {
        background-color: var(--ch-color-success-soft);
        color: var(--ch-color-success);
        border-color: var(--ch-color-success);
      }
      .ch-alert--warning {
        background-color: var(--ch-color-warning-soft);
        color: var(--ch-color-warning);
        border-color: var(--ch-color-warning);
      }
      .ch-alert--danger {
        background-color: var(--ch-color-danger-soft);
        color: var(--ch-color-danger);
        border-color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChAlert {
  readonly variant = input<ChAlertVariant>('info');
  readonly title = input('');
  readonly dismissible = input(false);
  readonly dismissed = output<void>();
}
