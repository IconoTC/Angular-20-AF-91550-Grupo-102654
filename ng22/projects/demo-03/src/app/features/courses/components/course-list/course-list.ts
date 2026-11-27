import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CourseItem } from '../course-item/course-item';
import { Card } from '../../../../core/design/card/card';
import { CourseForm } from '../course-form/course-form';
import { JsonPipe } from '@angular/common';
import { CoursesStore } from '../../services/courses-store';

@Component({
  imports: [CourseForm, Card, CourseItem, JsonPipe],
  selector: 'ind-course-list',
  styles: `
    .courses-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      list-style: none;
      padding: 0;
      margin: 0;
    }
    ind-card {
      max-width: 250px;
    }
  `,
  template: `
    <details #details>
      <summary>Añadir curso</summary>
      <ind-course-form (addEvent)="addCourse()" />
    </details>
    <h3>Cursos</h3>

    @if (error()) {
      <p>{{ error()?.message }}</p>
    }
    @if (isLoading()) {
      <p>Cargando cursos...</p>
    }

    @if (!isLoading() && courses().length === 0) {
      <p>No hay cursos disponibles.</p>
    }

    @if (!isLoading() && courses().length > 0) {
      <ul class="courses-list">
        @for (course of courses(); track course.id) {
          <li>
            <ind-card>
              <ind-course-item [course]="course" />
            </ind-card>
          </li>
        }
      </ul>
    }

    <pre>{{ courses() | json }}</pre>
  `,
})
export class CourseList {
  readonly store = inject(CoursesStore);

  protected readonly details = viewChild<ElementRef<HTMLDetailsElement>>('details');

  protected readonly courses = this.store.courses;
  protected readonly isLoading = this.store.isLoading;
  protected readonly error = this.store.error;


  addCourse() {
    this.details()?.nativeElement.removeAttribute('open');
  }

}
