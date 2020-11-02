import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxContentComponent } from './tax-content.component';

describe('TaxContentComponent', () => {
  let component: TaxContentComponent;
  let fixture: ComponentFixture<TaxContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
