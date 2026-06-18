import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChAuthLayout } from './auth-layout';

/**
 * `<ch-auth-layout>` — split form/hero auth screen.
 *
 * ```html
 * <ch-auth-layout heroImage="/assets/login.jpg">
 *   <h1>Sign in</h1>
 *   <form>…</form>
 * </ch-auth-layout>
 * ```
 */
const meta: Meta<ChAuthLayout> = {
  title: 'Layout/Auth Layout',
  component: ChAuthLayout,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChAuthLayout] })],
  parameters: { layout: 'fullscreen' },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:520px;border:1px solid #e2e8f0;">
        <ch-auth-layout [heroImage]="heroImage">
          <h1 style="font-size:1.5rem;font-weight:800;margin:0 0 1rem;">Sign in</h1>
          <p style="color:#6b7280;margin:0 0 1rem;">Welcome back to CareHigh.</p>
          <input placeholder="Email" style="display:block;width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:6px;margin-bottom:.75rem;box-sizing:border-box;" />
          <input placeholder="Password" type="password" style="display:block;width:100%;padding:.5rem .75rem;border:1px solid #d1d5db;border-radius:6px;box-sizing:border-box;" />
        </ch-auth-layout>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChAuthLayout>;

export const Default: Story = {
  args: { heroImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800' },
};
