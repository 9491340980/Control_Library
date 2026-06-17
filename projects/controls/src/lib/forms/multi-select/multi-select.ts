import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId, ChOption } from '../control-base';

/**
 * Multi-select with chips — no third-party dependencies. Works with `[(ngModel)]`.
 * Value is an array of the selected option values.
 *
 *   <ch-multi-select [(ngModel)]="tags" [options]="tagOptions" placeholder="Add tags" />
 */
@Component({
  selector: 'ch-multi-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChMultiSelect)],
  template: `
    <div class="ch-ms">
      <div
        class="ch-ms__control"
        [class.ch-ms__control--invalid]="invalid()"
        [class.ch-ms__control--disabled]="isDisabled()"
        [attr.id]="id()"
        (click)="toggle()"
      >
        @if (selected().length === 0) {
          <span class="ch-ms__placeholder">{{ placeholder() }}</span>
        } @else {
          @for (opt of selected(); track $index) {
            <span class="ch-ms__chip">
              {{ opt.label }}
              <button
                type="button"
                class="ch-ms__chip-x"
                [disabled]="isDisabled()"
                (click)="remove($event, opt)"
                aria-label="Remove"
              >
                &times;
              </button>
            </span>
          }
        }
        <span class="ch-ms__caret">▾</span>
      </div>

      @if (open()) {
        <div class="ch-ms__backdrop" (click)="close()"></div>
        <div class="ch-ms__panel">
          @for (opt of options(); track $index) {
            <button
              type="button"
              class="ch-ms__option"
              [class.ch-ms__option--active]="isSelected(opt)"
              [disabled]="opt.disabled ?? false"
              (click)="toggleOption(opt)"
            >
              <span class="ch-ms__check">{{ isSelected(opt) ? '✓' : '' }}</span>
              {{ opt.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-ms {
        position: relative;
        display: block;
        width: 100%;
        font-family: var(--ch-font-family-base);
      }
      .ch-ms__control {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.25rem;
        min-height: var(--ch-control-height-md);
        box-sizing: border-box;
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        background-color: var(--ch-color-white);
        padding: 0.25rem 1.75rem 0.25rem 0.5rem;
        cursor: pointer;
        position: relative;
      }
      .ch-ms__control--invalid {
        border-color: var(--ch-color-danger);
      }
      .ch-ms__control--disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-ms__placeholder {
        color: var(--ch-color-text-soft);
        font-size: var(--ch-font-size-sm);
      }
      .ch-ms__chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        background-color: var(--ch-color-primary-soft);
        color: var(--ch-color-primary);
        border-radius: var(--ch-radius-sm);
        padding: 1px 6px;
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-medium);
      }
      .ch-ms__chip-x {
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 0.9rem;
        line-height: 1;
        padding: 0;
      }
      .ch-ms__caret {
        position: absolute;
        right: 0.5rem;
        color: var(--ch-color-text-muted);
        font-size: 0.7rem;
      }
      .ch-ms__backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
      }
      .ch-ms__panel {
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
      .ch-ms__option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
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
      .ch-ms__option:hover:not(:disabled) {
        background-color: var(--ch-color-surface-soft);
      }
      .ch-ms__option--active {
        color: var(--ch-color-primary);
        font-weight: var(--ch-font-weight-medium);
      }
      .ch-ms__check {
        width: 1rem;
        display: inline-block;
      }
    `,
  ],
})
export class ChMultiSelect extends ChControlBase<unknown[]> {
  readonly options = input<ChOption[]>([]);
  readonly placeholder = input('Select…');
  readonly id = input(chNextId('ch-multi-select'));
  readonly invalid = input(false);

  readonly open = signal(false);

  private readonly values = computed<unknown[]>(() => this.value() ?? []);

  readonly selected = computed(() =>
    this.options().filter((o) => this.values().includes(o.value)),
  );

  isSelected(opt: ChOption): boolean {
    return this.values().includes(opt.value);
  }

  toggle(): void {
    if (this.isDisabled()) return;
    this.open.update((o) => !o);
  }

  close(): void {
    this.open.set(false);
    this.onTouched();
  }

  toggleOption(opt: ChOption): void {
    const current = this.values();
    const next = current.includes(opt.value)
      ? current.filter((v) => v !== opt.value)
      : [...current, opt.value];
    this.setValue(next);
  }

  remove(event: Event, opt: ChOption): void {
    event.stopPropagation();
    if (this.isDisabled()) return;
    this.setValue(this.values().filter((v) => v !== opt.value));
  }
}
