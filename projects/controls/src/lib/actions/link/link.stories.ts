import type { Meta, StoryObj } from '@storybook/angular';
import { ChLink } from './link';

/**
 * `<ch-link>` — text link.
 *
 * ```html
 * <ch-link href="/help">Need help?</ch-link>
 * ```
 */
const meta: Meta<ChLink> = {
  title: 'Actions/Link',
  component: ChLink,
  tags: ['autodocs'],
  argTypes: { muted: { control: 'boolean' }, external: { control: 'boolean' } },
  render: (args) => ({
    props: args,
    template: `<ch-link [href]="href" [muted]="muted" [external]="external">Read more</ch-link>`,
  }),
};
export default meta;
type Story = StoryObj<ChLink>;

export const Default: Story = { args: { href: '#' } };
export const Muted: Story = { args: { href: '#', muted: true } };
