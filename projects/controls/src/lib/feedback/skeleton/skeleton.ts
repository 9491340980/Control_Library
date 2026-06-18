import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Skeleton placeholder shown while content loads.
 *
 *   <ch-skeleton width="100%" height="1rem" />
 *   <ch-skeleton shape="circle" width="2.5rem" height="2.5rem" />
 */
@Component({
  selector: 'ch-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="ch-skeleton"
      [class.ch-skeleton--circle]="shape() === 'circle'"
      [style.width]="width()"
      [style.height]="height()"
    ></span>
  `,
  styles: [
    `
      .ch-skeleton {
        display: block;
        border-radius: var(--ch-radius-sm);
        background: linear-gradient(
          90deg,
          var(--ch-color-surface-soft) 25%,
          var(--ch-color-border) 37%,
          var(--ch-color-surface-soft) 63%
        );
        background-size: 400% 100%;
        animation: ch-shimmer 1.4s ease infinite;
      }
      .ch-skeleton--circle {
        border-radius: var(--ch-radius-full);
      }
      @keyframes ch-shimmer {
        0% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }
    `,
  ],
})
export class ChSkeleton {
  readonly width = input('100%');
  readonly height = input('1rem');
  readonly shape = input<'rect' | 'circle'>('rect');
}
