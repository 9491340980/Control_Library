import type { Meta, StoryObj } from '@storybook/angular';
import { ChSteps } from './steps';

/**
 * `<ch-steps>` — step / wizard progress indicator.
 *
 * ```html
 * <ch-steps [steps]="['Account','Profile','Confirm']" [active]="1" />
 * ```
 */
const meta: Meta<ChSteps> = {
  title: 'Navigation/Steps',
  component: ChSteps,
  tags: ['autodocs'],
  argTypes: { active: { control: 'number' } },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:30rem;"><ch-steps [steps]="steps" [active]="active" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<ChSteps>;

export const Default: Story = {
  args: { steps: ['Account', 'Profile', 'Confirm'], active: 1 },
};
