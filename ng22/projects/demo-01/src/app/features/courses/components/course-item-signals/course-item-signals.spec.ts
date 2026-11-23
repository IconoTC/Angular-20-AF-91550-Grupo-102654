import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemSignals } from './course-item-signals';
import { COURSES } from '../../data/courses';

describe('CourseItemSignals', () => {
  let component: CourseItemSignals;
  let fixture: ComponentFixture<CourseItemSignals>;

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemSignals],
    }).compileComponents();
  });

  async function createComponent() {
    fixture = TestBed.createComponent(CourseItemSignals);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('should create', () => {
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should render initial title and message', async () => {
    await createComponent();

    const element = fixture.nativeElement as HTMLElement;
    const h3Element = element.querySelector('h3');
    const pElement = element.querySelector('p');

    expect(h3Element?.textContent).toContain(COURSES[0].title);
    expect(pElement?.textContent).toContain('Probando el uso de signals');
  });

  it('should NOT update message WITHOUT SIGNALS after 2 seconds', async () => {
    vi.useFakeTimers();
    await createComponent();

    vi.advanceTimersByTime(2100);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const pElement = element.querySelector('p');

    expect(pElement?.textContent).toContain('Probando el uso de signals');
    expect(pElement?.textContent).not.toContain('asincronía');
  });

  it('should update title WITH SIGNALS after 4 seconds', async () => {
    vi.useFakeTimers();
    await createComponent();

    vi.advanceTimersByTime(4000);
    fixture.detectChanges();
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;
    const h3Element = element.querySelector('h3');

    expect(h3Element?.textContent).toContain('Signals');
  });
});
