import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { ChControlBase, chValueAccessor } from '../control-base';

/**
 * File upload with drag & drop — no third-party dependencies. Works with `[(ngModel)]`.
 * Value is an array of `File`.
 *
 *   <ch-file-upload [(ngModel)]="files" [multiple]="true" accept="image/*" />
 */
@Component({
  selector: 'ch-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [chValueAccessor(() => ChFileUpload)],
  template: `
    <div class="ch-fu">
      <label
        class="ch-fu__zone"
        [class.ch-fu__zone--over]="dragOver()"
        [class.ch-fu__zone--disabled]="isDisabled()"
        [class.ch-fu__zone--invalid]="invalid()"
        (dragover)="onDragOver($event)"
        (dragleave)="dragOver.set(false)"
        (drop)="onDrop($event)"
      >
        <input
          type="file"
          class="ch-fu__native"
          [multiple]="multiple()"
          [accept]="accept()"
          [disabled]="isDisabled()"
          (change)="onSelect($event)"
        />
        <span class="ch-fu__hint">
          <strong>Click to upload</strong> or drag &amp; drop
        </span>
      </label>

      @if (files().length > 0) {
        <ul class="ch-fu__list">
          @for (file of files(); track $index) {
            <li class="ch-fu__item">
              <span class="ch-fu__name">{{ file.name }}</span>
              <span class="ch-fu__size">{{ formatSize(file.size) }}</span>
              <button
                type="button"
                class="ch-fu__remove"
                [disabled]="isDisabled()"
                (click)="remove($index)"
                aria-label="Remove"
              >
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
      .ch-fu {
        display: block;
        width: 100%;
        font-family: var(--ch-font-family-base);
      }
      .ch-fu__zone {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--ch-color-border-strong);
        border-radius: var(--ch-radius-md);
        background-color: var(--ch-color-surface-muted);
        padding: 1.5rem;
        cursor: pointer;
        text-align: center;
      }
      .ch-fu__zone--over {
        border-color: var(--ch-color-primary);
        background-color: var(--ch-color-primary-soft);
      }
      .ch-fu__zone--invalid {
        border-color: var(--ch-color-danger);
      }
      .ch-fu__zone--disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .ch-fu__native {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: inherit;
      }
      .ch-fu__hint {
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-muted);
      }
      .ch-fu__hint strong {
        color: var(--ch-color-primary);
        font-weight: var(--ch-font-weight-semibold);
      }
      .ch-fu__list {
        list-style: none;
        margin: 0.5rem 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }
      .ch-fu__item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid var(--ch-color-border);
        border-radius: var(--ch-radius-sm);
        padding: 0.35rem 0.5rem;
        font-size: var(--ch-font-size-sm);
        color: var(--ch-color-text-secondary);
      }
      .ch-fu__name {
        flex: 1 1 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ch-fu__size {
        color: var(--ch-color-text-muted);
        font-size: var(--ch-font-size-xs);
      }
      .ch-fu__remove {
        border: none;
        background: transparent;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        color: var(--ch-color-text-muted);
      }
      .ch-fu__remove:hover {
        color: var(--ch-color-danger);
      }
    `,
  ],
})
export class ChFileUpload extends ChControlBase<File[]> {
  readonly multiple = input(false);
  readonly accept = input('');
  readonly invalid = input(false);

  readonly dragOver = signal(false);

  readonly files = () => this.value() ?? [];

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.isDisabled()) this.dragOver.set(true);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver.set(false);
    if (this.isDisabled()) return;
    this.addFiles(event.dataTransfer?.files ?? null);
  }

  onSelect(event: Event): void {
    this.addFiles((event.target as HTMLInputElement).files);
  }

  remove(index: number): void {
    const next = [...this.files()];
    next.splice(index, 1);
    this.setValue(next);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private addFiles(list: FileList | null): void {
    if (!list || list.length === 0) return;
    const incoming = Array.from(list);
    this.setValue(this.multiple() ? [...this.files(), ...incoming] : incoming.slice(0, 1));
    this.onTouched();
  }
}
