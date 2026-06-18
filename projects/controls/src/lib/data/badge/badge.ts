import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export type ChBadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'neutral';

/**
 * Status pill / badge. Mirrors the CareHigh status badges.
 *
 *   <ch-badge variant="success">Active</ch-badge>
 *   <ch-badge variant="warning" [dot]="true">Pending</ch-badge>
 */
@Component({
  selector: 'ch-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ch-badge" [class]="'ch-badge--' + variant()">
      @if (dot()) {
        <span class="ch-badge__dot"></span>
      }
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      .ch-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        height: 22px;
        border-radius: 15px;
        padding: 2px 15px;
        font-size: 12px;
        font-weight: var(--ch-font-weight-semibold);
      }
      .ch-badge__dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: currentColor;
      }
      .ch-badge--success {
        background-color: var(--ch-color-success-soft);
        color: var(--ch-color-success);
      }
      .ch-badge--warning {
        background-color: var(--ch-color-warning-soft);
        color: var(--ch-color-warning);
      }
      .ch-badge--danger {
        background-color: var(--ch-color-danger-soft);
        color: var(--ch-color-danger);
      }
      .ch-badge--info {
        background-color: var(--ch-color-info-soft);
        color: var(--ch-color-info);
      }
      .ch-badge--primary {
        background-color: var(--ch-color-primary-soft);
        color: var(--ch-color-primary);
      }
      .ch-badge--neutral {
        background-color: var(--ch-color-surface-soft);
        color: var(--ch-color-text-secondary);
      }
    `,
  ],
})
export class ChBadge {
  readonly variant = input<ChBadgeVariant>('neutral');
  readonly dot = input(false);
}
