import type { Meta, StoryObj } from '@storybook/angular';
import { ChPagination } from './pagination';

/**
 * `<ch-pagination>` — page navigation. Two-way bind `page`.
 *
 * ```html
 * <ch-pagination [total]="120" [pageSize]="10" [(page)]="page" />
 * ```
 */
const meta: Meta<ChPagination> = {
  title: 'Data/Pagination',
  component: ChPagination,
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'number' },
    pageSize: { control: 'number' },
    page: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj<ChPagination>;

export const Default: Story = { args: { total: 120, pageSize: 10, page: 1 } };
export const Middle: Story = { args: { total: 200, pageSize: 10, page: 10 } };
