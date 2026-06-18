import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
  HostListener,
} from '@angular/core';

/**
 * Tooltip directive. Adds a small popover on hover/focus.
 *
 *   <button [chTooltip]="'Delete'">🗑️</button>
 *   <span chTooltip="More info" tooltipPosition="right">?</span>
 */
@Directive({
  selector: '[chTooltip]',
})
export class ChTooltip implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  /** Tooltip text. */
  readonly chTooltip = input('');
  /** Placement relative to the host. */
  readonly tooltipPosition = input<'top' | 'bottom' | 'left' | 'right'>('top');

  private tip: HTMLElement | null = null;

  @HostListener('mouseenter')
  @HostListener('focus')
  show(): void {
    if (this.tip || !this.chTooltip()) return;
    const tip = this.renderer.createElement('div') as HTMLElement;
    tip.textContent = this.chTooltip();
    Object.assign(tip.style, {
      position: 'fixed',
      zIndex: '1000000',
      background: 'var(--ch-color-text-strong, #111827)',
      color: '#fff',
      padding: '4px 8px',
      borderRadius: 'var(--ch-radius-sm, 4px)',
      fontSize: 'var(--ch-font-size-xs, 0.75rem)',
      fontFamily: 'var(--ch-font-family-base, sans-serif)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      boxShadow: 'var(--ch-shadow-md, 0 4px 6px rgba(0,0,0,0.1))',
    });
    this.renderer.appendChild(document.body, tip);
    this.tip = tip;
    this.position();
  }

  @HostListener('mouseleave')
  @HostListener('blur')
  hide(): void {
    if (this.tip) {
      this.renderer.removeChild(document.body, this.tip);
      this.tip = null;
    }
  }

  private position(): void {
    if (!this.tip) return;
    const host = this.host.nativeElement.getBoundingClientRect();
    const tip = this.tip.getBoundingClientRect();
    const gap = 6;
    let top = 0;
    let left = 0;
    switch (this.tooltipPosition()) {
      case 'bottom':
        top = host.bottom + gap;
        left = host.left + host.width / 2 - tip.width / 2;
        break;
      case 'left':
        top = host.top + host.height / 2 - tip.height / 2;
        left = host.left - tip.width - gap;
        break;
      case 'right':
        top = host.top + host.height / 2 - tip.height / 2;
        left = host.right + gap;
        break;
      default:
        top = host.top - tip.height - gap;
        left = host.left + host.width / 2 - tip.width / 2;
    }
    this.renderer.setStyle(this.tip, 'top', `${Math.max(4, top)}px`);
    this.renderer.setStyle(this.tip, 'left', `${Math.max(4, left)}px`);
  }

  ngOnDestroy(): void {
    this.hide();
  }
}
