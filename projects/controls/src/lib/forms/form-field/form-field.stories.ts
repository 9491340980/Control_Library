import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChFormField } from './form-field';
import { ChInput } from '../input/input';

/**
 * `<ch-form-field>` — wraps any control with a label, hint, and error message.
 *
 * ```html
 * <ch-form-field label="Email" hint="We'll never share it" [required]="true">
 *   <ch-input type="email" [(ngModel)]="email" />
 * </ch-form-field>
 * ```
 */
const meta: Meta<ChFormField> = {
  title: 'Forms/Form Field',
  component: ChFormField,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChInput] })],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `
      <ch-form-field [label]="label" [hint]="hint" [error]="error" [required]="required">
        <ch-input type="email" placeholder="name@example.com" [invalid]="!!error" />
      </ch-form-field>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChFormField>;

export const WithHint: Story = {
  args: { label: 'Email', hint: "We'll never share it.", required: true },
};
export const WithError: Story = {
  args: { label: 'Email', error: 'Please enter a valid email.', required: true },
};
