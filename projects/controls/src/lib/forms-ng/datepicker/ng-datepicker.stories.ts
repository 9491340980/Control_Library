import type { Meta, StoryObj } from '@storybook/angular';
import { ChNgDatepicker } from './ng-datepicker';

/**
 * `<ch-ng-datepicker>` — datepicker backed by **Angular Material**.
 * Compare with the dependency-free `<ch-datepicker>` under Forms/Datepicker.
 *
 * ```html
 * <ch-ng-datepicker [(ngModel)]="dob" placeholder="Choose a date" />
 * ```
 */
const meta: Meta<ChNgDatepicker> = {
  title: 'Forms (3rd-party)/Datepicker',
  component: ChNgDatepicker,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChNgDatepicker>;

export const Default: Story = { args: { placeholder: 'Choose a date' } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
