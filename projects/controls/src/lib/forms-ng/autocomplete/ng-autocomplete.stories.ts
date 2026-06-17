import type { Meta, StoryObj } from '@storybook/angular';
import { ChNgAutocomplete } from './ng-autocomplete';

/**
 * `<ch-ng-autocomplete>` — searchable select backed by **ng-select**.
 * Compare with the dependency-free `<ch-autocomplete>` under Forms/Autocomplete.
 *
 * ```html
 * <ch-ng-autocomplete [(ngModel)]="city" [options]="cityOptions" placeholder="Search city" />
 * ```
 */
const meta: Meta<ChNgAutocomplete> = {
  title: 'Forms (3rd-party)/Autocomplete',
  component: ChNgAutocomplete,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChNgAutocomplete>;

const options = [
  { label: 'New York', value: 'ny' },
  { label: 'Los Angeles', value: 'la' },
  { label: 'Chicago', value: 'chi' },
  { label: 'Houston', value: 'hou' },
  { label: 'Phoenix', value: 'phx' },
];

export const Default: Story = { args: { options, placeholder: 'Search city' } };
export const Disabled: Story = { args: { options, placeholder: 'Disabled', disabled: true } };
