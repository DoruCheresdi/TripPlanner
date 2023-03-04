import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAccessiblityComponent } from './check-accessiblity.component';

describe('CheckAccessiblityComponent', () => {
  let component: CheckAccessiblityComponent;
  let fixture: ComponentFixture<CheckAccessiblityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAccessiblityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAccessiblityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
