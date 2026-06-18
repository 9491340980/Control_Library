import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

/**
 * Text link. Renders an anchor when `href` is set, otherwise a clickable span.
 *
 *   <ch-link href="/help">Need help?</ch-link>
 *   <ch-link (clicked)="readMore()">Read more</ch-link>
 */
@Component({
  selector: 'ch-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="ch-link"
      [class.ch-link--muted]="muted()"
      [attr.href]="href() || null"
      [attr.target]="external() ? '_blank' : null"
      [attr.rel]="external() ? 'noopener noreferrer' : null"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      .ch-link {
        color: var(--ch-color-primary);
        cursor: pointer;
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-medium);
        text-decoration: underline;
      }
      .ch-link:hover {
        color: var(--ch-color-primary-hover);
      }
      .ch-link--muted {
        color: var(--ch-color-text-muted);
      }
      .ch-link--muted:hover {
        color: var(--ch-color-text-primary);
      }
    `,
  ],
})
export class ChLink {
  readonly href = input('');
  readonly external = input(false);
  readonly muted = input(false);
  readonly clicked = output<MouseEvent>();
}
