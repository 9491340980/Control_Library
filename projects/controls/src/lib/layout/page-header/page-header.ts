import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Page header — title, optional subtitle, and an actions slot on the right.
 *
 *   <ch-page-header title="Patients" subtitle="Manage your patient list">
 *     <ch-button variant="primary">Add patient</ch-button>
 *   </ch-page-header>
 */
@Component({
  selector: 'ch-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="ch-page-header">
      <div class="ch-page-header__text">
        <h1 class="ch-page-header__title">{{ title() }}</h1>
        @if (subtitle()) {
          <p class="ch-page-header__subtitle">{{ subtitle() }}</p>
        }
      </div>
      <div class="ch-page-header__actions">
        <ng-content></ng-content>
      </div>
    </header>
  `,
  styles: [
    `
      .ch-page-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        font-family: var(--ch-font-family-base);
        margin-bottom: 1rem;
      }
      .ch-page-header__title {
        margin: 0;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: var(--ch-font-weight-bold);
        color: var(--ch-color-text-strong);
      }
      .ch-page-header__subtitle {
        margin: 0.25rem 0 0;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-muted);
      }
      .ch-page-header__actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    `,
  ],
})
export class ChPageHeader {
  readonly title = input('');
  readonly subtitle = input('');
}
