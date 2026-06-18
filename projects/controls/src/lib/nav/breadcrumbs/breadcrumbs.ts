import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

export interface ChBreadcrumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumb trail.
 *
 *   <ch-breadcrumbs [items]="[{label:'Home',href:'/'},{label:'Patients'}]" />
 */
@Component({
  selector: 'ch-breadcrumbs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="ch-bc" aria-label="Breadcrumb">
      @for (item of items(); track $index; let last = $last) {
        @if (last || !item.href) {
          <span class="ch-bc__current" aria-current="page">{{ item.label }}</span>
        } @else {
          <a class="ch-bc__link" [attr.href]="item.href" (click)="navigate.emit(item)">{{ item.label }}</a>
          <span class="ch-bc__sep">/</span>
        }
      }
    </nav>
  `,
  styles: [
    `
      .ch-bc {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
      }
      .ch-bc__link {
        color: var(--ch-color-text-muted);
        text-decoration: none;
        cursor: pointer;
      }
      .ch-bc__link:hover {
        color: var(--ch-color-primary);
      }
      .ch-bc__sep {
        color: var(--ch-color-text-soft);
      }
      .ch-bc__current {
        color: var(--ch-color-text-primary);
        font-weight: var(--ch-font-weight-medium);
      }
    `,
  ],
})
export class ChBreadcrumbs {
  readonly items = input<ChBreadcrumb[]>([]);
  readonly navigate = output<ChBreadcrumb>();
}
