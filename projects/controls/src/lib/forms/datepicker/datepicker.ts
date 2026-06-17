import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor, chNextId } from '../control-base';

interface DayCell {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

function sameDay(a: Date | null, b: Date | null): boolean {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Native date picker — no third-party dependencies. Works with `[(ngModel)]`.
 * Value is a `Date`.
 *
 *   <ch-datepicker [(ngModel)]="dob" placeholder="Select date" />
 */
@Component({
  selector: 'ch-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChDatepicker)],
  template: `
    <div class="ch-dp">
      <input
        [id]="id()"
        class="ch-dp__input"
        type="text"
        readonly
        [class.ch-dp__input--invalid]="invalid()"
        [value]="display()"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        (click)="toggle()"
      />

      @if (open()) {
        <div class="ch-dp__backdrop" (click)="close()"></div>
        <div class="ch-dp__panel" role="dialog">
          <div class="ch-dp__header">
            <button type="button" class="ch-dp__nav" (click)="shiftMonth(-1)" aria-label="Previous month">
              &lsaquo;
            </button>
            <span class="ch-dp__title">{{ monthLabel() }}</span>
            <button type="button" class="ch-dp__nav" (click)="shiftMonth(1)" aria-label="Next month">
              &rsaquo;
            </button>
          </div>
          <div class="ch-dp__grid">
            @for (wd of weekdays; track wd) {
              <span class="ch-dp__weekday">{{ wd }}</span>
            }
            @for (cell of cells(); track cell.date.getTime()) {
              <button
                type="button"
                class="ch-dp__day"
                [class.ch-dp__day--muted]="!cell.inMonth"
                [class.ch-dp__day--today]="cell.isToday"
                [class.ch-dp__day--selected]="cell.isSelected"
                (click)="select(cell.date)"
              >
                {{ cell.date.getDate() }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-dp {
        position: relative;
        display: inline-block;
        width: 100%;
        font-family: var(--ch-font-family-base);
      }
      .ch-dp__input {
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
        cursor: pointer;
      }
      .ch-dp__input--invalid {
        border-color: var(--ch-color-danger);
      }
      .ch-dp__input:disabled {
        background-color: var(--ch-color-surface-soft);
        cursor: not-allowed;
        opacity: 0.7;
      }
      .ch-dp__backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
      }
      .ch-dp__panel {
        position: absolute;
        z-index: 50;
        top: calc(100% + 4px);
        left: 0;
        width: 17rem;
        background-color: var(--ch-color-surface);
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-lg);
        box-shadow: var(--ch-shadow-lg);
        padding: 0.75rem;
      }
      .ch-dp__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;
      }
      .ch-dp__title {
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-strong);
      }
      .ch-dp__nav {
        border: none;
        background: transparent;
        font-size: 1.25rem;
        line-height: 1;
        cursor: pointer;
        color: var(--ch-color-text-primary);
        padding: 0 0.5rem;
      }
      .ch-dp__nav:hover {
        color: var(--ch-color-primary);
      }
      .ch-dp__grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 2px;
      }
      .ch-dp__weekday {
        text-align: center;
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-muted);
        padding: 0.25rem 0;
      }
      .ch-dp__day {
        border: none;
        background: transparent;
        border-radius: var(--ch-radius-sm);
        padding: 0.4rem 0;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
        cursor: pointer;
      }
      .ch-dp__day:hover {
        background-color: var(--ch-color-surface-soft);
      }
      .ch-dp__day--muted {
        color: var(--ch-color-text-soft);
      }
      .ch-dp__day--today {
        border: 1px solid var(--ch-color-border-strong);
      }
      .ch-dp__day--selected {
        background-color: var(--ch-color-primary);
        color: var(--ch-color-text-inverse);
      }
      .ch-dp__day--selected:hover {
        background-color: var(--ch-color-primary-hover);
      }
    `,
  ],
})
export class ChDatepicker extends ChControlBase<Date> {
  readonly placeholder = input('Select date');
  readonly id = input(chNextId('ch-datepicker'));
  readonly invalid = input(false);

  readonly weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  readonly open = signal(false);
  /** First day of the month currently being viewed. */
  private readonly viewDate = signal(startOfMonth(new Date()));

  readonly monthLabel = computed(() =>
    this.viewDate().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
  );

  readonly display = computed(() => {
    const v = this.value();
    return v ? v.toLocaleDateString() : '';
  });

  readonly cells = computed<DayCell[]>(() => {
    const view = this.viewDate();
    const today = new Date();
    const selected = this.value();
    const start = new Date(view.getFullYear(), view.getMonth(), 1);
    start.setDate(1 - start.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return {
        date,
        inMonth: date.getMonth() === view.getMonth(),
        isToday: sameDay(date, today),
        isSelected: sameDay(date, selected),
      };
    });
  });

  toggle(): void {
    if (this.isDisabled()) return;
    if (!this.open()) {
      this.viewDate.set(startOfMonth(this.value() ?? new Date()));
    }
    this.open.update((o) => !o);
  }

  close(): void {
    this.open.set(false);
    this.onTouched();
  }

  shiftMonth(delta: number): void {
    const v = this.viewDate();
    this.viewDate.set(new Date(v.getFullYear(), v.getMonth() + delta, 1));
  }

  select(date: Date): void {
    this.setValue(new Date(date));
    this.close();
  }
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
