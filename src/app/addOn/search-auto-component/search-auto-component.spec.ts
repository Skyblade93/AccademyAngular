import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAutoComponent } from './search-auto-component';

describe('SearchAutoComponent', () => {
  let component: SearchAutoComponent;
  let fixture: ComponentFixture<SearchAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAutoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
