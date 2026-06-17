import type { Meta, StoryObj } from '@storybook/angular';
import { ChDatepicker } from './datepicker';

/**
 * `<ch-datepicker>` — native calendar, no third-party deps. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-datepicker [(ngModel)]="dob" placeholder="Select date" />
 * ```
 */
const meta: Meta<ChDatepicker> = {
  title: 'Forms/Datepicker',
  component: ChDatepicker,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChDatepicker>;

export const Default: Story = { args: { placeholder: 'Select date' } };
export const Invalid: Story = { args: { placeholder: 'Required', invalid: true } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
