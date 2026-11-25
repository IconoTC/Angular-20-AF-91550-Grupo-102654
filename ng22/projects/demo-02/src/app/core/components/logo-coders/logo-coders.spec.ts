import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoCoders } from './logo-coders';
import { By } from '@angular/platform-browser';

describe('LogoCoders', () => {
  let component: LogoCoders;
  let fixture: ComponentFixture<LogoCoders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCoders],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoCoders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run console.log when user clicks on the logo', () => {
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
    const logoDebugElements = fixture.debugElement.queryAll(By.css('path'));
    logoDebugElements[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('Clicked on', 'upper');
  });
});
