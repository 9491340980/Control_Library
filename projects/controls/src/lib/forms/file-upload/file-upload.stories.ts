import type { Meta, StoryObj } from '@storybook/angular';
import { ChFileUpload } from './file-upload';

/**
 * `<ch-file-upload>` — drag & drop file upload, no third-party deps. Works with `[(ngModel)]`.
 * Value is an array of `File`.
 *
 * ```html
 * <ch-file-upload [(ngModel)]="files" [multiple]="true" accept="image/*" />
 * ```
 */
const meta: Meta<ChFileUpload> = {
  title: 'Forms/File Upload',
  component: ChFileUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<ChFileUpload>;

export const Single: Story = { args: { multiple: false } };
export const Multiple: Story = { args: { multiple: true } };
export const Images: Story = { args: { multiple: true, accept: 'image/*' } };
export const Disabled: Story = { args: { disabled: true } };
