import type { Meta, StoryObj } from '@storybook/angular';
import { ChIconButton } from './icon-button';

/**
 * `<ch-icon-button>` — icon-only button. Place an icon as projected content.
 *
 * ```html
 * <ch-icon-button ariaLabel="Edit" (clicked)="edit()">✏️</ch-icon-button>
 * ```
 */
const meta: Meta<ChIconButton> = {
  title: 'Actions/Icon Button',
  component: ChIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger'] },
    disabled: { control: 'boolean' },
  },
  render: (args) => ({
    props: args,
    template: `<ch-icon-button [variant]="variant" [disabled]="disabled" ariaLabel="Action">★</ch-icon-button>`,
  }),
};
export default meta;
type Story = StoryObj<ChIconButton>;

export const Default: Story = { args: { variant: 'default' } };
export const Primary: Story = { args: { variant: 'primary' } };
export const Danger: Story = { args: { variant: 'danger' } };
