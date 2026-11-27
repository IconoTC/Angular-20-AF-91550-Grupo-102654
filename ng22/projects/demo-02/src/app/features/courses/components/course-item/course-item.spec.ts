import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItem } from './course-item';
import { Course } from '../../types/course';

const COURSE_MOCK: Course = {
  id: '1',
  title: 'Curso de Angular',
  description: 'Aprende Angular desde cero',
  duration: '10 horas',
  isOfficial: true,
  level: 'beginner',
  image: 'https://angular.io/assets/images/logos/angular/angular.png',
  courseStats: {
    actualization: 9,
    difficulty: 7,
    utility: 8,
  },
}

describe('CourseItem', () => {
  let component: CourseItem;
  let fixture: ComponentFixture<CourseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('course', COURSE_MOCK);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should render initial title and alt image message', async () => {
  
      const element = fixture.nativeElement as HTMLElement;
      const h3Element = element.querySelector('h3');
      const iElement = element.querySelector('img');
  
      expect(h3Element?.textContent).toContain(COURSE_MOCK.title);
      expect(iElement?.alt).toContain(COURSE_MOCK.title);
    });
  
});
