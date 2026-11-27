import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card'; 
import { Component } from '@angular/core';

@Component({
  imports: [Card],
  selector: 'ind-testing-component',
  template: `
    <ind-card>
      <p>Contenido de prueba</p>
    </ind-card>
  `,
})
class TestingComponent {
  //
}

describe('Card used by TestingComponent', () => {
  let component: TestingComponent;
  let fixture: ComponentFixture<TestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Card],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the content inside the card', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const cardContent = element.querySelector('ind-card p');
    expect(cardContent?.textContent).toContain('Contenido de prueba');
  });
});
