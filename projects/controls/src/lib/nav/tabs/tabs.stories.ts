import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChTabs } from './tabs';
import { ChTab } from './tab';

/**
 * `<ch-tabs>` with `<ch-tab>` children.
 *
 * ```html
 * <ch-tabs>
 *   <ch-tab label="Overview">…</ch-tab>
 *   <ch-tab label="Details">…</ch-tab>
 * </ch-tabs>
 * ```
 */
const meta: Meta<ChTabs> = {
  title: 'Navigation/Tabs',
  component: ChTabs,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChTabs, ChTab] })],
  render: () => ({
    template: `
      <ch-tabs>
        <ch-tab label="Overview"><p>Overview content.</p></ch-tab>
        <ch-tab label="Details"><p>Details content.</p></ch-tab>
        <ch-tab label="Activity"><p>Activity content.</p></ch-tab>
      </ch-tabs>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChTabs>;

export const Default: Story = {};
