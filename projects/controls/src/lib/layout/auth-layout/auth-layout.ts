import { Component, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Split auth layout — a centered form panel on the left and a hero image on the
 * right (hidden on small screens). Mirrors the CareHigh auth screens.
 *
 *   <ch-auth-layout heroImage="/assets/login.jpg">
 *     <h1 class="ch-auth-title">Sign in</h1>
 *     <form>…</form>
 *   </ch-auth-layout>
 */
@Component({
  selector: 'ch-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ch-auth">
      <div class="ch-auth__panel">
        <div class="ch-auth__container">
          <ng-content></ng-content>
        </div>
      </div>
      <div class="ch-auth__hero">
        @if (heroImage()) {
          <img class="ch-auth__hero-img" [src]="heroImage()" alt="" />
        }
      </div>
    </div>
  `,
  styles: [
    `
      .ch-auth {
        display: flex;
        min-height: 100%;
        font-family: var(--ch-font-family-base);
      }
      .ch-auth__panel {
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;
        justify-content: center;
        padding: 3rem 1rem;
      }
      .ch-auth__container {
        width: 100%;
        max-width: 24rem;
        margin-left: auto;
        margin-right: auto;
      }
      .ch-auth__hero {
        position: relative;
        display: none;
        flex: 1 1 0%;
      }
      .ch-auth__hero-img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
      @media (min-width: 1024px) {
        .ch-auth__panel {
          flex: none;
          width: 28rem;
          padding-left: 5rem;
          padding-right: 5rem;
        }
        .ch-auth__hero {
          display: block;
        }
      }
    `,
  ],
})
export class ChAuthLayout {
  readonly heroImage = input('');
}
