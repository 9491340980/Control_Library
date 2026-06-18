import type { Meta, StoryObj } from '@storybook/angular';
import { ChBadge } from './badge';

/**
 * `<ch-badge>` — status pill.
 *
 * ```html
 * <ch-badge variant="success">Active</ch-badge>
 * ```
 */
const meta: Meta<ChBadge> = {
  title: 'Data/Badge',
  component: ChBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'primary', 'neutral'],
    },
    dot: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ch-badge [variant]="variant" [dot]="dot">{{ variant }}</ch-badge>`,
  }),
};
export default meta;
type Story = StoryObj<ChBadge>;

export const Success: Story = { args: { variant: 'success', dot: true } };
export const Warning: Story = { args: { variant: 'warning', dot: true } };
export const Danger: Story = { args: { variant: 'danger' } };
export const Info: Story = { args: { variant: 'info' } };
