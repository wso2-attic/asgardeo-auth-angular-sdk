import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidcAngularComponent } from './oidc-angular.component';

describe('OidcAngularComponent', () => {
  let component: OidcAngularComponent;
  let fixture: ComponentFixture<OidcAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OidcAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OidcAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
