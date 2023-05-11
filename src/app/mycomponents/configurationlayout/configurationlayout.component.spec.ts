import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationlayoutComponent } from './configurationlayout.component';

describe('ConfigurationlayoutComponent', () => {
  let component: ConfigurationlayoutComponent;
  let fixture: ComponentFixture<ConfigurationlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationlayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
