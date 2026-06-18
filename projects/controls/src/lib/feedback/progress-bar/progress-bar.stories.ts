import type { Meta, StoryObj } from '@storybook/angular';
import { ChProgressBar } from './progress-bar';

/**
 * `<ch-progress-bar>` — linear progress.
 *
 * ```html
 * <ch-progress-bar [value]="65" [showLabel]="true" />
 * ```
 */
const meta: Meta<ChProgressBar> = {
  title: 'Feedback/Progress Bar',
  component: ChProgressBar,
  tags: ['autodocs'],
  argTypes: { value: { control: { type: 'range', min: 0, max: 100 } }, showLabel: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<div style="width:20rem;"><ch-progress-bar [value]="value" [showLabel]="showLabel" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<ChProgressBar>;

export const Default: Story = { args: { value: 65, showLabel: true } };
