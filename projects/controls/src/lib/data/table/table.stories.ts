import type { Meta, StoryObj } from '@storybook/angular';
import { ChTable } from './table';

/**
 * `<ch-table>` — simple data table from `columns` + `rows`.
 *
 * ```html
 * <ch-table [columns]="cols" [rows]="patients" />
 * ```
 */
const meta: Meta<ChTable> = {
  title: 'Data/Table',
  component: ChTable,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<ChTable>;

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', align: 'right' as const },
];
const rows = [
  { name: 'Asha Rao', role: 'Cardiologist', status: 'Active' },
  { name: 'Liam Chen', role: 'Pediatrician', status: 'Pending' },
  { name: 'Maria Diaz', role: 'Radiologist', status: 'Active' },
];

export const Default: Story = { args: { columns, rows } };
export const Empty: Story = { args: { columns, rows: [], emptyText: 'No patients found' } };
