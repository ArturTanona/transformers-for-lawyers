import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaberComponent } from './taber.component';

describe('TaberComponent', () => {
  let component: TaberComponent;
  let fixture: ComponentFixture<TaberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
