import { Component, signal, ViewEncapsulation } from '@angular/core';
import { COURSES } from '../../data/courses';
import { Course } from '../../types/course';

@Component({
  imports: [],
  selector: 'ind-course-item',
  // styleUrls: ['./course-item.css'],
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      margin: 1rem;
      padding: 1rem;
      border: 1px solid var(--color-primary);
      border-radius: 4px;
    }

    h3 {
      color: var(--color-primary);
    }

    img {
      width: 300px;
    }
  `,

  // templateUrl: './course-item.html',
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h3 [title]="'ID: ' + course().id">{{ course().title }}</h3>
  `,
  encapsulation: ViewEncapsulation.Emulated,
})
export class CourseItem {
  // Válido en 22.3: private
  protected readonly course = signal<Course>(COURSES[0]);
  //public readonly courses = signal<Course[]>([]);
}
