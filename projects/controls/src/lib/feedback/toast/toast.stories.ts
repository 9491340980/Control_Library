import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChToaster } from './toaster';
import { ChToastService } from './toast.service';

/**
 * Toast notifications. Render `<ch-toaster />` once near the app root, then call
 * the service from anywhere:
 *
 * ```ts
 * private toast = inject(ChToastService);
 * this.toast.success('Saved!');
 * this.toast.error('Something went wrong');
 * ```
 */
const meta: Meta<ChToaster> = {
  title: 'Feedback/Toast',
  component: ChToaster,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ChToaster>;

export const Preview: Story = {
  decorators: [
    moduleMetadata({
      imports: [ChToaster],
      providers: [
        {
          provide: ChToastService,
          useFactory: () => {
            const svc = new ChToastService();
            svc.success('Your changes were saved.', { title: 'Success', duration: 0 });
            svc.warning('Your trial ends soon.', { duration: 0 });
            svc.error('Could not connect to server.', { duration: 0 });
            return svc;
          },
        },
      ],
    }),
  ],
  render: () => ({
    template: `<p style="color:#6b7280;">Toasts render fixed at the top-right.</p><ch-toaster />`,
  }),
};
