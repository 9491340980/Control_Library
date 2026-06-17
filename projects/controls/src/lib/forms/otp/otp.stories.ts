import type { Meta, StoryObj } from '@storybook/angular';
import { ChOtp } from './otp';

/**
 * `<ch-otp>` — one-time-password / verification code. Works with `[(ngModel)]`.
 * Supports auto-advance, backspace navigation, and paste.
 *
 * ```html
 * <ch-otp [(ngModel)]="code" [length]="6" />
 * ```
 */
const meta: Meta<ChOtp> = {
  title: 'Forms/OTP',
  component: ChOtp,
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChOtp>;

export const SixDigits: Story = { args: { length: 6 } };
export const FourDigits: Story = { args: { length: 4 } };
export const Disabled: Story = { args: { length: 6, disabled: true } };
