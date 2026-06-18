import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChDropdown } from './dropdown';

/**
 * `<ch-dropdown>` — menu button. Use `.ch-dropdown__item` for menu entries.
 *
 * ```html
 * <ch-dropdown label="Actions">
 *   <button class="ch-dropdown__item">Edit</button>
 *   <button class="ch-dropdown__item">Delete</button>
 * </ch-dropdown>
 * ```
 */
const meta: Meta<ChDropdown> = {
  title: 'Navigation/Dropdown',
  component: ChDropdown,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChDropdown] })],
  argTypes: { align: { control: 'select', options: ['start', 'end'] } },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding:1rem;">
        <ch-dropdown [label]="label || 'Actions'" [align]="align">
          <button class="ch-dropdown__item">Edit</button>
          <button class="ch-dropdown__item">Duplicate</button>
          <button class="ch-dropdown__item">Delete</button>
        </ch-dropdown>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChDropdown>;

export const Default: Story = { args: { label: 'Actions', align: 'start' } };
