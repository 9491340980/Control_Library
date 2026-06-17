import { Directive, Type, forwardRef, input, signal, computed, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let _uid = 0;
/** Generates a unique, stable id for label/for associations. */
export function chNextId(prefix = 'ch'): string {
  return `${prefix}-${++_uid}`;
}

/**
 * Registers a component as a ControlValueAccessor so it works with
 * `[(ngModel)]` and reactive forms. Pass a thunk to avoid TDZ issues.
 *
 *   providers: [chValueAccessor(() => ChInput)]
 */
export function chValueAccessor(fn: () => Type<unknown>): Provider {
  return { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(fn), multi: true };
}

/**
 * Base class for form controls. Handles the ControlValueAccessor plumbing so
 * each control only has to read `value()` / `isDisabled()` and call
 * `setValue()` when the user changes it.
 */
@Directive()
export abstract class ChControlBase<T> implements ControlValueAccessor {
  /** Disable via template binding, e.g. `[disabled]="true"`. */
  readonly disabled = input(false);

  /** Disabled state pushed by reactive forms (setDisabledState). */
  protected readonly formDisabled = signal(false);

  /** Effective disabled state from either source. */
  readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  /** Current model value. */
  readonly value = signal<T | null>(null);

  protected onChange: (v: T | null) => void = () => {};
  /** Called to mark the control as touched (e.g. on blur). */
  onTouched: () => void = () => {};

  writeValue(v: T | null): void {
    this.value.set(v);
  }
  registerOnChange(fn: (v: T | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  /** Update the value from the view and notify Angular forms. */
  protected setValue(v: T | null): void {
    this.value.set(v);
    this.onChange(v);
  }
}

/** Common shape for option-based controls (select, radio group). */
export interface ChOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}
