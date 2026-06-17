import type { Meta, StoryObj } from '@storybook/angular';
import { ChNgMultiSelect } from './ng-multi-select';

/**
 * `<ch-ng-multi-select>` — multi-select backed by **ng-select**.
 * Compare with the dependency-free `<ch-multi-select>` under Forms/Multi-select.
 *
 * ```html
 * <ch-ng-multi-select [(ngModel)]="tags" [options]="tagOptions" placeholder="Add tags" />
 * ```
 */
const meta: Meta<ChNgMultiSelect> = {
  title: 'Forms (3rd-party)/Multi-select',
  component: ChNgMultiSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChNgMultiSelect>;

const options = [
  { label: 'Cardiology', value: 'cardiology' },
  { label: 'Neurology', value: 'neurology' },
  { label: 'Pediatrics', value: 'pediatrics' },
  { label: 'Oncology', value: 'oncology' },
  { label: 'Radiology', value: 'radiology' },
];

export const Default: Story = { args: { options, placeholder: 'Select specialities' } };
export const Disabled: Story = { args: { options, placeholder: 'Disabled', disabled: true } };
