import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagnymailingComponent } from './campagnymailing.component';

describe('CampagnymailingComponent', () => {
  let component: CampagnymailingComponent;
  let fixture: ComponentFixture<CampagnymailingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampagnymailingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagnymailingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
