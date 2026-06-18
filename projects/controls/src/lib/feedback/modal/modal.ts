import { Component, input, model, output, ChangeDetectionStrategy } from '@angular/core';

/**
 * Modal dialog. Two-way bind `open`.
 *
 *   <ch-modal [(open)]="showDialog" title="Confirm">
 *     <p>Are you sure?</p>
 *     <div modal-footer>
 *       <ch-button variant="outline" (clicked)="showDialog=false">Cancel</ch-button>
 *       <ch-button variant="primary" (clicked)="confirm()">OK</ch-button>
 *     </div>
 *   </ch-modal>
 */
@Component({
  selector: 'ch-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="ch-modal">
        <div class="ch-modal__backdrop" (click)="close()"></div>
        <div class="ch-modal__dialog" [class]="'ch-modal__dialog--' + size()" role="dialog" aria-modal="true">
          <header class="ch-modal__header">
            <h3 class="ch-modal__title">{{ title() }}</h3>
            <button type="button" class="ch-modal__close" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="ch-modal__body">
            <ng-content></ng-content>
          </div>
          <footer class="ch-modal__footer">
            <ng-content select="[modal-footer]"></ng-content>
          </footer>
        </div>
      </div>
    }
  `,
  styles: [
    `
      .ch-modal {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        font-family: var(--ch-font-family-base);
      }
      .ch-modal__backdrop {
        position: absolute;
        inset: 0;
        background: rgba(15, 23, 42, 0.5);
      }
      .ch-modal__dialog {
        position: relative;
        width: 100%;
        max-height: calc(100vh - 2rem);
        display: flex;
        flex-direction: column;
        background-color: var(--ch-color-surface);
        border-radius: var(--ch-radius-xl);
        box-shadow: var(--ch-shadow-lg);
      }
      .ch-modal__dialog--sm {
        max-width: 24rem;
      }
      .ch-modal__dialog--md {
        max-width: 32rem;
      }
      .ch-modal__dialog--lg {
        max-width: 48rem;
      }
      .ch-modal__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--ch-color-border);
      }
      .ch-modal__title {
        margin: 0;
        font-size: var(--ch-font-size-md);
        font-weight: var(--ch-font-weight-semibold);
        color: var(--ch-color-text-strong);
      }
      .ch-modal__close {
        border: none;
        background: transparent;
        font-size: 1.4rem;
        line-height: 1;
        cursor: pointer;
        color: var(--ch-color-text-muted);
      }
      .ch-modal__close:hover {
        color: var(--ch-color-text-strong);
      }
      .ch-modal__body {
        padding: 1.25rem;
        overflow-y: auto;
        color: var(--ch-color-text-secondary);
        font-size: var(--ch-font-size-sm);
      }
      .ch-modal__footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        border-top: 1px solid var(--ch-color-border);
      }
      .ch-modal__footer:empty {
        display: none;
      }
    `,
  ],
})
export class ChModal {
  readonly open = model(false);
  readonly title = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly closed = output<void>();

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}
