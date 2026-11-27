import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { Course } from '../../types/course';
import { CoursesStore } from '../../services/courses-store';

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
    }

    h3 {
      color: var(--color-primary);
    }

    img {
      width: 200px;
    }
  `,

  // templateUrl: './course-item.html',
  template: `
    <img [src]="course().image" [alt]="course().title" />
    <h3 [title]="'ID: ' + course().id">{{ course().title }}</h3>
    <label>
      <input type="checkbox" [checked]="course().isOfficial" (change)="change()"/>
      <span>Curso oficial</span>
    </label>
    <div>
      <button (click)="delete()">Eliminar</button>
      <button disabled>Editar</button>
      <button disabled>Ver detalles</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.Emulated,
})
export class CourseItem {
  // Válido en 22.3: private

  readonly store = inject(CoursesStore);
  readonly course = input.required<Course>();

  delete() {
    this.store.deleteCourse(this.course().id);
  }

  change() {
    const updatedCourse: Course = {
      ...this.course(),
      isOfficial: !this.course().isOfficial,
    };
     this.store.updateCourse(updatedCourse);
  }
}
