import type { Meta, StoryObj } from '@storybook/angular';
import { ChAlert } from './alert';

/**
 * `<ch-alert>` — inline alert / banner.
 *
 * ```html
 * <ch-alert variant="success" title="Saved" [dismissible]="true">Your changes were saved.</ch-alert>
 * ```
 */
const meta: Meta<ChAlert> = {
  title: 'Feedback/Alert',
  component: ChAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    dismissible: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ch-alert [variant]="variant" [title]="title" [dismissible]="dismissible">
      This is an alert message.
    </ch-alert>`,
  }),
};
export default meta;
type Story = StoryObj<ChAlert>;

export const Info: Story = { args: { variant: 'info', title: 'Heads up' } };
export const Success: Story = { args: { variant: 'success', title: 'Saved', dismissible: true } };
export const Danger: Story = { args: { variant: 'danger', title: 'Error' } };
