import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Groups buttons/actions in a row. Use `align` to push them left/center/right.
 *
 *   <ch-button-group align="end">
 *     <ch-button variant="outline">Cancel</ch-button>
 *     <ch-button variant="primary">Save</ch-button>
 *   </ch-button-group>
 */
@Component({
  selector: 'ch-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-btn-group" [class]="'ch-btn-group--' + align()">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .ch-btn-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .ch-btn-group--start {
        justify-content: flex-start;
      }
      .ch-btn-group--center {
        justify-content: center;
      }
      .ch-btn-group--end {
        justify-content: flex-end;
      }
    `,
  ],
})
export class ChButtonGroup {
  readonly align = input<'start' | 'center' | 'end'>('start');
}
