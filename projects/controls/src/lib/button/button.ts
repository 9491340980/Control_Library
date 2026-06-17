import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

/** Visual style of the button (mirrors the CareHigh button system). */
export type ChButtonVariant = 'primary' | 'secondary' | 'outline' | 'info';
/** Size of the button. */
export type ChButtonSize = 'md' | 'lg';

/**
 * Reusable button control.
 *
 * Usage in a consuming app:
 *   <ch-button variant="primary" (clicked)="save()">Save</ch-button>
 */
@Component({
  selector: 'ch-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="ch-btn"
      [class]="'ch-btn--' + variant() + (size() === 'lg' ? ' ch-btn--lg' : '')"
      [class.ch-btn--disabled]="disabled()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './button.scss',
})
export class ChButton {
  /** Visual style. Defaults to 'primary'. */
  readonly variant = input<ChButtonVariant>('primary');
  /** Size. Defaults to 'md'. */
  readonly size = input<ChButtonSize>('md');
  /** Whether the button is disabled. */
  readonly disabled = input<boolean>(false);
  /** Emitted when the button is clicked. */
  readonly clicked = output<MouseEvent>();
}
