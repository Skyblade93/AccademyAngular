import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompont } from './user';

describe('User', () => {
  let component: UserCompont;
  let fixture: ComponentFixture<UserCompont>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCompont],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCompont);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
