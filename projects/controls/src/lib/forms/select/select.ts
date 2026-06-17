import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId, ChOption } from '../control-base';

/**
 * Native select / dropdown. Works with `[(ngModel)]` and reactive forms.
 * Option values may be any type (matched by reference/value).
 *
 *   <ch-select [(ngModel)]="country" [options]="countries" placeholder="Choose…" />
 */
@Component({
  selector: 'ch-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChSelect)],
  template: `
    <select
      [id]="id()"
      class="ch-select"
      [class.ch-select--invalid]="invalid()"
      [disabled]="isDisabled()"
      (change)="onSelect($event)"
      (blur)="onTouched()"
    >
      @if (placeholder()) {
        <option value="" [selected]="value() == null" disabled>{{ placeholder() }}</option>
      }
      @for (opt of options(); track $index) {
        <option [selected]="opt.value === value()" [disabled]="opt.disabled ?? false">
          {{ opt.label }}
        </option>
      }
    </select>
  `,
  styles: [
    `
      .ch-select {
        display: block;
        width: 100%;
        min-height: var(--ch-control-height-md);
        box-sizing: border-box;
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        background-color: var(--ch-color-white);
        color: var(--ch-color-text-secondary);
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        padding: 4px 10px;
        cursor: pointer;
      }
      .ch-select:focus {
        outline: none;
        border-color: var(--ch-color-primary);
      }
      .ch-select:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-select--invalid {
        border-color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChSelect extends ChControlBase<unknown> {
  /** Options to choose from. */
  readonly options = input<ChOption[]>([]);
  /** Placeholder shown as a disabled first option. */
  readonly placeholder = input('');
  readonly id = input(chNextId('ch-select'));
  readonly invalid = input(false);

  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    // Account for the leading placeholder option when present.
    const offset = this.placeholder() ? 1 : 0;
    const opt = this.options()[select.selectedIndex - offset];
    this.setValue(opt ? opt.value : null);
  }
}
