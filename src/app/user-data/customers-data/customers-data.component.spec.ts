import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomersDataComponent } from './customers-data.component';

describe('CustomersDataComponent', () => {
  let component: CustomersDataComponent;
  let fixture: ComponentFixture<CustomersDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersDataComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

