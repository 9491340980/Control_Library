import type { Meta, StoryObj } from '@storybook/angular';
import { ChNgFileUpload } from './ng-file-upload';

/**
 * `<ch-ng-file-upload>` — file upload backed by **ngx-file-drop**.
 * Compare with the dependency-free `<ch-file-upload>` under Forms/File Upload.
 *
 * ```html
 * <ch-ng-file-upload [(ngModel)]="files" [multiple]="true" accept="image/*" />
 * ```
 */
const meta: Meta<ChNgFileUpload> = {
  title: 'Forms (3rd-party)/File Upload',
  component: ChNgFileUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChNgFileUpload>;

export const Multiple: Story = { args: { multiple: true } };
export const Single: Story = { args: { multiple: false } };
export const Disabled: Story = { args: { multiple: true, disabled: true } };
