import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ChControlBase, chValueAccessor } from '../../forms/control-base';

/**
 * Datepicker backed by Angular Material. Works with `[(ngModel)]`.
 * Requires peer deps: `@angular/material`, `@angular/cdk` and a Material theme.
 *
 *   <ch-ng-datepicker [(ngModel)]="dob" placeholder="Choose a date" />
 */
@Component({
  selector: 'ch-ng-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [chValueAccessor(() => ChNgDatepicker), provideNativeDateAdapter()],
  template: `
    <mat-form-field appearance="outline" class="ch-ng-dp">
      <input
        matInput
        [matDatepicker]="picker"
        [placeholder]="placeholder()"
        [ngModel]="value()"
        (ngModelChange)="setValue($event)"
        [disabled]="isDisabled()"
        (blur)="onTouched()"
      />
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
  styles: [
    `
      .ch-ng-dp {
        width: 100%;
      }
    `,
  ],
})
export class ChNgDatepicker extends ChControlBase<Date> {
  readonly placeholder = input('Choose a date');
}
