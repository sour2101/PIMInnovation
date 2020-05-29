import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleRightsComponent } from './user-role-rights.component';

describe('UserRoleRightsComponent', () => {
  let component: UserRoleRightsComponent;
  let fixture: ComponentFixture<UserRoleRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
