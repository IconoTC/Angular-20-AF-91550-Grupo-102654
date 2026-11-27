import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountersList } from './counters-list';
import { Counter } from '../counter/counter';
import { By } from '@angular/platform-browser';

describe('CountersList', () => {
  let component: CountersList;
  let fixture: ComponentFixture<CountersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountersList],
    }).compileComponents();

    fixture = TestBed.createComponent(CountersList);
    component = fixture.componentInstance;

    component['counters'].set([
      { id: 1, clicks: 2, countValue: 3 },
      { id: 2, clicks: 4, countValue: 5 },
      { id: 3, clicks: 6, countValue: 7 },
    ]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of CounterPro components', () => {
    const counters = fixture.debugElement.queryAll(By.directive(Counter));
    expect(counters.length).toBe(3);
  });

  it('should update total and totalClicks when onChange is called', () => {
    vi.spyOn(component, 'onChange');

    const initialTotal = component['totalCount']();
    const initialTotalClicks = component['totalClicks']();

    const delta =  { id: 1, clicks: 3, countValue: 4 };
    // component.onChange(delta);

    const counters = fixture.debugElement.queryAll(By.directive(Counter));
    counters[0].triggerEventHandler('changeEvent', delta);
    fixture.detectChanges();

    expect(component['onChange']).toHaveBeenCalledWith(delta);
    expect(component['totalCount']()).toBe(initialTotal + 1);
    expect(component['totalClicks']()).toBe(initialTotalClicks + 1);
  });
});
