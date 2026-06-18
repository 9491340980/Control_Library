import type { Meta, StoryObj } from '@storybook/angular';
import { ChSkeleton } from './skeleton';

/**
 * `<ch-skeleton>` — loading placeholder.
 *
 * ```html
 * <ch-skeleton width="100%" height="1rem" />
 * <ch-skeleton shape="circle" width="2.5rem" height="2.5rem" />
 * ```
 */
const meta: Meta<ChSkeleton> = {
  title: 'Feedback/Skeleton',
  component: ChSkeleton,
  tags: ['autodocs'],
  render: () => ({
    template: `
      <div style="display:flex;gap:1rem;align-items:center;width:20rem;">
        <ch-skeleton shape="circle" width="2.5rem" height="2.5rem" />
        <div style="flex:1;display:flex;flex-direction:column;gap:.5rem;">
          <ch-skeleton width="60%" height="0.75rem" />
          <ch-skeleton width="100%" height="0.75rem" />
        </div>
      </div>
    `,
    moduleMetadata: { imports: [ChSkeleton] },
  }),
};
export default meta;
type Story = StoryObj<ChSkeleton>;

export const Default: Story = {};
