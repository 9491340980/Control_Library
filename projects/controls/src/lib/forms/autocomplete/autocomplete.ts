import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId, ChOption } from '../control-base';

/**
 * Autocomplete / typeahead — no third-party dependencies. Works with `[(ngModel)]`.
 * Value is the selected option's value.
 *
 *   <ch-autocomplete [(ngModel)]="city" [options]="cityOptions" placeholder="Search city" />
 */
@Component({
  selector: 'ch-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChAutocomplete)],
  template: `
    <div class="ch-ac">
      <input
        [id]="id()"
        class="ch-ac__input"
        type="text"
        autocomplete="off"
        [class.ch-ac__input--invalid]="invalid()"
        [value]="query()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        (input)="onInput($event)"
        (focus)="open.set(true)"
        (blur)="onTouched()"
      />

      @if (open() && filtered().length > 0) {
        <div class="ch-ac__backdrop" (click)="close()"></div>
        <div class="ch-ac__panel">
          @for (opt of filtered(); track $index) {
            <button
              type="button"
              class="ch-ac__option"
              [disabled]="opt.disabled ?? false"
              (click)="select(opt)"
            >
              {{ opt.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-ac {
        position: relative;
        display: block;
        width: 100%;
        font-family: var(--ch-font-family-base);
      }
      .ch-ac__input {
        display: block;
        width: 100%;
        box-sizing: border-box;
        min-height: var(--ch-control-height-md);
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        background-color: var(--ch-color-white);
        color: var(--ch-color-text-secondary);
        font-size: var(--ch-font-size-sm);
        padding: 0.5rem 0.75rem;
      }
      .ch-ac__input:focus {
        outline: none;
        border-color: var(--ch-color-primary);
      }
      .ch-ac__input--invalid {
        border-color: var(--ch-color-danger);
      }
      .ch-ac__input:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-ac__backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
      }
      .ch-ac__panel {
        position: absolute;
        z-index: 50;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        max-height: 14rem;
        overflow-y: auto;
        background-color: var(--ch-color-surface);
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        box-shadow: var(--ch-shadow-lg);
        padding: 0.25rem;
      }
      .ch-ac__option {
        display: block;
        width: 100%;
        border: none;
        background: transparent;
        text-align: left;
        padding: 0.4rem 0.5rem;
        border-radius: var(--ch-radius-sm);
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
        cursor: pointer;
      }
      .ch-ac__option:hover:not(:disabled) {
        background-color: var(--ch-color-surface-soft);
      }
    `,
  ],
})
export class ChAutocomplete extends ChControlBase<unknown> {
  readonly options = input<ChOption[]>([]);
  readonly placeholder = input('Search…');
  readonly id = input(chNextId('ch-autocomplete'));
  readonly invalid = input(false);

  readonly open = signal(false);
  /** The text currently shown in the input. */
  readonly query = signal('');

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.options();
    return this.options().filter((o) => o.label.toLowerCase().includes(q));
  });

  override writeValue(v: unknown): void {
    super.writeValue(v);
    const match = this.options().find((o) => o.value === v);
    this.query.set(match ? match.label : '');
  }

  onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.open.set(true);
    // Typing clears a previously chosen value until a new option is picked.
    this.setValue(null);
  }

  select(opt: ChOption): void {
    this.query.set(opt.label);
    this.setValue(opt.value);
    this.close();
  }

  close(): void {
    this.open.set(false);
    this.onTouched();
  }
}
