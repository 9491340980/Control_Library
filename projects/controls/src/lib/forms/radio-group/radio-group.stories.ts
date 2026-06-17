import type { Meta, StoryObj } from '@storybook/angular';
import { ChRadioGroup } from './radio-group';

/**
 * `<ch-radio-group>` — radio buttons. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-radio-group [(ngModel)]="plan" [options]="planOptions" />
 * ```
 */
const meta: Meta<ChRadioGroup> = {
  title: 'Forms/Radio Group',
  component: ChRadioGroup,
  tags: ['autodocs'],
  argTypes: {
    inline: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChRadioGroup>;

const options = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

export const Stacked: Story = { args: { options, inline: false } };
export const Inline: Story = { args: { options, inline: true } };
export const Disabled: Story = { args: { options, disabled: true } };
