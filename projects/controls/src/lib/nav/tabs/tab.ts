import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';

/**
 * A single tab. Use inside `<ch-tabs>`. Content is shown when the tab is active.
 *
 *   <ch-tab label="Overview">…</ch-tab>
 */
@Component({
  selector: 'ch-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active()) {
      <div class="ch-tab__panel"><ng-content></ng-content></div>
    }
  `,
  styles: [
    `
      .ch-tab__panel {
        padding-top: 1rem;
      }
    `,
  ],
})
export class ChTab {
  readonly label = input('');
  /** Set by the parent <ch-tabs>. */
  readonly active = signal(false);
}
