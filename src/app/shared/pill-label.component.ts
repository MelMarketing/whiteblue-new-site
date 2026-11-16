import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Eyebrow icons supplied by WhiteBlue (public/assets/icons/eyebrow). */
export type EyebrowIcon =
  | 'careers' | 'how-we-work' | 'industries' | 'leadership' | 'our-values' | 'products'
  | 'resources' | 'services' | 'testimonials' | 'track-record' | 'trust-security';

/**
 * Section eyebrow: icon + label in a pill (Figma "Frame 118").
 *   <wb-pill-label icon="products">Products</wb-pill-label>
 */
@Component({
  selector: 'wb-pill-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<img [src]="'assets/icons/eyebrow/' + icon() + '.svg'" alt="" /><span><ng-content /></span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      height: 48px;
      padding: 10px 24px 10px 20px;
      border: 1px solid var(--wb-blue);
      border-radius: 32px;
      background: var(--wb-blue-tint);
      color: var(--wb-blue);
      font-family: var(--wb-font-display);
      font-weight: 700;
      font-size: var(--wb-fs-button);
      white-space: nowrap;
    }
    img { height: 24px; width: auto; max-width: 32px; flex: none; object-fit: contain; }
  `,
})
export class PillLabelComponent {
  readonly icon = input<EyebrowIcon>('resources');
}
