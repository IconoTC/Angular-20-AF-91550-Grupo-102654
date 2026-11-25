import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'ind-about-page',
  styleUrls: ['../pages.css'],
  styles: ``,
  template: ` <h2>{{title()}}</h2> `,
})
export default class AboutPage {
  protected readonly title = signal('Acerca de');
}
