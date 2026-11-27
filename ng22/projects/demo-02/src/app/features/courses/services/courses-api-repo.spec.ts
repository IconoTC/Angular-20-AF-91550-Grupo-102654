import { TestBed } from '@angular/core/testing';
import { CoursesApiRepo } from './courses-api-repo';
import { HttpClient } from '@angular/common/http';

describe('CoursesApiRepo', () => {
  let service: CoursesApiRepo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: {
          get: vi.fn().mockReturnValue({
            ok: true,
            json: vi.fn().mockResolvedValue([]),
          }),
          post: vi.fn(),
          patch: vi.fn(),
          delete: vi.fn(),
        },
      }],

    });

    service = TestBed.inject(CoursesApiRepo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
