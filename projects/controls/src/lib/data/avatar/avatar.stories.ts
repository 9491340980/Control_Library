import type { Meta, StoryObj } from '@storybook/angular';
import { ChAvatar } from './avatar';

/**
 * `<ch-avatar>` — image or initials fallback.
 *
 * ```html
 * <ch-avatar name="Sandeep Etikala" />
 * ```
 */
const meta: Meta<ChAvatar> = {
  title: 'Data/Avatar',
  component: ChAvatar,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
};
export default meta;
type Story = StoryObj<ChAvatar>;

export const Initials: Story = { args: { name: 'Sandeep Etikala', size: 'md' } };
export const Large: Story = { args: { name: 'Care High', size: 'lg' } };
