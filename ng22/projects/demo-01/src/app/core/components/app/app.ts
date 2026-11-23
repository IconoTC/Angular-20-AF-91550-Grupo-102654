import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CourseItem } from '../../../features/courses/components/course-item/course-item';

@Component({
  imports: [RouterOutlet, CourseItem],
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
      <h3>Courses</h3>
      <p>List of courses:</p>
      <ind-course-item />
    </section>


    <router-outlet />
  `,
})
export class App {
  protected readonly title = signal('Demo 01');
}
