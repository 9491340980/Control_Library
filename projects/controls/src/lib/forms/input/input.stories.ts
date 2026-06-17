import type { Meta, StoryObj } from '@storybook/angular';
import { ChInput } from './input';

/**
 * `<ch-input>` — text input. Works with `[(ngModel)]` and reactive forms.
 *
 * ```html
 * <ch-input [(ngModel)]="name" placeholder="Your name" />
 * <ch-input type="email" [(ngModel)]="email" [invalid]="emailInvalid" />
 * ```
 */
const meta: Meta<ChInput> = {
  title: 'Forms/Input',
  component: ChInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel'],
    },
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChInput>;

export const Default: Story = { args: { placeholder: 'Type here…' } };
export const Email: Story = { args: { type: 'email', placeholder: 'name@example.com' } };
export const Invalid: Story = { args: { placeholder: 'Email', type: 'email', invalid: true } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
