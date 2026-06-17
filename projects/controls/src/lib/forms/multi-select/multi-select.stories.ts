import type { Meta, StoryObj } from '@storybook/angular';
import { ChMultiSelect } from './multi-select';

/**
 * `<ch-multi-select>` — chips + dropdown, no third-party deps. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-multi-select [(ngModel)]="tags" [options]="tagOptions" placeholder="Add tags" />
 * ```
 */
const meta: Meta<ChMultiSelect> = {
  title: 'Forms/Multi-select',
  component: ChMultiSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChMultiSelect>;

const options = [
  { label: 'Cardiology', value: 'cardiology' },
  { label: 'Neurology', value: 'neurology' },
  { label: 'Pediatrics', value: 'pediatrics' },
  { label: 'Oncology', value: 'oncology' },
  { label: 'Radiology', value: 'radiology' },
];

export const Default: Story = { args: { options, placeholder: 'Select specialities' } };
export const Disabled: Story = { args: { options, placeholder: 'Disabled', disabled: true } };
