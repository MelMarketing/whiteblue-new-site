import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component';
import { CarouselArrowsComponent } from '../../shared/carousel-arrows.component';
import { PillLabelComponent } from '../../shared/pill-label.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { CASE_STUDIES, CONSULTATION_HREF } from '../../content/site-content';

/**
 * Figma "proff-section" (805:60966): "Already in production, across industries."
 * A three-up carousel where the centre card is featured; the arrows rotate the set.
 */
@Component({
  selector: 'wb-case-studies',
  imports: [ButtonComponent, CarouselArrowsComponent, PillLabelComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cases" id="case-studies" aria-labelledby="cases-title">
      <div class="wb-container">
        <header class="cases__head" wbReveal>
          <wb-pill-label icon="resources">Resources</wb-pill-label>
          <h2 class="wb-h2" id="cases-title"><span class="wb-accent">Already in production,</span><br />across industries.</h2>
          <p class="wb-lead">Proven in live enterprise deployments, and built to adapt to your systems, data and rules. You start ahead, not from scratch.</p>
        </header>

        <div class="stage" aria-roledescription="carousel" aria-label="Case studies" wbReveal [wbRevealDelay]="150">
          <ul class="cases__track" aria-live="polite">
            @for (item of ordered(); track item.study.title + step()) {
              <li class="case" [class.case--featured]="item.featured" [class.case--from-left]="direction() < 0">
                <span class="case__chip">{{ item.study.industry }}</span>
                <span class="case__icon"><img [src]="item.study.icon" width="32" height="32" alt="" /></span>
                <h3 class="case__title">{{ item.study.title }}</h3>
                <a class="case__link" [href]="item.study.href">Read case study <span aria-hidden="true">→</span></a>
              </li>
            }
          </ul>
          <wb-carousel-arrows itemLabel="case study" (previous)="go(-1)" (next)="go(1)" />
        </div>

        <div class="cases__cta" wbReveal [wbRevealDelay]="250">
          <wb-button [href]="consultationHref">Book a consultation</wb-button>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .cases { position: relative; overflow: hidden; padding: var(--wb-section-y) 0; background: transparent; }
    .cases__head {
      max-width: 902px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--wb-space-xs);
      text-align: center;
    }
    .cases__head .wb-lead { margin-top: calc(var(--wb-space-sm) - var(--wb-space-xs)); }

    .stage { position: relative; margin-top: var(--wb-space-lg); }
    .stage wb-carousel-arrows { inset-inline: calc(-1 * clamp(0px, 1.88vw, 35px)); }

    .cases__track {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--wb-gap-cards);
      padding-inline: clamp(56px, 3.18vw, 61px);
    }

    /* Side cards 418 × 332, featured card 658 × 420 */
    .case {
      position: relative;
      flex: 0 1 418px;
      min-height: clamp(260px, 17.3vw, 332px);
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto 1fr;
      align-content: start;
      gap: 16px 12px;
      padding: 36px 27px 50px;
      border: 1px solid var(--wb-blue-border);
      border-radius: 28px;
      overflow: hidden;
      /* Placeholder for the glass-building photography, which is not in the asset pack yet */
      background:
        linear-gradient(-90deg, rgba(255, 255, 255, 0) 5.5%, rgba(255, 255, 255, 0.7) 34.1%),
        linear-gradient(160deg, #f5f8ff 0%, #e4ecff 55%, #b9cdfb 100%);
      transition: flex-basis 0.45s ease, min-height 0.45s ease, box-shadow 0.3s ease;
    }
    .case--featured {
      flex-basis: 658px;
      min-height: clamp(320px, 21.9vw, 420px);
      gap: 34px 12px;
      border-color: var(--wb-blue);
      box-shadow: 4px 4px 15px rgba(44, 88, 241, 0.15);
      background:
        linear-gradient(-90deg, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.75) 45%),
        linear-gradient(150deg, #eef3ff 0%, #d4e2ff 50%, #8fb0f7 100%);
    }

    .case__chip {
      justify-self: start;
      align-self: center;
      display: inline-flex;
      align-items: center;
      height: 56px;
      padding: 10px 24px;
      border-radius: 48px;
      background: var(--wb-blue-chip);
      font-family: var(--wb-font-body);
      font-weight: 600;
      font-size: var(--wb-fs-body-lg);
      color: var(--wb-blue);
      white-space: nowrap;
    }
    .case__icon { width: 56px; height: 56px; display: grid; place-items: center; border-radius: 28px; background: var(--wb-blue-icon); }
    .case--featured .case__chip { background: var(--wb-blue); color: #fff; }
    .case--featured .case__icon { background: var(--wb-blue); }

    .case__title {
      grid-column: 1 / -1;
      font-family: var(--wb-font-display);
      font-weight: 700;
      font-size: var(--wb-fs-card-title);
      line-height: 1.47;
      color: #000;
    }
    .case__link {
      grid-column: 1 / -1;
      align-self: end;
      font-family: var(--wb-font-display);
      font-weight: 500;
      font-size: clamp(1.0625rem, 1.25vw, 1.5rem);
      color: var(--wb-blue);
    }
    .case__link::after { content: ''; position: absolute; inset: 0; } /* whole card is clickable */
    .case:hover { box-shadow: 4px 8px 24px rgba(44, 88, 241, 0.18); }

    .cases__cta { margin-top: var(--wb-space-lg); display: flex; justify-content: center; }

    /* Cards slide in from the side the carousel moved towards */
    .case { animation: case-in 0.65s var(--wb-ease-out) both; }
    .case--from-left { animation-name: case-in-left; }
    .case--featured { animation-duration: 0.8s; }
    @keyframes case-in { from { opacity: 0; transform: translateX(70px) scale(0.96); } to { opacity: 1; transform: none; } }
    @keyframes case-in-left { from { opacity: 0; transform: translateX(-70px) scale(0.96); } to { opacity: 1; transform: none; } }
    .case__icon { transition: transform 0.6s var(--wb-ease-spring); }
    .case:hover .case__icon { transform: rotate(-12deg) scale(1.1); }
    .case__link span { display: inline-block; transition: transform 0.3s var(--wb-ease-out); }
    .case:hover .case__link span { transform: translateX(6px); }
    .case { transition: box-shadow 0.4s var(--wb-ease-out), translate 0.4s var(--wb-ease-out); }
    .case:hover { translate: 0 -6px; }

    @media (max-width: 1100px) {
      .case:not(.case--featured) { display: none; }
      .case--featured { flex-basis: 100%; }
    }
  `,
})
export class CaseStudiesComponent {
  protected readonly consultationHref = CONSULTATION_HREF;
  /** Index of the featured (centre) case study; Figma shows Insurance in the middle. */
  private readonly featured = signal(1);

  /** Always render previous / featured / next so the featured card stays centred. */
  protected readonly ordered = computed(() => {
    const n = CASE_STUDIES.length;
    const f = this.featured();
    return [-1, 0, 1].map(offset => ({
      study: CASE_STUDIES[(f + offset + n) % n],
      featured: offset === 0,
    }));
  });

  protected readonly direction = signal(1);
  /** Bumped on every move so the cards re-render and replay their entrance. */
  protected readonly step = signal(0);

  protected go(step: number): void {
    const n = CASE_STUDIES.length;
    this.direction.set(step);
    this.step.update(s => s + 1);
    this.featured.update(i => (i + step + n) % n);
  }
}
