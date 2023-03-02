import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripplanComponent } from './tripplan.component';

describe('TripplanComponent', () => {
  let component: TripplanComponent;
  let fixture: ComponentFixture<TripplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
