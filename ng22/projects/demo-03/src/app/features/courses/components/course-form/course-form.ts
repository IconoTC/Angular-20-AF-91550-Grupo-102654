import { Component, inject, output } from '@angular/core';
import { Course } from '../../types/course';
import { CoursesStore } from '../../services/courses-store';

@Component({
  imports: [],
  selector: 'ind-course-form',
  styles: ``,
  template: ` 
    <p>Aquí va el formulario de cursos</p> 
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <p>...</p>
    <button (click)="addEmit()">Añadir curso</button>
    `,
})
export class CourseForm {

  readonly store = inject(CoursesStore);
  protected readonly addEvent = output<void>();

  protected newCourse: Omit<Course, 'id'> = {
    title: 'Docker para desarrolladores',
    image: '',
    isOfficial: false,
    description: 'Aprende a usar Docker para desarrollar tus aplicaciones',
    duration: '3h',
    level: 'beginner',
    courseStats: {
      actualization: 7,
      difficulty: 5,
      utility: 6,
    },
  };

  addEmit() {
    this.store.addCourse(this.newCourse);
    this.addEvent.emit();
  }
}
