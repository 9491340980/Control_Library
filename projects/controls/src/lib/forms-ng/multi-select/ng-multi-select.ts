import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChControlBase, chValueAccessor, ChOption } from '../../forms/control-base';

/**
 * Multi-select backed by ng-select. Works with `[(ngModel)]`.
 * Requires peer dep `@ng-select/ng-select` and its theme CSS.
 * Value is an array of selected option values.
 *
 *   <ch-ng-multi-select [(ngModel)]="tags" [options]="tagOptions" placeholder="Add tags" />
 */
@Component({
  selector: 'ch-ng-multi-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgSelectModule],
  providers: [chValueAccessor(() => ChNgMultiSelect)],
  template: `
    <ng-select
      [items]="options()"
      bindLabel="label"
      bindValue="value"
      [multiple]="true"
      [closeOnSelect]="false"
      [placeholder]="placeholder()"
      [readonly]="isDisabled()"
      [ngModel]="value()"
      (ngModelChange)="setValue($event)"
      (blur)="onTouched()"
    ></ng-select>
  `,
})
export class ChNgMultiSelect extends ChControlBase<unknown[]> {
  readonly options = input<ChOption[]>([]);
  readonly placeholder = input('Select…');
}
