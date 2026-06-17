import type { Meta, StoryObj } from '@storybook/angular';
import { ChSwitch } from './switch';

/**
 * `<ch-switch>` — toggle switch. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-switch [(ngModel)]="notifications">Email notifications</ch-switch>
 * ```
 */
const meta: Meta<ChSwitch> = {
  title: 'Forms/Switch',
  component: ChSwitch,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<ch-switch [disabled]="disabled">Email notifications</ch-switch>`,
  }),
};
export default meta;
type Story = StoryObj<ChSwitch>;

export const Default: Story = { args: { disabled: false } };
export const Disabled: Story = { args: { disabled: true } };
