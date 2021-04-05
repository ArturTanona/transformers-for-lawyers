import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAidContentComponent } from './state-aid-content.component';

describe('StateAidContentComponent', () => {
  let component: StateAidContentComponent;
  let fixture: ComponentFixture<StateAidContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateAidContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAidContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
