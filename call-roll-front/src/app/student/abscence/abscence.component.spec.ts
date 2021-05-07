import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbscenceComponent } from './abscence.component';

describe('AbscenceComponent', () => {
  let component: AbscenceComponent;
  let fixture: ComponentFixture<AbscenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbscenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbscenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
