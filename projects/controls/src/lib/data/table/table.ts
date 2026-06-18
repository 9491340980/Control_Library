import { Component, input, ChangeDetectionStrategy } from '@angular/core';

export interface ChColumn {
  /** Key into each row object. */
  key: string;
  /** Column header label. */
  label: string;
  /** Text alignment. */
  align?: 'left' | 'center' | 'right';
}

/**
 * Simple data table. Pass `columns` and `rows` (array of objects).
 *
 *   <ch-table [columns]="cols" [rows]="patients" />
 */
@Component({
  selector: 'ch-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-table__wrap">
      <table class="ch-table">
        <thead>
          <tr>
            @for (col of columns(); track col.key) {
              <th [style.text-align]="col.align || 'left'">{{ col.label }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track $index) {
            <tr>
              @for (col of columns(); track col.key) {
                <td [style.text-align]="col.align || 'left'">{{ row[col.key] }}</td>
              }
            </tr>
          } @empty {
            <tr>
              <td class="ch-table__empty" [attr.colspan]="columns().length">{{ emptyText() }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      .ch-table__wrap {
        width: 100%;
        overflow-x: auto;
        border: 1px solid var(--ch-color-border);
        border-radius: var(--ch-radius-lg);
      }
      .ch-table {
        width: 100%;
        border-collapse: collapse;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
      }
      .ch-table th {
        text-align: left;
        padding: 0.625rem 0.875rem;
        background-color: var(--ch-color-surface-muted);
        color: var(--ch-color-text-muted);
        font-weight: var(--ch-font-weight-semibold);
        font-size: var(--ch-font-size-xs);
        text-transform: uppercase;
        letter-spacing: 0.025em;
        border-bottom: 1px solid var(--ch-color-border);
      }
      .ch-table td {
        padding: 0.625rem 0.875rem;
        color: var(--ch-color-text-secondary);
        border-bottom: 1px solid var(--ch-color-border);
      }
      .ch-table tbody tr:last-child td {
        border-bottom: none;
      }
      .ch-table tbody tr:hover td {
        background-color: var(--ch-color-surface-muted);
      }
      .ch-table__empty {
        text-align: center;
        color: var(--ch-color-text-muted);
        padding: 1.5rem;
      }
    `,
  ],
})
export class ChTable {
  readonly columns = input<ChColumn[]>([]);
  readonly rows = input<Record<string, unknown>[]>([]);
  readonly emptyText = input('No data');
}
