import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Timestamp } from './timestamp';
import { TimeService } from '../../services/time.service';

const MOCK_TIMESTAMP = 1234567890;

describe('Timestamp', () => {
  let component: Timestamp;
  let fixture: ComponentFixture<Timestamp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Timestamp],
      providers: [{
        provide: TimeService,
        useValue: {
          getTimestamp: () => MOCK_TIMESTAMP,
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(Timestamp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the timestamp', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain(MOCK_TIMESTAMP.toString());
  });
});
