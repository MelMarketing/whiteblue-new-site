import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * WhiteBlue pill button (Figma component "primary-btn", 544:40283).
 * primary: blue fill with amber hairline. light: white fill, blue text.
 * Renders an <a> because every CTA in the design navigates.
 */
@Component({
  selector: 'wb-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<a class="btn" [class.btn--light]="variant() === 'light'" [attr.href]="href()"><ng-content /></a>`,
  styles: `
    :host { display: inline-flex; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 24px;
      border-radius: var(--wb-radius-pill);
      border: 1px solid var(--wb-amber);
      background: var(--wb-blue);
      color: var(--wb-white);
      font-family: var(--wb-font-display);
      font-weight: 700;
      font-size: var(--wb-fs-button);
      line-height: 1.35;
      white-space: nowrap;
      transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    }
    .btn { position: relative; overflow: hidden; isolation: isolate; }
    .btn::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(110deg, transparent 30%, rgba(255, 255, 255, 0.35) 50%, transparent 70%);
      transform: translateX(-120%);
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .btn:hover::before { transform: translateX(120%); }
    .btn:hover { background: var(--wb-blue-deep); box-shadow: 0 8px 22px rgba(44, 88, 241, 0.32); transform: translateY(-2px); }
    .btn:active { transform: translateY(1px); }
    .btn--light { background: var(--wb-white); color: var(--wb-blue); border-color: var(--wb-white); }
    .btn--light:hover { background: var(--wb-blue-tint); box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08); }
  `,
})
export class ButtonComponent {
  readonly href = input<string>('#');
  readonly variant = input<'primary' | 'light'>('primary');
}
