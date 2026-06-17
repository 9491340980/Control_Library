import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor } from '../control-base';

/**
 * Number stepper with increment/decrement. Works with `[(ngModel)]`.
 *
 *   <ch-stepper [(ngModel)]="qty" [min]="0" [max]="10" />
 */
@Component({
  selector: 'ch-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChStepper)],
  template: `
    <div class="ch-stepper" [class.ch-stepper--disabled]="isDisabled()">
      <button
        type="button"
        class="ch-stepper__btn"
        [disabled]="isDisabled() || atMin()"
        (click)="nudge(-step())"
        aria-label="Decrease"
      >
        &minus;
      </button>
      <input
        class="ch-stepper__input"
        type="number"
        [value]="value() ?? 0"
        [disabled]="isDisabled()"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      <button
        type="button"
        class="ch-stepper__btn"
        [disabled]="isDisabled() || atMax()"
        (click)="nudge(step())"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  `,
  styles: [
    `
      .ch-stepper {
        display: inline-flex;
        align-items: stretch;
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        overflow: hidden;
        font-family: var(--ch-font-family-base);
      }
      .ch-stepper--disabled {
        opacity: 0.6;
      }
      .ch-stepper__btn {
        width: 2.25rem;
        border: none;
        background-color: var(--ch-color-surface-soft);
        color: var(--ch-color-text-primary);
        font-size: var(--ch-font-size-md);
        cursor: pointer;
      }
      .ch-stepper__btn:disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }
      .ch-stepper__btn:hover:not(:disabled) {
        background-color: var(--ch-color-border);
      }
      .ch-stepper__input {
        width: 3.25rem;
        border: none;
        text-align: center;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
        -moz-appearance: textfield;
      }
      .ch-stepper__input:focus {
        outline: none;
      }
      .ch-stepper__input::-webkit-outer-spin-button,
      .ch-stepper__input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class ChStepper extends ChControlBase<number> {
  readonly step = input(1);
  readonly min = input<number | null>(null);
  readonly max = input<number | null>(null);

  readonly atMin = computed(() => {
    const min = this.min();
    return min != null && (this.value() ?? 0) <= min;
  });
  readonly atMax = computed(() => {
    const max = this.max();
    return max != null && (this.value() ?? 0) >= max;
  });

  nudge(delta: number): void {
    this.commit((this.value() ?? 0) + delta);
  }

  onInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value;
    this.commit(raw === '' ? 0 : Number(raw));
  }

  private commit(next: number): void {
    const min = this.min();
    const max = this.max();
    if (min != null) next = Math.max(min, next);
    if (max != null) next = Math.min(max, next);
    this.setValue(next);
  }
}
