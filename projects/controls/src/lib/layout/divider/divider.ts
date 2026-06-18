import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Horizontal or vertical divider, with optional centered label.
 *
 *   <ch-divider />
 *   <ch-divider label="OR" />
 *   <ch-divider orientation="vertical" />
 */
@Component({
  selector: 'ch-divider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (orientation() === 'vertical') {
      <span class="ch-divider ch-divider--v"></span>
    } @else if (label()) {
      <span class="ch-divider ch-divider--labelled">
        <span class="ch-divider__line"></span>
        <span class="ch-divider__text">{{ label() }}</span>
        <span class="ch-divider__line"></span>
      </span>
    } @else {
      <span class="ch-divider ch-divider--h"></span>
    }
  `,
  styles: [
    `
      .ch-divider--h {
        display: block;
        height: 1px;
        width: 100%;
        background-color: var(--ch-color-border);
        margin: 1rem 0;
      }
      .ch-divider--v {
        display: inline-block;
        width: 1px;
        align-self: stretch;
        min-height: 1em;
        background-color: var(--ch-color-border);
        margin: 0 0.75rem;
      }
      .ch-divider--labelled {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin: 1rem 0;
      }
      .ch-divider__line {
        flex: 1 1 auto;
        height: 1px;
        background-color: var(--ch-color-border);
      }
      .ch-divider__text {
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-medium);
        color: var(--ch-color-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `,
  ],
})
export class ChDivider {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly label = input('');
}
