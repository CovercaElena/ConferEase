import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureConferencesComponent } from './future-conferences.component';

describe('FutureConferencesComponent', () => {
  let component: FutureConferencesComponent;
  let fixture: ComponentFixture<FutureConferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutureConferencesComponent]
    });
    fixture = TestBed.createComponent(FutureConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
