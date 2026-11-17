import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroComponent } from './sections/hero/hero.component';
import { EveryPitchComponent } from './sections/every-pitch/every-pitch.component';
import { IndustriesComponent } from './sections/industries/industries.component';
import { ServicesComponent } from './sections/services/services.component';
import { ProductsComponent } from './sections/products/products.component';
import { TestimonialsComponent } from './sections/testimonials/testimonials.component';
import { CaseStudiesComponent } from './sections/case-studies/case-studies.component';
import { FounderComponent } from './sections/founder/founder.component';
import { FooterComponent } from './sections/footer/footer.component';
import { SectionThemeDirective } from './shared/section-theme.directive';
import { SECTION_THEMES } from './content/site-content';

/** WhiteBlue homepage, in the section order of Figma frame "WB_homepage" (805:60594). */
@Component({
  selector: 'wb-root',
  imports: [
    HeroComponent,
    EveryPitchComponent,
    IndustriesComponent,
    ServicesComponent,
    ProductsComponent,
    TestimonialsComponent,
    CaseStudiesComponent,
    FounderComponent,
    FooterComponent,
    SectionThemeDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Each section sets the page colour while it's in the middle of the screen -->
    <wb-hero [wbSectionTheme]="themes.hero" />
    <main>
      <wb-every-pitch [wbSectionTheme]="themes.everyPitch" />
      <wb-industries [wbSectionTheme]="themes.industries" />
      <wb-services [wbSectionTheme]="themes.services" />
      <wb-products [wbSectionTheme]="themes.products" />
      <wb-testimonials [wbSectionTheme]="themes.testimonials" />
      <wb-case-studies [wbSectionTheme]="themes.caseStudies" />
      <wb-founder [wbSectionTheme]="themes.founder" />
    </main>
    <wb-footer [wbSectionTheme]="themes.footer" />
  `,
})
export class AppComponent {
  protected readonly themes = SECTION_THEMES;
}
