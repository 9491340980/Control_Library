import type { Meta, StoryObj } from '@storybook/angular';
import { ChCard } from './card';

/**
 * `<ch-card>` — surface container with optional title.
 *
 * ```html
 * <ch-card title="Patients">…</ch-card>
 * ```
 */
const meta: Meta<ChCard> = {
  title: 'Data/Card',
  component: ChCard,
  tags: ['autodocs'],
  argTypes: { radius: { control: 'select', options: ['lg', 'xl', '2xl'] } },
  render: (args) => ({
    props: args,
    template: `<ch-card [title]="title" [radius]="radius" style="max-width:24rem;display:block;">
      <p style="margin:0;color:#374151;">Card body content goes here.</p>
    </ch-card>`,
  }),
};
export default meta;
type Story = StoryObj<ChCard>;

export const WithTitle: Story = { args: { title: 'Patients' } };
export const Plain: Story = { args: { title: '' } };
