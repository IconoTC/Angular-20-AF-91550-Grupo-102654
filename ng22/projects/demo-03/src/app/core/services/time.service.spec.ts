import { TestBed } from '@angular/core/testing';
import { TimeService } from './time.service';

describe('TimeService', () => {
  let service: TimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get the timestamp correctly', () => {
    const testDate = new Date('2024-01-01T00:00:00');
    service.setTime(testDate);
    expect(service.getTimestamp()).toBe(testDate.getTime());
  });
});
