import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChAccordionItem } from './accordion-item';

/**
 * `<ch-accordion-item>` — collapsible section.
 *
 * ```html
 * <ch-accordion-item title="Billing">…</ch-accordion-item>
 * ```
 */
const meta: Meta<ChAccordionItem> = {
  title: 'Navigation/Accordion',
  component: ChAccordionItem,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [ChAccordionItem] })],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:.5rem;max-width:28rem;">
        <ch-accordion-item title="What is included?" [open]="true">
          <p style="margin:0;">Everything in the Pro plan plus priority support.</p>
        </ch-accordion-item>
        <ch-accordion-item title="Can I cancel anytime?">
          <p style="margin:0;">Yes, cancel from your billing settings.</p>
        </ch-accordion-item>
      </div>
    `,
  }),
};
export default meta;
type Story = StoryObj<ChAccordionItem>;

export const Default: Story = {};
