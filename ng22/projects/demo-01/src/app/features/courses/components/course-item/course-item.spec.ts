import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItem } from './course-item';
import { COURSES } from '../../data/courses';

describe('CourseItem', () => {
  let component: CourseItem;
  let fixture: ComponentFixture<CourseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItem],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should render initial title and alt image message', async () => {
  
      const element = fixture.nativeElement as HTMLElement;
      const h3Element = element.querySelector('h3');
      const iElement = element.querySelector('img');
  
      expect(h3Element?.textContent).toContain(COURSES[0].title);
      expect(iElement?.alt).toContain(COURSES[0].title);
    });
  
});
