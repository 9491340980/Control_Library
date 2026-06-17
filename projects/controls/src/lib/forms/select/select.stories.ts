import type { Meta, StoryObj } from '@storybook/angular';
import { ChSelect } from './select';

/**
 * `<ch-select>` — native dropdown. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-select [(ngModel)]="country" [options]="countries" placeholder="Choose…" />
 * ```
 */
const meta: Meta<ChSelect> = {
  title: 'Forms/Select',
  component: ChSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChSelect>;

const options = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'India', value: 'in' },
  { label: 'Australia', value: 'au' },
];

export const Default: Story = { args: { options, placeholder: 'Select a country' } };
export const Invalid: Story = { args: { options, placeholder: 'Required', invalid: true } };
export const Disabled: Story = { args: { options, placeholder: 'Disabled', disabled: true } };
