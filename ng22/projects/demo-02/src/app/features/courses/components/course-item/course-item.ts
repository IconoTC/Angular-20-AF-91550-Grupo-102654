import { Component, input, output, ViewEncapsulation } from '@angular/core';
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
      <input type="checkbox" [checked]="course().isOfficial" (change)="changeEmit()"/>
      <span>Curso oficial</span>
    </label>
    <div>
      <button (click)="deleteEmit()">Eliminar</button>
      <button disabled>Editar</button>
      <button disabled>Ver detalles</button>
    </div>
  `,
  encapsulation: ViewEncapsulation.Emulated,
})
export class CourseItem {
  // Válido en 22.3: private
  readonly course = input.required<Course>();
  //public readonly courses = signal<Course[]>([]);

  protected readonly deleteEvent = output<Course['id']>();
  protected readonly changeEvent = output<Course>();

  deleteEmit() {
    this.deleteEvent.emit(this.course().id);
  }

  changeEmit() {
    const updatedCourse: Course = {
      ...this.course(),
      isOfficial: !this.course().isOfficial,
    };
    this.changeEvent.emit(updatedCourse);
  }
}
