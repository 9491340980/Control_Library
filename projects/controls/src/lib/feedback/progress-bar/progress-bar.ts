import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * Linear progress bar.
 *
 *   <ch-progress-bar [value]="65" />
 */
@Component({
  selector: 'ch-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-progress" role="progressbar" [attr.aria-valuenow]="clamped()">
      <div class="ch-progress__fill" [style.width.%]="clamped()"></div>
      @if (showLabel()) {
        <span class="ch-progress__label">{{ clamped() }}%</span>
      }
    </div>
  `,
  styles: [
    `
      .ch-progress {
        position: relative;
        width: 100%;
        height: 0.5rem;
        background-color: var(--ch-color-surface-soft);
        border-radius: var(--ch-radius-full);
        overflow: hidden;
      }
      .ch-progress__fill {
        height: 100%;
        background-color: var(--ch-color-primary);
        border-radius: inherit;
        transition: width 250ms ease;
      }
      .ch-progress__label {
        position: absolute;
        right: 0.25rem;
        top: -1.25rem;
        font-size: var(--ch-font-size-xs);
        color: var(--ch-color-text-muted);
      }
    `,
  ],
})
export class ChProgressBar {
  readonly value = input(0);
  readonly showLabel = input(false);

  readonly clamped = computed(() => Math.min(100, Math.max(0, Math.round(this.value()))));
}
