import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STATS } from '../../content/site-content';
import { CountUpDirective } from '../../shared/count-up.directive';
import { RevealDirective } from '../../shared/reveal.directive';

/** Figma "trust-sats" (805:60792): "The scoreboard so far". */
@Component({
  selector: 'wb-stats',
  imports: [CountUpDirective, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stats" aria-label="WhiteBlue at a glance">
      <div class="wb-container">
        <dl wbReveal="zoom" class="stats__board">
          @for (stat of stats; track stat.label; let i = $index) {
            <div class="stats__cell" wbReveal [wbRevealDelay]="200 + i * 110">
              <dt class="stats__label">{{ stat.label }}</dt>
              <dd class="stats__value">
                @if (asNumber(stat.value); as n) { <span [wbCountUp]="n"></span> } @else { {{ stat.value }} }<span class="wb-accent stats__accent">{{ stat.accent }}</span>
              </dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
    .stats {
      padding: clamp(28px, 2.4vw, 44px) 0 0;
      background: transparent;
    }

    /* Column widths follow the Figma dividers: 430 / 358 / 328 / 545 */
    .stats__board {
      margin: 0;
      display: grid;
      grid-template-columns: 430fr 358fr 328fr 545fr;
      border: 1px solid var(--wb-line);
    }
    .stats__cell {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      gap: 8px;
      min-height: clamp(200px, 14.6vw, 281px);
      padding: 32px clamp(16px, 2vw, 40px);
      text-align: center;
    }
    .stats__cell + .stats__cell { border-left: 1px solid var(--wb-line); }
    .stats__value { font-variant-numeric: tabular-nums; }
    .stats__accent { display: inline-block; }
    .stats__value {
      margin: 0;
      font-family: var(--wb-font-display);
      font-weight: 900;
      font-size: var(--wb-fs-h2);
      line-height: 1.35;
      color: var(--wb-ink-900);
      white-space: nowrap;
    }
    .stats__label {
      max-width: 285px;
      font-family: var(--wb-font-body);
      font-size: var(--wb-fs-lead);
      line-height: 1.36;
      color: var(--wb-ink-800);
    }
    @media (max-width: 1000px) {
      .stats__board { grid-template-columns: 1fr 1fr; }
      .stats__cell:nth-child(3) { border-left: 0; }
      .stats__cell:nth-child(n + 3) { border-top: 1px solid var(--wb-line); }
    }
    @media (max-width: 520px) {
      .stats__board { grid-template-columns: 1fr; }
      .stats__cell + .stats__cell { border-left: 0; border-top: 1px solid var(--wb-line); }
      .stats__cell { min-height: 0; }
    }
  `,
})
export class StatsComponent {
  protected readonly stats = STATS;

  /** Numeric proof points count up; the ISO certification text remains static. */
  protected asNumber(value: string): number | null {
    return /^\d+$/.test(value) ? Number(value) : null;
  }
}
