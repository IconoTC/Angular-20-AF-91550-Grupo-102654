import { DestroyRef, inject, Service, signal } from '@angular/core';
import { Course } from '../types/course';
import { CoursesApiRepo } from './courses-api-repo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';

@Service()
export class CoursesStore {
  readonly #repo = inject(CoursesApiRepo);
  readonly #destroyRef = inject(DestroyRef);

  readonly #courses = signal<Course[]>([]);
  readonly #isLoading = signal<boolean>(false);
  readonly #error = signal<Error | null>(null);

  readonly courses = this.#courses.asReadonly();
  readonly isLoading = this.#isLoading.asReadonly();
  readonly error = this.#error.asReadonly();

  loadCourses() {
    this.#isLoading.set(true);
    this.#repo
      .getAll()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (courses) => {
          this.#error.set(null);
          this.#courses.set(courses);
          this.#isLoading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading courses:', error);
          this.#courses.set([]);
          this.#error.set(error);
          this.#isLoading.set(false);
        },
      });
  }

  addCourse(courseData: Omit<Course, 'id'>) {
      this.#repo
      .add(courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (newCourse) => {
          this.#error.set(null);
          this.#courses.update((courses) => [...courses, newCourse]);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding course:', error);
          this.#error.set(error);
        },
      });
  }

    deleteCourse(courseId: Course['id']) {
       this.#repo
      .deleteById(courseId)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: () => {
          this.#error.set(null);
          this.#courses.update((courses) => courses.filter((course) => course.id !== courseId));
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error deleting course:', error);
          this.#error.set(error);
        },
      });
    }

    updateCourse(updatedCourse: Course) {
      const { id, ...courseData } = updatedCourse;
    this.#repo
      .updateById(id, courseData)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (updatedCourse) => {
          this.#error.set(null);
          this.#courses.update((courses) =>
            courses.map((course) => (course.id === updatedCourse.id ? updatedCourse : course)),
          );
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating course:', error);
          this.#error.set(error);
        },
      });
    }
  }