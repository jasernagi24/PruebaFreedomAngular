import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCorralComponent } from './new-corral.component';

describe('NewCorralComponent', () => {
  let component: NewCorralComponent;
  let fixture: ComponentFixture<NewCorralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCorralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCorralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
