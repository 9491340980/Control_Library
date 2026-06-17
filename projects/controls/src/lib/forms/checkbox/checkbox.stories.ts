import type { Meta, StoryObj } from '@storybook/angular';
import { ChCheckbox } from './checkbox';

/**
 * `<ch-checkbox>` — works with `[(ngModel)]`.
 *
 * ```html
 * <ch-checkbox [(ngModel)]="agree">I agree to the terms</ch-checkbox>
 * ```
 */
const meta: Meta<ChCheckbox> = {
  title: 'Forms/Checkbox',
  component: ChCheckbox,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<ch-checkbox [disabled]="disabled">I agree to the terms</ch-checkbox>`,
  }),
};
export default meta;
type Story = StoryObj<ChCheckbox>;

export const Default: Story = { args: { disabled: false } };
export const Disabled: Story = { args: { disabled: true } };
