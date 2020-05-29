import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPreviousRecordsComponent } from './check-previous-records.component';

describe('CheckPreviousRecordsComponent', () => {
  let component: CheckPreviousRecordsComponent;
  let fixture: ComponentFixture<CheckPreviousRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPreviousRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPreviousRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
