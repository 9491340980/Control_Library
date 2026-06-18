import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChContainer } from './container';

/**
 * `<ch-container>` — centered max-width content shell.
 *
 * ```html
 * <ch-container size="lg">…</ch-container>
 * ```
 */
const meta: Meta<ChContainer> = {
  title: 'Layout/Container',
  component: ChContainer,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChContainer] })],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] } },
  render: (args) => ({
    props: args,
    template: `
      <div style="background:#f8fafc;padding:1rem 0;">
        <ch-container [size]="size">
          <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:1rem;text-align:center;">
            Centered content (size: {{ size }})
          </div>
        </ch-container>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChContainer>;

export const Large: Story = { args: { size: 'lg' } };
export const Small: Story = { args: { size: 'sm' } };
