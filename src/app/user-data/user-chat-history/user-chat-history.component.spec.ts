import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatHistoryComponent } from './user-chat-history.component';

describe('UserChatHistoryComponent', () => {
  let component: UserChatHistoryComponent;
  let fixture: ComponentFixture<UserChatHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
