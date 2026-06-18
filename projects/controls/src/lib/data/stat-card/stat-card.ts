import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * KPI / stat tile — label, big value, and optional trend delta.
 *
 *   <ch-stat-card label="Active patients" value="1,284" [delta]="12.5" />
 */
@Component({
  selector: 'ch-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-stat">
      <div class="ch-stat__label">
        @if (icon()) {
          <span class="ch-stat__icon">{{ icon() }}</span>
        }
        {{ label() }}
      </div>
      <div class="ch-stat__value">{{ value() }}</div>
      @if (delta() !== null) {
        <div
          class="ch-stat__delta"
          [class.ch-stat__delta--up]="(delta() ?? 0) >= 0"
          [class.ch-stat__delta--down]="(delta() ?? 0) < 0"
        >
          {{ (delta() ?? 0) >= 0 ? '▲' : '▼' }} {{ deltaText() }}
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-stat {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        background-color: var(--ch-color-surface);
        border: 1px solid var(--ch-color-border);
        border-top: 4px solid var(--ch-color-primary);
        border-radius: var(--ch-radius-xl);
        box-shadow: var(--ch-shadow-sm);
        padding: 1.25rem;
      }
      .ch-stat__label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-semibold);
        letter-spacing: 0.025em;
        text-transform: uppercase;
        color: var(--ch-color-text-muted);
      }
      .ch-stat__value {
        font-size: 1.75rem;
        font-weight: var(--ch-font-weight-bold);
        color: var(--ch-color-text-strong);
      }
      .ch-stat__delta {
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-semibold);
      }
      .ch-stat__delta--up {
        color: var(--ch-color-success);
      }
      .ch-stat__delta--down {
        color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChStatCard {
  readonly label = input('');
  readonly value = input<string | number>('');
  readonly icon = input('');
  /** Percentage change; null hides the trend row. */
  readonly delta = input<number | null>(null);

  readonly deltaText = computed(() => `${Math.abs(this.delta() ?? 0)}%`);
}
