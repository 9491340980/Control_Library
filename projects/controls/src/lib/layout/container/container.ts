import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Page shell / centered content container with a max width.
 *
 *   <ch-container size="lg">…</ch-container>
 */
@Component({
  selector: 'ch-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="ch-container" [class]="'ch-container--' + size()"><ng-content></ng-content></div>`,
  styles: [
    `
      .ch-container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        box-sizing: border-box;
      }
      .ch-container--sm {
        max-width: 40rem;
      }
      .ch-container--md {
        max-width: 56rem;
      }
      .ch-container--lg {
        max-width: 72rem;
      }
      .ch-container--full {
        max-width: none;
      }
    `,
  ],
})
export class ChContainer {
  readonly size = input<'sm' | 'md' | 'lg' | 'full'>('lg');
}
