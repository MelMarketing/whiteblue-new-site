import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PillLabelComponent } from '../../shared/pill-label.component';
import { RevealDirective } from '../../shared/reveal.directive';
import { SERVICES } from '../../content/site-content';

/** Figma "services" (805:60815): "From playbook to production". */
@Component({
  selector: 'wb-services',
  imports: [RevealDirective, PillLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services" id="services" aria-labelledby="services-title">
      <div class="services__grid-lines" aria-hidden="true"></div>
      <!-- Cricket field graphic, positioned to mirror the right-side reference artwork. -->
      <svg class="services__field" wbReveal="fade" viewBox="0 0 968 968" aria-hidden="true">
        <defs>
          <clipPath id="services-field-top"><rect x="0" y="0" width="968" height="484" /></clipPath>
          <clipPath id="services-field-bottom"><rect x="0" y="484" width="968" height="484" /></clipPath>
        </defs>
        <!-- One continuous, faint field illustration, contained within the Services section -->
        @for (half of fieldHalves; track half) {
          <g [attr.clip-path]="'url(#services-field-' + half + ')'"
             [class]="'services__field-half services__field-half--' + half">
            <g class="services__field-lines" fill="none" stroke-width="3.6">
              <circle cx="484" cy="484" r="468" pathLength="1" />
              <circle cx="484" cy="484" r="446.4" pathLength="1" />
              <circle cx="484" cy="484" r="251.4" pathLength="1" />
              <rect x="399.3" y="412" width="69.5" height="132.5" pathLength="1" />
              <path d="M366.6 424.8H501.5" pathLength="1" />
              <path d="M366.6 506.5H501.5" pathLength="1" />
            </g>
            <g class="services__field-fielders" fill="none" stroke-width="3.6">
              @for (f of fielders; track $index) {
                <circle [attr.cx]="f.x" [attr.cy]="f.y" r="11.4" />
              }
            </g>
          </g>
        }
      </svg>

      <div class="wb-container services__inner">
        <wb-pill-label wbReveal icon="services" class="services__eyebrow">Services</wb-pill-label>
        <h2 wbReveal class="wb-h2 services__title" id="services-title">From playbook to <span class="wb-accent">production</span></h2>
        <p wbReveal [wbRevealDelay]="120" class="wb-lead services__lead">
          We bring the same deep-tech disciplines to every industry, shaped around how each one actually works.
        </p>

        <ul class="services__cards">
          @for (service of services; track service.title; let i = $index) {
            <li class="card" wbReveal [wbRevealDelay]="i * 110">
              <h3 class="card__title">
                <img [src]="service.icon" [width]="service.iconSize" [height]="service.iconSize" alt="" />
                {{ service.title }}
              </h3>
              <p class="card__text">{{ service.description }}</p>
              <a class="wb-link-arrow card__link" [href]="service.href">{{ service.linkLabel }} <span aria-hidden="true">→</span></a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .services {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 100svh;
      overflow: hidden;
      isolation: isolate;
      padding: clamp(30px, 4vh, 48px) 0;
      background: transparent;
    }
    /* ~99px hairline grid in white, Figma "lines" group */
    .services__grid-lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
      background-size: 92px 92px;
      background-position: 46px 0, 0 1px;
      mask-image: linear-gradient(to bottom, #000 82%, transparent);
    }
    /* The cricket field is centred on the right edge and vertically within Services. */
    .services__field {
      --size: clamp(680px, 70vw, 968px);
      position: absolute;
      right: calc(var(--size) * -0.5 + 52px);
      top: 48.5%;
      bottom: auto;
      translate: 0 -50%;
      width: var(--size);
      height: var(--size);
      max-width: none;
      overflow: visible;
      pointer-events: none;
      z-index: 0;
      transform-origin: center;
    }
    .services__field-half--top,
    .services__field-half--bottom { stroke: #fff; }
    /* Faint field lines sit behind the service copy and cards. */
    .services__field-half--top .services__field-lines,
    .services__field-half--top .services__field-fielders,
    .services__field-half--bottom .services__field-lines,
    .services__field-half--bottom .services__field-fielders { opacity: 0.38; }
    .services__field-lines > * {
      stroke-opacity: 0.95;
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      transition: stroke-dashoffset 1.6s cubic-bezier(0.45, 0, 0.2, 1);
    }
    .services__field-lines > :nth-child(2) { transition-delay: 0.15s; }
    .services__field-lines > :nth-child(3) { transition-delay: 0.35s; }
    .services__field-lines > :nth-child(n + 4) { transition-delay: 0.6s; transition-duration: 0.8s; }
    .services__field.is-visible .services__field-lines > * { stroke-dashoffset: 0; }
    .services__field-fielders circle {
      opacity: 0;
      transform-box: fill-box;
      transform-origin: center;
      transform: scale(0.3);
      transition: opacity 0.4s ease, transform 0.5s var(--wb-ease-spring);
    }
    .services__field.is-visible .services__field-fielders circle { opacity: 0.95; transform: none; }
    .services__field-fielders circle:nth-child(1) { transition-delay: 0.9s; }
    .services__field-fielders circle:nth-child(2) { transition-delay: 0.98s; }
    .services__field-fielders circle:nth-child(3) { transition-delay: 1.06s; }
    .services__field-fielders circle:nth-child(4) { transition-delay: 1.14s; }
    .services__field-fielders circle:nth-child(5) { transition-delay: 1.22s; }
    .services__field-fielders circle:nth-child(6) { transition-delay: 1.3s; }
    .services__field-fielders circle:nth-child(7) { transition-delay: 1.38s; }
    .services__field-fielders circle:nth-child(n + 8) { transition-delay: 1.5s; }
    .services__inner { position: relative; z-index: 1; }
    .services__eyebrow { margin-bottom: var(--wb-space-xs); }
    .services__title {
      max-width: 720px;
      font-size: clamp(2.7rem, 5vw, 4.5rem);
      line-height: 1.2;
    }
    .services__lead { margin-top: var(--wb-space-sm); max-width: 900px; }

    .services__cards {
      max-width: 964px;
      margin-top: clamp(24px, 3vh, 36px);
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-height: clamp(190px, 20vh, 228px);
      padding: 20px;
      border: 1px solid var(--wb-glass-border);
      border-radius: 8px;
      background: var(--wb-glass-fill-strong);
      transition: background-color 0.2s ease, box-shadow 0.2s ease;
    }
    .card { transition: transform 0.45s var(--wb-ease-out), background-color 0.3s ease, box-shadow 0.45s var(--wb-ease-out); }
    .card:hover { transform: translateY(-6px); background-color: rgba(255, 255, 255, 0.22); box-shadow: 0 18px 36px rgba(156, 101, 0, 0.16); }
    .card__title img { transition: transform 0.6s var(--wb-ease-spring); }
    .card:hover .card__title img { transform: rotate(-10deg) scale(1.12); }
    .card__link span { display: inline-block; transition: transform 0.3s var(--wb-ease-out); }
    .card:hover .card__link span { transform: translateX(6px); }
    .card__title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: var(--wb-font-display);
      font-weight: 500;
      font-size: var(--wb-fs-h4);
      line-height: 1.33;
      color: var(--wb-ink);
    }
    .card__title img { flex: none; }
    .card__text {
      font-family: var(--wb-font-body);
      font-size: var(--wb-fs-body);
      line-height: 1.6;
      color: var(--wb-ink-600);
    }
    .card__link { margin-top: auto; }

    @media (max-height: 850px) and (min-width: 761px) {
      .services { padding-block: 24px; }
      .services__title { font-size: clamp(2.2rem, 4vw, 3.4rem); }
      .services__lead { margin-top: 16px; }
      .services__cards { margin-top: 22px; gap: 16px; }
      .card { min-height: 180px; padding: 16px; }
      .card__title { font-size: clamp(1.25rem, 1.8vw, 1.6rem); }
    }
    @media (max-width: 1100px) {
      .services__field { opacity: 0.8; }
    }
    @media (max-width: 760px) {
      .services {
        display: block;
        min-height: 0;
        padding-block: var(--wb-section-y);
      }
      .services__field {
        --size: 640px;
        right: -320px;
        top: 42%;
        opacity: 0.28;
      }
      .services__cards { max-width: none; grid-template-columns: 1fr; }
      .card { min-height: 0; }
    }
  `,
})
export class ServicesComponent {
  protected readonly services = SERVICES;
  protected readonly fieldHalves = ['top', 'bottom'] as const;
  /** Fielder positions in SVG viewBox units, aligned to the supplied section reference. */
  protected readonly fielders = [
    { x: 314, y: 527 },
    { x: 354, y: 482 },
    { x: 160, y: 697 },
    { x: 406, y: 652 },
  ];
}
