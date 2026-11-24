import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';
import { CourseItemSignals } from '../../../features/courses/components/course-item-signals/course-item-signals';
import { CourseItemPro } from '../../../features/courses/components/course-item-pro/course-item-pro';

@Component({
  imports: [RouterOutlet, CourseItem, CourseItemSignals, CourseItemPro],
  selector: 'ind-root',
  styles: `
    h1 {
      font-family: var(--font-family-heading);
      color: var(--color-primary);
    }
  `,
  template: `
    <h1>Hello, {{ title() }}</h1>

    <section>
      <h2>Courses</h2>
      <ind-course-item />
      <ind-course-item-signals />
    </section>
    <section>
      <h2>Courses Details</h2>
      <ind-course-item-pro />
    </section>


    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo 01');
}
