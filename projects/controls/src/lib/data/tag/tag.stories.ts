import type { Meta, StoryObj } from '@storybook/angular';
import { ChTag } from './tag';

/**
 * `<ch-tag>` — small tag / chip, optionally removable.
 *
 * ```html
 * <ch-tag [removable]="true" (removed)="remove()">Cardiology</ch-tag>
 * ```
 */
const meta: Meta<ChTag> = {
  title: 'Data/Tag',
  component: ChTag,
  tags: ['autodocs'],
  argTypes: { removable: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<ch-tag [removable]="removable">Cardiology</ch-tag>`,
  }),
};
export default meta;
type Story = StoryObj<ChTag>;

export const Default: Story = { args: { removable: false } };
export const Removable: Story = { args: { removable: true } };
