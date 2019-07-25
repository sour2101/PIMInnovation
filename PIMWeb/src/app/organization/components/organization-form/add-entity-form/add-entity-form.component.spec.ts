import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityFormComponent } from './add-entity-form.component';

describe('AddEntityFormComponent', () => {
  let component: AddEntityFormComponent;
  let fixture: ComponentFixture<AddEntityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
