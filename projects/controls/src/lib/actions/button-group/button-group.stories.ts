import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChButtonGroup } from './button-group';
import { ChButton } from '../../button/button';

/**
 * `<ch-button-group>` — aligns a row of actions.
 *
 * ```html
 * <ch-button-group align="end">
 *   <ch-button variant="outline">Cancel</ch-button>
 *   <ch-button variant="primary">Save</ch-button>
 * </ch-button-group>
 * ```
 */
const meta: Meta<ChButtonGroup> = {
  title: 'Actions/Button Group',
  component: ChButtonGroup,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChButton] })],
  argTypes: { align: { control: 'select', options: ['start', 'center', 'end'] } },
  render: (args) => ({
    props: args,
    template: `
      <ch-button-group [align]="align">
        <ch-button variant="outline">Cancel</ch-button>
        <ch-button variant="primary">Save</ch-button>
      </ch-button-group>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChButtonGroup>;

export const End: Story = { args: { align: 'end' } };
export const Center: Story = { args: { align: 'center' } };
