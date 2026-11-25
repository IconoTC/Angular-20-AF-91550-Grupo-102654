import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemPro } from './course-item-pro';
import { COURSES } from '../../data/courses';
import { By } from '@angular/platform-browser';

describe('CourseItemPro', () => {
  let component: CourseItemPro;
  let fixture: ComponentFixture<CourseItemPro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseItemPro],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseItemPro);
    component = fixture.componentInstance;
    await fixture.whenStable();

    vi.spyOn(component, 'changeStats');
    vi.spyOn(component, 'resetStatsAll');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial title and alt image message', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const h3Element = element.querySelector('h3');
    const iElement = element.querySelector('img');

    expect(h3Element?.textContent).toContain(COURSES[0].title);
    expect(iElement?.alt).toContain(COURSES[0].title);
  });

  describe('changeStats: Utility', () => {
    let buttons: NodeListOf<HTMLButtonElement>;
    let outputElement: HTMLElement;

    beforeEach(async () => {
      const element = fixture.nativeElement as HTMLElement;
      const utilitySection = element.querySelector('[aria-label="Utilidad"]');
      buttons = utilitySection?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

      outputElement = utilitySection?.querySelector('output') as HTMLElement;
    });

    it('should increment UTILITY stat when clicking the button ➕', async () => {
      const incrementButton = buttons?.[1] as HTMLButtonElement;
      incrementButton.click();
      //fixture.detectChanges();
      await fixture.whenStable();

      // Test de implementación
      expect(component['changeStats']).toHaveBeenCalledWith('utility', 1);

      // Test de comportamiento
      expect(outputElement.textContent).toBe((COURSES[0].courseStats.utility + 1).toString());
    });

    it('should decrement UTILITY stat when clicking the button ➖ (using dispatchEvent)', async () => {
      const decrementButton = buttons?.[0] as HTMLButtonElement;
      decrementButton.dispatchEvent(new Event('click'));
      //fixture.detectChanges();
      await fixture.whenStable();
      expect(component['changeStats']).toHaveBeenCalledWith('utility', -1);
      expect(outputElement.textContent).toBe((COURSES[0].courseStats.utility - 1).toString());
    });

    it('should reset UTILITY stat to 0 when clicking the button 🔄️ (using debugElement)', async () => {
      const debugElement = fixture.debugElement;
      const utilitySection = debugElement.query(By.css('[aria-label="Utilidad"]'));

      //querySelector('[aria-label="Utilidad"]');
      const buttons = utilitySection?.queryAll(By.css('button'));
      const resetButton = buttons?.[2];
      resetButton.triggerEventHandler('click', null);
      //fixture.detectChanges();
      await fixture.whenStable();
      expect(component['changeStats']).toHaveBeenCalledWith('utility');
      expect(outputElement.textContent).toBe('0');
    });
  });

  describe.todo('changeStats: Actualization', () => {
    //
  });
  describe.todo('changeStats: Difficulty', () => {
    //
  });

  describe('resetStatsAll', () => {
    
    it('should reset all stats to 0 when clicking the reset button', async () => {
      component['course'].set({
        ...COURSES[0],
        courseStats: { utility: 5, difficulty: 3, actualization: 2 },
      });
      await fixture.whenStable();

      const debugElement = fixture.debugElement;
      const debugResetButton = debugElement.query(By.css('[aria-label="Rating"] button'));
      const resetButton = debugResetButton?.nativeElement as HTMLButtonElement;

      // Click on the reset button
      resetButton.click();
      fixture.detectChanges();
      await fixture.whenStable();

      const debugUtilityOutput = debugElement.query(By.css('[aria-label="Utilidad"] output'));
      const utilityOutput = debugUtilityOutput?.nativeElement as HTMLOutputElement;
      const debugDifficultyOutput = debugElement.query(By.css('[aria-label="Dificultad"] output'));
      const difficultyOutput = debugDifficultyOutput?.nativeElement as HTMLOutputElement;
      const debugActualizationOutput = debugElement.query(
        By.css('[aria-label="Actualización"] output'),
      );
      const actualizationOutput = debugActualizationOutput?.nativeElement as HTMLOutputElement;

      expect(component['resetStatsAll']).toHaveBeenCalled();
      expect(utilityOutput.value).toBe('0');
      expect(difficultyOutput.value).toBe('0');
      expect(actualizationOutput.value).toBe('0');
    });
  });
});
