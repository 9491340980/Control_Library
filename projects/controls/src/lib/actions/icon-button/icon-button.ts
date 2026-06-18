import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

export type ChIconButtonVariant = 'default' | 'primary' | 'danger';

/**
 * Icon-only button. Place an icon (svg/font) as the projected content.
 *
 *   <ch-icon-button ariaLabel="Edit" (clicked)="edit()">✏️</ch-icon-button>
 */
@Component({
  selector: 'ch-icon-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="ch-icon-btn"
      [class]="'ch-icon-btn--' + variant()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel()"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .ch-icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--ch-control-height-md);
        height: var(--ch-control-height-md);
        border: 1px solid transparent;
        border-radius: var(--ch-radius-md);
        background: transparent;
        color: var(--ch-color-text-secondary);
        cursor: pointer;
        transition: background-color 150ms ease, color 150ms ease;
      }
      .ch-icon-btn:hover:not(:disabled) {
        background-color: var(--ch-color-surface-soft);
      }
      .ch-icon-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .ch-icon-btn--primary {
        background-color: var(--ch-color-primary);
        color: var(--ch-color-text-inverse);
      }
      .ch-icon-btn--primary:hover:not(:disabled) {
        background-color: var(--ch-color-primary-hover);
      }
      .ch-icon-btn--danger {
        color: var(--ch-color-danger);
      }
      .ch-icon-btn--danger:hover:not(:disabled) {
        background-color: var(--ch-color-danger-soft);
      }
    `,
  ],
})
export class ChIconButton {
  readonly variant = input<ChIconButtonVariant>('default');
  readonly disabled = input(false);
  readonly ariaLabel = input('');
  readonly clicked = output<MouseEvent>();
}
