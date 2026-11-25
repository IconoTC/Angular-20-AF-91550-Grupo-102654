import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchRef } from './search-ref';
import { By } from '@angular/platform-browser';

describe('SearchRef', () => {
  let component: SearchRef;
  let fixture: ComponentFixture<SearchRef>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRef],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchRef);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should type a search term and see it in the input', async () => {
    const elementInput = (HTMLInputElement = fixture.debugElement.query(
      By.css('input'),
    ).nativeElement);
    elementInput.value = 'User search term';
    elementInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    const spanElement: HTMLParagraphElement = fixture.debugElement.query(
      By.css('span'),
    ).nativeElement;
    expect(spanElement.textContent).toContain('User search term');
  });
});
