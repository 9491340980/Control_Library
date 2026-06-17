import type { Meta, StoryObj } from '@storybook/angular';
import { ChTextarea } from './textarea';

/**
 * `<ch-textarea>` — multi-line input. Works with `[(ngModel)]`.
 *
 * ```html
 * <ch-textarea [(ngModel)]="notes" [rows]="4" placeholder="Notes" />
 * ```
 */
const meta: Meta<ChTextarea> = {
  title: 'Forms/Textarea',
  component: ChTextarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChTextarea>;

export const Default: Story = { args: { placeholder: 'Write something…', rows: 3 } };
export const Invalid: Story = { args: { placeholder: 'Required', invalid: true } };
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } };
