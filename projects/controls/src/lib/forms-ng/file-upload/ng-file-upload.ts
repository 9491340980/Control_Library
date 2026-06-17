import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import {
  NgxFileDropModule,
  NgxFileDropEntry,
  FileSystemFileEntry,
} from 'ngx-file-drop';
import { ChControlBase, chValueAccessor } from '../../forms/control-base';

/**
 * File upload backed by ngx-file-drop. Works with `[(ngModel)]`.
 * Requires peer dep `ngx-file-drop`. Value is an array of `File`.
 *
 *   <ch-ng-file-upload [(ngModel)]="files" [multiple]="true" accept="image/*" />
 */
@Component({
  selector: 'ch-ng-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxFileDropModule],
  providers: [chValueAccessor(() => ChNgFileUpload)],
  template: `
    <div class="ch-ng-fu">
      <ngx-file-drop
        [multiple]="multiple()"
        [accept]="accept()"
        [disabled]="isDisabled()"
        dropZoneClassName="ch-ng-fu__zone"
        contentClassName="ch-ng-fu__content"
        (onFileDrop)="dropped($event)"
      >
        <ng-template ngx-file-drop-content-tmp let-openFileSelector="openFileSelector">
          <span class="ch-ng-fu__hint">
            <strong>Click to upload</strong> or drag &amp; drop
          </span>
          <button type="button" class="ch-ng-fu__browse" (click)="openFileSelector()">
            Browse
          </button>
        </ng-template>
      </ngx-file-drop>

      @if (files().length > 0) {
        <ul class="ch-ng-fu__list">
          @for (file of files(); track $index) {
            <li class="ch-ng-fu__item">
              <span class="ch-ng-fu__name">{{ file.name }}</span>
              <button type="button" class="ch-ng-fu__remove" (click)="remove($index)" aria-label="Remove">
                &times;
              </button>
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: [
    `
      .ch-ng-fu {
        display: block;
        width: 100%;
        font-family: var(--ch-font-family-base);
      }
      ::ng-deep .ch-ng-fu__zone {
        border: 2px dashed var(--ch-color-border-strong) !important;
        border-radius: var(--ch-radius-md) !important;
        background-color: var(--ch-color-surface-muted) !important;
        height: auto !important;
        padding: 1.5rem !important;
      }
      ::ng-deep .ch-ng-fu__content {
        display: flex !important;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        color: var(--ch-color-text-muted);
        font-size: var(--ch-font-size-sm);
      }
      .ch-ng-fu__hint strong {
        color: var(--ch-color-primary);
        font-weight: var(--ch-font-weight-semibold);
      }
      .ch-ng-fu__browse {
        border: 1px solid var(--ch-color-border-strong);
        background: var(--ch-color-white);
        color: var(--ch-color-primary);
        border-radius: var(--ch-radius-sm);
        padding: 0.25rem 0.75rem;
        cursor: pointer;
        font-size: var(--ch-font-size-sm);
      }
      .ch-ng-fu__list {
        list-style: none;
        margin: 0.5rem 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ch-ng-fu__item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--ch-color-border);
        border-radius: var(--ch-radius-sm);
        padding: 0.35rem 0.5rem;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-ng-fu__name {
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ch-ng-fu__remove {
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        color: var(--ch-color-text-muted);
      }
      .ch-ng-fu__remove:hover {
        color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChNgFileUpload extends ChControlBase<File[]> {
  readonly multiple = input(true);
  readonly accept = input('');

  readonly files = () => this.value() ?? [];

  dropped(entries: NgxFileDropEntry[]): void {
    if (this.isDisabled()) return;
    const collected: File[] = [];
    let pending = entries.length;
    if (pending === 0) return;

    for (const entry of entries) {
      if (entry.fileEntry.isFile) {
        (entry.fileEntry as FileSystemFileEntry).file((file: File) => {
          collected.push(file);
          if (--pending === 0) this.commit(collected);
        });
      } else if (--pending === 0) {
        this.commit(collected);
      }
    }
  }

  remove(index: number): void {
    const next = [...this.files()];
    next.splice(index, 1);
    this.setValue(next);
  }

  private commit(incoming: File[]): void {
    this.setValue(this.multiple() ? [...this.files(), ...incoming] : incoming.slice(0, 1));
    this.onTouched();
  }
}
