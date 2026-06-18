import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Empty / no-data placeholder. Project actions into the default slot.
 *
 *   <ch-empty-state title="No patients yet" message="Add your first patient.">
 *     <ch-button variant="primary">Add patient</ch-button>
 *   </ch-empty-state>
 */
@Component({
  selector: 'ch-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-empty">
      @if (icon()) {
        <div class="ch-empty__icon">{{ icon() }}</div>
      }
      <p class="ch-empty__title">{{ title() }}</p>
      @if (message()) {
        <p class="ch-empty__message">{{ message() }}</p>
      }
      <div class="ch-empty__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .ch-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        text-align: center;
        padding: 2.5rem 1.5rem;
        border: 1px dashed var(--ch-color-border);
        border-radius: var(--ch-radius-lg);
        background-color: var(--ch-color-surface-muted);
      }
      .ch-empty__icon {
        font-size: 2rem;
      }
      .ch-empty__title {
        margin: 0;
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-primary);
      }
      .ch-empty__message {
        margin: 0;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-muted);
      }
      .ch-empty__actions {
        margin-top: 0.5rem;
      }
    `,
  ],
})
export class ChEmptyState {
  readonly title = input('Nothing here yet');
  readonly message = input('');
  readonly icon = input('');
}
