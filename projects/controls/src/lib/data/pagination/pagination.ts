import { Component, input, model, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * Pagination control. Two-way bind the current page.
 *
 *   <ch-pagination [total]="120" [pageSize]="10" [(page)]="page" />
 */
@Component({
  selector: 'ch-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="ch-pg" aria-label="Pagination">
      <button
        type="button"
        class="ch-pg__btn"
        [disabled]="page() <= 1"
        (click)="go(page() - 1)"
      >
        ‹
      </button>
      @for (p of pages(); track $index) {
        @if (p === -1) {
          <span class="ch-pg__gap">…</span>
        } @else {
          <button
            type="button"
            class="ch-pg__btn"
            [class.ch-pg__btn--active]="p === page()"
            (click)="go(p)"
          >
            {{ p }}
          </button>
        }
      }
      <button
        type="button"
        class="ch-pg__btn"
        [disabled]="page() >= totalPages()"
        (click)="go(page() + 1)"
      >
        ›
      </button>
    </nav>
  `,
  styles: [
    `
      .ch-pg {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font-family: var(--ch-font-family-base);
      }
      .ch-pg__btn {
        min-width: 2rem;
        height: 2rem;
        border: 1px solid var(--ch-color-border);
        background-color: var(--ch-color-white);
        color: var(--ch-color-text-secondary);
        border-radius: var(--ch-radius-sm);
        font-size: var(--ch-font-size-sm);
        cursor: pointer;
      }
      .ch-pg__btn:hover:not(:disabled):not(.ch-pg__btn--active) {
        background-color: var(--ch-color-surface-soft);
      }
      .ch-pg__btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .ch-pg__btn--active {
        background-color: var(--ch-color-primary);
        border-color: var(--ch-color-primary);
        color: var(--ch-color-text-inverse);
      }
      .ch-pg__gap {
        padding: 0 0.25rem;
        color: var(--ch-color-text-muted);
      }
    `,
  ],
})
export class ChPagination {
  readonly total = input(0);
  readonly pageSize = input(10);
  readonly page = model(1);

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize())));

  /** Page numbers to render; -1 represents an ellipsis gap. */
  readonly pages = computed<number[]>(() => {
    const total = this.totalPages();
    const current = this.page();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const result: number[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    if (start > 2) result.push(-1);
    for (let i = start; i <= end; i++) result.push(i);
    if (end < total - 1) result.push(-1);
    result.push(total);
    return result;
  });

  go(target: number): void {
    const clamped = Math.min(this.totalPages(), Math.max(1, target));
    if (clamped !== this.page()) this.page.set(clamped);
  }
}
