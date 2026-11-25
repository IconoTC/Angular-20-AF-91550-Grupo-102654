import { Course } from '../types/course';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Curso de Angular 22',
    description: 'Este es un curso de Angular 22',
    duration: '30 horas',
    level: 'beginner',
    image: '/assets/angular-fundamentals.webp',
    courseStats: {
      utility: 7,
      difficulty: 5,
      actualization: 8,
    },
  },
  {
    id: 2,
    title: 'Curso de Angular avanzado',
    description: 'Este es un curso de Angular avanzado',
    duration: '40 horas',
    level: 'advanced',
    image: '/assets/angular-advanced.webp',
    courseStats: {
      utility: 9,
      difficulty: 8,
      actualization: 9,
    },
  },
  {
    id: 3,
    title: 'Curso de Rendimiento en Angular',
    description: 'Este es un curso de Angular Performance',
    duration: '30 horas',
    level: 'intermediate',
    image: '/assets/angular-performance.webp',
    courseStats: {
      utility: 8,
      difficulty: 7,
      actualization: 8,
    },
  }
];
