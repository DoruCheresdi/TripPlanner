import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillComplaintComponent } from './fill-complaint.component';

describe('FillComplaintComponent', () => {
  let component: FillComplaintComponent;
  let fixture: ComponentFixture<FillComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
