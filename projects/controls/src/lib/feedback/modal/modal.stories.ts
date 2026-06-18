import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChModal } from './modal';
import { ChButton } from '../../button/button';

/**
 * `<ch-modal>` — dialog. Two-way bind `open`.
 *
 * ```html
 * <ch-modal [(open)]="show" title="Confirm">
 *   <p>Are you sure?</p>
 *   <div modal-footer>
 *     <ch-button variant="outline" (clicked)="show=false">Cancel</ch-button>
 *     <ch-button variant="primary">OK</ch-button>
 *   </div>
 * </ch-modal>
 * ```
 */
const meta: Meta<ChModal> = {
  title: 'Feedback/Modal',
  component: ChModal,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChButton] })],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  render: (args) => ({
    props: { ...args, open: true },
    template: `
      <ch-modal [open]="open" [title]="title" [size]="size">
        <p style="margin:0;">Are you sure you want to continue?</p>
        <div modal-footer>
          <ch-button variant="outline">Cancel</ch-button>
          <ch-button variant="primary">Confirm</ch-button>
        </div>
      </ch-modal>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChModal>;

export const Default: Story = { args: { title: 'Confirm action', size: 'md' } };
