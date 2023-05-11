import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateUseComponent } from './upadate-use.component';

describe('UpadateUseComponent', () => {
  let component: UpadateUseComponent;
  let fixture: ComponentFixture<UpadateUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpadateUseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpadateUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
