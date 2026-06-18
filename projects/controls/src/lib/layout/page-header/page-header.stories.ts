import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChPageHeader } from './page-header';
import { ChButton } from '../../button/button';

/**
 * `<ch-page-header>` — title, subtitle, and an actions slot.
 *
 * ```html
 * <ch-page-header title="Patients" subtitle="Manage your patient list">
 *   <ch-button variant="primary">Add patient</ch-button>
 * </ch-page-header>
 * ```
 */
const meta: Meta<ChPageHeader> = {
  title: 'Layout/Page Header',
  component: ChPageHeader,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChButton] })],
  render: (args) => ({
    props: args,
    template: `
      <div style="width:42rem;max-width:100%;">
        <ch-page-header [title]="title" [subtitle]="subtitle">
          <ch-button variant="primary">Add patient</ch-button>
        </ch-page-header>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChPageHeader>;

export const Default: Story = {
  args: { title: 'Patients', subtitle: 'Manage your patient list' },
};
