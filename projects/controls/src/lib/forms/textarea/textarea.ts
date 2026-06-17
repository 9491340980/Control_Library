import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId } from '../control-base';

/**
 * Multi-line text input. Works with `[(ngModel)]` and reactive forms.
 *
 *   <ch-textarea [(ngModel)]="notes" [rows]="4" placeholder="Notes" />
 */
@Component({
  selector: 'ch-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChTextarea)],
  template: `
    <textarea
      [id]="id()"
      class="ch-textarea"
      [class.ch-textarea--invalid]="invalid()"
      [rows]="rows()"
      [value]="value() ?? ''"
      [placeholder]="placeholder()"
      [disabled]="isDisabled()"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
  styles: [
    `
      .ch-textarea {
        display: block;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        background-color: var(--ch-color-white);
        color: var(--ch-color-text-secondary);
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        padding: 0.5rem 0.75rem;
        resize: vertical;
        transition: border-color 150ms ease;
      }
      .ch-textarea::placeholder {
        color: var(--ch-color-text-soft);
      }
      .ch-textarea:focus {
        outline: none;
        border-color: var(--ch-color-primary);
      }
      .ch-textarea:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-textarea--invalid {
        border-color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChTextarea extends ChControlBase<string> {
  readonly placeholder = input('');
  readonly rows = input(3);
  readonly id = input(chNextId('ch-textarea'));
  readonly invalid = input(false);

  onInput(event: Event): void {
    this.setValue((event.target as HTMLTextAreaElement).value);
  }
}
