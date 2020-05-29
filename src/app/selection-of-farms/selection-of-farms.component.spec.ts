import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionOfFarmsComponent } from './selection-of-farms.component';

describe('SelectionOfFarmsComponent', () => {
  let component: SelectionOfFarmsComponent;
  let fixture: ComponentFixture<SelectionOfFarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionOfFarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionOfFarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
