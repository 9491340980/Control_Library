import type { Meta, StoryObj } from '@storybook/angular';
import { ChButton } from './button';

/**
 * `<ch-button>` is the standard button control.
 *
 * ### Usage
 * ```ts
 * import { ChButton } from '@yourcompany/controls';
 *
 * @Component({ imports: [ChButton] })
 * export class MyComponent {}
 * ```
 * ```html
 * <ch-button variant="primary" (clicked)="save()">Save</ch-button>
 * ```
 */
const meta: Meta<ChButton> = {
  title: 'Controls/Button',
  component: ChButton,
  tags: ['autodocs'], // auto-generates the API/props documentation page
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'info'],
      description: 'Visual style of the button.',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: 'Size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
    },
    clicked: { action: 'clicked', description: 'Emitted when clicked.' },
  },
  // Render with projected content (the label) since <ng-content> can't be an @Input.
  render: (args) => ({
    props: args,
    template: `<ch-button [variant]="variant" [size]="size" [disabled]="disabled" (clicked)="clicked($event)">Button</ch-button>`,
  }),
};
export default meta;

type Story = StoryObj<ChButton>;

/** The default primary button. Use the Controls panel to change props live. */
export const Primary: Story = {
  args: { variant: 'primary', size: 'md', disabled: false },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md', disabled: false },
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md', disabled: false },
};

export const Info: Story = {
  args: { variant: 'info', size: 'md', disabled: false },
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
};

/** All variants side by side. */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
        <ch-button variant="primary">Primary</ch-button>
        <ch-button variant="secondary">Secondary</ch-button>
        <ch-button variant="outline">Outline</ch-button>
        <ch-button variant="info">Info</ch-button>
      </div>
    `,
    moduleMetadata: { imports: [ChButton] },
  }),
};

/** Sizes side by side. */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:0.75rem; align-items:center;">
        <ch-button size="md">Medium</ch-button>
        <ch-button size="lg">Large</ch-button>
      </div>
    `,
    moduleMetadata: { imports: [ChButton] },
  }),
};
