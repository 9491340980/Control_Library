import type { Meta, StoryObj } from '@storybook/angular';
import { ChSpinner } from './spinner';

/**
 * `<ch-spinner>` — loading spinner.
 *
 * ```html
 * <ch-spinner size="lg" />
 * ```
 */
const meta: Meta<ChSpinner> = {
  title: 'Feedback/Spinner',
  component: ChSpinner,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
};
export default meta;
type Story = StoryObj<ChSpinner>;

export const Medium: Story = { args: { size: 'md' } };
export const Large: Story = { args: { size: 'lg' } };
