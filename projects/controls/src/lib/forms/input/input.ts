import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId } from '../control-base';

export type ChInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel';

/**
 * Text input control. Works with `[(ngModel)]` and reactive forms.
 *
 *   <ch-input [(ngModel)]="name" placeholder="Your name" />
 *   <ch-input type="email" [(ngModel)]="email" [invalid]="emailInvalid" />
 */
@Component({
  selector: 'ch-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChInput)],
  template: `
    <input
      [id]="id()"
      [type]="type()"
      class="ch-input"
      [class.ch-input--invalid]="invalid()"
      [value]="value() ?? ''"
      [placeholder]="placeholder()"
      [disabled]="isDisabled()"
      (input)="onInput($event)"
      (blur)="onTouched()"
    />
  `,
  styles: [
    `
      .ch-input {
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
        padding: 0.5rem 0.75rem;
        transition: border-color 150ms ease, box-shadow 150ms ease;
      }
      .ch-input::placeholder {
        color: var(--ch-color-text-soft);
      }
      .ch-input:focus {
        outline: none;
        border-color: var(--ch-color-primary);
      }
      .ch-input:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-input--invalid {
        border-color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChInput extends ChControlBase<string> {
  /** HTML input type. */
  readonly type = input<ChInputType>('text');
  /** Placeholder text. */
  readonly placeholder = input('');
  /** Element id (auto-generated; pass your own to match a label's `for`). */
  readonly id = input(chNextId('ch-input'));
  /** Renders the error state. */
  readonly invalid = input(false);

  onInput(event: Event): void {
    this.setValue((event.target as HTMLInputElement).value);
  }
}
