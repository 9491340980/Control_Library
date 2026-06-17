import type { Meta, StoryObj } from '@storybook/angular';
import { ChAutocomplete } from './autocomplete';

/**
 * `<ch-autocomplete>` — typeahead, no third-party deps. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-autocomplete [(ngModel)]="city" [options]="cityOptions" placeholder="Search city" />
 * ```
 */
const meta: Meta<ChAutocomplete> = {
  title: 'Forms/Autocomplete',
  component: ChAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChAutocomplete>;

const options = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
  { label: 'Chicago', value: 'chi' },
  { label: 'Houston', value: 'hou' },
  { label: 'Phoenix', value: 'phx' },
];

export const Default: Story = { args: { options, placeholder: 'Search city' } };
export const Disabled: Story = { args: { options, placeholder: 'Disabled', disabled: true } };
