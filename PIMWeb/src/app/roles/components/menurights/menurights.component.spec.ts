import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenurightsComponent } from './menurights.component';

describe('MenurightsComponent', () => {
  let component: MenurightsComponent;
  let fixture: ComponentFixture<MenurightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenurightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenurightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
