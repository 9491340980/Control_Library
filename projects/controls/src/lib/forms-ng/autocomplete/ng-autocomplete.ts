import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChControlBase, chValueAccessor, ChOption } from '../../forms/control-base';

/**
 * Searchable autocomplete backed by ng-select. Works with `[(ngModel)]`.
 * Requires peer dep `@ng-select/ng-select` and its theme CSS.
 * Value is the selected option value.
 *
 *   <ch-ng-autocomplete [(ngModel)]="city" [options]="cityOptions" placeholder="Search city" />
 */
@Component({
  selector: 'ch-ng-autocomplete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, NgSelectModule],
  providers: [chValueAccessor(() => ChNgAutocomplete)],
  template: `
    <ng-select
      [items]="options()"
      bindLabel="label"
      bindValue="value"
      [placeholder]="placeholder()"
      [readonly]="isDisabled()"
      [ngModel]="value()"
      (ngModelChange)="setValue($event)"
      (blur)="onTouched()"
    ></ng-select>
  `,
})
export class ChNgAutocomplete extends ChControlBase<unknown> {
  readonly options = input<ChOption[]>([]);
  readonly placeholder = input('Search…');
}
