import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Step / wizard progress indicator.
 *
 *   <ch-steps [steps]="['Account','Profile','Confirm']" [active]="1" />
 */
@Component({
  selector: 'ch-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="ch-steps">
      @for (step of steps(); track $index; let last = $last) {
        <li class="ch-steps__item">
          <span
            class="ch-steps__marker"
            [class.ch-steps__marker--done]="$index < active()"
            [class.ch-steps__marker--active]="$index === active()"
          >
            {{ $index < active() ? '✓' : $index + 1 }}
          </span>
          <span
            class="ch-steps__label"
            [class.ch-steps__label--active]="$index === active()"
          >
            {{ step }}
          </span>
          @if (!last) {
            <span class="ch-steps__line" [class.ch-steps__line--done]="$index < active()"></span>
          }
        </li>
      }
    </ol>
  `,
  styles: [
    `
      .ch-steps {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0;
        font-family: var(--ch-font-family-base);
      }
      .ch-steps__item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1 1 auto;
      }
      .ch-steps__item:last-child {
        flex: 0 0 auto;
      }
      .ch-steps__marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: var(--ch-radius-full);
        background-color: var(--ch-color-surface-soft);
        color: var(--ch-color-text-muted);
        font-size: var(--ch-font-size-xs);
        font-weight: var(--ch-font-weight-semibold);
        flex-shrink: 0;
      }
      .ch-steps__marker--done {
        background-color: var(--ch-color-primary);
        color: var(--ch-color-text-inverse);
      }
      .ch-steps__marker--active {
        background-color: var(--ch-color-primary-soft);
        color: var(--ch-color-primary);
        box-shadow: 0 0 0 2px var(--ch-color-primary);
      }
      .ch-steps__label {
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-muted);
        white-space: nowrap;
      }
      .ch-steps__label--active {
        color: var(--ch-color-text-primary);
        font-weight: var(--ch-font-weight-medium);
      }
      .ch-steps__line {
        flex: 1 1 auto;
        height: 2px;
        background-color: var(--ch-color-border);
        margin: 0 0.25rem;
      }
      .ch-steps__line--done {
        background-color: var(--ch-color-primary);
      }
    `,
  ],
})
export class ChSteps {
  readonly steps = input<string[]>([]);
  readonly active = input(0);
}
