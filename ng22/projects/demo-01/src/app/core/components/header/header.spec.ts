import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test de implementation o caja blanca

  it('should have as title "Demo 01"', () => {
    expect(component['title']()).toEqual('Demo 01');
  });

    // Test de comportamiento o caja negra

  it('should render title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Demo 01');
  });

  it('should render title (debugElement)', async () => {
    const debugElement = fixture.debugElement;
    expect(debugElement.query(By.css('h1'))?.nativeElement.textContent).toContain('Demo 01');
  });

});
