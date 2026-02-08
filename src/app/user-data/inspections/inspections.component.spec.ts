import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InspectionsComponent } from './inspections.component';

describe('InspectionsComponent', () => {
  let component: InspectionsComponent;
  let fixture: ComponentFixture<InspectionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
