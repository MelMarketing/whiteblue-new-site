import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * The square prev/next controls that flank the testimonial and case-study carousels.
 * Previous is outlined grey; next is the yellow filled button, as drawn in Figma.
 */
@Component({
  selector: 'wb-carousel-arrows',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" class="arrow arrow--prev" (click)="previous.emit()" [disabled]="!canGoBack()" [attr.aria-label]="'Previous ' + itemLabel()">
      <img src="assets/icons/arrow-left.svg" width="62" height="62" alt="" />
    </button>
    <button type="button" class="arrow arrow--next" (click)="next.emit()" [disabled]="!canGoForward()" [attr.aria-label]="'Next ' + itemLabel()">
      <img src="assets/icons/arrow-left.svg" width="62" height="62" alt="" />
    </button>
  `,
  styles: `
    :host {
      position: absolute;
      inset: 50% 0 auto;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      pointer-events: none;
      z-index: 5;
    }
    .arrow {
      pointer-events: auto;
      width: 68px;
      height: 68px;
      border-radius: 8px;
      display: grid;
      place-items: center;
      transition: transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease;
    }
    .arrow img { width: 62px; height: 62px; }
    .arrow--prev { border: 1px solid #8f8f8f; background: rgba(255, 255, 255, 0.85); }
    .arrow--prev img { opacity: 0.3; }
    .arrow--prev:not(:disabled):hover img { opacity: 0.7; }
    .arrow--next { background: var(--wb-yellow); }
    .arrow--next img { transform: scaleX(-1); }
    .arrow--next:not(:disabled):hover { background: #ffc23d; }
    .arrow:not(:disabled):active { transform: scale(0.96); }
    .arrow:disabled { cursor: default; }
    .arrow--next:disabled { opacity: 0.45; }
    @media (max-width: 720px) {
      .arrow { width: 48px; height: 48px; }
      .arrow img { width: 44px; height: 44px; }
    }
  `,
})
export class CarouselArrowsComponent {
  readonly canGoBack = input(true);
  readonly canGoForward = input(true);
  readonly itemLabel = input('slide');
  readonly previous = output<void>();
  readonly next = output<void>();
}
