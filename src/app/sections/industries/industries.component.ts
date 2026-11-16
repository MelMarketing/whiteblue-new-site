import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PillLabelComponent } from '../../shared/pill-label.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { INDUSTRIES } from '../../content/site-content';

/** Figma "industries" (805:60919): "Four industries. One team" bento grid. */
@Component({
  selector: 'wb-industries',
  imports: [RevealDirective, PillLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="industries" id="industries" aria-labelledby="industries-title">
      <img wbReveal="fade" class="industries__rings" src="assets/illustrations/field-rings.svg" width="315" height="551" alt="" />

      <div class="wb-container">
        <header class="industries__head" wbReveal>
          <wb-pill-label icon="industries">Industries</wb-pill-label>
          <h2 class="wb-h2" id="industries-title"><span class="wb-accent">Four industries.</span> One team</h2>
          <p class="wb-lead">We bring the same deep-tech disciplines to every industry, shaped around how each one actually works.</p>
        </header>

        <ul class="bento">
          @for (industry of industries; track industry.number; let i = $index) {
            <li wbReveal [wbRevealDelay]="(i % 2) * 140" class="bento__card" [class.bento__card--yellow]="industry.tone === 'yellow'">
              <article class="bento__inner" [style.background-image]="'url(' + industry.image + ')'">
                <span class="bento__number" aria-hidden="true">{{ industry.number }}</span>
                <div class="bento__body">
                  <h3 class="bento__title">{{ industry.title }}</h3>
                  <p class="bento__text">{{ industry.description }}</p>
                  <a class="wb-link-arrow bento__link" [href]="industry.href">
                    Learn more <span aria-hidden="true">→</span>
                    <span class="wb-visually-hidden"> about {{ industry.title }}</span>
                  </a>
                </div>
              </article>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .industries {
      position: relative;
      overflow: hidden;
      padding: var(--wb-section-y) 0;
      background: transparent;
    }
    .industries__rings { position: absolute; left: 0; top: 0; width: 315px; height: auto; pointer-events: none; }
    .industries .wb-container { position: relative; }

    .industries__head {
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--wb-space-xs);
      text-align: center;
    }
    .industries__head .wb-lead { margin-top: calc(var(--wb-space-sm) - var(--wb-space-xs));
    }

    /* Bento proportions from Figma: row 1 = 1031 / 620, row 2 = 701 / 949, 22px gaps */
    .bento {
      margin-top: var(--wb-space-lg);
      display: flex;
      flex-wrap: wrap;
      gap: var(--wb-gap-cards);
    }
    .bento__card { min-width: 0; }
    .bento__card:nth-child(1) { flex: 0 0 calc((100% - var(--wb-gap-cards)) * 1031 / 1651); }
    .bento__card:nth-child(2) { flex: 0 0 calc((100% - var(--wb-gap-cards)) * 620 / 1651); }
    .bento__card:nth-child(3) { flex: 0 0 calc((100% - var(--wb-gap-cards)) * 701 / 1650); }
    .bento__card:nth-child(4) { flex: 0 0 calc((100% - var(--wb-gap-cards)) * 949 / 1650); }

    .bento__card {
      display: flex;
      min-height: clamp(320px, 20.9vw, 401px);
      padding: 15px 16px;
      border-radius: 24px;
      background: var(--wb-blue-soft);
    }
    .bento__card--yellow { background: var(--wb-yellow-soft); }

    .bento__inner {
      flex: 1;
      display: flex;
      gap: clamp(12px, 1vw, 18px);
      padding: 32px 34px 30px;
      border-radius: 16px;
      background-color: #fff;
      background-repeat: no-repeat;
      background-position: center right;
      transition: background-size 0.8s var(--wb-ease-out), box-shadow 0.4s var(--wb-ease-out);
      background-size: auto 100%;
    }
    .bento__card { transition: transform 0.45s var(--wb-ease-out); }
    .bento__card:hover { transform: translateY(-6px); }
    /* The illustration pushes in slightly on hover */
    .bento__card:hover .bento__inner { background-size: auto 108%; box-shadow: 0 16px 36px rgba(44, 88, 241, 0.14); }
    .bento__number { transition: color 0.35s ease; }
    .bento__card:hover .bento__number { color: rgba(44, 88, 241, 0.12); }
    .bento__link span[aria-hidden] { display: inline-block; transition: transform 0.3s var(--wb-ease-out); }
    .bento__card:hover .bento__link span[aria-hidden] { transform: translateX(6px); }

    .bento__number {
      flex: none;
      width: 63px;
      font-family: var(--wb-font-numeral);
      font-weight: 700;
      font-size: var(--wb-fs-h3);
      line-height: 1.23;
      color: transparent;
      -webkit-text-stroke: 1.2px var(--wb-blue);
    }

    .bento__body {
      display: flex;
      flex-direction: column;
      max-width: 725px;
    }
    .bento__title {
      font-family: var(--wb-font-display);
      font-weight: 700;
      font-size: var(--wb-fs-h3);
      line-height: 1.21;
      color: var(--wb-ink);
    }
    .bento__text {
      margin-top: var(--wb-space-xs);
      max-width: 592px;
      font-family: var(--wb-font-body);
      font-size: var(--wb-fs-body-lg);
      line-height: 1.55;
      color: var(--wb-ink-600);
    }
    .bento__card:nth-child(2) .bento__text { max-width: 396px; }
    .bento__card:nth-child(3) .bento__text { max-width: 428px; }
    .bento__card:nth-child(4) .bento__text { max-width: 464px; }
    .bento__link { margin-top: auto; padding-top: var(--wb-space-sm); }

    @media (max-width: 1100px) {
      .bento__card:nth-child(n) { flex-basis: 100%; }
      .bento__inner { background-size: cover; }
      .bento__card:hover .bento__inner { background-size: cover; }
    }
    @media (max-width: 600px) {
      .bento__inner { flex-direction: column; padding: 24px; }
      .bento__card { padding: 10px; }
      .industries__rings { width: 180px; }
    }
  `,
})
export class IndustriesComponent {
  protected readonly industries = INDUSTRIES;
}
