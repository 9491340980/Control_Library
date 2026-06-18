import type { Meta, StoryObj } from '@storybook/angular';
import { ChBreadcrumbs } from './breadcrumbs';

/**
 * `<ch-breadcrumbs>` — navigation trail.
 *
 * ```html
 * <ch-breadcrumbs [items]="[{label:'Home',href:'/'},{label:'Patients'}]" />
 * ```
 */
const meta: Meta<ChBreadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: ChBreadcrumbs,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ChBreadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Patients', href: '/patients' },
      { label: 'Asha Rao' },
    ],
  },
};
