import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorTemplete } from './calculator-templete';

describe('CalculatorTemplete', () => {
  let component: CalculatorTemplete;
  let fixture: ComponentFixture<CalculatorTemplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorTemplete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorTemplete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
