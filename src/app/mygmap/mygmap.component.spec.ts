import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MygmapComponent } from './mygmap.component';

describe('MygmapComponent', () => {
  let component: MygmapComponent;
  let fixture: ComponentFixture<MygmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MygmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MygmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
