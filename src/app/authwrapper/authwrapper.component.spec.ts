import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthwrapperComponent } from './authwrapper.component';

describe('AuthwrapperComponent', () => {
  let component: AuthwrapperComponent;
  let fixture: ComponentFixture<AuthwrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthwrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthwrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
