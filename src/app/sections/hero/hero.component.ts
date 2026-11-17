import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component';
import { StatsComponent } from '../stats/stats.component';
import { CLIENT_LOGOS, CONSULTATION_HREF, NAV_LINKS } from '../../content/site-content';

/** Figma "header" (805:60723): floating glass nav, hero statement and client logos. */
@Component({
  selector: 'wb-hero',
  imports: [ButtonComponent, StatsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly navLinks = NAV_LINKS;
  protected readonly clientLogos = CLIENT_LOGOS;
  protected readonly consultationHref = CONSULTATION_HREF;
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
