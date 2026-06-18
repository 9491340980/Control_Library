import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChTooltip } from './tooltip';

/**
 * `chTooltip` directive — hover/focus tooltip on any element.
 *
 * ```html
 * <button [chTooltip]="'Delete'" tooltipPosition="top">🗑️</button>
 * ```
 */
const meta: Meta<ChTooltip> = {
  title: 'Data/Tooltip',
  component: ChTooltip,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChTooltip] })],
  argTypes: {
    chTooltip: { control: 'text' },
    tooltipPosition: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  render: (args) => ({
    props: args,
    template: `<div style="padding:3rem;text-align:center;">
      <button [chTooltip]="chTooltip" [tooltipPosition]="tooltipPosition"
        style="padding:.5rem 1rem;border:1px solid #cbd5e1;border-radius:6px;background:#fff;cursor:pointer;">
        Hover me
      </button>
    </div>`,
  }),
};
export default meta;
type Story = StoryObj<ChTooltip>;

export const Top: Story = { args: { chTooltip: 'Delete item', tooltipPosition: 'top' } };
export const Right: Story = { args: { chTooltip: 'More info', tooltipPosition: 'right' } };
