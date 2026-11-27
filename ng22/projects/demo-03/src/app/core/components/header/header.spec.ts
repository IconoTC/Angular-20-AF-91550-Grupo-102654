import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])], 
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    
    fixture.componentRef.setInput('app-title', 'Test Demo');
    fixture.componentRef.setInput('subtitle', 'Curso Angular 22 - Indra');

    fixture.detectChanges();
    await fixture.whenStable();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test de implementation o caja blanca

  it('should have as title "Test Demo"', () => {
    expect(component['title']()).toEqual('Test Demo');
  });

  // Test de comportamiento o caja negra

  it('should render title', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain('Test Demo');
  });

  it('should render title (debugElement)', async () => {
    const debugElement = fixture.debugElement;
    expect(debugElement.query(By.css('h1'))?.nativeElement.textContent).toContain('Test Demo');
  });

  it('should render subtitle', async () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.first-line')?.textContent).toContain('Curso Angular 22 - Indra');
  });
});
