import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId, ChOption } from '../control-base';

/**
 * Radio button group. Works with `[(ngModel)]` and reactive forms.
 *
 *   <ch-radio-group [(ngModel)]="plan" [options]="planOptions" />
 */
@Component({
  selector: 'ch-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChRadioGroup)],
  template: `
    <div
      class="ch-radio-group"
      [class.ch-radio-group--inline]="inline()"
      role="radiogroup"
    >
      @for (opt of options(); track $index) {
        <label class="ch-radio" [class.ch-radio--disabled]="isDisabled() || (opt.disabled ?? false)">
          <input
            type="radio"
            class="ch-radio__input"
            [name]="name()"
            [checked]="opt.value === value()"
            [disabled]="isDisabled() || (opt.disabled ?? false)"
            (change)="setValue(opt.value)"
            (blur)="onTouched()"
          />
          <span class="ch-radio__label">{{ opt.label }}</span>
        </label>
      }
    </div>
  `,
  styles: [
    `
      .ch-radio-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .ch-radio-group--inline {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .ch-radio {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-radio--disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .ch-radio__input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--ch-color-primary);
        cursor: inherit;
      }
    `,
  ],
})
export class ChRadioGroup extends ChControlBase<unknown> {
  /** Options to choose from. */
  readonly options = input<ChOption[]>([]);
  /** Shared radio group name (auto-generated). */
  readonly name = input(chNextId('ch-radio'));
  /** Lay options out horizontally. */
  readonly inline = input(false);
}
