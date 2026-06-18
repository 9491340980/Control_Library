import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';

/**
 * User avatar — shows an image, or initials derived from `name` as a fallback.
 *
 *   <ch-avatar name="Sandeep Etikala" />
 *   <ch-avatar src="/me.jpg" name="Sandeep" size="lg" />
 */
@Component({
  selector: 'ch-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="ch-avatar" [class]="'ch-avatar--' + size()">
      @if (src()) {
        <img class="ch-avatar__img" [src]="src()" [alt]="name()" />
      } @else {
        <span class="ch-avatar__initials">{{ initials() }}</span>
      }
    </span>
  `,
  styles: [
    `
      .ch-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--ch-radius-full);
        background-color: var(--ch-color-primary-soft);
        color: var(--ch-color-primary);
        font-weight: var(--ch-font-weight-semibold);
        overflow: hidden;
        flex-shrink: 0;
      }
      .ch-avatar__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ch-avatar--sm {
        width: 1.75rem;
        height: 1.75rem;
        font-size: var(--ch-font-size-xs);
      }
      .ch-avatar--md {
        width: 2.5rem;
        height: 2.5rem;
        font-size: var(--ch-font-size-sm);
      }
      .ch-avatar--lg {
        width: 3.5rem;
        height: 3.5rem;
        font-size: var(--ch-font-size-md);
      }
    `,
  ],
})
export class ChAvatar {
  readonly name = input('');
  readonly src = input('');
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly initials = computed(() =>
    this.name()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join(''),
  );
}
