import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePhaseComponent } from './change-phase.component';

describe('ChangePhaseComponent', () => {
  let component: ChangePhaseComponent;
  let fixture: ComponentFixture<ChangePhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
