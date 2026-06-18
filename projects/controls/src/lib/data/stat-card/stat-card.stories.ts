import type { Meta, StoryObj } from '@storybook/angular';
import { ChStatCard } from './stat-card';

/**
 * `<ch-stat-card>` — KPI tile with optional trend delta.
 *
 * ```html
 * <ch-stat-card label="Active patients" value="1,284" [delta]="12.5" />
 * ```
 */
const meta: Meta<ChStatCard> = {
  title: 'Data/Stat Card',
  component: ChStatCard,
  tags: ['autodocs'],
  argTypes: { delta: { control: 'number' } },
  render: (args) => ({
    props: args,
    template: `<div style="max-width:16rem;"><ch-stat-card [label]="label" [value]="value" [icon]="icon" [delta]="delta" /></div>`,
  }),
};
export default meta;
type Story = StoryObj<ChStatCard>;

export const Up: Story = {
  args: { label: 'Active patients', value: '1,284', icon: '👥', delta: 12.5 },
};
export const Down: Story = {
  args: { label: 'Cancellations', value: '37', icon: '📉', delta: -4.2 },
};
