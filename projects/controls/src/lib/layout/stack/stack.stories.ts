import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChStack } from './stack';

/**
 * `<ch-stack>` — flexbox layout helper.
 *
 * ```html
 * <ch-stack direction="row" [gap]="1" justify="between">…</ch-stack>
 * ```
 */
const meta: Meta<ChStack> = {
  title: 'Layout/Stack',
  component: ChStack,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChStack] })],
  argTypes: {
    direction: { control: 'select', options: ['row', 'column'] },
    justify: { control: 'select', options: ['start', 'center', 'end', 'between'] },
    gap: { control: 'number' },
  },
  render: (args) => ({
    props: args,
    template: `
      <ch-stack [direction]="direction" [gap]="gap" [justify]="justify" style="background:#f1f5f9;padding:1rem;border-radius:8px;">
        <div style="background:#ea580c;color:#fff;padding:.5rem 1rem;border-radius:6px;">One</div>
        <div style="background:#ea580c;color:#fff;padding:.5rem 1rem;border-radius:6px;">Two</div>
        <div style="background:#ea580c;color:#fff;padding:.5rem 1rem;border-radius:6px;">Three</div>
      </ch-stack>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChStack>;

export const Row: Story = { args: { direction: 'row', gap: 0.75, justify: 'start' } };
export const Column: Story = { args: { direction: 'column', gap: 0.75, justify: 'start' } };
