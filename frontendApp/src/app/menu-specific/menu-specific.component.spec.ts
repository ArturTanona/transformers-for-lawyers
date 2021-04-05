import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSpecificComponent } from './menu-specific.component';

describe('MenuSpecificComponent', () => {
  let component: MenuSpecificComponent;
  let fixture: ComponentFixture<MenuSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuSpecificComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
