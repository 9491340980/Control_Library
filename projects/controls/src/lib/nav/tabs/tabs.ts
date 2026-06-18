import {
  Component,
  contentChildren,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChTab } from './tab';

/**
 * Tab set. Wrap `<ch-tab>` children.
 *
 *   <ch-tabs>
 *     <ch-tab label="Overview">…</ch-tab>
 *     <ch-tab label="Details">…</ch-tab>
 *   </ch-tabs>
 */
@Component({
  selector: 'ch-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-tabs">
      <div class="ch-tabs__list" role="tablist">
        @for (tab of tabs(); track $index) {
          <button
            type="button"
            class="ch-tabs__tab"
            [class.ch-tabs__tab--active]="$index === selected()"
            (click)="select($index)"
          >
            {{ tab.label() }}
          </button>
        }
      </div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .ch-tabs__list {
        display: flex;
        gap: 0.25rem;
        border-bottom: 1px solid var(--ch-color-border);
      }
      .ch-tabs__tab {
        border: none;
        background: transparent;
        padding: 0.625rem 1rem;
        font-family: var(--ch-font-family-base);
        font-size: var(--ch-font-size-sm);
        font-weight: var(--ch-font-weight-medium);
        color: var(--ch-color-text-muted);
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }
      .ch-tabs__tab:hover {
        color: var(--ch-color-text-primary);
      }
      .ch-tabs__tab--active {
        color: var(--ch-color-primary);
        border-bottom-color: var(--ch-color-primary);
      }
    `,
  ],
})
export class ChTabs {
  readonly tabs = contentChildren(ChTab);
  readonly selected = signal(0);

  constructor() {
    // Keep each tab's active flag in sync with the selected index.
    effect(() => {
      const selectedIndex = this.selected();
      this.tabs().forEach((tab, i) => tab.active.set(i === selectedIndex));
    });
  }

  select(index: number): void {
    this.selected.set(index);
  }
}
