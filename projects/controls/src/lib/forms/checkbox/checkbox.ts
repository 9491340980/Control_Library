import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor } from '../control-base';

/**
 * Checkbox control. Works with `[(ngModel)]` and reactive forms.
 *
 *   <ch-checkbox [(ngModel)]="agree">I agree to the terms</ch-checkbox>
 */
@Component({
  selector: 'ch-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChCheckbox)],
  template: `
    <label class="ch-checkbox" [class.ch-checkbox--disabled]="isDisabled()">
      <input
        type="checkbox"
        class="ch-checkbox__input"
        [checked]="value() === true"
        [disabled]="isDisabled()"
        (change)="onToggle($event)"
        (blur)="onTouched()"
      />
      <span class="ch-checkbox__label"><ng-content></ng-content></span>
    </label>
  `,
  styles: [
    `
      .ch-checkbox {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-checkbox--disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .ch-checkbox__input {
        width: 1rem;
        height: 1rem;
        accent-color: var(--ch-color-primary);
        cursor: inherit;
      }
    `,
  ],
})
export class ChCheckbox extends ChControlBase<boolean> {
  onToggle(event: Event): void {
    this.setValue((event.target as HTMLInputElement).checked);
  }
}
