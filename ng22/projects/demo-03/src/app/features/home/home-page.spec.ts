import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';

describe('HomePage', () => {
  let harness: RouterTestingHarness;
  let debugHarness: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [provideRouter(routes)],
    }).compileComponents();

    harness = await RouterTestingHarness.create();
    debugHarness = harness.fixture.debugElement;

    await harness.fixture.whenStable();
    await harness.navigateByUrl('/home');
  });

  it('should create', () => {
    expect(harness.fixture.componentInstance).toBeTruthy();
  });

  it('should render HomePage content', () => {
    const debugHeading = debugHarness.query(By.css('h2'));
    const elementHeading = debugHeading.nativeElement as HTMLElement;
    expect(elementHeading.textContent).toContain('Inicio');
  });
});
