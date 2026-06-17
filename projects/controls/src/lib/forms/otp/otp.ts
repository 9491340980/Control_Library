import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor } from '../control-base';

/**
 * One-time-password / verification code input. Works with `[(ngModel)]`.
 * Emits the joined code string as its value.
 *
 *   <ch-otp [(ngModel)]="code" [length]="6" />
 */
@Component({
  selector: 'ch-otp',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChOtp)],
  template: `
    <div class="ch-otp" (paste)="onPaste($event)">
      @for (slot of slots(); track $index) {
        <input
          class="ch-otp__box"
          type="text"
          inputmode="numeric"
          maxlength="1"
          autocomplete="one-time-code"
          [value]="charAt($index)"
          [disabled]="isDisabled()"
          (input)="onInput($index, $event)"
          (keydown)="onKeydown($index, $event)"
          (blur)="onTouched()"
        />
      }
    </div>
  `,
  styles: [
    `
      .ch-otp {
        display: inline-flex;
        gap: 0.5rem;
      }
      .ch-otp__box {
        width: 2.5rem;
        height: 2.5rem;
        border: 1px solid var(--ch-color-border-strong);
        border-radius: var(--ch-radius-sm);
        text-align: center;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-md);
        color: var(--ch-color-text-primary);
        text-transform: uppercase;
      }
      .ch-otp__box:focus {
        outline: none;
        border-color: var(--ch-color-primary);
      }
      .ch-otp__box:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
    `,
  ],
})
export class ChOtp extends ChControlBase<string> {
  /** Number of digits/boxes. */
  readonly length = input(6);

  /** Array used to render the right number of boxes. */
  readonly slots = computed(() => Array.from({ length: this.length() }));

  charAt(index: number): string {
    return (this.value() ?? '')[index] ?? '';
  }

  onInput(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const char = target.value.slice(-1);
    this.writeChar(index, char);
    if (char) {
      this.focusSibling(target, 1);
    }
  }

  onKeydown(index: number, event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && !this.charAt(index)) {
      this.focusSibling(target, -1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';
    if (!text) return;
    event.preventDefault();
    const next = text.replace(/\s/g, '').slice(0, this.length());
    this.setValue(next);
  }

  private writeChar(index: number, char: string): void {
    const chars = (this.value() ?? '').padEnd(this.length(), ' ').split('');
    chars[index] = char || ' ';
    this.setValue(chars.join('').replace(/\s+$/, ''));
  }

  private focusSibling(el: HTMLInputElement, direction: 1 | -1): void {
    const sibling =
      direction === 1
        ? (el.nextElementSibling as HTMLInputElement | null)
        : (el.previousElementSibling as HTMLInputElement | null);
    sibling?.focus();
  }
}
