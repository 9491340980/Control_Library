import type { Meta, StoryObj } from '@storybook/angular';
import { ChStepper } from './stepper';

/**
 * `<ch-stepper>` — number input with +/- buttons. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-stepper [(ngModel)]="qty" [min]="0" [max]="10" />
 * ```
 */
const meta: Meta<ChStepper> = {
  title: 'Forms/Stepper',
  component: ChStepper,
  tags: ['autodocs'],
  argTypes: {
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChStepper>;

export const Default: Story = { args: { step: 1, min: 0, max: 10 } };
export const Disabled: Story = { args: { disabled: true } };
