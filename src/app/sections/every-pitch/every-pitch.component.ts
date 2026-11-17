import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, afterNextRender, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/button.component';
import { PillLabelComponent } from '../../shared/pill-label.component';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * Figma "every-pitch" (805:60595): problem statement with the animated cricket pitch.
 *
 * - The pitch video plays ONCE when the section scrolls into view, then rests on its final frame.
 * - Cricket-field markings (the 30-yard circle, dotted boundary, subtle grass stripes and creases)
 *   are drawn in the same perspective as the pitch. They draw in as the video starts.
 */
@Component({
  selector: 'wb-every-pitch',
  imports: [ButtonComponent, RevealDirective, PillLabelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './every-pitch.component.html',
  styleUrl: './every-pitch.component.scss',
  host: { '[class.is-playing]': 'playing()', '[class.is-static]': 'staticMode()' },
})
export class EveryPitchComponent implements OnDestroy {
  protected readonly playing = signal(false);
  protected readonly staticMode = signal(false);

  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const video = this.video().nativeElement;
      video.muted = true; // required for autoplay; set in code as some browsers ignore the attribute
      video.loop = false;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || !('IntersectionObserver' in window)) {
        this.showFinished();
        return;
      }

      video.addEventListener('playing', () => this.playing.set(true), { once: true });
      this.observer = new IntersectionObserver(
        entries => {
          if (entries.some(e => e.isIntersecting)) {
            this.observer?.disconnect();
            video.play().catch(() => this.showFinished()); // e.g. data-saver modes block autoplay
          }
        },
        { threshold: 0.4 },
      );
      // Watch the visible frame, not the video: on phones the video is zoomed and partly cropped.
      this.observer.observe(video.parentElement ?? video);
    });
  }

  /** Reduced motion or blocked autoplay: the finished frame, with the field already drawn. */
  private showFinished(): void {
    const video = this.video().nativeElement;
    video.poster = 'assets/illustrations/pitch-end.webp';
    const seekToEnd = () => { video.currentTime = Math.max(0, video.duration - 0.05); };
    if (video.readyState >= 1) seekToEnd();
    else video.addEventListener('loadedmetadata', seekToEnd, { once: true });
    this.staticMode.set(true);
    this.playing.set(true);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
