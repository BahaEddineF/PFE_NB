import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelemailComponent } from './modelemail.component';

describe('ModelemailComponent', () => {
  let component: ModelemailComponent;
  let fixture: ComponentFixture<ModelemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelemailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
