import { Component, input, model, ChangeDetectionStrategy } from '@angular/core';

/**
 * Collapsible accordion item. Self-contained; bind `[(open)]` if you need control.
 *
 *   <ch-accordion-item title="Billing">…</ch-accordion-item>
 */
@Component({
  selector: 'ch-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-acc">
      <button type="button" class="ch-acc__header" (click)="open.set(!open())" [attr.aria-expanded]="open()">
        <span class="ch-acc__title">{{ title() }}</span>
        <span class="ch-acc__chevron" [class.ch-acc__chevron--open]="open()">▾</span>
      </button>
      @if (open()) {
        <div class="ch-acc__body"><ng-content></ng-content></div>
      }
    </div>
  `,
  styles: [
    `
      .ch-acc {
        border: 1px solid var(--ch-color-border);
        border-radius: var(--ch-radius-md);
        font-family: var(--ch-font-family-base);
      }
      .ch-acc__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border: none;
        background: transparent;
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-medium);
        color: var(--ch-color-text-primary);
      }
      .ch-acc__chevron {
        transition: transform 150ms ease;
        color: var(--ch-color-text-muted);
      }
      .ch-acc__chevron--open {
        transform: rotate(180deg);
      }
      .ch-acc__body {
        padding: 0 1rem 0.875rem;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
    `,
  ],
})
export class ChAccordionItem {
  readonly title = input('');
  readonly open = model(false);
}
