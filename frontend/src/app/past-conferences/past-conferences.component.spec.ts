import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastConferencesComponent } from './past-conferences.component';

describe('PastConferencesComponent', () => {
  let component: PastConferencesComponent;
  let fixture: ComponentFixture<PastConferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PastConferencesComponent]
    });
    fixture = TestBed.createComponent(PastConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
