import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

/**
 * Small tag / chip, optionally removable.
 *
 *   <ch-tag [removable]="true" (removed)="remove()">Cardiology</ch-tag>
 */
@Component({
  selector: 'ch-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ch-tag">
      <ng-content></ng-content>
      @if (removable()) {
        <button type="button" class="ch-tag__x" (click)="removed.emit()" aria-label="Remove">
          &times;
        </button>
      }
    </span>
  `,
  styles: [
    `
      .ch-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background-color: var(--ch-color-surface-soft);
        color: var(--ch-color-text-secondary);
        border-radius: var(--ch-radius-sm);
        padding: 2px 8px;
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-medium);
      }
      .ch-tag__x {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
        padding: 0;
      }
      .ch-tag__x:hover {
        color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChTag {
  readonly removable = input(false);
  readonly removed = output<void>();
}
