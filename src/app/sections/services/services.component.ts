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
      <!-- Cricket field (from Figma "fielding_positions"), centred on the boundary with the next
           section: the top half sits here and the rest carries on into Products. -->
      <svg class="services__field" wbReveal="fade" viewBox="0 0 968 968" aria-hidden="true">
        <defs>
          <clipPath id="services-field-top"><rect x="0" y="0" width="968" height="484" /></clipPath>
          <clipPath id="services-field-bottom"><rect x="0" y="484" width="968" height="484" /></clipPath>
          <!-- The part inside Products fades out before it reaches the copy there -->
          <linearGradient id="services-field-fade" x1="0" y1="484" x2="0" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#fff" />
            <stop offset="1" stop-color="#000" />
          </linearGradient>
          <mask id="services-field-bottom-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="968" height="968">
            <rect x="0" y="0" width="968" height="968" fill="url(#services-field-fade)" />
          </mask>
        </defs>
        <!-- Same field drawn twice: white on this section, blue where it runs into Products -->
        @for (half of fieldHalves; track half) {
          <g [attr.clip-path]="'url(#services-field-' + half + ')'"
             [attr.mask]="half === 'bottom' ? 'url(#services-field-bottom-fade)' : null"
             [class]="'services__field-half services__field-half--' + half">
            <g class="services__field-lines" fill="none" stroke-width="3.6">
              <circle cx="484" cy="484" r="468" pathLength="1" />
              <circle cx="484" cy="484" r="446.4" pathLength="1" />
              <circle cx="484" cy="484" r="251.4" pathLength="1" />
              <rect x="449.3" y="404.4" width="69.5" height="122.5" pathLength="1" />
              <path d="M416.6 424.8H551.5" pathLength="1" />
              <path d="M416.6 506.5H551.5" pathLength="1" />
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
        <h2 wbReveal class="wb-h2" id="services-title">From playbook to <span class="wb-accent">production</span></h2>
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
      overflow: visible; /* the field carries on into the next section */
      padding: var(--wb-section-y) 0;
      background: transparent;
    }
    /* ~99px hairline grid in white, Figma "lines" group */
    .services__grid-lines {
      position: absolute;
      inset: 0 0 auto;
      height: min(945px, 100%); /* stay inside the section now it no longer clips */
      pointer-events: none;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.35) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.35) 1px, transparent 1px);
      background-size: 98.77px 100px;
      background-position: calc(50% - 900.7px) 0, 0 0;
      mask-image: linear-gradient(to bottom, #000 75%, transparent);
    }
    /* Centre of the field sits exactly on the bottom edge of this section */
    .services__field {
      --size: clamp(420px, 46vw, 880px);
      position: absolute;
      right: calc(var(--size) * -0.12);
      bottom: calc(var(--size) * -0.5);
      width: var(--size);
      height: var(--size);
      max-width: none;
      overflow: visible;
      pointer-events: none;
      z-index: 0;
    }
    .services__field-half--top { stroke: #fff; }
    .services__field-half--bottom { stroke: var(--wb-blue); }
    /* Kept very faint: a background texture, not a feature */
    .services__field-half--top .services__field-lines,
    .services__field-half--top .services__field-fielders { opacity: 0.28; }
    .services__field-half--bottom .services__field-lines,
    .services__field-half--bottom .services__field-fielders { opacity: 0.1; }
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
    .services__lead { margin-top: var(--wb-space-sm); max-width: 951px; }

    .services__cards {
      margin-top: var(--wb-space-lg);
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 582px));
      gap: var(--wb-gap-cards);
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: var(--wb-space-xs);
      min-height: 262px;
      padding: 22px;
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
    .services__grid-lines { animation: wb-grid-drift 30s linear infinite; }
    .services__field { transform-origin: 100% 100%; }
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

    @media (max-width: 1100px) {
      .services__cards { grid-template-columns: 1fr 1fr; }
      .services__field { opacity: 0.8; }
    }
    @media (max-width: 760px) {
      .services__cards { grid-template-columns: 1fr; }
      .card { min-height: 0; }
    }
  `,
})
export class ServicesComponent {
  protected readonly services = SERVICES;
  protected readonly fieldHalves = ['top', 'bottom'] as const;
  /** Fielder positions on the field (viewBox units); the first four are from Figma. */
  protected readonly fielders = [
    { x: 247, y: 157 }, { x: 437, y: 312 }, { x: 482, y: 351 }, { x: 294, y: 404 },
    { x: 721, y: 157 }, { x: 531, y: 312 }, { x: 674, y: 404 },
    { x: 400, y: 640 }, { x: 612, y: 700 }, { x: 250, y: 800 }, { x: 760, y: 760 },
  ];
}
