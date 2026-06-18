import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Flexbox layout helper. Stack children vertically or horizontally with a gap.
 *
 *   <ch-stack [gap]="1" align="center">…</ch-stack>
 *   <ch-stack direction="row" justify="between">…</ch-stack>
 */
@Component({
  selector: 'ch-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content>`,
  host: {
    '[style.display]': '"flex"',
    '[style.flexDirection]': 'direction()',
    '[style.gap.rem]': 'gap()',
    '[style.alignItems]': 'cssAlign',
    '[style.justifyContent]': 'cssJustify',
    '[style.flexWrap]': 'wrap() ? "wrap" : "nowrap"',
  },
})
export class ChStack {
  readonly direction = input<'row' | 'column'>('column');
  readonly gap = input(0.75);
  readonly align = input<'start' | 'center' | 'end' | 'stretch'>('stretch');
  readonly justify = input<'start' | 'center' | 'end' | 'between'>('start');
  readonly wrap = input(false);

  protected get cssAlign(): string {
    return this.align() === 'start' || this.align() === 'end'
      ? `flex-${this.align()}`
      : this.align();
  }
  protected get cssJustify(): string {
    const j = this.justify();
    if (j === 'between') return 'space-between';
    if (j === 'start' || j === 'end') return `flex-${j}`;
    return j;
  }
}
