import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChEmptyState } from './empty-state';
import { ChButton } from '../../button/button';

/**
 * `<ch-empty-state>` — no-data placeholder with an actions slot.
 *
 * ```html
 * <ch-empty-state title="No patients yet" message="Add your first patient.">
 *   <ch-button variant="primary">Add patient</ch-button>
 * </ch-empty-state>
 * ```
 */
const meta: Meta<ChEmptyState> = {
  title: 'Data/Empty State',
  component: ChEmptyState,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChButton] })],
  render: (args) => ({
    props: args,
    template: `<ch-empty-state [title]="title" [message]="message" [icon]="icon">
      <ch-button variant="primary">Add patient</ch-button>
    </ch-empty-state>`,
  }),
};
export default meta;
type Story = StoryObj<ChEmptyState>;

export const Default: Story = {
  args: { title: 'No patients yet', message: 'Add your first patient to get started.', icon: '📋' },
};
