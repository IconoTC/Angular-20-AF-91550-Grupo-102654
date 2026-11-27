import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Counter } from './counter';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;

  let buttonDebugElements: DebugElement[];
  let outputElements: HTMLElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    fixture = TestBed.createComponent(Counter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('counterState', { id: 1, clicks: 0, countValue: 0 });

    await fixture.whenStable();

    buttonDebugElements = fixture.debugElement.queryAll(By.css('button'));
    outputElements = fixture.debugElement
      .queryAll(By.css('output'))
      .map((debugEl) => debugEl.nativeElement);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase the display when the button ➕ is clicked', async () => {
    component['count'].set(0);
    component['clicks'].set(0);
    expect(buttonDebugElements[0].nativeElement.title).toBe('Increment');
    buttonDebugElements[0].triggerEventHandler('click');
    await fixture.whenStable();
    expect(outputElements[0].textContent).toBe('1');
    expect(outputElements[1].textContent).toBe('1');
  });

  it('should decrease the display when the button ➖ is clicked', async () => {
    component['count'].set(0);
    component['clicks'].set(0);
    expect(buttonDebugElements[1].nativeElement.title).toBe('Decrement');
    buttonDebugElements[1].triggerEventHandler('click');
    await fixture.whenStable();
    expect(outputElements[0].textContent).toBe('1');
    expect(outputElements[1].textContent).toBe('-1');
  });

  it('should reset the display when the button 🟣 is clicked', async () => {
    component['count'].set(5);
    component['clicks'].set(10);
    buttonDebugElements[2].triggerEventHandler('click');
    await fixture.whenStable();
    expect(outputElements[0].textContent).toBe('0');
    expect(outputElements[1].textContent).toBe('0');
  });
});
