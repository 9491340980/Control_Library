import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Wraps a control with a label, optional hint, and error message.
 *
 *   <ch-form-field label="Email" [error]="form.email.errors?.required ? 'Required' : ''">
 *     <ch-input [(ngModel)]="email" type="email" />
 *   </ch-form-field>
 */
@Component({
  selector: 'ch-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-form-field">
      @if (label()) {
        <label class="ch-form-field__label" [attr.for]="for() || null">
          {{ label() }}@if (required()) {<span class="ch-form-field__required">*</span>}
        </label>
      }
      <ng-content></ng-content>
      @if (error()) {
        <p class="ch-form-field__error">{{ error() }}</p>
      } @else if (hint()) {
        <p class="ch-form-field__hint">{{ hint() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .ch-form-field {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ch-form-field__label {
        color: var(--ch-color-text-secondary);
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-medium);
      }
      .ch-form-field__required {
        color: var(--ch-color-danger);
        margin-left: 2px;
      }
      .ch-form-field__hint {
        margin: 0;
        color: var(--ch-color-text-muted);
        font-size: var(--ch-font-size-xs);
      }
      .ch-form-field__error {
        margin: 0;
        color: var(--ch-color-danger);
        font-size: var(--ch-font-size-xs);
      }
    `,
  ],
})
export class ChFormField {
  /** Field label text. */
  readonly label = input('');
  /** `id` of the control this label points to. */
  readonly for = input('');
  /** Helper text shown when there is no error. */
  readonly hint = input('');
  /** Error message; when set, replaces the hint and turns red. */
  readonly error = input('');
  /** Shows a required asterisk. */
  readonly required = input(false);
}
