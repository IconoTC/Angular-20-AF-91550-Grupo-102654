import { Component, signal } from '@angular/core';
import { Card } from '../../core/design/card/card';
import { CourseItemPro } from './components/course-item-pro/course-item-pro';
import { CourseItem } from './components/course-item/course-item';

@Component({
  imports: [
        Card,
        CourseItem,
        CourseItemPro,
  ],
  selector: 'ind-courses-page',
  styleUrls: ['../pages.css'],
  styles: ``,
  template: `
    <h2>{{ title() }}</h2>
    <ind-card>
      <ind-course-item />
    </ind-card>
    <details>
      <summary>Detalles</summary>
      <ind-course-item-pro />
    </details>
  `,
})
export default class CoursesPage {
  protected readonly title = signal('Cursos');
}
