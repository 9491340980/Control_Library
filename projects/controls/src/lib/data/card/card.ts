import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Surface container. Optional `title` renders a header; project body content.
 *
 *   <ch-card title="Patients">…</ch-card>
 */
@Component({
  selector: 'ch-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="ch-card" [class]="'ch-card--' + radius()">
      @if (title()) {
        <header class="ch-card__header">
          <h3 class="ch-card__title">{{ title() }}</h3>
          <ng-content select="[card-actions]"></ng-content>
        </header>
      }
      <div class="ch-card__body">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: [
    `
      .ch-card {
        background-color: var(--ch-color-surface);
        border: 1px solid var(--ch-color-border);
        box-shadow: var(--ch-shadow-sm);
      }
      .ch-card--lg {
        border-radius: var(--ch-radius-lg);
      }
      .ch-card--xl {
        border-radius: var(--ch-radius-xl);
      }
      .ch-card--2xl {
        border-radius: var(--ch-radius-2xl);
      }
      .ch-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--ch-color-border);
      }
      .ch-card__title {
        margin: 0;
        font-size: 18px;
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-primary);
      }
      .ch-card__body {
        padding: 1.25rem;
      }
    `,
  ],
})
export class ChCard {
  readonly title = input('');
  readonly radius = input<'lg' | 'xl' | '2xl'>('lg');
}
