import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';

/**
 * Dropdown menu button. Put menu content (e.g. buttons/links) in the default slot.
 *
 *   <ch-dropdown label="Actions">
 *     <button class="ch-dropdown__item">Edit</button>
 *     <button class="ch-dropdown__item">Delete</button>
 *   </ch-dropdown>
 */
@Component({
  selector: 'ch-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-dropdown">
      <button type="button" class="ch-dropdown__trigger" [disabled]="disabled()" (click)="toggle()">
        {{ label() }}
        <span class="ch-dropdown__caret">▾</span>
      </button>
      @if (open()) {
        <div class="ch-dropdown__backdrop" (click)="close()"></div>
        <div class="ch-dropdown__menu" [class]="'ch-dropdown__menu--' + align()" (click)="close()">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .ch-dropdown {
        position: relative;
        display: inline-block;
        font-family: var(--ch-font-family-base);
      }
      .ch-dropdown__trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        border: 1px solid var(--ch-color-border-strong);
        background-color: var(--ch-color-white);
        color: var(--ch-color-text-primary);
        border-radius: var(--ch-radius-md);
        padding: var(--ch-button-padding-y) var(--ch-button-padding-x);
        font-size: var(--ch-font-size-sm);
        cursor: pointer;
      }
      .ch-dropdown__trigger:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .ch-dropdown__caret {
        font-size: 0.7rem;
        color: var(--ch-color-text-muted);
      }
      .ch-dropdown__backdrop {
        position: fixed;
        inset: 0;
        z-index: 40;
      }
      .ch-dropdown__menu {
        position: absolute;
        z-index: 50;
        top: calc(100% + 4px);
        min-width: 10rem;
        background-color: var(--ch-color-surface);
        border: 1px solid var(--ch-color-border-muted);
        border-radius: var(--ch-radius-md);
        box-shadow: var(--ch-shadow-lg);
        padding: 0.25rem;
      }
      .ch-dropdown__menu--start {
        left: 0;
      }
      .ch-dropdown__menu--end {
        right: 0;
      }
      ::ng-deep .ch-dropdown__item {
        display: block;
        width: 100%;
        text-align: left;
        border: none;
        background: transparent;
        padding: 0.45rem 0.6rem;
        border-radius: var(--ch-radius-sm);
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
        cursor: pointer;
      }
      ::ng-deep .ch-dropdown__item:hover {
        background-color: var(--ch-color-surface-soft);
      }
    `,
  ],
})
export class ChDropdown {
  readonly label = input('Menu');
  readonly align = input<'start' | 'end'>('start');
  readonly disabled = input(false);

  readonly open = signal(false);

  toggle(): void {
    if (!this.disabled()) this.open.update((o) => !o);
  }
  close(): void {
    this.open.set(false);
  }
}
