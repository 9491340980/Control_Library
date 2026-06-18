import type { Meta, StoryObj } from '@storybook/angular';
import { ChDivider } from './divider';

/**
 * `<ch-divider>` — separator, optionally with a label.
 *
 * ```html
 * <ch-divider />
 * <ch-divider label="OR" />
 * ```
 */
const meta: Meta<ChDivider> = {
  title: 'Layout/Divider',
  component: ChDivider,
  tags: ['autodocs'],
  render: (args) => ({
    props: args,
    template: `<div style="width:24rem;"><ch-divider [label]="label" [orientation]="orientation" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<ChDivider>;

export const Plain: Story = { args: { label: '' } };
export const Labelled: Story = { args: { label: 'OR' } };
