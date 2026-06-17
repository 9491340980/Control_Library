import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor } from '../control-base';

/**
 * Toggle switch (on/off). Works with `[(ngModel)]` and reactive forms.
 *
 *   <ch-switch [(ngModel)]="notifications">Email notifications</ch-switch>
 */
@Component({
  selector: 'ch-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChSwitch)],
  template: `
    <label class="ch-switch" [class.ch-switch--disabled]="isDisabled()">
      <button
        type="button"
        role="switch"
        class="ch-switch__track"
        [class.ch-switch__track--on]="value() === true"
        [attr.aria-checked]="value() === true"
        [disabled]="isDisabled()"
        (click)="toggle()"
        (blur)="onTouched()"
      >
        <span class="ch-switch__thumb"></span>
      </button>
      <span class="ch-switch__label"><ng-content></ng-content></span>
    </label>
  `,
  styles: [
    `
      .ch-switch {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-switch--disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .ch-switch__track {
        position: relative;
        width: 2.25rem;
        height: 1.25rem;
        flex-shrink: 0;
        border: none;
        border-radius: var(--ch-radius-full);
        background-color: var(--ch-color-border-strong);
        cursor: inherit;
        padding: 0;
        transition: background-color 150ms ease;
      }
      .ch-switch__track--on {
        background-color: var(--ch-color-primary);
      }
      .ch-switch__thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 1rem;
        height: 1rem;
        border-radius: var(--ch-radius-full);
        background-color: var(--ch-color-white);
        transition: transform 150ms ease;
      }
      .ch-switch__track--on .ch-switch__thumb {
        transform: translateX(1rem);
      }
    `,
  ],
})
export class ChSwitch extends ChControlBase<boolean> {
  toggle(): void {
    this.setValue(!(this.value() === true));
  }
}
